import type {FC} from 'react';
import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button} from '@react-navigation/elements';
import {Dispatch} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {useNavigate} from '@/navigation/Navigate';
import {setTheme} from '@/store/slice.tsx';
import NavigationBar from '@/components/NavigationBar.tsx';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const THEME_COLOR = '#2187b4';
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

  const getRightButton = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity>
          <View style={{padding: 5, marginRight: 8}}>
            <MaterialIcons name="search" size={24} color={'white'} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const getLeftButton = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity>
          <View style={{padding: 8, marginLeft: 12}}>
            <MaterialIcons
              name="arrow-back-ios-new"
              size={24}
              color={'white'}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <NavigationBar
        title={'我的'}
        statusBar={{
          backgroundColor: THEME_COLOR,
          barStyle: 'light-content',
        }}
        style={{backgroundColor: THEME_COLOR}}
        rightButton={getRightButton()}
        leftButton={getLeftButton()}
      />
      <Text style={styles.welcomeText}>MyPage</Text>
      <Button onPress={() => changeTheme()}>修改主题色</Button>
      <Button onPress={() => toGetData()}>跳转数据页</Button>
      <Button onPress={() => toGetDataStore()}>跳转获取数据</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFC',
    // marginTop: Platform.OS === 'ios' ? 30 : 0,
  },
  welcomeText: {
    textAlign: 'center',
    margin: 20,
  },
  icon: {
    color: 'white',
  },
});
export default MyPage;
