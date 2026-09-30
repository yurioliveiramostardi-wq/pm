<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "conexao.php";

try {

    if (!isset($_GET["id"]) || empty($_GET["id"])) {

        http_response_code(400);

        echo json_encode([
            "sucesso" => false,
            "mensagem" => "Informe o ID do professor."
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    $id = intval($_GET["id"]);

    $sql = "SELECT
                id,
                nome,
                data_nascimento,
                cpf,
                telefone,
                email,
                endereco
            FROM professores
            WHERE id = :id";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ":id" => $id
    ]);

    $professor = $stmt->fetch();

    if (!$professor) {

        http_response_code(404);

        echo json_encode([
            "sucesso" => false,
            "mensagem" => "Professor não encontrado."
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    echo json_encode([
        "sucesso" => true,
        "professor" => $professor
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao buscar professor.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}