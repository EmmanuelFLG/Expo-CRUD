import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function CategoryEdit() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const id = Number(params.id);

  const [category, setCategory] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    async function loadCategory() {
      try {
        const data = await AsyncStorage.getItem('@CategoriesApp:categories');
        const categories = data ? JSON.parse(data) : [];
        const cat = categories.find((c) => c.id === id);
        if (!cat) {
          Alert.alert('Category not found');
          router.back();
          return;
        }
        setCategory(cat);
        setName(cat.name);
        setDescription(cat.description);
      } catch (e) {
        console.error(e);
      }
    }
    loadCategory();
  }, [id]);

  const updateCategory = async () => {
    if (!name || !description) {
      alert('Please fill all fields.');
      return;
    }
    try {
      const data = await AsyncStorage.getItem('@CategoriesApp:categories');
      let categories = data ? JSON.parse(data) : [];
      categories = categories.map((c) =>
        c.id === id ? { id, name, description } : c
      );
      await AsyncStorage.setItem('@CategoriesApp:categories', JSON.stringify(categories));
      router.back();
    } catch (e) {
      console.error(e);
    }
  };

  const deleteCategory = async () => {
    Alert.alert('Confirm delete', 'Are you sure?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            const data = await AsyncStorage.getItem('@CategoriesApp:categories');
            let categories = data ? JSON.parse(data) : [];
            categories = categories.filter((c) => c.id !== id);
            await AsyncStorage.setItem('@CategoriesApp:categories', JSON.stringify(categories));
            router.back();
          } catch (e) {
            console.error(e);
          }
        },
      },
    ]);
  };

  if (!category) {
    return (
      <View style={styles.container}>
        <Text>Loading category...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Category</Text>

      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />

      <Button title="Update" onPress={updateCategory} />
      <Button title="Delete" onPress={deleteCategory} color="red" />
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
