import React, {
  createContext,
  useState,
  useContext,
  useEffect
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Alert,
  ActivityIndicator
} from 'react-native';

import {
  NavigationContainer
} from '@react-navigation/native';

import {
  createNativeStackNavigator
} from '@react-navigation/native-stack';

import {
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs';

import {
  Ionicons
} from '@expo/vector-icons';



export const ScholarContext = createContext();


// ==========================================================
// CONFIGURAÇÃO DA API
// ==========================================================
//
// IMPORTANTE:
// Troque o IP abaixo pelo IP do computador onde está
// instalado o XAMPP.
//
// Exemplo:
// http://192.168.0.105/app_scholar_api


const API_URL =
  'http://localhost/phpmyadmin/index.php?route=/database/structure&db=bd_escola2';



const alunosTurma1 = [
  'Lucas Almeida',
  'Marcos Vinícius Rocha',
  'Beatriz Monteiro',
  'Gabriel Ferreira',
  'Amanda Ribeiro',
  'Rafael Cardoso',
  'Juliana Martins',
  'Pedro Henrique Souza',
  'Camila Oliveira',
  'Matheus Pereira',
  'Larissa Mendes',
  'Felipe Costa',
  'Isabela Rodrigues',
  'Gustavo Barbosa',
  'Mariana Lopes',
  'Diego Fernandes',
  'Sofia Carvalho',
  'Bruno Nascimento',
  'Ana Beatriz Lima',
  'Leonardo Teixeira',
  'Letícia Moreira',
  'Caio Martins',
  'Vitória Alves',
  'Henrique Gomes',
  'Manuela Castro',
  'João Victor Santos',
  'Clara Azevedo',
  'Nicolas Duarte',
  'Laura Freitas',
  'Enzo Martins'
].map((nome, index) => ({
  id: `t1_${index + 1}`,
  nome,
  ra: `202410${String(index + 1).padStart(2, '0')}`,
  curso: 'Logistica',
  turma: '1º Módulo A',
  status: 'A'
}));


const alunosTurma2 = [
  'Arthur Mendes',
  'Bianca Ferreira',
  'Carlos Eduardo Silva',
  'Daniela Martins',
  'Eduardo Lima',
  'Fernanda Costa',
  'Guilherme Rocha',
  'Helena Souza',
  'Igor Almeida',
  'Júlia Fernandes',
  'Kevin Rodrigues',
  'Luana Barbosa',
  'Miguel Cardoso',
  'Natália Pereira',
  'Otávio Monteiro',
  'Paula Ribeiro',
  'Renan Oliveira',
  'Sara Carvalho',
  'Thiago Mendes',
  'Valentina Lopes',
  'Wesley Santos',
  'Yasmin Castro',
  'Alexandre Moreira',
  'Bruna Azevedo',
  'Cauã Freitas',
  'Débora Teixeira',
  'Erick Nascimento',
  'Flávia Duarte',
  'Henrique Alves',
  'Nicole Gomes'
].map((nome, index) => ({
  id: `t2_${index + 1}`,
  nome,
  ra: `202420${String(index + 1).padStart(2, '0')}`,
  curso: 'Desenvolvimento de Sistemas',
  turma: '2º Módulo A',
  status: 'A'
}));


const alunosIniciais = [
  ...alunosTurma1,
  ...alunosTurma2
];


const fetchComTimeout = async (
  url,
  options = {},
  timeout = 4000
) => {

  const controller = new AbortController();

  const timer = setTimeout(() => {
    controller.abort();
  }, timeout);

  try {

    return await fetch(url, {
      ...options,
      signal: controller.signal
    });

  } finally {

    clearTimeout(timer);

  }
};

export const ScholarProvider = ({
  children
}) => {



  const [alunos, setAlunos] = useState(
    alunosIniciais
  );

  const [
    carregandoAlunos,
    setCarregandoAlunos
  ] = useState(false);

  const [professores, setProfessores] = useState([
    {
      id: '1',
      nome: 'Carlos Eduardo Lima',
      email: 'carlos@escola.com.br',
      telefone: '(12) 99888-1111',
      cpf: '111.222.333-44',
      endereco: 'Rua das Flores, 123',
      departamento: 'Exatas',
      formacao: 'Ciência da Computação',
      observacoes:
        'Disponível no período matutino'
    }
  ]);


  
  const [
    coordenadores,
    setCoordenadores
  ] = useState([
    {
      id: '1',
      nome: 'Mariana Duarte',
      email: 'mariana@escola.com.br',
      telefone: '(12) 98765-4321',
      cpf: '555.666.777-88',
      endereco: 'Av. Central, 456',
      departamento: 'Pedagógico',
      formacao: 'Pedagogia',
      observacoes: 'Coordenadora Geral'
    }
  ]);



  const [
    responsaveis,
    setResponsaveis
  ] = useState([
    {
      id: '1',
      nome: 'Roberto Souza',
      email: 'roberto@gmail.com',
      telefone: '(12) 99111-2222',
      cpf: '999.888.777-66',
      endereco: 'Rua São José, 78'
    }
  ]);



  const [
    matriculas,
    setMatriculas
  ] = useState([
    {
      id: '1',
      numero: '20240001',
      aluno: 'Ana Clara Souza',
      curso: 'Logistica',
      turma: '1º Módulo A'
    }
  ]);



  const [turmas, setTurmas] = useState([
    {
      id: '1',
      nome: '1º Módulo A',
      curso: 'Logistica',
      periodo: 'Manhã',
      ano: '2024',
      status: 'A'
    },
    {
      id: '2',
      nome: '2º Módulo A',
      curso: 'Desenvolvimento de Sistemas',
      periodo: 'Tarde',
      ano: '2024',
      status: 'A'
    }
  ]);



  const [cursos, setCursos] = useState([
    {
      id: '1',
      nome: 'Logistica',
      area: 'Logistica',
      duracao: '3 anos',
      status: 'A'
    },
    {
      id: '2',
      nome: 'Desenvolvimento de Sistemas',
      area: 'Tecnologia da Informação',
      duracao: '3 anos',
      status: 'A'
    }
  ]);



  const [
    disciplinas,
    setDisciplinas
  ] = useState([
    {
      id: '1',
      nome: 'Lógica de Programação',
      codigo: 'LOG101',
      cargaHoraria: '80h',
      status: 'A'
    },
    {
      id: '2',
      nome: 'Banco de Dados I',
      codigo: 'BD101',
      cargaHoraria: '60h',
      status: 'A'
    }
  ]);



  const [
    avaliacoes,
    setAvaliacoes
  ] = useState([
    {
      id: '1',
      alunoId: 't1_1',
      aluno: 'Lucas Almeida',
      titulo: 'Prova 1 - Lógica',
      disciplina: 'Lógica de Programação',
      nota: '8.5',
      tipo: 'Prova',
      data: '15/10/2024'
    }
  ]);


  const [
    boletins,
    setBoletins
  ] = useState([
    {
      id: '1',
      aluno: 'Lucas Almeida',
      disciplina: 'Lógica de Programação',
      nota: '8.5'
    }
  ]);


  // ========================================================
  // BUSCAR ALUNOS NA API
  // ========================================================

  const buscarAlunos = async (
    mostrarErro = false
  ) => {

    try {

      const resposta =
        await fetchComTimeout(
          `${API_URL}/alunos.php`,
          {},
          4000
        );

      if (!resposta.ok) {
        throw new Error(
          `Erro HTTP: ${resposta.status}`
        );
      }

      const dados =
        await resposta.json();

      if (Array.isArray(dados)) {

        setAlunos(dados);

        return true;
      }

      throw new Error(
        dados.mensagem ||
        'A API retornou dados inválidos.'
      );

    } catch (erro) {

      console.log(
        'API de alunos indisponível:',
        erro
      );

      if (mostrarErro) {

        Alert.alert(
          'API indisponível',
          'Não foi possível atualizar pelo MySQL. Os dados atuais foram mantidos.'
        );

      }

      return false;

    } finally {

      setCarregandoAlunos(false);

    }
  };



  useEffect(() => {

    buscarAlunos(false);

  }, []);



  const adicionarAluno = async (
    novoAluno
  ) => {

    const alunoLocal = {

      ...novoAluno,

      id: `local_${Date.now()}`,

      status: 'A'

    };


    // Adiciona imediatamente
    setAlunos(
      listaAtual => [
        ...listaAtual,
        alunoLocal
      ]
    );


    // Tenta enviar para API
    try {

      const resposta =
        await fetchComTimeout(
          `${API_URL}/cadastrar_aluno.php`,
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json'
            },

            body: JSON.stringify({
              nome: novoAluno.nome,
              ra: novoAluno.ra,
              curso: novoAluno.curso,
              turma: novoAluno.turma
            })
          },
          4000
        );


      if (!resposta.ok) {

        throw new Error(
          `Erro HTTP: ${resposta.status}`
        );

      }


      const dados =
        await resposta.json();


      if (!dados.sucesso) {

        throw new Error(
          dados.mensagem ||
          'Não foi possível cadastrar o aluno.'
        );

      }


      await buscarAlunos(false);

      return true;

    } catch (erro) {

      console.log(
        'Aluno mantido localmente:',
        erro
      );

      return true;

    }
  };



  const toggleStatusAluno =
    async (id) => {

      let alunoAnterior = null;

      setAlunos(listaAtual => {

        const novaLista =
          listaAtual.map(aluno => {

            if (
              String(aluno.id) ===
              String(id)
            ) {

              alunoAnterior = aluno;

              return {
                ...aluno,

                status:
                  aluno.status === 'A'
                    ? 'I'
                    : 'A'
              };

            }

            return aluno;

          });

        return novaLista;

      });


  
      if (
        String(id).startsWith('local_') ||
        String(id).startsWith('t1_') ||
        String(id).startsWith('t2_')
      ) {

        return;

      }


      try {

        const aluno =
          alunos.find(
            item =>
              String(item.id) ===
              String(id)
          );

        if (!aluno) {
          return;
        }


        const novoStatus =
          aluno.status === 'A'
            ? 'I'
            : 'A';


        const resposta =
          await fetchComTimeout(
            `${API_URL}/alterar_status.php`,
            {
              method: 'POST',

              headers: {
                'Content-Type':
                  'application/json'
              },

              body: JSON.stringify({
                id,
                status: novoStatus
              })
            },
            4000
          );


        if (!resposta.ok) {

          throw new Error(
            `Erro HTTP: ${resposta.status}`
          );

        }


        const dados =
          await resposta.json();


        if (!dados.sucesso) {

          throw new Error(
            dados.mensagem ||
            'Erro ao alterar status.'
          );

        }

      } catch (erro) {

        console.log(
          'Erro ao alterar status:',
          erro
        );


        // Reverte a alteração
        setAlunos(
          listaAtual =>
            listaAtual.map(item => {

              if (
                String(item.id) ===
                String(id)
              ) {

                return alunoAnterior ||
                  item;

              }

              return item;

            })
        );


        Alert.alert(
          'Erro',
          'Não foi possível alterar o status no servidor.'
        );

      }

    };


  const adicionarProfessor =
    (novoProfessor) => {

      setProfessores(
        listaAtual => [
          ...listaAtual,

          {
            ...novoProfessor,
            id:
              `prof_${Date.now()}`
          }
        ]
      );

    };



  const adicionarCoordenador =
    (novoCoordenador) => {

      setCoordenadores(
        listaAtual => [
          ...listaAtual,

          {
            ...novoCoordenador,
            id:
              `coord_${Date.now()}`
          }
        ]
      );

    };



  const adicionarResponsavel =
    (novoResponsavel) => {

      setResponsaveis(
        listaAtual => [
          ...listaAtual,

          {
            ...novoResponsavel,
            id:
              `resp_${Date.now()}`
          }
        ]
      );

    };



  const adicionarMatricula =
    (novaMatricula) => {

      setMatriculas(
        listaAtual => [
          ...listaAtual,

          {
            ...novaMatricula,
            id:
              `mat_${Date.now()}`
          }
        ]
      );

    };



  const adicionarTurma =
    (novaTurma) => {

      setTurmas(
        listaAtual => [
          ...listaAtual,

          {
            ...novaTurma,
            id:
              `turma_${Date.now()}`
          }
        ]
      );

    };



  const adicionarCurso =
    (novoCurso) => {

      setCursos(
        listaAtual => [
          ...listaAtual,

          {
            ...novoCurso,
            id:
              `curso_${Date.now()}`
          }
        ]
      );

    };



  const adicionarDisciplina =
    (novaDisciplina) => {

      setDisciplinas(
        listaAtual => [
          ...listaAtual,

          {
            ...novaDisciplina,
            id:
              `disc_${Date.now()}`
          }
        ]
      );

    };



  const adicionarAvaliacao =
    (novaAvaliacao) => {

      const avaliacao = {

        ...novaAvaliacao,

        id:
          `aval_${Date.now()}`

      };


      setAvaliacoes(
        listaAtual => [
          ...listaAtual,
          avaliacao
        ]
      );


      
      setBoletins(
        listaAtual => [
          ...listaAtual,

          {
            id:
              `bol_${Date.now()}`,

            aluno:
              novaAvaliacao.aluno,

            disciplina:
              novaAvaliacao.disciplina,

            nota:
              novaAvaliacao.nota
          }
        ]
      );

    };



  const valor = {

    alunos,

    setAlunos,

    carregandoAlunos,

    buscarAlunos,

    adicionarAluno,

    toggleStatusAluno,

    professores,

    setProfessores,

    adicionarProfessor,

    coordenadores,

    setCoordenadores,

    adicionarCoordenador,

    responsaveis,

    setResponsaveis,

    adicionarResponsavel,

    matriculas,

    setMatriculas,

    adicionarMatricula,

    turmas,

    setTurmas,

    adicionarTurma,

    cursos,

    setCursos,

    adicionarCurso,

    disciplinas,

    setDisciplinas,

    adicionarDisciplina,

    avaliacoes,

    setAvaliacoes,

    adicionarAvaliacao,

    boletins,

    setBoletins

  };


  return (

    <ScholarContext.Provider
      value={valor}
    >
      {children}
    </ScholarContext.Provider>

  );

};



