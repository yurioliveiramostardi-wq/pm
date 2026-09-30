<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "conexao.php";

try {

    $id = $_GET["id"] ?? 0;

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
            WHERE f.id = :id";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ":id" => $id
    ]);

    $frequencia = $stmt->fetch();

    if (!$frequencia) {

        http_response_code(404);

        echo json_encode([
            "sucesso" => false,
            "mensagem" => "Frequência não encontrada."
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    echo json_encode([
        "sucesso" => true,
        "frequencia" => $frequencia
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao buscar frequência.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}