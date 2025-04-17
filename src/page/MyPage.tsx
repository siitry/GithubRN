import type {FC} from 'react';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from '@react-navigation/elements';
import {Dispatch} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {useNavigate} from '@/navigation/Navigate';
import {setTheme} from '@/store/slice.tsx';

const MyPage: FC = () => {
  const dispatch: Dispatch = useDispatch();
  const {navigateTo} = useNavigate();
  const changeTheme = () => {
    dispatch(setTheme({tabBarActiveTintColor: '#2196F3'}));
  };
  const toGetData = () => {
    navigateTo('Fetch');
  };
  const toGetDataStore = () => {
    navigateTo('DataStore');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>MyPage</Text>
      <Button onPress={() => changeTheme()}>修改主题色</Button>
      <Button onPress={() => toGetData()}>跳转数据页</Button>
      <Button onPress={() => toGetDataStore()}>跳转获取数据</Button>
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
