<?php
header("Content-Type: application/json; charset=UTF-8");
require_once "conexao.php";

try {
    $sql = "SELECT
            id_avaliacao,
            id_disciplina,
            descricao,
            data_avaliacao,
            valor
        FROM `avaliacao`
        ORDER BY `id_avaliacao` DESC";
    $stmt = $pdo->query($sql);
    $registros = $stmt->fetchAll();
    echo json_encode([
        "sucesso" => true,
        "total" => count($registros),
        "avaliacaos" => $registros
    ], JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao listar avaliacaos.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}