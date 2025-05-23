import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export type InstrumentProps = {
  id: number;
  name: string;
  brand: string;
  stock: number;
  description: string;
  price: string;
  onPress?: () => void;
};

export default function Instrument({ name, brand, stock, description, price, onPress }: InstrumentProps) {
  return (
    <TouchableOpacity style={styles.box} onPress={onPress}>
      <Text style={styles.title}>{name} ({brand})</Text>
      <Text>Stock: {stock}</Text>
      <Text>Price: ${price}</Text>
      <Text>{description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 20,
    borderRadius: 5,
    margin: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
