<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "conexao.php";

try {

    $dados = json_decode(file_get_contents("php://input"), true);

    $nome = trim($dados["nome"] ?? "");
    $descricao = trim($dados["descricao"] ?? "");
    $curso_id = $dados["curso_id"] ?? 0;

    if ($nome === "") {

        http_response_code(400);

        echo json_encode([
            "sucesso" => false,
            "mensagem" => "O nome da disciplina é obrigatório."
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    if ((int)$curso_id <= 0) {

        http_response_code(400);

        echo json_encode([
            "sucesso" => false,
            "mensagem" => "O curso é obrigatório."
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    $sql = "INSERT INTO disciplinas
            (nome, descricao, curso_id)
            VALUES
            (:nome, :descricao, :curso_id)";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ":nome" => $nome,
        ":descricao" => $descricao,
        ":curso_id" => $curso_id
    ]);

    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Disciplina cadastrada com sucesso!",
        "id" => $pdo->lastInsertId()
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao cadastrar disciplina.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}