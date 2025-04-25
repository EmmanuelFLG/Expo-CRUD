import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';

type MyScrollViewProps = {
  children: React.ReactNode;  // Permite passar conteúdo para dentro do ScrollView
};

const MyScrollView = ({ children }: MyScrollViewProps) => {
  return (
    <ScrollView style={styles.scrollView}>
      {children}  {/* O conteúdo que será rolado */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingHorizontal: 10,
  },
});

export default MyScrollView;
