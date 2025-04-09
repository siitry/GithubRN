// import * as React from 'react';
// import {
//   useNavigation,
//   NavigationContainer,
//   RouteProp,
// } from '@react-navigation/native';
// import {
//   createNativeStackNavigator,
//   NativeStackNavigationProp,
// } from '@react-navigation/native-stack';
// import {Text, TextInput, View, Image, StyleSheet} from 'react-native';
// import {Button} from '@react-navigation/elements';
// import {Images} from './page/assets';
// import HomeScreen from './page/HomePage';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// // 1. 定义导航参数类型
// type RootStackParamList = {
//   Home: {post?: string};
//   Details: {itemId: number; otherParam?: string};
//   PostPage: undefined;
//   Profile: undefined;
// };
//
// type DetailsScreenProps = {
//   route: RouteProp<RootStackParamList, 'Details'>;
//   navigation: NativeStackNavigationProp<RootStackParamList, 'Details'>;
// };
//
// // type PostPageProps = {
// //   navigation: NativeStackNavigationProp<RootStackParamList, 'PostPage'>;
// // };
//
// function PostPage() {
//   const navigation = useNavigation();
//   const [postText, setPostText] = React.useState('');
//
//   return (
//     <View>
//       <TextInput
//         multiline
//         placeholder="What's on your mind?"
//         style={styles.textInput}
//         value={postText}
//         onChangeText={setPostText}
//       />
//       <Button
//         onPress={() => {
//           // @ts-ignore
//           navigation.popTo('Home', {post: postText});
//         }}>
//         Done
//       </Button>
//     </View>
//   );
// }
//
// function DetailsPage({route}: DetailsScreenProps) {
//   const navigation = useNavigation();
//   /* 2. Get the param */
//   const {itemId, otherParam} = route.params;
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Text>DetailsPage</Text>
//       <Text>itemId: {JSON.stringify(itemId)}</Text>
//       <Text>otherParam: {JSON.stringify(otherParam)}</Text>
//       <Button onPress={() => navigation.goBack()}>Go back</Button>
//       <Button
//         onPress={() =>
//           // @ts-ignore
//           navigation.popTo('Home')
//         }>
//         Go to Home
//       </Button>
//       <Button
//         onPress={() =>
//           // @ts-ignore
//           navigation.popToTop()
//         }>
//         Go back to first screen in stack
//       </Button>
//     </View>
//   );
// }
//
// function LogoTitle() {
//   return (
//     // <Image
//     //   style={{width: 50, height: 50}}
//     //   source={require('./page/assets/react-native-logo.png')}
//     // />
//     <Image style={styles.iconImg} source={Images.Logo} />
//   );
// }
//
// const Stack = createNativeStackNavigator<RootStackParamList>();
//
// type TabParamList = {
//   Feed: undefined;
//   Messages: undefined;
// };
//
// function ProfileScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Profile Screen</Text>
//     </View>
//   );
// }
// function MessagesScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Messages Screen</Text>
//     </View>
//   );
// }
// function FeedScreen() {
//   const navigation = useNavigation();
//
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Feed Screen</Text>
//       <Button onPress={() => navigation.navigate('Profile')}>
//         Go to Profile
//       </Button>
//     </View>
//   );
// }
//
// const Tab = createBottomTabNavigator<TabParamList>();
// function HomeTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Feed" component={FeedScreen} />
//       <Tab.Screen name="Messages" component={MessagesScreen} />
//     </Tab.Navigator>
//   );
// }
// function RootStack() {
//   return (
//     <Stack.Navigator initialRouteName="Home">
//       <Stack.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           title: 'HomeScreen',
//           headerStyle: {
//             backgroundColor: '#f4511e',
//           },
//           headerTintColor: '#0f0',
//           headerTitleStyle: {
//             fontWeight: 'bold',
//           },
//         }}
//       />
//       {/*<Stack.Screen*/}
//       {/*  name="Details"*/}
//       {/*  component={DetailsPage}*/}
//       {/*  initialParams={{itemId: 42}}*/}
//       {/*/>*/}
//       {/*<Stack.Screen name="PostPage" component={PostPage} />*/}
//
//       <Stack.Screen name="Profile" component={ProfileScreen} />
//     </Stack.Navigator>
//   );
// }
//
// export default function App() {
//   return (
//     <NavigationContainer>
//       <RootStack />
//     </NavigationContainer>
//   );
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   textInput: {
//     height: 200,
//     padding: 10,
//     backgroundColor: 'white',
//     width: '100%',
//     marginBottom: 20,
//   },
//   margin10: {
//     margin: 10,
//   },
//   iconImg: {
//     width: 50,
//     height: 50,
//   },
// });