export const useScholar = () => {

  return useContext(
    ScholarContext
  );

};



function HomeScreen({
  navigation
}) {

  const {

    alunos,
    professores,
    turmas,
    cursos

  } = useScholar();


  return (

    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: 30
      }}
    >

      <View style={styles.header}>

        <View style={{ flex: 1 }}>

          <Text style={styles.headerTitle}>
            App Scholar
          </Text>

          <Text style={styles.headerSubtitle}>
            Sistema de Gestão Acadêmica
          </Text>

        </View>

      </View>


      <View style={styles.welcomeCard}>

        <View style={styles.welcomeIcon}>

          <Ionicons
            name="school"
            size={42}
            color="#2563eb"
          />

        </View>

        <View style={{ flex: 1 }}>

          <Text style={styles.welcomeTitle}>
            Bem-vindo!
          </Text>

          <Text style={styles.welcomeText}>
            Gerencie as informações acadêmicas
            da instituição em um só lugar.
          </Text>

        </View>

      </View>


      <Text style={styles.sectionTitle}>
        Resumo
      </Text>


      <View style={styles.statsGrid}>

        <View style={styles.statCard}>

          <Ionicons
            name="people"
            size={28}
            color="#2563eb"
          />

          <Text style={styles.statValue}>
            {alunos.length}
          </Text>

          <Text style={styles.statLabel}>
            Alunos
          </Text>

        </View>


        <View style={styles.statCard}>

          <Ionicons
            name="person"
            size={28}
            color="#16a34a"
          />

          <Text style={styles.statValue}>
            {professores.length}
          </Text>

          <Text style={styles.statLabel}>
            Professores
          </Text>

        </View>


        <View style={styles.statCard}>

          <Ionicons
            name="school"
            size={28}
            color="#9333ea"
          />

          <Text style={styles.statValue}>
            {turmas.length}
          </Text>

          <Text style={styles.statLabel}>
            Turmas
          </Text>

        </View>


        <View style={styles.statCard}>

          <Ionicons
            name="book"
            size={28}
            color="#ea580c"
          />

          <Text style={styles.statValue}>
            {cursos.length}
          </Text>

          <Text style={styles.statLabel}>
            Cursos
          </Text>

        </View>

      </View>


      <Text style={styles.sectionTitle}>
        Administração
      </Text>


      <TouchableOpacity
        style={styles.menuCard}
        onPress={() =>
          navigation.navigate(
            'Professores'
          )
        }
      >

        <View style={styles.menuIcon}>

          <Ionicons
            name="person-outline"
            size={25}
            color="#2563eb"
          />

        </View>

        <View style={{ flex: 1 }}>

          <Text style={styles.menuTitle}>
            Professores
          </Text>

          <Text style={styles.menuText}>
            Gerenciar professores
          </Text>

        </View>

        <Ionicons
          name="chevron-forward"
          size={22}
          color="#999"
        />

      </TouchableOpacity>


      <TouchableOpacity
        style={styles.menuCard}
        onPress={() =>
          navigation.navigate(
            'Coordenadores'
          )
        }
      >

        <View style={styles.menuIcon}>

          <Ionicons
            name="people-outline"
            size={25}
            color="#16a34a"
          />

        </View>

        <View style={{ flex: 1 }}>

          <Text style={styles.menuTitle}>
            Coordenadores
          </Text>

          <Text style={styles.menuText}>
            Gerenciar coordenação
          </Text>

        </View>

        <Ionicons
          name="chevron-forward"
          size={22}
          color="#999"
        />

      </TouchableOpacity>


      <TouchableOpacity
        style={styles.menuCard}
        onPress={() =>
          navigation.navigate(
            'Responsáveis'
          )
        }
      >

        <View style={styles.menuIcon}>

          <Ionicons
            name="people-circle-outline"
            size={25}
            color="#9333ea"
          />

        </View>

        <View style={{ flex: 1 }}>

          <Text style={styles.menuTitle}>
            Responsáveis
          </Text>

          <Text style={styles.menuText}>
            Gerenciar responsáveis
          </Text>

        </View>

        <Ionicons
          name="chevron-forward"
          size={22}
          color="#999"
        />

      </TouchableOpacity>


      <TouchableOpacity
        style={styles.menuCard}
        onPress={() =>
          navigation.navigate(
            'Matrículas'
          )
        }
      >

        <View style={styles.menuIcon}>

          <Ionicons
            name="document-text-outline"
            size={25}
            color="#ea580c"
          />

        </View>

        <View style={{ flex: 1 }}>

          <Text style={styles.menuTitle}>
            Matrículas
          </Text>

          <Text style={styles.menuText}>
            Gerenciar matrículas
          </Text>

        </View>

        <Ionicons
          name="chevron-forward"
          size={22}
          color="#999"
        />

      </TouchableOpacity>


      <TouchableOpacity
        style={styles.menuCard}
        onPress={() =>
          navigation.navigate(
            'Cursos'
          )
        }
      >

        <View style={styles.menuIcon}>

          <Ionicons
            name="library-outline"
            size={25}
            color="#0891b2"
          />

        </View>

        <View style={{ flex: 1 }}>

          <Text style={styles.menuTitle}>
            Cursos
          </Text>

          <Text style={styles.menuText}>
            Gerenciar cursos
          </Text>

        </View>

        <Ionicons
          name="chevron-forward"
          size={22}
          color="#999"
        />

      </TouchableOpacity>


      <TouchableOpacity
        style={styles.menuCard}
        onPress={() =>
          navigation.navigate(
            'Disciplinas'
          )
        }
      >

        <View style={styles.menuIcon}>

          <Ionicons
            name="book-outline"
            size={25}
            color="#dc2626"
          />

        </View>

        <View style={{ flex: 1 }}>

          <Text style={styles.menuTitle}>
            Disciplinas
          </Text>

          <Text style={styles.menuText}>
            Gerenciar disciplinas
          </Text>

        </View>

        <Ionicons
          name="chevron-forward"
          size={22}
          color="#999"
        />

      </TouchableOpacity>


      <TouchableOpacity
        style={styles.menuCard}
        onPress={() =>
          navigation.navigate(
            'Avaliações'
          )
        }
      >

        <View style={styles.menuIcon}>

          <Ionicons
            name="clipboard-outline"
            size={25}
            color="#7c3aed"
          />

        </View>

        <View style={{ flex: 1 }}>

          <Text style={styles.menuTitle}>
            Avaliações
          </Text>

          <Text style={styles.menuText}>
            Gerenciar avaliações
          </Text>

        </View>

        <Ionicons
          name="chevron-forward"
          size={22}
          color="#999"
        />

      </TouchableOpacity>

    </ScrollView>

  );

}



