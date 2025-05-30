import React, { useEffect, useState } from 'react';
import { FlatList, Text, Button, StyleSheet, View } from 'react-native';
import InstrumentModal from '@/components/modals/InstrumentModal';
import Instrument from '@/components/instrument/Instrument';
import { Instruments } from '@/interfaces/Instruments';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

const InstrumentIndex = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [instruments, setInstruments] = useState<Instruments[]>([]);
  const [editingInstrument, setEditingInstrument] = useState<Instruments | null>(null);


  const [location, setLocation] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    async function getData() {
      try {
        const data = await AsyncStorage.getItem('@InstrumentsApp:instruments');
        const instrumentsData = data != null ? JSON.parse(data) : [];
        setInstruments(instrumentsData);
      } catch (e) {
        console.error('Error retrieving data from AsyncStorage', e);
      }
    }

    getData();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      {if (status !== 'granted')
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(JSON.stringify(location));
    })();
  }, []);

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
    const updatedList = [...instruments, instrumentWithId];
    setInstruments(updatedList);
    AsyncStorage.setItem('@InstrumentsApp:instruments', JSON.stringify(updatedList));
  };

  const updateInstrument = (updated: Instruments) => {
    const updatedList = instruments.map((item) =>
      item.id === updated.id ? updated : item
    );
    setInstruments(updatedList);
    AsyncStorage.setItem('@InstrumentsApp:instruments', JSON.stringify(updatedList));
  };

  const deleteInstrument = (id: number) => {
    const updatedList = instruments.filter((item) => item.id !== id);
    setInstruments(updatedList);
    AsyncStorage.setItem('@InstrumentsApp:instruments', JSON.stringify(updatedList));
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

export default InstrumentIndex;
