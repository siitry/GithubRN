import type {FC} from 'react';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ProfilePage: FC = () => {
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
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
});

export default ProfilePage;
