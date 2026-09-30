<?php

require_once "conexao.php";

try {

    $sql = "
        SELECT
            id_aluno,
            nome,
            data_nascimento,
            cpf,
            telefone,
            email,
            endereco
        FROM aluno
        ORDER BY nome ASC
    ";

    $stmt = $pdo->query($sql);

    $alunos = $stmt->fetchAll();

    echo json_encode([
        "sucesso" => true,
        "total" => count($alunos),
        "alunos" => $alunos
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao buscar alunos.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}