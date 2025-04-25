// InstrumentIndex.tsx
import React, { useState } from 'react';
import { FlatList, Text, Button, StyleSheet, View } from 'react-native';
import InstrumentModal from '@/components/modals/InstrumentModal';
import Instrument from '@/components/instrument/Instrument';
import { Instruments } from '@/interfaces/Instruments';

const InstrumentIndex = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [instruments, setInstruments] = useState<Instruments[]>([]);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const addInstrument = (newInstrument: Omit<Instruments, 'id'>) => {
    const newId = instruments.length + 1;
    const instrumentWithId = { ...newInstrument, id: newId };
    setInstruments([...instruments, instrumentWithId]);
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
            key={item.id}
            name={item.name}
            brand={item.brand}
            stock={item.stock}
            description={item.description}
            price={item.price}
          />
        )}
      />

      <InstrumentModal
        visible={modalVisible}
        onClose={closeModal}
        onAdd={addInstrument}
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
  instrument: {
    padding: 10,
    backgroundColor: '#f8f8f8',
    marginVertical: 5,
    borderRadius: 5,
  },
  button: {
    padding: 8,
    fontSize: 14,
  },
});

export default InstrumentIndex;
