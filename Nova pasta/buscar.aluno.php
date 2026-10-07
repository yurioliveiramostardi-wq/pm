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
    $stmt = $pdo->prepare("SELECT * FROM `aluno` WHERE `id_aluno` = ? LIMIT 1");
    $stmt->execute([$id]);
    $registro = $stmt->fetch();

    if (!$registro) {
        http_response_code(404);
echo json_encode([
    "sucesso" => false,
    "mensagem" => "Aluno não encontrado."
], JSON_UNESCAPED_UNICODE);
exit;
    }

    echo json_encode([
        "sucesso" => true,
        "aluno" => $registro
    ], JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao buscar aluno.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}


=== editar_aluno.php ===

<?php
header("Content-Type: application/json; charset=UTF-8");
require_once "conexao.php";

if ($_SERVER["REQUEST_METHOD"] !== "PUT" && $_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
echo json_encode([
    "sucesso" => false,
    "mensagem" => "Use PUT ou POST."
], JSON_UNESCAPED_UNICODE);
exit;
}

$dados = json_decode(file_get_contents("php://input"), true);

if (!is_array($dados) || !isset($dados["id_aluno"]) || !is_numeric($dados["id_aluno"])) {
    http_response_code(400);
echo json_encode([
    "sucesso" => false,
    "mensagem" => "Informe os dados em JSON e o ID do registro."
], JSON_UNESCAPED_UNICODE);
exit;
}

$id = intval($dados["id_aluno"]);

    if (!isset($dados["nome"]) || trim((string)$dados["nome"]) === "") {
        http_response_code(400);
echo json_encode([
    "sucesso" => false,
    "mensagem" => "O campo nome é obrigatório."
], JSON_UNESCAPED_UNICODE);
exit;
    }

    if (!isset($dados["data_nascimento"]) || trim((string)$dados["data_nascimento"]) === "") {
        http_response_code(400);
echo json_encode([
    "sucesso" => false,
    "mensagem" => "O campo data_nascimento é obrigatório."
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
    $stmt = $pdo->prepare("SELECT `id_aluno` FROM `aluno` WHERE `id_aluno` = ?");
    $stmt->execute([$id]);

    if (!$stmt->fetch()) {
        http_response_code(404);
echo json_encode([
    "sucesso" => false,
    "mensagem" => "Aluno não encontrado."
], JSON_UNESCAPED_UNICODE);
exit;
    }

    $sql = "UPDATE `aluno` SET
            `nome` = ?,
            `data_nascimento` = ?,
            `cpf` = ?,
            `telefone` = ?,
            `email` = ?,
            `endereco` = ?
            WHERE `id_aluno` = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $dados["nome"] ?? null,
        $dados["data_nascimento"] ?? null,
        $dados["cpf"] ?? null,
        $dados["telefone"] ?? null,
        $dados["email"] ?? null,
        $dados["endereco"] ?? null,
        $id
    ]);

    $stmt = $pdo->prepare("SELECT * FROM `aluno` WHERE `id_aluno` = ?");
    $stmt->execute([$id]);
    $registro = $stmt->fetch();

    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Aluno atualizado com sucesso!",
        "aluno" => $registro
    ], JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao editar aluno.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}