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
    $sql = "INSERT INTO `avaliacao` (`id_disciplina`, `descricao`, `data_avaliacao`, `valor`) VALUES (?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $dados["id_disciplina"] ?? null,
        $dados["descricao"] ?? null,
        $dados["data_avaliacao"] ?? null,
        $dados["valor"] ?? null
    ]);
    $id = $pdo->lastInsertId();

    $stmt = $pdo->prepare("SELECT * FROM `avaliacao` WHERE `id_avaliacao` = ?");
    $stmt->execute([$id]);
    $registro = $stmt->fetch();

    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Avaliacao cadastrado com sucesso!",
        "avaliacao" => $registro
    ], JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao cadastrar avaliacao.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}