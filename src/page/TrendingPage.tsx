import type {FC} from 'react';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import NavigationBar from '@/components/NavigationBar';

const THEME_COLOR = '#2187b4';
const TrendingPage: FC = () => {
  return (
    <View style={styles.container}>
      {/*<NavigationBar*/}
      {/*  title={'最热'}*/}
      {/*  statusBar={{*/}
      {/*    backgroundColor: THEME_COLOR,*/}
      {/*    barStyle: 'light-content',*/}
      {/*  }}*/}
      {/*  style={{backgroundColor: THEME_COLOR}}*/}
      {/*/>*/}
      <Text style={styles.welcomeText}>TrendingPage</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFC',
  },
  welcomeText: {
    textAlign: 'center',
    margin: 20,
  },
});
export default TrendingPage;
