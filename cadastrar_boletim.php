<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "conexao.php";

try {

    $dados = json_decode(file_get_contents("php://input"), true);

    if (!$dados) {

        http_response_code(400);

        echo json_encode([
            "sucesso" => false,
            "mensagem" => "Nenhum dado foi enviado."
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    $aluno_id = intval($dados["aluno_id"] ?? 0);
    $disciplina_id = intval($dados["disciplina_id"] ?? 0);

    $nota1 = floatval($dados["nota1"] ?? 0);
    $nota2 = floatval($dados["nota2"] ?? 0);
    $nota3 = floatval($dados["nota3"] ?? 0);
    $nota4 = floatval($dados["nota4"] ?? 0);

    if ($aluno_id <= 0) {

        http_response_code(400);

        echo json_encode([
            "sucesso" => false,
            "mensagem" => "Informe o aluno."
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    if ($disciplina_id <= 0) {

        http_response_code(400);

        echo json_encode([
            "sucesso" => false,
            "mensagem" => "Informe a disciplina."
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    if (
        $nota1 < 0 || $nota1 > 10 ||
        $nota2 < 0 || $nota2 > 10 ||
        $nota3 < 0 || $nota3 > 10 ||
        $nota4 < 0 || $nota4 > 10
    ) {

        http_response_code(400);

        echo json_encode([
            "sucesso" => false,
            "mensagem" => "As notas devem estar entre 0 e 10."
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    // Calcula a média
    $media = ($nota1 + $nota2 + $nota3 + $nota4) / 4;

    // Define a situação
    if ($media >= 6) {
        $situacao = "Aprovado";
    } else {
        $situacao = "Reprovado";
    }

    $sql = "INSERT INTO boletins
            (
                aluno_id,
                disciplina_id,
                nota1,
                nota2,
                nota3,
                nota4,
                media,
                situacao
            )
            VALUES
            (
                :aluno_id,
                :disciplina_id,
                :nota1,
                :nota2,
                :nota3,
                :nota4,
                :media,
                :situacao
            )";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ":aluno_id" => $aluno_id,
        ":disciplina_id" => $disciplina_id,
        ":nota1" => $nota1,
        ":nota2" => $nota2,
        ":nota3" => $nota3,
        ":nota4" => $nota4,
        ":media" => $media,
        ":situacao" => $situacao
    ]);

    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Boletim cadastrado com sucesso!",
        "id" => $pdo->lastInsertId(),
        "media" => round($media, 2),
        "situacao" => $situacao
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao cadastrar boletim.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}=