<?php
header("Content-Type: application/json; charset=UTF-8");
require_once "conexao.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
echo json_encode([
    "sucesso" => false,
    "mensagem" => "Método não permitido. Use POST."
], JSON_UNESCAPED_UNICODE);
exit;
}

$dados = json_decode(file_get_contents("php://input"), true);

if (!is_array($dados)) {
    http_response_code(400);
echo json_encode([
    "sucesso" => false,
    "mensagem" => "Envie os dados em JSON."
], JSON_UNESCAPED_UNICODE);
exit;
}

try {
    $sql = "INSERT INTO `frequencia` (`id_matricula`, `percentual_frequencia`) VALUES (?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $dados["id_matricula"] ?? null,
        $dados["percentual_frequencia"] ?? null
    ]);
    $id = $pdo->lastInsertId();

    $stmt = $pdo->prepare("SELECT * FROM `frequencia` WHERE `id_frequencia` = ?");
    $stmt->execute([$id]);
    $registro = $stmt->fetch();

    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Frequencia cadastrado com sucesso!",
        "frequencia" => $registro
    ], JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao cadastrar frequencia.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}