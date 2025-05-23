import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type CategoryProps = {
  id: number;
  name: string;
  description: string;
};

export default function Category({ name, description }: CategoryProps) {
  return (
    <View style={styles.box}>
      <Text style={styles.title}>{name}</Text>
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
