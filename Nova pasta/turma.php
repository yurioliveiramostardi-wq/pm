<?php
header("Content-Type: application/json; charset=UTF-8");
require_once "conexao.php";

try {
    $sql = "SELECT
            id_turma,
            id_curso,
            ano_letivo,
            turno,
            sala
        FROM `turma`
        ORDER BY `id_turma` DESC";
    $stmt = $pdo->query($sql);
    $registros = $stmt->fetchAll();
    echo json_encode([
        "sucesso" => true,
        "total" => count($registros),
        "turmas" => $registros
    ], JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao listar turmas.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
