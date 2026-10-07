<?php
header("Content-Type: application/json; charset=UTF-8");
require_once "conexao.php";

if ($_SERVER["REQUEST_METHOD"] !== "DELETE" && $_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
echo json_encode([
    "sucesso" => false,
    "mensagem" => "Use DELETE ou POST."
], JSON_UNESCAPED_UNICODE);
exit;
}

$dados = json_decode(file_get_contents("php://input"), true);
$id = null;

if (is_array($dados) && isset($dados["id_avaliacao"])) {
    $id = $dados["id_avaliacao"];
}

if ($id === null && isset($_GET["id"])) {
    $id = $_GET["id"];
}

if ($id === null || !is_numeric($id)) {
    http_response_code(400);
echo json_encode([
    "sucesso" => false,
    "mensagem" => "Informe um ID válido."
], JSON_UNESCAPED_UNICODE);
exit;
}

$id = intval($id);

try {
    $stmt = $pdo->prepare("SELECT `id_avaliacao` FROM `avaliacao` WHERE `id_avaliacao` = ?");
    $stmt->execute([$id]);

    if (!$stmt->fetch()) {
        http_response_code(404);
echo json_encode([
    "sucesso" => false,
    "mensagem" => "Avaliacao não encontrado."
], JSON_UNESCAPED_UNICODE);
exit;
    }

    $stmt = $pdo->prepare("DELETE FROM `avaliacao` WHERE `id_avaliacao` = ?");
    $stmt->execute([$id]);

    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Avaliacao excluído com sucesso!"
    ], JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    http_response_code(409);
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Não foi possível excluir avaliacao. O registro pode estar sendo utilizado por outra tabela.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
