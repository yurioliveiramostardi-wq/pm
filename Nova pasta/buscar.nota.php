<?php
header("Content-Type: application/json; charset=UTF-8");
require_once "conexao.php";

if (!isset($_GET["id"]) || !is_numeric($_GET["id"])) {
    http_response_code(400);
echo json_encode([
    "sucesso" => false,
    "mensagem" => "Informe um ID válido."
], JSON_UNESCAPED_UNICODE);
exit;
}

$id = intval($_GET["id"]);

try {
    $stmt = $pdo->prepare("SELECT * FROM `nota` WHERE `id_nota` = ? LIMIT 1");
    $stmt->execute([$id]);
    $registro = $stmt->fetch();

    if (!$registro) {
        http_response_code(404);
echo json_encode([
    "sucesso" => false,
    "mensagem" => "Nota não encontrado."
], JSON_UNESCAPED_UNICODE);
exit;
    }

    echo json_encode([
        "sucesso" => true,
        "nota" => $registro
    ], JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao buscar nota.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
