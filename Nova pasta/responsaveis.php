<?php
header("Content-Type: application/json; charset=UTF-8");
require_once "conexao.php";

try {
    $sql = "SELECT
            id_responsavel,
            nome,
            cpf,
            telefone,
            parentesco
        FROM `responsavel`
        ORDER BY `id_responsavel` DESC";
    $stmt = $pdo->query($sql);
    $registros = $stmt->fetchAll();
    echo json_encode([
        "sucesso" => true,
        "total" => count($registros),
        "responsavels" => $registros
    ], JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao listar responsavels.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
