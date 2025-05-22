import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { db } from './firebaseConfig';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default function HistoricoScreen() {
  const [historico, setHistorico] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarHistorico = async () => {
      try {
        const vendasRef = collection(db, 'historico_vendas');
        const q = query(vendasRef, orderBy('timestamp', 'desc'));
        const snapshot = await getDocs(q);
        const dados = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setHistorico(dados);
      } catch (error) {
        console.error('Erro ao buscar histórico:', error);
      } finally {
        setCarregando(false);
      }
    };

    carregarHistorico();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📜 Histórico de Vendas</Text>

      {carregando ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : historico.length === 0 ? (
        <Text style={styles.empty}>Nenhuma venda registrada ainda.</Text>
      ) : (
        historico.map((item, index) => (
          <View key={item.id} style={styles.card}>
            <Text>🎪 Nome: {item.nome}</Text>
            <Text>📦 Pacotes Iniciais: {item.pacotes}</Text>
            <Text>✅ Vendidos: {item.vendidos}</Text>
            <Text>📉 Restantes: {item.restantes}</Text>
            <Text>💰 Total Vendido: R$ {item.totalVendido.toFixed(2)}</Text>
            <Text style={styles.timestamp}>
              🕒 {new Date(item.timestamp.seconds * 1000).toLocaleString()}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  timestamp: {
    marginTop: 10,
    fontSize: 12,
    color: '#6c757d',
  },
  empty: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 30,
    color: '#888',
  },
});
