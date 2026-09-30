<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "conexao.php";

try {

    $id = $_GET["id"] ?? 0;

    $sql = "SELECT 
                d.id,
                d.nome,
                d.descricao,
                d.curso_id,
                c.nome AS curso
            FROM disciplinas d
            LEFT JOIN cursos c ON d.curso_id = c.id
            WHERE d.id = :id";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ":id" => $id
    ]);

    $disciplina = $stmt->fetch();

    if (!$disciplina) {

        http_response_code(404);

        echo json_encode([
            "sucesso" => false,
            "mensagem" => "Disciplina não encontrada."
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    echo json_encode([
        "sucesso" => true,
        "disciplina" => $disciplina
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao buscar disciplina.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}