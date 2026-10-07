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
    $sql = "INSERT INTO `nota` (`id_matricula`, `id_avaliacao`, `nota`) VALUES (?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $dados["id_matricula"] ?? null,
        $dados["id_avaliacao"] ?? null,
        $dados["nota"] ?? null
    ]);
    $id = $pdo->lastInsertId();

    $stmt = $pdo->prepare("SELECT * FROM `nota` WHERE `id_nota` = ?");
    $stmt->execute([$id]);
    $registro = $stmt->fetch();

    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Nota cadastrado com sucesso!",
        "nota" => $registro
    ], JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao cadastrar nota.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}

