<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "conexao.php";

try {

    $dados = json_decode(file_get_contents("php://input"), true);

    if (!$dados) {

        http_response_code(400);

        echo json_encode([
            "sucesso" => false,
            "mensagem" => "Nenhum dado foi enviado."
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    $nome = trim($dados["nome"] ?? "");
    $data_nascimento = $dados["data_nascimento"] ?? null;
    $cpf = trim($dados["cpf"] ?? "");
    $telefone = trim($dados["telefone"] ?? "");
    $email = trim($dados["email"] ?? "");
    $endereco = trim($dados["endereco"] ?? "");

    if ($nome === "") {

        http_response_code(400);

        echo json_encode([
            "sucesso" => false,
            "mensagem" => "O nome do coordenador é obrigatório."
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    $sql = "INSERT INTO coordenadores
            (
                nome,
                data_nascimento,
                cpf,
                telefone,
                email,
                endereco
            )
            VALUES
            (
                :nome,
                :data_nascimento,
                :cpf,
                :telefone,
                :email,
                :endereco
            )";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ":nome" => $nome,
        ":data_nascimento" => $data_nascimento,
        ":cpf" => $cpf,
        ":telefone" => $telefone,
        ":email" => $email,
        ":endereco" => $endereco
    ]);

    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Coordenador cadastrado com sucesso!",
        "id" => $pdo->lastInsertId()
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao cadastrar coordenador.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}