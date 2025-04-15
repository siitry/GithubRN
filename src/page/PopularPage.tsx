import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {RootStackParamList} from '../types/types.ts';
// import {Button} from '@react-navigation/elements';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Button} from '@react-navigation/elements';
import {useNavigate} from '@/navigation/Navigate';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch} from '@reduxjs/toolkit';
import {setLanguageInfo, setTheme} from '@/store/slice.tsx';

const Tab = createMaterialTopTabNavigator();

// type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Popular'>;
// const navigation = useNavigation<NavigationProp>();

const PopularPage: React.FC = () => {
  // const navigation = useNavigation<NavigationProp>();
  const {navigateTo} = useNavigate();
  const dispatch: Dispatch = useDispatch();
  const tabNames = [
    'Java',
    'Python',
    'Android',
    'IOS',
    'React Native',
    'PHP',
    'Scss',
    'CSS',
    'Shell',
    'C++',
    'C#',
    '.NET',
  ];

  const toDetails = (id: string | number, name: string) => {
    dispatch(setLanguageInfo({id, name}));
    // dispatch(setTheme('#2196F3')); // 测试设置绿色主题
    navigateTo('Details', {id, name});
  };
  //通用组件页
  const TabContent = ({tabName}: {tabName: string}) => (
    <View style={styles.container}>
      <Text>{tabName} Content</Text>
      <Button onPress={() => toDetails(666, tabName)}>跳转到【{tabName}】详情页</Button>
    </View>
  );

  return (
    <Tab.Navigator
      initialRouteName="Java"
      screenOptions={{
        tabBarLabelStyle: {fontSize: 12},
        tabBarItemStyle: {
          width: 'auto',
          justifyContent: 'center',
        },
        tabBarStyle: {
          backgroundColor: '#66aa9a',
        }, // 设置 tab bar 背景色
        tabBarIndicatorStyle: {
          backgroundColor: '#fff', // 设置指示器颜色
          height: 3, // 设置指示器的高度
        },
        swipeEnabled: true,
        tabBarScrollEnabled: true, // 启用水平滑动
      }}>
      {tabNames.map((item, index) => (
        <Tab.Screen
          key={index}
          name={item}
          children={() => <TabContent tabName={item} />}
        />
      ))}
    </Tab.Navigator>
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
  tabStyle: {
    width: '100%',
  },
});

export default PopularPage;
