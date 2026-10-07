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

    if (!isset($dados["nome"]) || trim((string)$dados["nome"]) === "") {
        http_response_code(400);
echo json_encode([
    "sucesso" => false,
    "mensagem" => "O campo nome é obrigatório."
], JSON_UNESCAPED_UNICODE);
exit;
    }

    if (!isset($dados["cpf"]) || trim((string)$dados["cpf"]) === "") {
        http_response_code(400);
echo json_encode([
    "sucesso" => false,
    "mensagem" => "O campo cpf é obrigatório."
], JSON_UNESCAPED_UNICODE);
exit;
    }

try {
    $sql = "INSERT INTO `professor` (`nome`, `cpf`, `formacao`, `email`, `telefone`) VALUES (?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $dados["nome"] ?? null,
        $dados["cpf"] ?? null,
        $dados["formacao"] ?? null,
        $dados["email"] ?? null,
        $dados["telefone"] ?? null
    ]);
    $id = $pdo->lastInsertId();

    $stmt = $pdo->prepare("SELECT * FROM `professor` WHERE `id_professor` = ?");
    $stmt->execute([$id]);
    $registro = $stmt->fetch();

    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Professor cadastrado com sucesso!",
        "professor" => $registro
    ], JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao cadastrar professor.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