function GestaoPessoaComFormacao({
  titulo,
  lista,
  adicionar,
  campos
}) {

  const [modalVisivel, setModalVisivel] =
    useState(false);

  const [formulario, setFormulario] =
    useState({});


  const abrirModal = () => {

    const inicial = {};

    campos.forEach(campo => {
      inicial[campo.key] = '';
    });

    setFormulario(inicial);

    setModalVisivel(true);

  };


  const atualizarCampo = (
    campo,
    valor
  ) => {

    setFormulario(
      atual => ({
        ...atual,
        [campo]: valor
      })
    );

  };


  const salvar = () => {

    const obrigatorios =
      campos.filter(
        campo =>
          campo.obrigatorio
      );


    const incompleto =
      obrigatorios.some(
        campo =>
          !String(
            formulario[campo.key] || ''
          ).trim()
      );


    if (incompleto) {

      Alert.alert(
        'Atenção',
        'Preencha todos os campos obrigatórios.'
      );

      return;

    }


    adicionar(formulario);

    setModalVisivel(false);

    Alert.alert(
      'Sucesso',
      `${titulo.slice(0, -1)} cadastrado com sucesso.`
    );

  };


  return (

    <View style={styles.container}>

      <View style={styles.header}>

        <View style={{ flex: 1 }}>

          <Text style={styles.headerTitle}>
            {titulo}
          </Text>

          <Text style={styles.headerSubtitle}>
            Cadastro e gerenciamento
          </Text>

        </View>


        <TouchableOpacity
          style={styles.headerButton}
          onPress={abrirModal}
        >

          <Ionicons
            name="add"
            size={27}
            color="#fff"
          />

        </TouchableOpacity>

      </View>


      <FlatList
        data={lista}
        keyExtractor={item =>
          String(item.id)
        }
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 30
        }}
        ListEmptyComponent={

          <View style={styles.emptyContainer}>

            <Ionicons
              name="people-outline"
              size={50}
              color="#999"
            />

            <Text style={styles.emptyTitle}>
              Nenhum registro
            </Text>

          </View>

        }
        renderItem={({ item }) => (

          <View style={styles.card}>

            <View style={styles.cardIcon}>

              <Ionicons
                name="person"
                size={25}
                color="#2563eb"
              />

            </View>


            <View style={{ flex: 1 }}>

              <Text style={styles.cardTitle}>
                {item.nome}
              </Text>

              {item.email && (

                <Text style={styles.cardText}>
                  {item.email}
                </Text>

              )}

              {item.telefone && (

                <Text style={styles.cardText}>
                  {item.telefone}
                </Text>

              )}

              {item.formacao && (

                <Text style={styles.cardText}>
                  Formação: {item.formacao}
                </Text>

              )}

              {item.departamento && (

                <Text style={styles.cardText}>
                  Departamento: {item.departamento}
                </Text>

              )}

            </View>

          </View>

        )}

      />


      <Modal
        visible={modalVisivel}
        transparent
        animationType="slide"
        onRequestClose={() =>
          setModalVisivel(false)
        }
      >

        <View style={styles.modalOverlay}>

          <View style={styles.modalContainer}>

            <ScrollView>

              <Text style={styles.modalTitle}>
                Novo {titulo.slice(0, -1)}
              </Text>


              {campos.map(campo => (

                <View key={campo.key}>

                  <Text style={styles.inputLabel}>
                    {campo.label}
                    {campo.obrigatorio
                      ? ' *'
                      : ''}
                  </Text>


                  <TextInput
                    style={styles.input}
                    placeholder={
                      campo.placeholder ||
                      campo.label
                    }
                    value={
                      formulario[campo.key] ||
                      ''
                    }
                    onChangeText={valor =>
                      atualizarCampo(
                        campo.key,
                        valor
                      )
                    }
                    keyboardType={
                      campo.keyboardType ||
                      'default'
                    }
                  />

                </View>

              ))}


              <View style={styles.modalButtons}>

                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() =>
                    setModalVisivel(false)
                  }
                >

                  <Text style={styles.cancelButtonText}>
                    Cancelar
                  </Text>

                </TouchableOpacity>


                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={salvar}
                >

                  <Text style={styles.saveButtonText}>
                    Salvar
                  </Text>

                </TouchableOpacity>

              </View>

            </ScrollView>

          </View>

        </View>

      </Modal>

    </View>

  );

}



function ProfessoresScreen() {

  const {
    professores,
    adicionarProfessor
  } = useScholar();


  return (

    <GestaoPessoaComFormacao

      titulo="Professores"

      lista={professores}

      adicionar={adicionarProfessor}

      campos={[
        {
          key: 'nome',
          label: 'Nome',
          obrigatorio: true
        },
        {
          key: 'email',
          label: 'E-mail'
        },
        {
          key: 'telefone',
          label: 'Telefone',
          keyboardType: 'phone-pad'
        },
        {
          key: 'cpf',
          label: 'CPF'
        },
        {
          key: 'endereco',
          label: 'Endereço'
        },
        {
          key: 'departamento',
          label: 'Departamento'
        },
        {
          key: 'formacao',
          label: 'Formação'
        },
        {
          key: 'observacoes',
          label: 'Observações'
        }
      ]}

    />

  );

}



function CoordenadoresScreen() {

  const {
    coordenadores,
    adicionarCoordenador
  } = useScholar();


  return (

    <GestaoPessoaComFormacao

      titulo="Coordenadores"

      lista={coordenadores}

      adicionar={adicionarCoordenador}

      campos={[
        {
          key: 'nome',
          label: 'Nome',
          obrigatorio: true
        },
        {
          key: 'email',
          label: 'E-mail'
        },
        {
          key: 'telefone',
          label: 'Telefone',
          keyboardType: 'phone-pad'
        },
        {
          key: 'cpf',
          label: 'CPF'
        },
        {
          key: 'endereco',
          label: 'Endereço'
        },
        {
          key: 'departamento',
          label: 'Departamento'
        },
        {
          key: 'formacao',
          label: 'Formação'
        },
        {
          key: 'observacoes',
          label: 'Observações'
        }
      ]}

    />

  );

}


function ResponsaveisScreen() {

  const {
    responsaveis,
    adicionarResponsavel
  } = useScholar();


  return (

    <GestaoPessoaComFormacao

      titulo="Responsáveis"

      lista={responsaveis}

      adicionar={adicionarResponsavel}

      campos={[
        {
          key: 'nome',
          label: 'Nome',
          obrigatorio: true
        },
        {
          key: 'email',
          label: 'E-mail'
        },
        {
          key: 'telefone',
          label: 'Telefone',
          keyboardType: 'phone-pad'
        },
        {
          key: 'cpf',
          label: 'CPF'
        },
        {
          key: 'endereco',
          label: 'Endereço'
        }
      ]}

    />

  );

}

