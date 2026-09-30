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

    if ($id <= 0) {

        http_response_code(400);

        echo json_encode([
            "sucesso" => false,
            "mensagem" => "ID do aluno inválido."
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    // Verifica se o aluno existe
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

    // Exclui o aluno
    $sql = "DELETE FROM alunos WHERE id = :id";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ":id" => $id
    ]);

    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Aluno excluído com sucesso!"
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao excluir aluno.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}