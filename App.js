import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';

export default function App() {

  const [aba, setAba] = useState('emprestadas');
  const [pesquisa, setPesquisa] = useState('');
  const [modal, setModal] = useState(false);

  const [bolas, setBolas] = useState([
    {
      id: 1,
      nome: 'Basquete #1',
      pessoa: 'Ana Costa',
      iniciais: 'AC',
      local: 'Quadra 2',
      horario: '09:30',
      tempo: '5h 4min',
      emoji: '🏀',
      cor: '#ff7135',
    },

    {
      id: 2,
      nome: 'Vôlei #1',
      pessoa: 'Gabi Torres',
      iniciais: 'GT',
      local: 'Ginásio',
      horario: '10:00',
      tempo: '4h 34min',
      emoji: '🏐',
      cor: '#ff3d8d',
    },

    {
      id: 3,
      nome: 'Futebol #2',
      pessoa: 'Carla Matos',
      iniciais: 'CM',
      local: 'Aula de educação física',
      horario: '11:05',
      tempo: '3h 29min',
      emoji: '⚽',
      cor: '#a9e91e',
    },

    {
      id: 4,
      nome: 'Handebol #1',
      pessoa: 'Felipe Nunes',
      iniciais: 'FN',
      local: 'Torneio',
      horario: '09:00',
      tempo: '5h 34min',
      emoji: '🤾',
      cor: '#9b7aff',
    },
  ]);

  // FILTRO DE PESQUISA

  const bolasFiltradas = bolas.filter((bola) => {

    const texto = pesquisa.toLowerCase();

    return (
      bola.nome.toLowerCase().includes(texto) ||
      bola.pessoa.toLowerCase().includes(texto) ||
      bola.local.toLowerCase().includes(texto)
    );

  });


  // DEVOLVER BOLA

  function devolver(id, nome) {

    Alert.alert(
      'Devolver bola',
      `Deseja devolver ${nome}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },

        {
          text: 'Devolver',

          onPress: () => {

            setBolas(
              bolas.filter(
                (bola) => bola.id !== id
              )
            );

            Alert.alert(
              'Sucesso',
              `${nome} foi devolvida!`
            );

          },
        },
      ]
    );
  }


  return (

    <View style={styles.container}>

      {/* CABEÇALHO */}

      <View style={styles.header}>

        <View>

          <Text style={styles.controle}>
            CONTROLE DE
          </Text>

          <Text style={styles.titulo}>
            Bolas Esportivas
          </Text>

        </View>


        {/* BOTÃO EMPRESTAR */}

        <TouchableOpacity
          style={styles.botaoEmprestar}
          onPress={() => setModal(true)}
        >

          <Text style={styles.plus}>
            +
          </Text>

          <Text style={styles.textoEmprestar}>
            Emprestar
          </Text>

        </TouchableOpacity>


        {/* ESTATÍSTICAS */}

        <View style={styles.estatisticas}>

          <View style={styles.estatistica}>

            <Text style={styles.numero}>
              4
            </Text>

            <Text style={styles.label}>
              Com alguém
            </Text>

          </View>


          <View style={styles.estatistica}>

            <Text style={styles.numero}>
              5
            </Text>

            <Text style={styles.label}>
              Disponíveis
            </Text>

          </View>


          <View style={styles.estatistica}>

            <Text style={styles.numero}>
              3
            </Text>

            <Text style={styles.label}>
              Devolvidas
            </Text>

          </View>

        </View>

      </View>


      {/* CONTEÚDO */}

      <ScrollView
        style={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >


        {/* PESQUISA */}

        <View style={styles.pesquisa}>

          <Text style={styles.lupa}>
            🔍
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Buscar pessoa ou bola..."
            placeholderTextColor="#999"
            value={pesquisa}
            onChangeText={setPesquisa}
          />

        </View>


        {/* ABAS */}

        <View style={styles.abas}>

          <TouchableOpacity
            style={[
              styles.aba,
              aba === 'emprestadas' &&
                styles.abaAtiva
            ]}
            onPress={() => setAba('emprestadas')}
          >

            <Text
              style={[
                styles.textoAba,
                aba === 'emprestadas' &&
                  styles.textoAbaAtivo
              ]}
            >
              Com alguém (4)
            </Text>

          </TouchableOpacity>


          <TouchableOpacity
            style={[
              styles.aba,
              aba === 'disponiveis' &&
                styles.abaAtiva
            ]}
            onPress={() => setAba('disponiveis')}
          >

            <Text
              style={[
                styles.textoAba,
                aba === 'disponiveis' &&
                  styles.textoAbaAtivo
              ]}
            >
              Disponível (5)
            </Text>

          </TouchableOpacity>


          <TouchableOpacity
            style={[
              styles.aba,
              aba === 'historico' &&
                styles.abaAtiva
            ]}
            onPress={() => setAba('historico')}
          >

            <Text
              style={[
                styles.textoAba,
                aba === 'historico' &&
                  styles.textoAbaAtivo
              ]}
            >
              Histórico (3)
            </Text>

          </TouchableOpacity>

        </View>


        {/* LISTA */}

        {aba === 'emprestadas' && (

          <View>

            {bolasFiltradas.map((bola) => (

              <View
                style={styles.card}
                key={bola.id}
              >

                {/* BOLA */}

                <View
                  style={[
                    styles.icone,
                    {
                      backgroundColor:
                        bola.cor,
                    },
                  ]}
                >

                  <Text style={styles.emoji}>
                    {bola.emoji}
                  </Text>

                </View>


                {/* INFORMAÇÕES */}

                <View style={styles.informacoes}>

                  <View style={styles.linhaTitulo}>

                    <Text style={styles.nomeBola}>
                      {bola.nome}
                    </Text>

                    <Text style={styles.emUso}>
                      Em uso
                    </Text>

                  </View>


                  <View style={styles.pessoa}>

                    <View style={styles.avatar}>

                      <Text style={styles.avatarTexto}>
                        {bola.iniciais}
                      </Text>

                    </View>

                    <Text style={styles.nomePessoa}>
                      {bola.pessoa}
                    </Text>

                  </View>


                  <Text style={styles.local}>
                    {bola.local}
                  </Text>

                </View>


                {/* HORÁRIO */}

                <View style={styles.horario}>

                  <Text style={styles.hora}>
                    {bola.horario}
                  </Text>

                  <Text style={styles.tempo}>
                    {bola.tempo}
                  </Text>


                  <TouchableOpacity
                    style={styles.botaoDevolver}
                    onPress={() =>
                      devolver(
                        bola.id,
                        bola.nome
                      )
                    }
                  >

                    <Text style={styles.devolver}>
                      Devolver
                    </Text>

                  </TouchableOpacity>

                </View>

              </View>

            ))}

          </View>

        )}


        {aba === 'disponiveis' && (

          <View style={styles.mensagem}>

            <Text style={styles.mensagemTitulo}>
              ⚽ Bolas disponíveis
            </Text>

            <Text style={styles.mensagemTexto}>
              Existem 5 bolas disponíveis para empréstimo.
            </Text>

          </View>

        )}


        {aba === 'historico' && (

          <View style={styles.mensagem}>

            <Text style={styles.mensagemTitulo}>
              📋 Histórico
            </Text>

            <Text style={styles.mensagemTexto}>
              3 bolas foram devolvidas recentemente.
            </Text>

          </View>

        )}

      </ScrollView>


      {/* MODAL */}

      <Modal
        visible={modal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModal(false)}
      >

        <View style={styles.modalFundo}>

          <View style={styles.modal}>

            <TouchableOpacity
              style={styles.fechar}
              onPress={() => setModal(false)}
            >

              <Text style={styles.x}>
                ×
              </Text>

            </TouchableOpacity>


            <Text style={styles.modalTitulo}>
              Novo empréstimo
            </Text>

            <Text style={styles.modalDescricao}>
              Cadastre uma nova bola emprestada.
            </Text>


            <Text style={styles.modalLabel}>
              Bola
            </Text>

            <View style={styles.select}>

              <Text>
                Basquete #1
              </Text>

            </View>


            <Text style={styles.modalLabel}>
              Pessoa
            </Text>

            <TextInput
              style={styles.modalInput}
              placeholder="Nome da pessoa"
            />


            <Text style={styles.modalLabel}>
              Local
            </Text>

            <TextInput
              style={styles.modalInput}
              placeholder="Ex.: Quadra 2"
            />


            <TouchableOpacity
              style={styles.salvar}
              onPress={() => {

                Alert.alert(
                  'Sucesso',
                  'Empréstimo registrado!'
                );

                setModal(false);

              }}
            >

              <Text style={styles.salvarTexto}>
                Registrar empréstimo
              </Text>

            </TouchableOpacity>

          </View>

        </View>

      </Modal>

    </View>

  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },


  // CABEÇALHO

  header: {
    backgroundColor: '#df0000',
    paddingTop: 55,
    paddingHorizontal: 18,
    paddingBottom: 14,
  },


  controle: {
    color: '#fff',
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1,
  },


  titulo: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },


  botaoEmprestar: {
    position: 'absolute',
    right: 17,
    top: 63,
    backgroundColor: '#fff',
    borderRadius: 18,
    height: 35,
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
  },


  plus: {
    color: '#df0000',
    fontSize: 19,
    marginRight: 3,
  },


  textoEmprestar: {
    color: '#df0000',
    fontSize: 10,
    fontWeight: 'bold',
  },


  // ESTATÍSTICAS

  estatisticas: {
    flexDirection: 'row',
    gap: 9,
    marginTop: 13,
  },


  estatistica: {
    flex: 1,
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },


  numero: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },


  label: {
    color: '#fff',
    fontSize: 8,
    fontWeight: 'bold',
  },


  // CONTEÚDO

  conteudo: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 12,
  },


  // PESQUISA

  pesquisa: {
    height: 34,
    backgroundColor: '#fff',
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
  },


  lupa: {
    fontSize: 13,
    marginRight: 7,
  },


  input: {
    flex: 1,
    fontSize: 11,
    color: '#333',
  },


  // ABAS

  abas: {
    flexDirection: 'row',
    gap: 7,
    marginVertical: 10,
  },


  aba: {
    backgroundColor: '#e7e7e7',
    borderRadius: 15,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },


  abaAtiva: {
    backgroundColor: '#df0000',
  },


  textoAba: {
    color: '#555',
    fontSize: 9,
    fontWeight: 'bold',
  },


  textoAbaAtivo: {
    color: '#fff',
  },


  // CARD

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    minHeight: 92,
    marginBottom: 9,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },


  // ÍCONE

  icone: {
    width: 34,
    height: 34,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },


  emoji: {
    fontSize: 18,
  },


  // INFORMAÇÕES

  informacoes: {
    flex: 1,
  },


  linhaTitulo: {
    flexDirection: 'row',
    alignItems: 'center',
  },


  nomeBola: {
    fontSize: 11,
    fontWeight: 'bold',
  },


  emUso: {
    color: '#df0000',
    backgroundColor: '#ffe5e5',
    borderRadius: 5,
    fontSize: 7,
    fontWeight: 'bold',
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginLeft: 4,
  },


  pessoa: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },


  avatar: {
    width: 16,
    height: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ff7777',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },


  avatarTexto: {
    color: '#df0000',
    fontSize: 7,
    fontWeight: 'bold',
  },


  nomePessoa: {
    fontSize: 10,
  },


  local: {
    color: '#888',
    fontSize: 8,
    marginTop: 2,
  },


  // HORÁRIO

  horario: {
    width: 55,
    alignItems: 'flex-end',
    alignSelf: 'flex-start',
  },


  hora: {
    color: '#777',
    fontSize: 8,
  },


  tempo: {
    color: '#df0000',
    backgroundColor: '#fff0f0',
    borderRadius: 5,
    paddingHorizontal: 4,
    paddingVertical: 3,
    fontSize: 7,
    fontWeight: 'bold',
    marginTop: 5,
  },


  botaoDevolver: {
    backgroundColor: '#df0000',
    borderRadius: 9,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginTop: 5,
  },


  devolver: {
    color: '#fff',
    fontSize: 8,
    fontWeight: 'bold',
  },


  // MENSAGENS

  mensagem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },


  mensagemTitulo: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 7,
  },


  mensagemTexto: {
    color: '#777',
    fontSize: 11,
    textAlign: 'center',
  },


  // MODAL

  modalFundo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },


  modal: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 22,
  },


  fechar: {
    position: 'absolute',
    right: 12,
    top: 8,
  },


  x: {
    fontSize: 25,
    color: '#555',
  },


  modalTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
  },


  modalDescricao: {
    color: '#777',
    fontSize: 12,
    marginTop: 5,
    marginBottom: 18,
  },


  modalLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 5,
  },


  select: {
    height: 38,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 9,
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginBottom: 12,
  },


  modalInput: {
    height: 38,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 9,
    paddingHorizontal: 10,
    marginBottom: 12,
    fontSize: 12,
  },


  salvar: {
    height: 40,
    backgroundColor: '#df0000',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },


  salvarTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },

});