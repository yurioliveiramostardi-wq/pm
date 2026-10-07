<?php
header("Content-Type: application/json; charset=UTF-8");
require_once "conexao.php";

try {
    $sql = "SELECT
            id_curso,
            nome,
            carga_horaria,
            duracao,
            descricao,
            id_coordenador
        FROM `curso`
        ORDER BY `id_curso` DESC";
    $stmt = $pdo->query($sql);
    $registros = $stmt->fetchAll();
    echo json_encode([
        "sucesso" => true,
        "total" => count($registros),
        "cursos" => $registros
    ], JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao listar cursos.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}