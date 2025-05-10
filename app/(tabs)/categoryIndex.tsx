import React, { useEffect, useState } from 'react';
import { FlatList, Text, Button, StyleSheet, View } from 'react-native';
import CategoryModal from '../../components/modals/CategoryModal';
import Category from '../../components/instrument/Category';
import { CategoryType } from '@/interfaces/Categorys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

const CategoryIndex = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [editingCategory, setEditingCategory] = useState<CategoryType | null>(null);

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

  const openModal = () => {
    setEditingCategory(null);
    setModalVisible(true);
  };

  const closeModal = () => {
    setEditingCategory(null);
    setModalVisible(false);
  };

  const addCategory = async (newCategory: Omit<CategoryType, 'id'>) => {
    const newId = categories.length + 1;
    const categoryWithId = { ...newCategory, id: newId };
    const updatedList = [...categories, categoryWithId];
    setCategories(updatedList);
    await AsyncStorage.setItem('@CategoriesApp:categories', JSON.stringify(updatedList));
  };

  const updateCategory = async (updated: CategoryType) => {
    const updatedList = categories.map((item) => (item.id === updated.id ? updated : item));
    setCategories(updatedList);
    await AsyncStorage.setItem('@CategoriesApp:categories', JSON.stringify(updatedList));
  };

  const deleteCategory = async (id: number) => {
    const updatedList = categories.filter((item) => item.id !== id);
    setCategories(updatedList);
    await AsyncStorage.setItem('@CategoriesApp:categories', JSON.stringify(updatedList));
  };

  const handleEdit = (category: CategoryType) => {
    setEditingCategory(category);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories List</Text>

      <Button title="ADD" onPress={openModal} color="#2196F3" />

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Category
            id={item.id}
            name={item.name}
            description={item.description}
            onEdit={() => handleEdit(item)}
            onDelete={() => deleteCategory(item.id)}
          />
        )}
      />

      <CategoryModal
        visible={modalVisible}
        onClose={closeModal}
        onAdd={addCategory}
        onUpdate={updateCategory}
        editingCategory={editingCategory}
      />

      <Text style={{ marginTop: 20 }}>
        {errorMsg ? `Erro: ${errorMsg}` : `Localização: ${location}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default CategoryIndex;
