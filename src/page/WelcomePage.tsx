import React, {FC, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const WelcomePage: FC = ({}) => {
  useEffect(() => {}, []);
  return (
    <View style={styles.container}>
      {/*<Text style={styles}>666</Text>*/}
      <Text>WelcomePage</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
