<?php
header("Content-Type: application/json; charset=UTF-8");
require_once "conexao.php";

try {
    $sql = "SELECT
            id_boletim,
            id_matricula,
            media_final,
            situacao_final,
            frequencia_final
        FROM `boletim`
        ORDER BY `id_boletim` DESC";
    $stmt = $pdo->query($sql);
    $registros = $stmt->fetchAll();
    echo json_encode([
        "sucesso" => true,
        "total" => count($registros),
        "boletims" => $registros
    ], JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao listar boletims.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}