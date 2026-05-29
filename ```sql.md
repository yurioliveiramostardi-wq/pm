```sql
CREATE DATABASE gestao_escolar;
USE gestao_escolar;

CREATE TABLE aluno (
    id_aluno INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    data_nascimento DATE NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(100),
    endereco VARCHAR(200)
);

CREATE TABLE responsavel (
    id_responsavel INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    parentesco VARCHAR(50)
);

CREATE TABLE aluno_responsavel (
    id_aluno INT,
    id_responsavel INT,
    PRIMARY KEY (id_aluno, id_responsavel),
    FOREIGN KEY (id_aluno) REFERENCES aluno(id_aluno),
    FOREIGN KEY (id_responsavel) REFERENCES responsavel(id_responsavel)
);

CREATE TABLE professor (
    id_professor INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    formacao VARCHAR(100),
    email VARCHAR(100),
    telefone VARCHAR(20)
);

CREATE TABLE coordenador (
    id_coordenador INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    formacao VARCHAR(100),
    email VARCHAR(100),
    telefone VARCHAR(20)
);

CREATE TABLE curso (
    id_curso INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    carga_horaria INT,
    duracao VARCHAR(50),
    descricao TEXT,
    id_coordenador INT,
    FOREIGN KEY (id_coordenador)
        REFERENCES coordenador(id_coordenador)
);

CREATE TABLE turma (
    id_turma INT AUTO_INCREMENT PRIMARY KEY,
    id_curso INT,
    ano_letivo YEAR,
    turno VARCHAR(20),
    sala VARCHAR(20),
    FOREIGN KEY (id_curso)
        REFERENCES curso(id_curso)
);

CREATE TABLE disciplina (
    id_disciplina INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    carga_horaria INT,
    id_curso INT,
    id_professor INT,
    FOREIGN KEY (id_curso)
        REFERENCES curso(id_curso),
    FOREIGN KEY (id_professor)
        REFERENCES professor(id_professor)
);

CREATE TABLE matricula (
    id_matricula INT AUTO_INCREMENT PRIMARY KEY,
    id_aluno INT,
    id_turma INT,
    data_matricula DATE,
    situacao VARCHAR(30),
    FOREIGN KEY (id_aluno)
        REFERENCES aluno(id_aluno),
    FOREIGN KEY (id_turma)
        REFERENCES turma(id_turma)
);

CREATE TABLE avaliacao (
    id_avaliacao INT AUTO_INCREMENT PRIMARY KEY,
    id_disciplina INT,
    descricao VARCHAR(100),
    data_avaliacao DATE,
    valor DECIMAL(5,2),
    FOREIGN KEY (id_disciplina)
        REFERENCES disciplina(id_disciplina)
);

CREATE TABLE nota (
    id_nota INT AUTO_INCREMENT PRIMARY KEY,
    id_matricula INT,
    id_avaliacao INT,
    nota DECIMAL(4,2),
    FOREIGN KEY (id_matricula)
        REFERENCES matricula(id_matricula),
    FOREIGN KEY (id_avaliacao)
        REFERENCES avaliacao(id_avaliacao)
);

CREATE TABLE frequencia (
    id_frequencia INT AUTO_INCREMENT PRIMARY KEY,
    id_matricula INT UNIQUE,
    percentual_frequencia DECIMAL(5,2),
    FOREIGN KEY (id_matricula)
        REFERENCES matricula(id_matricula)
);

CREATE TABLE boletim (
    id_boletim INT AUTO_INCREMENT PRIMARY KEY,
    id_matricula INT UNIQUE,
    media_final DECIMAL(4,2),
    situacao_final VARCHAR(30),
    frequencia_final DECIMAL(5,2),
    FOREIGN KEY (id_matricula)
        REFERENCES matricula(id_matricula)
);
```
