<?php

header("Content-Type: application/json; charset=UTF-8");

$host = "localhost";
$banco = "bd_escola2";
$usuario = "root";
$senha = "";

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$banco;charset=utf8mb4",
        $usuario,
        $senha,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ]
    );
echo"conexao ok";
    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Conexão com o banco realizada com sucesso!"
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao conectar ao banco de dados.",
        "erro" => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);

    exit;
}
?>