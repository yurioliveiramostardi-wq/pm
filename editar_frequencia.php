<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "conexao.php";

try {

    $dados = json_decode(file_get_contents("php://input"), true);

    $id = $dados["id"] ?? 0;
    $aluno_id = $dados["aluno_id"] ?? 0;
    $disciplina_id = $dados["disciplina_id"] ?? 0;
    $data = $dados["data"] ?? "";
    $presente = $dados["presente"] ?? 0;

    if (
        (int)$id <= 0 ||
        (int)$aluno_id <= 0 ||
        (int)$disciplina_id <= 0 ||
        $data === ""
    ) {

        http_response_code(400);

        echo json_encode([
            "sucesso" => false,
            "mensagem" => "Dados inválidos."
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    $sql = "UPDATE frequencias SET
            aluno_id = :aluno_id,
            disciplina_id = :disciplina_id,
            data = :data,
            presente = :presente
            WHERE id = :id";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ":aluno_id" => $aluno_id,
        ":disciplina_id" => $disciplina_id,
        ":data" => $data,
        ":presente" => $presente ? 1 : 0,
        ":id" => $id
    ]);

    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Frequência atualizada com sucesso!"
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao editar frequência.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}