function MatriculasScreen() {

  const {
    matriculas,
    adicionarMatricula,
    alunos,
    cursos,
    turmas
  } = useScholar();

  const [modalVisivel, setModalVisivel] =
    useState(false);

  const [aluno, setAluno] =
    useState('');

  const [curso, setCurso] =
    useState('');

  const [turma, setTurma] =
    useState('');

  const [numero, setNumero] =
    useState('');


  const limparFormulario = () => {

    setAluno('');
    setCurso('');
    setTurma('');
    setNumero('');

  };


  const salvarMatricula = () => {

    if (!aluno || !curso || !turma) {

      Alert.alert(
        'Atenção',
        'Selecione o aluno, curso e turma.'
      );

      return;
    }


    const alunoSelecionado =
      alunos.find(
        item =>
          String(item.id) ===
          String(aluno)
      );


    adicionarMatricula({

      numero:
        numero ||
        `MAT${Date.now()}`,

      aluno:
        alunoSelecionado
          ? alunoSelecionado.nome
          : aluno,

      alunoId:
        aluno,

      curso,

      turma,

      data:
        new Date().toLocaleDateString('pt-BR'),

      status: 'Ativa'

    });


    limparFormulario();

    setModalVisivel(false);


    Alert.alert(
      'Sucesso',
      'Matrícula cadastrada com sucesso.'
    );

  };


  return (

    <View style={styles.container}>

      <View style={styles.header}>

        <View style={{ flex: 1 }}>

          <Text style={styles.headerTitle}>
            Matrículas
          </Text>

          <Text style={styles.headerSubtitle}>
            Gerenciamento de matrículas
          </Text>

        </View>


        <TouchableOpacity
          style={styles.headerButton}
          onPress={() =>
            setModalVisivel(true)
          }
        >

          <Ionicons
            name="add"
            size={27}
            color="#fff"
          />

        </TouchableOpacity>

      </View>


      <FlatList
        data={matriculas}
        keyExtractor={item =>
          String(item.id)
        }
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 30
        }}
        ListEmptyComponent={

          <View style={styles.emptyContainer}>

            <Ionicons
              name="document-text-outline"
              size={50}
              color="#999"
            />

            <Text style={styles.emptyTitle}>
              Nenhuma matrícula cadastrada
            </Text>

          </View>

        }
        renderItem={({ item }) => (

          <View style={styles.card}>

            <View style={styles.cardIcon}>

              <Ionicons
                name="document-text"
                size={25}
                color="#ea580c"
              />

            </View>


            <View style={{ flex: 1 }}>

              <Text style={styles.cardTitle}>
                {item.aluno}
              </Text>

              <Text style={styles.cardText}>
                Matrícula: {item.numero}
              </Text>

              <Text style={styles.cardText}>
                Curso: {item.curso}
              </Text>

              <Text style={styles.cardText}>
                Turma: {item.turma}
              </Text>

              {item.data && (

                <Text style={styles.cardText}>
                  Data: {item.data}
                </Text>

              )}

            </View>

          </View>

        )}

      />


      <Modal
        visible={modalVisivel}
        transparent
        animationType="slide"
        onRequestClose={() => {
          setModalVisivel(false);
          limparFormulario();
        }}
      >

        <View style={styles.modalOverlay}>

          <View style={styles.modalContainer}>

            <ScrollView>

              <Text style={styles.modalTitle}>
                Nova Matrícula
              </Text>


              <Text style={styles.inputLabel}>
                Número da matrícula
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Ex.: 20240001"
                value={numero}
                onChangeText={setNumero}
                keyboardType="numeric"
              />


              <Text style={styles.inputLabel}>
                Aluno *
              </Text>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{
                  marginBottom: 12
                }}
              >

                {alunos.map(item => (

                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.choiceButton,

                      String(aluno) ===
                        String(item.id) &&
                        styles.choiceButtonSelected
                    ]}
                    onPress={() =>
                      setAluno(
                        String(item.id)
                      )
                    }
                  >

                    <Text
                      style={[
                        styles.choiceButtonText,

                        String(aluno) ===
                          String(item.id) &&
                          styles.choiceButtonTextSelected
                      ]}
                    >
                      {item.nome}
                    </Text>

                  </TouchableOpacity>

                ))}

              </ScrollView>


              <Text style={styles.inputLabel}>
                Curso *
              </Text>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{
                  marginBottom: 12
                }}
              >

                {cursos.map(item => (

                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.choiceButton,

                      curso === item.nome &&
                        styles.choiceButtonSelected
                    ]}
                    onPress={() =>
                      setCurso(item.nome)
                    }
                  >

                    <Text
                      style={[
                        styles.choiceButtonText,

                        curso === item.nome &&
                          styles.choiceButtonTextSelected
                      ]}
                    >
                      {item.nome}
                    </Text>

                  </TouchableOpacity>

                ))}

              </ScrollView>


              <Text style={styles.inputLabel}>
                Turma *
              </Text>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{
                  marginBottom: 12
                }}
              >

                {turmas.map(item => (

                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.choiceButton,

                      turma === item.nome &&
                        styles.choiceButtonSelected
                    ]}
                    onPress={() =>
                      setTurma(item.nome)
                    }
                  >

                    <Text
                      style={[
                        styles.choiceButtonText,

                        turma === item.nome &&
                          styles.choiceButtonTextSelected
                      ]}
                    >
                      {item.nome}
                    </Text>

                  </TouchableOpacity>

                ))}

              </ScrollView>


              <View style={styles.modalButtons}>

                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {

                    setModalVisivel(false);

                    limparFormulario();

                  }}
                >

                  <Text style={styles.cancelButtonText}>
                    Cancelar
                  </Text>

                </TouchableOpacity>


                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={salvarMatricula}
                >

                  <Text style={styles.saveButtonText}>
                    Salvar
                  </Text>

                </TouchableOpacity>

              </View>

            </ScrollView>

          </View>

        </View>

      </Modal>

    </View>

  );

}


