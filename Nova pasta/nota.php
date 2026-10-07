<?php
header("Content-Type: application/json; charset=UTF-8");
require_once "conexao.php";

try {
    $sql = "SELECT
            id_nota,
            id_matricula,
            id_avaliacao,
            nota
        FROM `nota`
        ORDER BY `id_nota` DESC";
    $stmt = $pdo->query($sql);
    $registros = $stmt->fetchAll();
    echo json_encode([
        "sucesso" => true,
        "total" => count($registros),
        "notas" => $registros
    ], JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao listar notas.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}

