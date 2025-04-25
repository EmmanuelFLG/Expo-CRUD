import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type InstrumentProps = {
  id: number;
  name: string;
  brand: string;
  stock: number;
  description: string;
  price: string;
};

export default function Instrument({ name, brand, stock, description, price }: InstrumentProps) {
  return (
    <View style={styles.box}>
      <Text style={styles.title}>{name} ({brand})</Text>
      <Text>Stock: {stock}</Text>
      <Text>Price: ${price}</Text>
      <Text>{description}</Text>
    </View>
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
