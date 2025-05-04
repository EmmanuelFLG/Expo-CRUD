import React, { useState } from 'react';
import { FlatList, Text, Button, StyleSheet, View } from 'react-native';
import InstrumentModal from '@/components/modals/InstrumentModal';
import Instrument from '@/components/instrument/Instrument';
import { Instruments } from '@/interfaces/Instruments';

const InstrumentIndex = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [instruments, setInstruments] = useState<Instruments[]>([]);
  const [editingInstrument, setEditingInstrument] = useState<Instruments | null>(null);

  const openModal = () => {
    setEditingInstrument(null);
    setModalVisible(true);
  };

  const closeModal = () => {
    setEditingInstrument(null);
    setModalVisible(false);
  };

  const addInstrument = (newInstrument: Omit<Instruments, 'id'>) => {
    const newId = instruments.length + 1;
    const instrumentWithId = { ...newInstrument, id: newId };
    setInstruments([...instruments, instrumentWithId]);
  };

  const updateInstrument = (updated: Instruments) => {
    setInstruments((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
  };

  const deleteInstrument = (id: number) => {
    setInstruments((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEdit = (instrument: Instruments) => {
    setEditingInstrument(instrument);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Instruments List</Text>

      <Button title="ADD" onPress={openModal} color="#4CAF50" />

      <FlatList
        data={instruments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Instrument
            id={item.id}
            name={item.name}
            brand={item.brand}
            stock={item.stock}
            description={item.description}
            price={item.price}
            onEdit={() => handleEdit(item)}
            onDelete={() => deleteInstrument(item.id)}
          />
        )}
      />

      <InstrumentModal
        visible={modalVisible}
        onClose={closeModal}
        onAdd={addInstrument}
        onUpdate={updateInstrument}
        editingInstrument={editingInstrument}
      />
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

export default InstrumentIndex;
