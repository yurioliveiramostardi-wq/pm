<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "conexao.php";

try {

    $sql = "SELECT * FROM cursos ORDER BY id DESC";

    $stmt = $pdo->query($sql);

    $cursos = $stmt->fetchAll();

    echo json_encode([
        "sucesso" => true,
        "cursos" => $cursos
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao buscar cursos.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}