<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "conexao.php";

try {

    if (!isset($_GET["id"]) || empty($_GET["id"])) {

        http_response_code(400);

        echo json_encode([
            "sucesso" => false,
            "mensagem" => "Informe o ID do coordenador."
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
            FROM coordenadores
            WHERE id = :id";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ":id" => $id
    ]);

    $coordenador = $stmt->fetch();

    if (!$coordenador) {

        http_response_code(404);

        echo json_encode([
            "sucesso" => false,
            "mensagem" => "Coordenador não encontrado."
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    echo json_encode([
        "sucesso" => true,
        "coordenador" => $coordenador
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao buscar coordenador.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}