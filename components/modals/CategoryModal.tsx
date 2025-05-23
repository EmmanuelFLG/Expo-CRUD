import React, { useState, useEffect } from 'react';
import { Modal, TextInput, Button, View, StyleSheet, Text } from 'react-native';

export type CategoryProps = {
  id: number;
  name: string;
  description: string;
};

export type CategoryModalProps = {
  visible: boolean;
  onClose: () => void;
  onAdd: (newCategory: Omit<CategoryProps, 'id'>) => void;
  onUpdate: (category: CategoryProps) => void;
  editingCategory?: CategoryProps | null;
};

export default function CategoryModal({
  visible,
  onClose,
  onAdd,
  onUpdate,
  editingCategory,
}: CategoryModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editingCategory) {
      setName(editingCategory.name);
      setDescription(editingCategory.description);
    } else {
      setName('');
      setDescription('');
    }
  }, [editingCategory]);

  const handleSubmit = () => {
    if (!name || !description) {
      alert("Please fill in all fields.");
      return;
    }

    const categoryData = {
      name,
      description,
    };

    if (editingCategory) {
      onUpdate({ ...categoryData, id: editingCategory.id });
    } else {
      onAdd(categoryData);
    }

    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContent}>
        <Text style={styles.title}>
          {editingCategory ? "Edit Category" : "Add New Category"}
        </Text>

        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />

        <Button
          title={editingCategory ? "Update Category" : "Add Category"}
          onPress={handleSubmit}
        />
        <Button title="Cancel" onPress={onClose} color="red" />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});
