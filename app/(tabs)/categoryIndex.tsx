import React, { useEffect, useState } from 'react';
import { FlatList, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Category from '../../components/instrument/Category';
import { CategoryType } from '@/interfaces/Categorys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';

const CategoryIndex = () => {
  const router = useRouter();

  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [location, setLocation] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    async function getData() {
      try {
        const data = await AsyncStorage.getItem('@CategoriesApp:categories');
        const stored = data != null ? JSON.parse(data) : [];
        setCategories(stored);
      } catch (e) {
        console.error('Error loading categories from AsyncStorage', e);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(JSON.stringify(location));
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories List</Text>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/categories/${item.id}`)}>
            <Category id={item.id} name={item.name} description={item.description} />
          </TouchableOpacity>
        )}
      />

      <Text style={{ marginTop: 20 }}>
        {errorMsg ? `Erro: ${errorMsg}` : `Localização: ${location}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});

export default CategoryIndex;
