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

try {
    $sql = "INSERT INTO `disciplina` (`nome`, `carga_horaria`, `id_curso`, `id_professor`) VALUES (?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $dados["nome"] ?? null,
        $dados["carga_horaria"] ?? null,
        $dados["id_curso"] ?? null,
        $dados["id_professor"] ?? null
    ]);
    $id = $pdo->lastInsertId();

    $stmt = $pdo->prepare("SELECT * FROM `disciplina` WHERE `id_disciplina` = ?");
    $stmt->execute([$id]);
    $registro = $stmt->fetch();

    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Disciplina cadastrado com sucesso!",
        "disciplina" => $registro
    ], JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao cadastrar disciplina.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}

