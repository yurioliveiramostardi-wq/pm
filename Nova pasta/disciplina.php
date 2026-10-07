<?php
header("Content-Type: application/json; charset=UTF-8");
require_once "conexao.php";

try {
    $sql = "SELECT
            id_disciplina,
            nome,
            carga_horaria,
            id_curso,
            id_professor
        FROM `disciplina`
        ORDER BY `id_disciplina` DESC";
    $stmt = $pdo->query($sql);
    $registros = $stmt->fetchAll();
    echo json_encode([
        "sucesso" => true,
        "total" => count($registros),
        "disciplinas" => $registros
    ], JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao listar disciplinas.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}

