<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "conexao.php";

try {

    $sql = "SELECT
                f.id,
                f.aluno_id,
                a.nome AS aluno,
                f.disciplina_id,
                d.nome AS disciplina,
                f.data,
                f.presente
            FROM frequencias f
            LEFT JOIN alunos a ON f.aluno_id = a.id
            LEFT JOIN disciplinas d ON f.disciplina_id = d.id
            ORDER BY f.data DESC";

    $stmt = $pdo->query($sql);

    $frequencias = $stmt->fetchAll();

    echo json_encode([
        "sucesso" => true,
        "frequencias" => $frequencias
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao buscar frequências.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}