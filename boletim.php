<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "conexao.php";

try {

    $sql = "SELECT
                b.id,
                b.aluno_id,
                a.nome AS aluno,
                b.disciplina_id,
                d.nome AS disciplina,
                b.nota1,
                b.nota2,
                b.nota3,
                b.nota4,
                b.media,
                b.situacao
            FROM boletins b
            INNER JOIN alunos a ON b.aluno_id = a.id
            INNER JOIN disciplinas d ON b.disciplina_id = d.id
            ORDER BY b.id DESC";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    $boletins = $stmt->fetchAll();

    echo json_encode([
        "sucesso" => true,
        "quantidade" => count($boletins),
        "boletins" => $boletins
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao buscar boletins.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}