function AlunosScreen() {

  const {
    alunos,
    adicionarAluno,
    toggleStatusAluno,
    buscarAlunos,
    carregandoAlunos
  } = useScholar();


  const [busca, setBusca] =
    useState('');

  const [modalVisivel, setModalVisivel] =
    useState(false);

  const [nome, setNome] =
    useState('');

  const [ra, setRa] =
    useState('');

  const [curso, setCurso] =
    useState('');

  const [turma, setTurma] =
    useState('');


  const alunosFiltrados =
    alunos.filter(aluno => {

      const texto =
        busca.toLowerCase();

      return (

        String(aluno.nome || '')
          .toLowerCase()
          .includes(texto)

        ||

        String(aluno.ra || '')
          .toLowerCase()
          .includes(texto)

        ||

        String(aluno.curso || '')
          .toLowerCase()
          .includes(texto)

        ||

        String(aluno.turma || '')
          .toLowerCase()
          .includes(texto)

      );

    });


  const limparFormulario = () => {

    setNome('');
    setRa('');
    setCurso('');
    setTurma('');

  };


  const salvarAluno = async () => {

    if (
      !nome.trim() ||
      !ra.trim() ||
      !curso.trim() ||
      !turma.trim()
    ) {

      Alert.alert(
        'Atenção',
        'Preencha todos os campos.'
      );

      return;

    }


    await adicionarAluno({

      nome: nome.trim(),

      ra: ra.trim(),

      curso: curso.trim(),

      turma: turma.trim()

    });


    limparFormulario();

    setModalVisivel(false);


    Alert.alert(
      'Sucesso',
      'Aluno cadastrado com sucesso.'
    );

  };


  return (

    <View style={styles.container}>

      <View style={styles.header}>

        <View style={{ flex: 1 }}>

          <Text style={styles.headerTitle}>
            Alunos
          </Text>

          <Text style={styles.headerSubtitle}>
            {alunos.length} alunos cadastrados
          </Text>

        </View>


        <TouchableOpacity
          style={styles.headerButton}
          onPress={() =>
            setModalVisivel(true)
          }
        >

          <Ionicons
            name="add"
            size={27}
            color="#fff"
          />

        </TouchableOpacity>

      </View>


      <View style={styles.searchContainer}>

        <Ionicons
          name="search-outline"
          size={21}
          color="#777"
        />

        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar aluno..."
          placeholderTextColor="#999"
          value={busca}
          onChangeText={setBusca}
        />

        {busca.length > 0 && (

          <TouchableOpacity
            onPress={() =>
              setBusca('')
            }
          >

            <Ionicons
              name="close-circle"
              size={21}
              color="#999"
            />

          </TouchableOpacity>

        )}

      </View>


      <View style={styles.listHeader}>

        <Text style={styles.listHeaderText}>
          {alunosFiltrados.length} resultado(s)
        </Text>


        <TouchableOpacity
          onPress={() =>
            buscarAlunos(true)
          }
        >

          <Ionicons
            name="refresh"
            size={21}
            color="#2563eb"
          />

        </TouchableOpacity>

      </View>


      <FlatList
        data={alunosFiltrados}
        keyExtractor={item =>
          String(item.id)
        }
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 30
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={

          <View style={styles.emptyContainer}>

            <Ionicons
              name="person-outline"
              size={50}
              color="#999"
            />

            <Text style={styles.emptyTitle}>
              Nenhum aluno encontrado
            </Text>

            <Text style={styles.emptyText}>
              Tente alterar os termos da pesquisa.
            </Text>

          </View>

        }
        renderItem={({ item }) => (

          <View style={styles.studentCard}>

            <View style={styles.studentAvatar}>

              <Text style={styles.studentAvatarText}>
                {String(
                  item.nome || '?'
                )
                  .charAt(0)
                  .toUpperCase()}
              </Text>

            </View>


            <View style={{ flex: 1 }}>

              <Text style={styles.studentName}>
                {item.nome}
              </Text>

              <Text style={styles.studentInfo}>
                RA: {item.ra}
              </Text>

              <Text style={styles.studentInfo}>
                {item.curso}
              </Text>

              <Text style={styles.studentInfo}>
                {item.turma}
              </Text>


              <View
                style={[
                  styles.statusBadge,

                  item.status !== 'A' &&
                    styles.statusBadgeInactive
                ]}
              >

                <Text
                  style={[
                    styles.statusText,

                    item.status !== 'A' &&
                      styles.statusTextInactive
                  ]}
                >
                  {item.status === 'A'
                    ? 'ATIVO'
                    : 'INATIVO'}
                </Text>

              </View>

            </View>


            <TouchableOpacity
              style={styles.statusButton}
              onPress={() =>
                toggleStatusAluno(
                  item.id
                )
              }
            >

              <Ionicons
                name={
                  item.status === 'A'
                    ? 'toggle'
                    : 'toggle-outline'
                }
                size={32}
                color={
                  item.status === 'A'
                    ? '#16a34a'
                    : '#999'
                }
              />

            </TouchableOpacity>

          </View>

        )}

      />


      {carregandoAlunos && (

        <View style={styles.loadingSmall}>

          <ActivityIndicator
            size="small"
            color="#2563eb"
          />

          <Text style={styles.loadingText}>
            Atualizando...
          </Text>

        </View>

      )}


      <Modal
        visible={modalVisivel}
        transparent
        animationType="slide"
        onRequestClose={() => {

          setModalVisivel(false);

          limparFormulario();

        }}
      >

        <View style={styles.modalOverlay}>

          <View style={styles.modalContainer}>

            <ScrollView>

              <Text style={styles.modalTitle}>
                Novo Aluno
              </Text>


              <Text style={styles.inputLabel}>
                Nome completo *
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Nome do aluno"
                value={nome}
                onChangeText={setNome}
              />


              <Text style={styles.inputLabel}>
                RA *
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Registro acadêmico"
                value={ra}
                onChangeText={setRa}
              />


              <Text style={styles.inputLabel}>
                Curso *
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Nome do curso"
                value={curso}
                onChangeText={setCurso}
              />


              <Text style={styles.inputLabel}>
                Turma *
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Ex.: 1º Módulo A"
                value={turma}
                onChangeText={setTurma}
              />


              <View style={styles.modalButtons}>

                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {

                    setModalVisivel(false);

                    limparFormulario();

                  }}
                >

                  <Text style={styles.cancelButtonText}>
                    Cancelar
                  </Text>

                </TouchableOpacity>


                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={salvarAluno}
                >

                  <Text style={styles.saveButtonText}>
                    Cadastrar
                  </Text>

                </TouchableOpacity>

              </View>

            </ScrollView>

          </View>

        </View>

      </Modal>

    </View>

  );

}



function TurmasScreen() {

  const {
    turmas,
    alunos,
    adicionarTurma
  } = useScholar();


  const [modalVisivel, setModalVisivel] =
    useState(false);

  const [nome, setNome] =
    useState('');

  const [curso, setCurso] =
    useState('');

  const [periodo, setPeriodo] =
    useState('');

  const [ano, setAno] =
    useState('');


  const salvarTurma = () => {

    if (
      !nome.trim() ||
      !curso.trim()
    ) {

      Alert.alert(
        'Atenção',
        'Informe o nome da turma e o curso.'
      );

      return;

    }


    adicionarTurma({

      nome: nome.trim(),

      curso: curso.trim(),

      periodo:
        periodo.trim() ||
        'Não informado',

      ano:
        ano.trim() ||
        new Date().getFullYear().toString(),

      status: 'A'

    });


    setNome('');
    setCurso('');
    setPeriodo('');
    setAno('');

    setModalVisivel(false);


    Alert.alert(
      'Sucesso',
      'Turma cadastrada com sucesso.'
    );

  };


  return (

    <View style={styles.container}>

      <View style={styles.header}>

        <View style={{ flex: 1 }}>

          <Text style={styles.headerTitle}>
            Turmas
          </Text>

          <Text style={styles.headerSubtitle}>
            Gerenciamento de turmas
          </Text>

        </View>


        <TouchableOpacity
          style={styles.headerButton}
          onPress={() =>
            setModalVisivel(true)
          }
        >

          <Ionicons
            name="add"
            size={27}
            color="#fff"
          />

        </TouchableOpacity>

      </View>


      <FlatList
        data={turmas}
        keyExtractor={item =>
          String(item.id)
        }
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 30
        }}
        renderItem={({ item }) => {

          const quantidade =
            alunos.filter(
              aluno =>
                String(aluno.turma) ===
                String(item.nome)
            ).length;


          return (

            <View style={styles.classCard}>

              <View style={styles.classIcon}>

                <Ionicons
                  name="school"
                  size={27}
                  color="#2563eb"
                />

              </View>


              <View style={{ flex: 1 }}>

                <Text style={styles.cardTitle}>
                  {item.nome}
                </Text>

                <Text style={styles.cardText}>
                  Curso: {item.curso}
                </Text>

                <Text style={styles.cardText}>
                  Período: {item.periodo}
                </Text>

                <Text style={styles.cardText}>
                  Ano: {item.ano}
                </Text>

                <Text style={styles.cardText}>
                  Alunos: {quantidade}
                </Text>


                <View style={styles.statusBadge}>

                  <Text style={styles.statusText}>
                    ATIVA
                  </Text>

                </View>

              </View>

            </View>

          );

        }}

        ListEmptyComponent={

          <View style={styles.emptyContainer}>

            <Ionicons
              name="school-outline"
              size={50}
              color="#999"
            />

            <Text style={styles.emptyTitle}>
              Nenhuma turma cadastrada
            </Text>

          </View>

        }

      />


      <Modal
        visible={modalVisivel}
        transparent
        animationType="slide"
        onRequestClose={() =>
          setModalVisivel(false)
        }
      >

        <View style={styles.modalOverlay}>

          <View style={styles.modalContainer}>

            <ScrollView>

              <Text style={styles.modalTitle}>
                Nova Turma
              </Text>


              <Text style={styles.inputLabel}>
                Nome da turma *
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Ex.: 3º Módulo A"
                value={nome}
                onChangeText={setNome}
              />


              <Text style={styles.inputLabel}>
                Curso *
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Nome do curso"
                value={curso}
                onChangeText={setCurso}
              />


              <Text style={styles.inputLabel}>
                Período
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Ex.: Manhã"
                value={periodo}
                onChangeText={setPeriodo}
              />


              <Text style={styles.inputLabel}>
                Ano
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Ex.: 2026"
                value={ano}
                onChangeText={setAno}
                keyboardType="numeric"
              />


              <View style={styles.modalButtons}>

                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() =>
                    setModalVisivel(false)
                  }
                >

                  <Text style={styles.cancelButtonText}>
                    Cancelar
                  </Text>

                </TouchableOpacity>


                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={salvarTurma}
                >

                  <Text style={styles.saveButtonText}>
                    Salvar
                  </Text>

                </TouchableOpacity>

              </View>

            </ScrollView>

          </View>

        </View>

      </Modal>

    </View>

  );

}

