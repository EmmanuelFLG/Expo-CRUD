import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Top 5 Bandas de Rock e suas Músicas</Text>
      <Text style={styles.bandaTexto}>1. Queen - Bohemian Rhapsody</Text>
      <Text style={styles.bandaTexto}>2. Led Zeppelin - Stairway to Heaven</Text>
      <Text style={styles.bandaTexto}>3. Nirvana - Smells Like Teen Spirit</Text>
      <Text style={styles.bandaTexto}>4. Guns N' Roses - Sweet Child O' Mine</Text>
      <Text style={styles.bandaTexto}>5. The Beatles - Hey Jude</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  bandaTexto: {
    fontSize: 18,
    marginBottom: 10,
  },
 });
