import * as React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PopularPage from './src/page/PopularPage.tsx';
import ProfilePage from './src/page/ProfilePage.tsx';
import TrendingPage from './src/page/TrendingPage.tsx';
import FavoritePage from './src/page/FavoritePage.tsx';
import MyPage from './src/page/MyPage.tsx';
import DetailsPage from './src/page/DetailsPage.tsx';

// 图标
const TabBarIconHot = ({color, size}: {color: string; size: number}) => (
  <MaterialIcons name="whatshot" size={size} color={color} />
);
const TabBarIconTrending = ({color, size}: {color: string; size: number}) => (
  <MaterialIcons name="trending-up" size={size} color={color} />
);
const TabBarIconFavorite = ({color, size}: {color: string; size: number}) => (
  <MaterialIcons name="favorite" size={size} color={color} />
);
const TabBarIconMy = ({color, size}: {color: string; size: number}) => (
  <Ionicons name="person" size={size} color={color} />
);

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Tabs
function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Popular"
        component={PopularPage}
        options={{
          tabBarLabel: '最热',
          tabBarIcon: TabBarIconHot,
          headerShown: false, //是否显示头部标题
        }}
      />
      <Tab.Screen
        name="Trending"
        component={TrendingPage}
        options={{
          tabBarLabel: '趋势',
          tabBarIcon: TabBarIconTrending,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoritePage}
        options={{
          tabBarLabel: '收藏',
          tabBarIcon: TabBarIconFavorite,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="My"
        component={MyPage}
        options={{
          tabBarLabel: '我的',
          tabBarIcon: TabBarIconMy,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={BottomTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Profile" component={ProfilePage} />
      <Stack.Screen name="Details" component={DetailsPage} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  iconImg: {
    width: 20,
    height: 20,
  },
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