function CursosScreen() {

  const {
    cursos,
    adicionarCurso
  } = useScholar();

  const [modalVisivel, setModalVisivel] =
    useState(false);

  const [nome, setNome] =
    useState('');

  const [area, setArea] =
    useState('');

  const [duracao, setDuracao] =
    useState('');


  const salvarCurso = () => {

    if (!nome.trim()) {

      Alert.alert(
        'Atenção',
        'Informe o nome do curso.'
      );

      return;
    }


    adicionarCurso({

      nome: nome.trim(),

      area:
        area.trim() ||
        'Não informada',

      duracao:
        duracao.trim() ||
        'Não informada',

      status: 'A'

    });


    setNome('');
    setArea('');
    setDuracao('');

    setModalVisivel(false);


    Alert.alert(
      'Sucesso',
      'Curso cadastrado com sucesso.'
    );

  };


  return (

    <View style={styles.container}>

      <View style={styles.header}>

        <View style={{ flex: 1 }}>

          <Text style={styles.headerTitle}>
            Cursos
          </Text>

          <Text style={styles.headerSubtitle}>
            Gerenciamento de cursos
          </Text>

        </View>


        <TouchableOpacity
          style={styles.headerButton}
          onPress={() =>
            setModalVisivel(true)
          }
        >

          <Ionicons
            name="add"
            size={27}
            color="#fff"
          />

        </TouchableOpacity>

      </View>


      <FlatList
        data={cursos}
        keyExtractor={item =>
          String(item.id)
        }
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 30
        }}
        ListEmptyComponent={

          <View style={styles.emptyContainer}>

            <Ionicons
              name="library-outline"
              size={50}
              color="#999"
            />

            <Text style={styles.emptyTitle}>
              Nenhum curso cadastrado
            </Text>

          </View>

        }
        renderItem={({ item }) => (

          <View style={styles.card}>

            <View style={styles.cardIcon}>

              <Ionicons
                name="library"
                size={25}
                color="#0891b2"
              />

            </View>


            <View style={{ flex: 1 }}>

              <Text style={styles.cardTitle}>
                {item.nome}
              </Text>

              <Text style={styles.cardText}>
                Área: {item.area}
              </Text>

              <Text style={styles.cardText}>
                Duração: {item.duracao}
              </Text>


              <View style={styles.statusBadge}>

                <Text style={styles.statusText}>
                  ATIVO
                </Text>

              </View>

            </View>

          </View>

        )}

      />


      <Modal
        visible={modalVisivel}
        transparent
        animationType="slide"
        onRequestClose={() =>
          setModalVisivel(false)
        }
      >

        <View style={styles.modalOverlay}>

          <View style={styles.modalContainer}>

            <ScrollView>

              <Text style={styles.modalTitle}>
                Novo Curso
              </Text>


              <Text style={styles.inputLabel}>
                Nome do curso *
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Ex.: Administração"
                value={nome}
                onChangeText={setNome}
              />


              <Text style={styles.inputLabel}>
                Área
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Ex.: Gestão"
                value={area}
                onChangeText={setArea}
              />


              <Text style={styles.inputLabel}>
                Duração
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Ex.: 3 anos"
                value={duracao}
                onChangeText={setDuracao}
              />


              <View style={styles.modalButtons}>

                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() =>
                    setModalVisivel(false)
                  }
                >

                  <Text style={styles.cancelButtonText}>
                    Cancelar
                  </Text>

                </TouchableOpacity>


                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={salvarCurso}
                >

                  <Text style={styles.saveButtonText}>
                    Salvar
                  </Text>

                </TouchableOpacity>

              </View>

            </ScrollView>

          </View>

        </View>

      </Modal>

    </View>

  );

}


function DisciplinasScreen() {

  const {
    disciplinas,
    adicionarDisciplina
  } = useScholar();

  const [modalVisivel, setModalVisivel] =
    useState(false);

  const [nome, setNome] =
    useState('');

  const [codigo, setCodigo] =
    useState('');

  const [cargaHoraria, setCargaHoraria] =
    useState('');


  const salvarDisciplina = () => {

    if (!nome.trim()) {

      Alert.alert(
        'Atenção',
        'Informe o nome da disciplina.'
      );

      return;
    }


    adicionarDisciplina({

      nome: nome.trim(),

      codigo:
        codigo.trim() ||
        `DISC${Date.now()}`,

      cargaHoraria:
        cargaHoraria.trim() ||
        'Não informada',

      status: 'A'

    });


    setNome('');
    setCodigo('');
    setCargaHoraria('');

    setModalVisivel(false);


    Alert.alert(
      'Sucesso',
      'Disciplina cadastrada com sucesso.'
    );

  };


  return (

    <View style={styles.container}>

      <View style={styles.header}>

        <View style={{ flex: 1 }}>

          <Text style={styles.headerTitle}>
            Disciplinas
          </Text>

          <Text style={styles.headerSubtitle}>
            Gerenciamento de disciplinas
          </Text>

        </View>


        <TouchableOpacity
          style={styles.headerButton}
          onPress={() =>
            setModalVisivel(true)
          }
        >

          <Ionicons
            name="add"
            size={27}
            color="#fff"
          />

        </TouchableOpacity>

      </View>


      <FlatList
        data={disciplinas}
        keyExtractor={item =>
          String(item.id)
        }
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 30
        }}
        ListEmptyComponent={

          <View style={styles.emptyContainer}>

            <Ionicons
              name="book-outline"
              size={50}
              color="#999"
            />

            <Text style={styles.emptyTitle}>
              Nenhuma disciplina cadastrada
            </Text>

          </View>

        }
        renderItem={({ item }) => (

          <View style={styles.card}>

            <View style={styles.cardIcon}>

              <Ionicons
                name="book"
                size={25}
                color="#dc2626"
              />

            </View>


            <View style={{ flex: 1 }}>

              <Text style={styles.cardTitle}>
                {item.nome}
              </Text>

              <Text style={styles.cardText}>
                Código: {item.codigo}
              </Text>

              <Text style={styles.cardText}>
                Carga horária: {item.cargaHoraria}
              </Text>


              <View style={styles.statusBadge}>

                <Text style={styles.statusText}>
                  ATIVA
                </Text>

              </View>

            </View>

          </View>

        )}

      />


      <Modal
        visible={modalVisivel}
        transparent
        animationType="slide"
        onRequestClose={() =>
          setModalVisivel(false)
        }
      >

        <View style={styles.modalOverlay}>

          <View style={styles.modalContainer}>

            <ScrollView>

              <Text style={styles.modalTitle}>
                Nova Disciplina
              </Text>


              <Text style={styles.inputLabel}>
                Nome da disciplina *
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Ex.: Matemática"
                value={nome}
                onChangeText={setNome}
              />


              <Text style={styles.inputLabel}>
                Código
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Ex.: MAT101"
                value={codigo}
                onChangeText={setCodigo}
              />


              <Text style={styles.inputLabel}>
                Carga horária
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Ex.: 80h"
                value={cargaHoraria}
                onChangeText={setCargaHoraria}
              />


              <View style={styles.modalButtons}>

                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() =>
                    setModalVisivel(false)
                  }
                >

                  <Text style={styles.cancelButtonText}>
                    Cancelar
                  </Text>

                </TouchableOpacity>


                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={salvarDisciplina}
                >

                  <Text style={styles.saveButtonText}>
                    Salvar
                  </Text>

                </TouchableOpacity>

              </View>

            </ScrollView>

          </View>

        </View>

      </Modal>

    </View>

  );

}



