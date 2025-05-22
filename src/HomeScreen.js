import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { db } from './firebaseConfig'; 
import { collection, addDoc } from 'firebase/firestore';


export default function HomeScreen() {
  const [nome, setNome] = useState('');
  const [pacotes, setPacotes] = useState('');
  const [valor, setValor] = useState('');
  const [vendidos, setVendidos] = useState('');
  const [resumos, setResumos] = useState([]);

  const registrarEntrada = async () => {
  const pacotesNum = parseInt(pacotes);
  const valorNum = parseFloat(valor);
  const vendidosNum = parseInt(vendidos);

  if (!nome || isNaN(pacotesNum) || isNaN(valorNum) || isNaN(vendidosNum)) {
    alert('Preencha todos os campos corretamente.');
    return;
  }

  if (vendidosNum > pacotesNum) {
    alert('Não é possível vender mais do que o total de pacotes.');
    return;
  }

  const restantes = pacotesNum - vendidosNum;
  const totalVendido = vendidosNum * valorNum;

  const novoResumo = {
    nome,
    pacotes: pacotesNum,
    vendidos: vendidosNum,
    restantes,
    totalVendido,
    timestamp: new Date(),
  };

  // Salvar no estado local
  setResumos([...resumos, novoResumo]);

  // Salvar no Firestore
  try {
    await addDoc(collection(db, 'historico_vendas'), novoResumo);
    console.log('Venda registrada no Firestore');
  } catch (error) {
    console.error('Erro ao salvar no Firestore:', error);
  }

  // Resetar campos
  setNome('');
  setPacotes('');
  setValor('');
  setVendidos('');
};

  const limparResumos = () => {
    setResumos([]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Entrada no Circo</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Pacotes"
        keyboardType="numeric"
        value={pacotes}
        onChangeText={setPacotes}
      />

      <TextInput
        style={styles.input}
        placeholder="Valor por Pacote (R$)"
        keyboardType="numeric"
        value={valor}
        onChangeText={setValor}
      />

      <TextInput
        style={styles.input}
        placeholder="Quantidade Vendida"
        keyboardType="numeric"
        value={vendidos}
        onChangeText={setVendidos}
      />
        
      <Button title="Registrar Entrada" onPress={registrarEntrada} />
      <View style={{ marginTop: 10 }}>
        <Button title="Limpar Resumos" onPress={limparResumos} color="#d9534f" />
      </View>
      <View style={{ marginTop: 20 }}>
        <Button title="Ver Histórico" onPress={() => navigation.navigate('Histórico')} />
      </View>

      {resumos.length > 0 && (
        <View style={styles.resumo}>
          <Text style={styles.subTitle}>Resumos:</Text>
          {resumos.map((resumo, index) => (
            <View key={index} style={{ marginBottom: 15 }}>
              <Text>
                🎪 Nome: {resumo.nome}
                </Text>
              <Text>
                📦 Pacotes Iniciais: {resumo.pacotes}
                </Text>
              <Text>
                ✅ Vendidos: {resumo.vendidos}
                </Text>
              <Text>
                📉 Restantes: {resumo.restantes}
                </Text>
              <Text>
                💰 Total Vendido: R$ {resumo.totalVendido.toFixed(2)}
                </Text>
              <View 
              style={{ borderBottomWidth: 1, marginVertical: 5, borderColor: '#ccc' }} />
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f8f9fa',
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 24,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  resumo: {
    marginTop: 32,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
