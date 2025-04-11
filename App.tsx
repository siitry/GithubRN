import * as React from 'react';
import {Provider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {StyleSheet, Text, View} from 'react-native';
import {
  NavigationContainer,
  useLinkBuilder,
  useTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PopularPage from '@/page/PopularPage';
import ProfilePage from '@/page/ProfilePage';
import TrendingPage from '@/page/TrendingPage';
import FavoritePage from '@/page/FavoritePage';
import MyPage from '@/page/MyPage';
import DetailsPage from '@/page/DetailsPage';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import store, {persistor} from '@/store/store.tsx';
import {PlatformPressable} from '@react-navigation/elements';
import {PageParams, Theme} from '@/interface';
import LoadingScreen from '@/components/LoadingScreen.tsx';

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

// function MyTabBar({state, descriptors, navigation}) {
//   const {colors} = useTheme();
//   const {buildHref} = useLinkBuilder();
//
//   return (
//     <View style={{flexDirection: 'row'}}>
//       {state.routes.map((route, index) => {
//         const {options} = descriptors[route.key];
//         const label =
//           options.tabBarLabel !== undefined
//             ? options.tabBarLabel
//             : options.title !== undefined
//             ? options.title
//             : route.name;
//
//         const isFocused = state.index === index;
//
//         const onPress = () => {
//           const event = navigation.emit({
//             type: 'tabPress',
//             target: route.key,
//             canPreventDefault: true,
//           });
//
//           if (!isFocused && !event.defaultPrevented) {
//             navigation.navigate(route.name, route.params);
//           }
//         };
//
//         const onLongPress = () => {
//           navigation.emit({
//             type: 'tabLongPress',
//             target: route.key,
//           });
//         };
//
//         return (
//           <PlatformPressable
//             href={buildHref(route.name, route.params)}
//             accessibilityState={isFocused ? {selected: true} : {}}
//             accessibilityLabel={options.tabBarAccessibilityLabel}
//             testID={options.tabBarButtonTestID}
//             onPress={onPress}
//             onLongPress={onLongPress}
//             style={{flex: 1}}>
//             <Text style={{color: isFocused ? colors.primary : colors.text, textAlign: 'center'}}>
//               {label}
//             </Text>
//           </PlatformPressable>
//         );
//       })}
//     </View>
//   );
// }

// Tabs
function BottomTabs() {

  const theme: Theme = useSelector(
    (state: any) => state.root.theme,
  );
  console.log('当前主题色：', theme);
  // const routes = [
  //   {name: 'Popular', component: PopularPage, tabBarLabel: '最热', tabBarIcon: TabBarIconHot, headerShown: false,},
  // ]
  return (
    <Tab.Navigator
    // tabBar={props => <MyTabBar {...props} />}
    >
      <Tab.Screen
        name="Popular"
        component={PopularPage}
        options={{
          tabBarLabel: '最热',
          tabBarIcon: TabBarIconHot,
          headerShown: false, //是否显示头部标题
          // tabBarLabelStyle: {
          //   fontSize: 16,
          //   fontFamily: 'Georgia',
          //   fontWeight: 300,
          // },
          tabBarBadge: 6, //要在选项卡图标上的徽章中显示的文本。接受 string 或 number
          // tabBarBadgeStyle: {//徽章样式
          //   color: theme.tabBarBadgeStyle.color,
          //   backgroundColor: theme.tabBarBadgeStyle.backgroundColor,
          // },
          tabBarActiveTintColor: theme.tabBarActiveTintColor,//激活
          tabBarInactiveTintColor: theme.tabBarInactiveTintColor,//非激活
        }}
      />
      <Tab.Screen
        name="Trending"
        component={TrendingPage}
        options={{
          tabBarLabel: '趋势',
          tabBarIcon: TabBarIconTrending,
          headerShown: false,
          // tabBarBadgeStyle: {//徽章样式
          //   color: theme.tabBarBadgeStyle.color,
          //   backgroundColor: theme.tabBarBadgeStyle.backgroundColor,
          // },
          tabBarActiveTintColor: theme.tabBarActiveTintColor,//激活
          tabBarInactiveTintColor: theme.tabBarInactiveTintColor,//非激活
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoritePage}
        options={{
          tabBarLabel: '收藏',
          tabBarIcon: TabBarIconFavorite,
          headerShown: false,
          // tabBarBadgeStyle: {//徽章样式
          //   color: theme.tabBarBadgeStyle.color,
          //   backgroundColor: theme.tabBarBadgeStyle.backgroundColor,
          // },
          tabBarActiveTintColor: theme.tabBarActiveTintColor,//激活
          tabBarInactiveTintColor: theme.tabBarInactiveTintColor,//非激活
        }}
      />
      <Tab.Screen
        name="My"
        component={MyPage}
        options={{
          tabBarLabel: '我的',
          tabBarIcon: TabBarIconMy,
          headerShown: false,
          // tabBarBadgeStyle: {//徽章样式
          //   color: theme.tabBarBadgeStyle.color,
          //   backgroundColor: theme.tabBarBadgeStyle.backgroundColor,
          // },
          tabBarActiveTintColor: theme.tabBarActiveTintColor,//激活
          tabBarInactiveTintColor: theme.tabBarInactiveTintColor,//非激活
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
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>
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
