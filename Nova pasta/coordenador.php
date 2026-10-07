
<?php
header("Content-Type: application/json; charset=UTF-8");
require_once "conexao.php";

try {
    $sql = "SELECT
            id_coordenador,
            nome,
            cpf,
            formacao,
            email,
            telefone
        FROM `coordenador`
        ORDER BY `id_coordenador` DESC";
    $stmt = $pdo->query($sql);
    $registros = $stmt->fetchAll();
    echo json_encode([
        "sucesso" => true,
        "total" => count($registros),
        "coordenadors" => $registros
    ], JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao listar coordenadors.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}

