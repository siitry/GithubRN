import * as React from 'react';
import {useNavigation, RouteProp} from '@react-navigation/native';
import {Button} from '@react-navigation/elements';
import {StyleSheet, Text, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: {post?: string};
};
// 3. 类型辅助工具
type HomeScreenProps = {
  route: RouteProp<RootStackParamList, 'Home'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

function HomeScreen({route}: HomeScreenProps) {
  const navigation = useNavigation();
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (route.params?.post) {
      // Alert.alert('New Post is:' + route.params?.post);
    }
  }, [route.params?.post]);

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setCount(c => c + 1)}>Update count</Button>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Text>Count: {count}</Text>
      <Button
        onPress={() => {
          // @ts-ignore
          navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          });
        }}>
        Go to Details
      </Button>
      <Button
        onPress={() =>
          // @ts-ignore
          navigation.navigate('PostPage')
        }>
        Create post
      </Button>
      <Text style={styles.margin10}>Post: {route.params?.post}</Text>
      <Button onPress={() => navigation.setOptions({title: 'Updated!'})}>
        Update the title
      </Button>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  margin10: {
    margin: 10,
  },
  iconImg: {
    width: 50,
    height: 50,
  },
});
