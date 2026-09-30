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

    $id = intval($dados["id"] ?? 0);

    $nome = trim($dados["nome"] ?? "");
    $data_nascimento = $dados["data_nascimento"] ?? null;
    $cpf = trim($dados["cpf"] ?? "");
    $telefone = trim($dados["telefone"] ?? "");
    $email = trim($dados["email"] ?? "");
    $endereco = trim($dados["endereco"] ?? "");

    if ($id <= 0) {

        http_response_code(400);

        echo json_encode([
            "sucesso" => false,
            "mensagem" => "ID do aluno inválido."
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    if ($nome === "") {

        http_response_code(400);

        echo json_encode([
            "sucesso" => false,
            "mensagem" => "O nome do aluno é obrigatório."
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    $sql = "UPDATE alunos SET
                nome = :nome,
                data_nascimento = :data_nascimento,
                cpf = :cpf,
                telefone = :telefone,
                email = :email,
                endereco = :endereco
            WHERE id = :id";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ":id" => $id,
        ":nome" => $nome,
        ":data_nascimento" => $data_nascimento,
        ":cpf" => $cpf,
        ":telefone" => $telefone,
        ":email" => $email,
        ":endereco" => $endereco
    ]);

    if ($stmt->rowCount() === 0) {

        $verificar = $pdo->prepare(
            "SELECT id FROM alunos WHERE id = :id"
        );

        $verificar->execute([
            ":id" => $id
        ]);

        if (!$verificar->fetch()) {

            http_response_code(404);

            echo json_encode([
                "sucesso" => false,
                "mensagem" => "Aluno não encontrado."
            ], JSON_UNESCAPED_UNICODE);

            exit;
        }
    }

    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Aluno atualizado com sucesso!"
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao editar aluno.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}