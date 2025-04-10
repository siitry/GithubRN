import type {FC} from 'react';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

 const MyPage: FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>MyPage</Text>
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
    textAlign: 'center',
    margin: 20,
  },
});
export default MyPage;
