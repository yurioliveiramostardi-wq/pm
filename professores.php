<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "conexao.php";

try {

    $sql = "SELECT
                id,
                nome,
                data_nascimento,
                cpf,
                telefone,
                email,
                endereco
            FROM professores
            ORDER BY id DESC";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    $professores = $stmt->fetchAll();

    echo json_encode([
        "sucesso" => true,
        "quantidade" => count($professores),
        "professores" => $professores
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao buscar professores.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}