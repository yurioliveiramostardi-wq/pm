<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "conexao.php";

try {

    $sql = "SELECT 
                d.id,
                d.nome,
                d.descricao,
                d.curso_id,
                c.nome AS curso
            FROM disciplinas d
            LEFT JOIN cursos c ON d.curso_id = c.id
            ORDER BY d.id DESC";

    $stmt = $pdo->query($sql);

    $disciplinas = $stmt->fetchAll();

    echo json_encode([
        "sucesso" => true,
        "disciplinas" => $disciplinas
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao buscar disciplinas.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}