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
    $sql = "INSERT INTO `turma` (`id_curso`, `ano_letivo`, `turno`, `sala`) VALUES (?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $dados["id_curso"] ?? null,
        $dados["ano_letivo"] ?? null,
        $dados["turno"] ?? null,
        $dados["sala"] ?? null
    ]);
    $id = $pdo->lastInsertId();

    $stmt = $pdo->prepare("SELECT * FROM `turma` WHERE `id_turma` = ?");
    $stmt->execute([$id]);
    $registro = $stmt->fetch();

    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Turma cadastrado com sucesso!",
        "turma" => $registro
    ], JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao cadastrar turma.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}