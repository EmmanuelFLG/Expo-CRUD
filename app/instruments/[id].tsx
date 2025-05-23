
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function InstrumentEdit() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const id = Number(params.id);

  const [instrument, setInstrument] = useState(null);
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    async function loadInstrument() {
      try {
        const data = await AsyncStorage.getItem('@InstrumentsApp:instruments');
        const instruments = data ? JSON.parse(data) : [];
        const inst = instruments.find((i) => i.id === id);
        if (!inst) {
          Alert.alert('Instrument not found');
          router.back();
          return;
        }
        setInstrument(inst);
        setName(inst.name);
        setBrand(inst.brand);
        setStock(inst.stock.toString());
        setDescription(inst.description);
        setPrice(inst.price);
      } catch (e) {
        console.error(e);
      }
    }
    loadInstrument();
  }, [id]);

  const updateInstrument = async () => {
    if (!name || !brand || !stock || !description || !price) {
      alert('Please fill all fields.');
      return;
    }
    try {
      const data = await AsyncStorage.getItem('@InstrumentsApp:instruments');
      let instruments = data ? JSON.parse(data) : [];
      instruments = instruments.map((i) =>
        i.id === id ? { id, name, brand, stock: Number(stock), description, price } : i
      );
      await AsyncStorage.setItem('@InstrumentsApp:instruments', JSON.stringify(instruments));
      router.back();
    } catch (e) {
      console.error(e);
    }
  };

  const deleteInstrument = async () => {
    Alert.alert('Confirm delete', 'Are you sure?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            const data = await AsyncStorage.getItem('@InstrumentsApp:instruments');
            let instruments = data ? JSON.parse(data) : [];
            instruments = instruments.filter((i) => i.id !== id);
            await AsyncStorage.setItem('@InstrumentsApp:instruments', JSON.stringify(instruments));
            router.back();
          } catch (e) {
            console.error(e);
          }
        },
      },
    ]);
  };

  if (!instrument) {
    return (
      <View style={styles.container}>
        <Text>Loading instrument...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Instrument</Text>

      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Brand" value={brand} onChangeText={setBrand} />
      <TextInput
        style={styles.input}
        placeholder="Stock"
        value={stock}
        onChangeText={setStock}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="decimal-pad"
      />

      <Button title="Update" onPress={updateInstrument} />
      <Button title="Delete" onPress={deleteInstrument} color="red" />
      <Button title="Cancel" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 6,
    borderRadius: 4,
  },
});
