import type {FC} from 'react';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const TrendingPage: FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>TrendingPage</Text>
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
