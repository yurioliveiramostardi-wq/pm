<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "conexao.php";

try {

    $dados = json_decode(file_get_contents("php://input"), true);

    $id = $dados["id"] ?? 0;
    $nome = trim($dados["nome"] ?? "");
    $descricao = trim($dados["descricao"] ?? "");
    $duracao = $dados["duracao"] ?? "";

    if ((int)$id <= 0) {

        http_response_code(400);

        echo json_encode([
            "sucesso" => false,
            "mensagem" => "ID do curso inválido."
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    if ($nome === "") {

        http_response_code(400);

        echo json_encode([
            "sucesso" => false,
            "mensagem" => "O nome do curso é obrigatório."
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    $sql = "UPDATE cursos SET
            nome = :nome,
            descricao = :descricao,
            duracao = :duracao
            WHERE id = :id";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ":nome" => $nome,
        ":descricao" => $descricao,
        ":duracao" => $duracao,
        ":id" => $id
    ]);

    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Curso atualizado com sucesso!"
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao editar curso.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}