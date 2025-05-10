import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export type CategoryProps = {
  id: number;
  name: string;
  description: string;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function Category({ name, description, onEdit, onDelete }: CategoryProps) {
  return (
    <View style={styles.box}>
      <Text style={styles.title}>{name}</Text>
      <Text>{description}</Text>

      <View style={styles.buttons}>
        <Button title="Edit" onPress={onEdit} />
        <Button title="Delete" onPress={onDelete} color="red" />
      </View>
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
  buttons: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
});