function AvaliacoesScreen() {

  const {
    avaliacoes,
    adicionarAvaliacao,
    alunos,
    disciplinas
  } = useScholar();


  const [modalVisivel, setModalVisivel] =
    useState(false);

  const [alunoId, setAlunoId] =
    useState('');

  const [disciplina, setDisciplina] =
    useState('');

  const [nota, setNota] =
    useState('');

  const [tipo, setTipo] =
    useState('');

  const [data, setData] =
    useState('');


  const limparFormulario = () => {

    setAlunoId('');
    setDisciplina('');
    setNota('');
    setTipo('');
    setData('');

  };


  const salvarAvaliacao = () => {

    if (
      !alunoId ||
      !disciplina ||
      !nota
    ) {

      Alert.alert(
        'Atenção',
        'Preencha aluno, disciplina e nota.'
      );

      return;

    }


    const notaNumero =
      Number(
        String(nota).replace(',', '.')
      );


    if (
      Number.isNaN(notaNumero) ||
      notaNumero < 0 ||
      notaNumero > 10
    ) {

      Alert.alert(
        'Atenção',
        'A nota deve estar entre 0 e 10.'
      );

      return;

    }


    const alunoSelecionado =
      alunos.find(
        item =>
          String(item.id) ===
          String(alunoId)
      );


    adicionarAvaliacao({

      alunoId,

      aluno:
        alunoSelecionado
          ? alunoSelecionado.nome
          : 'Aluno',

      disciplina,

      nota:
        notaNumero.toFixed(1),

      tipo:
        tipo.trim() ||
        'Avaliação',

      data:
        data.trim() ||
        new Date().toLocaleDateString(
          'pt-BR'
        )

    });


    limparFormulario();

    setModalVisivel(false);


    Alert.alert(
      'Sucesso',
      'Avaliação cadastrada com sucesso.'
    );

  };


  return (

    <View style={styles.container}>

      <View style={styles.header}>

        <View style={{ flex: 1 }}>

          <Text style={styles.headerTitle}>
            Avaliações
          </Text>

          <Text style={styles.headerSubtitle}>
            Notas e avaliações dos alunos
          </Text>

        </View>


        <TouchableOpacity
          style={styles.headerButton}
          onPress={() =>
            setModalVisivel(true)
          }
        >

          <Ionicons
            name="add"
            size={27}
            color="#fff"
          />

        </TouchableOpacity>

      </View>


      <FlatList
        data={avaliacoes}
        keyExtractor={item =>
          String(item.id)
        }
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 30
        }}
        ListEmptyComponent={

          <View style={styles.emptyContainer}>

            <Ionicons
              name="clipboard-outline"
              size={50}
              color="#999"
            />

            <Text style={styles.emptyTitle}>
              Nenhuma avaliação cadastrada
            </Text>

          </View>

        }
        renderItem={({ item }) => (

          <View style={styles.card}>

            <View style={{ flex: 1 }}>

              <Text style={styles.cardTitle}>
                {item.aluno}
              </Text>

              <Text style={styles.cardText}>
                Disciplina: {item.disciplina}
              </Text>

              <Text style={styles.cardText}>
                Tipo: {item.tipo}
              </Text>

              <Text style={styles.cardText}>
                Data: {item.data}
              </Text>

            </View>


            <View style={styles.gradeCircle}>

              <Text style={styles.gradeCircleText}>
                {Number(item.nota).toFixed(1)}
              </Text>

            </View>

          </View>

        )}

      />


      <Modal
        visible={modalVisivel}
        transparent
        animationType="slide"
        onRequestClose={() => {

          setModalVisivel(false);

          limparFormulario();

        }}
      >

        <View style={styles.modalOverlay}>

          <View style={styles.modalContainer}>

            <ScrollView>

              <Text style={styles.modalTitle}>
                Nova Avaliação
              </Text>


              <Text style={styles.inputLabel}>
                Aluno *
              </Text>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{
                  marginBottom: 12
                }}
              >

                {alunos.map(item => (

                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.choiceButton,

                      String(alunoId) ===
                        String(item.id) &&
                        styles.choiceButtonSelected
                    ]}
                    onPress={() =>
                      setAlunoId(
                        String(item.id)
                      )
                    }
                  >

                    <Text
                      style={[
                        styles.choiceButtonText,

                        String(alunoId) ===
                          String(item.id) &&
                          styles.choiceButtonTextSelected
                      ]}
                    >
                      {item.nome}
                    </Text>

                  </TouchableOpacity>

                ))}

              </ScrollView>


              <Text style={styles.inputLabel}>
                Disciplina *
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Nome da disciplina"
                value={disciplina}
                onChangeText={setDisciplina}
              />


              {disciplinas.length > 0 && (

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{
                    marginBottom: 12
                  }}
                >

                  {disciplinas.map(item => (

                    <TouchableOpacity
                      key={item.id}
                      style={[
                        styles.choiceButton,

                        disciplina === item.nome &&
                          styles.choiceButtonSelected
                      ]}
                      onPress={() =>
                        setDisciplina(
                          item.nome
                        )
                      }
                    >

                      <Text
                        style={[
                          styles.choiceButtonText,

                          disciplina === item.nome &&
                            styles.choiceButtonTextSelected
                        ]}
                      >
                        {item.nome}
                      </Text>

                    </TouchableOpacity>

                  ))}

                </ScrollView>

              )}


              <Text style={styles.inputLabel}>
                Nota *
              </Text>

              <TextInput
                style={styles.input}
                placeholder="0 a 10"
                value={nota}
                onChangeText={setNota}
                keyboardType="decimal-pad"
              />


              <Text style={styles.inputLabel}>
                Tipo
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Ex.: Prova"
                value={tipo}
                onChangeText={setTipo}
              />


              <Text style={styles.inputLabel}>
                Data
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Ex.: 24/09/2026"
                value={data}
                onChangeText={setData}
              />


              <View style={styles.modalButtons}>

                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {

                    setModalVisivel(false);

                    limparFormulario();

                  }}
                >

                  <Text style={styles.cancelButtonText}>
                    Cancelar
                  </Text>

                </TouchableOpacity>


                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={salvarAvaliacao}
                >

                  <Text style={styles.saveButtonText}>
                    Salvar
                  </Text>

                </TouchableOpacity>

              </View>

            </ScrollView>

          </View>

        </View>

      </Modal>

    </View>

  );

}


function BoletimScreen() {

  const {
    alunos,
    avaliacoes
  } = useScholar();


  const [
    alunoSelecionado,
    setAlunoSelecionado
  ] = useState('');


  const avaliacoesAluno =
    avaliacoes.filter(
      avaliacao =>
        String(
          avaliacao.alunoId
        ) ===
        String(
          alunoSelecionado
        )
    );


  const media =
    avaliacoesAluno.length > 0
      ? avaliacoesAluno.reduce(
          (
            total,
            item
          ) =>
            total +
            Number(
              item.nota || 0
            ),
          0
        ) /
        avaliacoesAluno.length
      : 0;


  const aluno =
    alunos.find(
      item =>
        String(item.id) ===
        String(alunoSelecionado)
    );


  return (

    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: 30
      }}
    >

      <View style={styles.header}>

        <View style={{ flex: 1 }}>

          <Text style={styles.headerTitle}>
            Boletim
          </Text>

          <Text style={styles.headerSubtitle}>
            Consulte o desempenho acadêmico
          </Text>

        </View>

      </View>


      <Text style={styles.sectionTitle}>
        Selecione o aluno
      </Text>


      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          paddingHorizontal: 16
        }}
      >

        {alunos.map(item => (

          <TouchableOpacity
            key={item.id}
            style={[
              styles.choiceButton,

              String(alunoSelecionado) ===
                String(item.id) &&
                styles.choiceButtonSelected
            ]}
            onPress={() =>
              setAlunoSelecionado(
                String(item.id)
              )
            }
          >

            <Text
              style={[
                styles.choiceButtonText,

                String(alunoSelecionado) ===
                  String(item.id) &&
                  styles.choiceButtonTextSelected
              ]}
            >
              {item.nome}
            </Text>

          </TouchableOpacity>

        ))}

      </ScrollView>


      {aluno && (

        <View style={styles.reportHeader}>

          <View style={styles.studentAvatar}>

            <Text style={styles.studentAvatarText}>
              {aluno.nome
                .charAt(0)
                .toUpperCase()}
            </Text>

          </View>


          <View style={{ flex: 1 }}>

            <Text style={styles.studentName}>
              {aluno.nome}
            </Text>

            <Text style={styles.studentInfo}>
              RA: {aluno.ra}
            </Text>

            <Text style={styles.studentInfo}>
              Curso: {aluno.curso}
            </Text>

            <Text style={styles.studentInfo}>
              Turma: {aluno.turma}
            </Text>

          </View>

        </View>

      )}


      {alunoSelecionado ? (

        <>

          <View style={styles.averageCard}>

            <Text style={styles.averageLabel}>
              Média geral
            </Text>

            <Text style={styles.averageValue}>
              {media.toFixed(1)}
            </Text>

            <Text style={styles.averageStatus}>
              {media >= 6
                ? 'Aproveitamento satisfatório'
                : 'Abaixo da média'}
            </Text>

          </View>


          <Text style={styles.sectionTitle}>
            Avaliações
          </Text>


          {avaliacoesAluno.length === 0 ? (

            <View style={styles.emptyContainer}>

              <Ionicons
                name="document-outline"
                size={45}
                color="#999"
              />

              <Text style={styles.emptyTitle}>
                Nenhuma avaliação encontrada
              </Text>

            </View>

          ) : (

            avaliacoesAluno.map(
              item => (

                <View
                  key={item.id}
                  style={styles.card}
                >

                  <View style={{ flex: 1 }}>

                    <Text style={styles.cardTitle}>
                      {item.disciplina}
                    </Text>

                    <Text style={styles.cardText}>
                      {item.tipo}
                    </Text>

                    <Text style={styles.cardText}>
                      {item.data}
                    </Text>

                  </View>


                  <View style={styles.gradeCircle}>

                    <Text style={styles.gradeCircleText}>
                      {Number(
                        item.nota
                      ).toFixed(1)}
                    </Text>

                  </View>

                </View>

              )
            )

          )}

        </>

      ) : (

        <View style={styles.emptyContainer}>

          <Ionicons
            name="school-outline"
            size={55}
            color="#999"
          />

          <Text style={styles.emptyTitle}>
            Selecione um aluno
          </Text>

          <Text style={styles.emptyText}>
            Escolha um aluno para visualizar o boletim.
          </Text>

        </View>

      )}

    </ScrollView>

  );

}


function SobreScreen() {

  return (

    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: 40
      }}
    >

      <View style={styles.header}>

        <View style={{ flex: 1 }}>

          <Text style={styles.headerTitle}>
            Sobre
          </Text>

          <Text style={styles.headerSubtitle}>
            Informações do sistema
          </Text>

        </View>

      </View>


      <View style={styles.aboutCard}>

        <View style={styles.aboutIcon}>

          <Ionicons
            name="school"
            size={55}
            color="#2563eb"
          />

        </View>


        <Text style={styles.aboutTitle}>
          App Scholar
        </Text>


        <Text style={styles.aboutVersion}>
          Versão 1.0.0
        </Text>


        <Text style={styles.aboutText}>
          Sistema de gestão acadêmica desenvolvido
          para facilitar o gerenciamento de alunos,
          professores, coordenadores, responsáveis,
          cursos, turmas, disciplinas, avaliações
          e boletins.
        </Text>

      </View>


      <View style={styles.aboutInfoCard}>

        <Text style={styles.aboutInfoTitle}>
          Funcionalidades
        </Text>


        <View style={styles.aboutRow}>

          <Ionicons
            name="people-outline"
            size={23}
            color="#2563eb"
          />

          <Text style={styles.aboutRowText}>
            Gerenciamento de alunos
          </Text>

        </View>


        <View style={styles.aboutRow}>

          <Ionicons
            name="person-outline"
            size={23}
            color="#16a34a"
          />

          <Text style={styles.aboutRowText}>
            Gerenciamento de professores
          </Text>

        </View>


        <View style={styles.aboutRow}>

          <Ionicons
            name="school-outline"
            size={23}
            color="#9333ea"
          />

          <Text style={styles.aboutRowText}>
            Gerenciamento de turmas e cursos
          </Text>

        </View>


        <View style={styles.aboutRow}>

          <Ionicons
            name="book-outline"
            size={23}
            color="#dc2626"
          />

          <Text style={styles.aboutRowText}>
            Gerenciamento de disciplinas
          </Text>

        </View>


        <View style={styles.aboutRow}>

          <Ionicons
            name="clipboard-outline"
            size={23}
            color="#ea580c"
          />

          <Text style={styles.aboutRowText}>
            Avaliações e boletins
          </Text>

        </View>

      </View>


      <View style={styles.aboutInfoCard}>

        <Text style={styles.aboutInfoTitle}>
          Tecnologia
        </Text>


        <Text style={styles.aboutText}>
          Aplicação desenvolvida com React Native
          e Expo, utilizando navegação entre telas,
          gerenciamento de estado e integração
          com API PHP/MySQL.
        </Text>

      </View>

    </ScrollView>

  );

}



