<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "conexao.php";

try {

    $dados = json_decode(file_get_contents("php://input"), true);

    $id = $dados["id"] ?? 0;
    $nome = trim($dados["nome"] ?? "");
    $descricao = trim($dados["descricao"] ?? "");
    $curso_id = $dados["curso_id"] ?? 0;

    if ((int)$id <= 0 || $nome === "" || (int)$curso_id <= 0) {

        http_response_code(400);

        echo json_encode([
            "sucesso" => false,
            "mensagem" => "Dados inválidos."
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    $sql = "UPDATE disciplinas SET
            nome = :nome,
            descricao = :descricao,
            curso_id = :curso_id
            WHERE id = :id";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ":nome" => $nome,
        ":descricao" => $descricao,
        ":curso_id" => $curso_id,
        ":id" => $id
    ]);

    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Disciplina atualizada com sucesso!"
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao editar disciplina.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}