<?php
header("Content-Type: application/json; charset=UTF-8");
require_once "conexao.php";

try {
    $sql = "SELECT
            id_aluno,
            nome,
            data_nascimento,
            cpf,
            telefone,
            email,
            endereco
        FROM `aluno`
        ORDER BY `id_aluno` DESC";
    $stmt = $pdo->query($sql);
    $registros = $stmt->fetchAll();
    echo json_encode([
        "sucesso" => true,
        "total" => count($registros),
        "alunos" => $registros
    ], JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao listar alunos.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
