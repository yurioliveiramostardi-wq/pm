<?php
header("Content-Type: application/json; charset=UTF-8");
require_once "conexao.php";

try {
    $sql = "SELECT
            id_professor,
            nome,
            cpf,
            formacao,
            email,
            telefone
        FROM `professor`
        ORDER BY `id_professor` DESC";
    $stmt = $pdo->query($sql);
    $registros = $stmt->fetchAll();
    echo json_encode([
        "sucesso" => true,
        "total" => count($registros),
        "professors" => $registros
    ], JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao listar professors.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}