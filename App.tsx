import type {FC} from 'react';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const App: FC = () => {
  return (
    <View style={styles.container}>
      <Text style={[styles.red, styles.center]}>相当6666</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 500,
  },
  center: {
    textAlign: 'center',
  },
  red: {
    color: 'red',
  },
});

export default App;
