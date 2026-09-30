<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "conexao.php";

try {

    if (!isset($_GET["id"]) || empty($_GET["id"])) {

        http_response_code(400);

        echo json_encode([
            "sucesso" => false,
            "mensagem" => "Informe o ID do boletim."
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    $id = intval($_GET["id"]);

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
            WHERE b.id = :id";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ":id" => $id
    ]);

    $boletim = $stmt->fetch();

    if (!$boletim) {

        http_response_code(404);

        echo json_encode([
            "sucesso" => false,
            "mensagem" => "Boletim não encontrado."
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    echo json_encode([
        "sucesso" => true,
        "boletim" => $boletim
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao buscar boletim.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}