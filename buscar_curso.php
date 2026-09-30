<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "conexao.php";

try {

    $id = $_GET["id"] ?? 0;

    if ((int)$id <= 0) {
        http_response_code(400);

        echo json_encode([
            "sucesso" => false,
            "mensagem" => "ID do curso inválido."
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    $sql = "SELECT * FROM cursos WHERE id = :id";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ":id" => $id
    ]);

    $curso = $stmt->fetch();

    if (!$curso) {
        http_response_code(404);

        echo json_encode([
            "sucesso" => false,
            "mensagem" => "Curso não encontrado."
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    echo json_encode([
        "sucesso" => true,
        "curso" => $curso
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao buscar curso.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}