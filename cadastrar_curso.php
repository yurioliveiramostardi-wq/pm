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

    $nome = trim($dados["nome"] ?? "");
    $descricao = trim($dados["descricao"] ?? "");
    $duracao = $dados["duracao"] ?? "";

    if ($nome === "") {
        http_response_code(400);

        echo json_encode([
            "sucesso" => false,
            "mensagem" => "O nome do curso é obrigatório."
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    $sql = "INSERT INTO cursos 
            (nome, descricao, duracao)
            VALUES 
            (:nome, :descricao, :duracao)";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ":nome" => $nome,
        ":descricao" => $descricao,
        ":duracao" => $duracao
    ]);

    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Curso cadastrado com sucesso!",
        "id" => $pdo->lastInsertId()
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao cadastrar curso.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}