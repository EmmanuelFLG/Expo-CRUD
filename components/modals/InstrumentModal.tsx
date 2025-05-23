import React, { useState, useEffect } from 'react';
import { Modal, TextInput, Button, View, StyleSheet, Text } from 'react-native';
import { InstrumentProps } from '../instrument/Instrument';

export type InstrumentModalProps = {
  visible: boolean;
  onClose: () => void;
  onAdd: (newInstrument: Omit<InstrumentProps, 'id'>) => void;
  onUpdate: (instrument: InstrumentProps) => void;
  editingInstrument?: InstrumentProps | null;
};

export default function InstrumentModal({ visible, onClose, onAdd, onUpdate, editingInstrument }: InstrumentModalProps) {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (editingInstrument) {
      setName(editingInstrument.name);
      setBrand(editingInstrument.brand);
      setStock(editingInstrument.stock.toString());
      setDescription(editingInstrument.description);
      setPrice(editingInstrument.price);
    } else {
      setName('');
      setBrand('');
      setStock('');
      setDescription('');
      setPrice('');
    }
  }, [editingInstrument]);

  const handleSubmit = () => {
    if (!name || !brand || !stock || !description || !price) {
      alert("Please fill in all fields.");
      return;
    }

    const instrumentData = {
      name,
      brand,
      stock: Number(stock),
      description,
      price,
    };

    if (editingInstrument) {
      onUpdate({ ...instrumentData, id: editingInstrument.id });
    } else {
      onAdd(instrumentData);
    }

    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContent}>
        <Text style={styles.title}>
          {editingInstrument ? "Edit Instrument" : "Add New Instrument"}
        </Text>

        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Brand"
          value={brand}
          onChangeText={setBrand}
          style={styles.input}
        />
        <TextInput
          placeholder="Stock"
          value={stock}
          onChangeText={setStock}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />
        <TextInput
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
          keyboardType="decimal-pad"
          style={styles.input}
        />

        <Button
          title={editingInstrument ? "Update Instrument" : "Add Instrument"}
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
