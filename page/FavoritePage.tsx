import type {FC} from 'react';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const FavoritePage: FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>FavoritePage</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFC',
  },
  welcomeText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    margin: 20,
  },
});
