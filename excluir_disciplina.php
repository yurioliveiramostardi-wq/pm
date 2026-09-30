<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "conexao.php";

try {

    $dados = json_decode(file_get_contents("php://input"), true);

    $id = $dados["id"] ?? 0;

    if ((int)$id <= 0) {

        http_response_code(400);

        echo json_encode([
            "sucesso" => false,
            "mensagem" => "ID inválido."
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    $sql = "DELETE FROM disciplinas WHERE id = :id";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ":id" => $id
    ]);

    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Disciplina excluída com sucesso!"
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao excluir disciplina.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}