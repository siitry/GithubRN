import type {FC} from 'react';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {setTheme} from '@/store/slice.tsx';
import {Dispatch} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {Button} from '@react-navigation/elements';
import {useNavigate} from '@/navigation/Navigate.tsx';

const TrendingPage: FC = () => {
  const dispatch: Dispatch = useDispatch();
  const {navigateTo} = useNavigate();
  const changeTheme = () => {
    dispatch(setTheme({tabBarActiveTintColor: '#2196F3'}));
  };
  const toGetData = () => {
    navigateTo('Fetch');
  }
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>TrendingPage</Text>
      <Button onPress={() => changeTheme()}>修改主题色</Button>
      <Button onPress={() => toGetData()}>跳转数据页</Button>
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
export default TrendingPage;