const Stack =
  createNativeStackNavigator();

const Tab =
  createBottomTabNavigator();



function MainTabs() {

  return (

    <Tab.Navigator

      screenOptions={({ route }) => ({

        headerShown: false,

        tabBarActiveTintColor:
          '#2563eb',

        tabBarInactiveTintColor:
          '#777',

        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          paddingTop: 5
        },

        tabBarLabelStyle: {
          fontSize: 11
        },


        tabBarIcon: ({
          color,
          size
        }) => {

          let nome =
            'home-outline';


          if (
            route.name === 'Início'
          ) {

            nome =
              'home-outline';

          }


          if (
            route.name === 'Alunos'
          ) {

            nome =
              'people-outline';

          }


          if (
            route.name === 'Turmas'
          ) {

            nome =
              'school-outline';

          }


          if (
            route.name === 'Boletim'
          ) {

            nome =
              'document-text-outline';

          }


          if (
            route.name === 'Sobre'
          ) {

            nome =
              'information-circle-outline';

          }


          return (

            <Ionicons
              name={nome}
              size={size}
              color={color}
            />

          );

        }

      })}

    >

      <Tab.Screen
        name="Início"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Alunos"
        component={AlunosScreen}
      />

      <Tab.Screen
        name="Turmas"
        component={TurmasScreen}
      />

      <Tab.Screen
        name="Boletim"
        component={BoletimScreen}
      />

      <Tab.Screen
        name="Sobre"
        component={SobreScreen}
      />

    </Tab.Navigator>

  );

}


function AppNavigator() {

  return (

    <NavigationContainer>

      <Stack.Navigator>

        <Stack.Screen
          name="Principal"
          component={MainTabs}
          options={{
            headerShown: false
          }}
        />


        <Stack.Screen
          name="Professores"
          component={ProfessoresScreen}
          options={{
            title: 'Professores'
          }}
        />


        <Stack.Screen
          name="Coordenadores"
          component={CoordenadoresScreen}
          options={{
            title: 'Coordenadores'
          }}
        />


        <Stack.Screen
          name="Responsáveis"
          component={ResponsaveisScreen}
          options={{
            title: 'Responsáveis'
          }}
        />


        <Stack.Screen
          name="Matrículas"
          component={MatriculasScreen}
          options={{
            title: 'Matrículas'
          }}
        />


        <Stack.Screen
          name="Cursos"
          component={CursosScreen}
          options={{
            title: 'Cursos'
          }}
        />


        <Stack.Screen
          name="Disciplinas"
          component={DisciplinasScreen}
          options={{
            title: 'Disciplinas'
          }}
        />


        <Stack.Screen
          name="Avaliações"
          component={AvaliacoesScreen}
          options={{
            title: 'Avaliações'
          }}
        />

      </Stack.Navigator>

    </NavigationContainer>

  );

}



const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f5f7fb'
  },


  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb'
  },


  headerTitle: {
    fontSize: 25,
    fontWeight: '800',
    color: '#111827'
  },


  headerSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4
  },


  headerButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center'
  },


  welcomeCard: {
    margin: 16,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2
    }
  },


  welcomeIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15
  },


  welcomeTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 5
  },


  welcomeText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#6b7280'
  },


  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#111827',
    marginHorizontal: 16,
    marginTop: 18,
    marginBottom: 12
  },


  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10
  },


  statCard: {
    width: '46%',
    margin: '2%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 17,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2
    }
  },


  statValue: {
    fontSize: 27,
    fontWeight: '800',
    color: '#111827',
    marginTop: 8
  },


  statLabel: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 3
  },


  menuCard: {
    marginHorizontal: 16,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 1
    }
  },


  menuIcon: {
    width: 46,
    height: 46,
    borderRadius: 13,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13
  },


  menuTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827'
  },


  menuText: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 3
  },


  card: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 1
    }
  },


  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13
  },


  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4
  },


  cardText: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2
  },


  studentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 15,
    marginBottom: 11,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 1
    }
  },


  studentAvatar: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: '#dbeafe',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13
  },


  studentAvatarText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2563eb'
  },


  studentName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 3
  },


  studentInfo: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2
  },


  statusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#dcfce7',
    borderRadius: 20,
    paddingHorizontal: 9,
    paddingVertical: 4,
    marginTop: 7
  },


  statusBadgeInactive: {
    backgroundColor: '#fee2e2'
  },


  statusText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#15803d'
  },


  statusTextInactive: {
    color: '#dc2626'
  },


  statusButton: {
    padding: 5,
    marginLeft: 5
  },


  searchContainer: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: '#ffffff',
    borderRadius: 13,
    minHeight: 50,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb'
  },


  searchInput: {
    flex: 1,
    marginLeft: 9,
    fontSize: 15,
    color: '#111827'
  },


  listHeader: {
    paddingHorizontal: 17,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },


  listHeaderText: {
    fontSize: 13,
    color: '#6b7280'
  },


  classCard: {
    backgroundColor: '#ffffff',
    borderRadius: 17,
    padding: 17,
    marginBottom: 12,
    flexDirection: 'row',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 1
    }
  },


  classIcon: {
    width: 53,
    height: 53,
    borderRadius: 16,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14
  },


  choiceButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    paddingHorizontal: 13,
    paddingVertical: 9,
    marginRight: 8,
    marginBottom: 4
  },


  choiceButtonSelected: {
    backgroundColor: '#2563eb'
  },


  choiceButtonText: {
    color: '#374151',
    fontSize: 12,
    fontWeight: '600'
  },


  choiceButtonTextSelected: {
    color: '#ffffff'
  },


  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end'
  },


  modalContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    maxHeight: '90%'
  },


  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 20
  },


  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 7,
    marginTop: 8
  },


  input: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 11,
    minHeight: 48,
    paddingHorizontal: 13,
    fontSize: 15,
    color: '#111827',
    marginBottom: 7
  },


  modalButtons: {
    flexDirection: 'row',
    marginTop: 18,
    gap: 10
  },


  cancelButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: 11,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center'
  },


  cancelButtonText: {
    color: '#374151',
    fontSize: 15,
    fontWeight: '700'
  },


  saveButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: 11,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center'
  },


  saveButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700'
  },


  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 45
  },


  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#374151',
    marginTop: 12,
    textAlign: 'center'
  },


  emptyText: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 6,
    textAlign: 'center',
    lineHeight: 19
  },


  loadingSmall: {
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 9,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4
  },


  loadingText: {
    fontSize: 12,
    color: '#374151',
    marginLeft: 7
  },


  gradeCircle: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10
  },


  gradeCircleText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#2563eb'
  },


  reportHeader: {
    margin: 16,
    padding: 17,
    borderRadius: 17,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1
  },


  averageCard: {
    marginHorizontal: 16,
    marginBottom: 10,
    backgroundColor: '#2563eb',
    borderRadius: 18,
    padding: 22,
    alignItems: 'center'
  },


  averageLabel: {
    color: '#dbeafe',
    fontSize: 14,
    fontWeight: '600'
  },


  averageValue: {
    color: '#ffffff',
    fontSize: 42,
    fontWeight: '900',
    marginVertical: 5
  },


  averageStatus: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600'
  },


  aboutCard: {
    margin: 16,
    padding: 25,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    elevation: 2
  },


  aboutIcon: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15
  },


  aboutTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#111827'
  },


  aboutVersion: {
    color: '#6b7280',
    fontSize: 13,
    marginTop: 5,
    marginBottom: 15
  },


  aboutText: {
    color: '#6b7280',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center'
  },


  aboutInfoCard: {
    marginHorizontal: 16,
    marginBottom: 15,
    padding: 19,
    borderRadius: 17,
    backgroundColor: '#ffffff',
    elevation: 1
  },


  aboutInfoTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 14
  },


  aboutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9
  },


  aboutRowText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#374151',
    flex: 1
  }

});


export default function App() {

  return (

    <ScholarProvider>

      <AppNavigator />

    </ScholarProvider>

  );

}