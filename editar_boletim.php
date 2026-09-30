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

    $id = intval($dados["id"] ?? 0);
    $aluno_id = intval($dados["aluno_id"] ?? 0);
    $disciplina_id = intval($dados["disciplina_id"] ?? 0);

    $nota1 = floatval($dados["nota1"] ?? 0);
    $nota2 = floatval($dados["nota2"] ?? 0);
    $nota3 = floatval($dados["nota3"] ?? 0);
    $nota4 = floatval($dados["nota4"] ?? 0);

    if ($id <= 0) {

        http_response_code(400);

        echo json_encode([
            "sucesso" => false,
            "mensagem" => "ID do boletim inválido."
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    if ($aluno_id <= 0 || $disciplina_id <= 0) {

        http_response_code(400);

        echo json_encode([
            "sucesso" => false,
            "mensagem" => "Aluno ou disciplina inválidos."
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

    $media = ($nota1 + $nota2 + $nota3 + $nota4) / 4;

    if ($media >= 6) {
        $situacao = "Aprovado";
    } else {
        $situacao = "Reprovado";
    }

    $sql = "UPDATE boletins SET
                aluno_id = :aluno_id,
                disciplina_id = :disciplina_id,
                nota1 = :nota1,
                nota2 = :nota2,
                nota3 = :nota3,
                nota4 = :nota4,
                media = :media,
                situacao = :situacao
            WHERE id = :id";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ":id" => $id,
        ":aluno_id" => $aluno_id,
        ":disciplina_id" => $disciplina_id,
        ":nota1" => $nota1,
        ":nota2" => $nota2,
        ":nota3" => $nota3,
        ":nota4" => $nota4,
        ":media" => $media,
        ":situacao" => $situacao
    ]);

    $verificar = $pdo->prepare(
        "SELECT id FROM boletins WHERE id = :id"
    );

    $verificar->execute([
        ":id" => $id
    ]);

    if (!$verificar->fetch()) {

        http_response_code(404);

        echo json_encode([
            "sucesso" => false,
            "mensagem" => "Boletim não encontrado."
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Boletim atualizado com sucesso!",
        "media" => round($media, 2),
        "situacao" => $situacao
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao editar boletim.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}