import type {FC} from 'react';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RootStackParamList = {
  Details: {id?: number; name?: string};
};
type DetailsPageProps = {
  route: RouteProp<RootStackParamList, 'Details'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'Details'>;
};
const DetailsPage: FC<DetailsPageProps> = ({route}) => {
  const {id, name} = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>DetailsPage</Text>
      <Text>{id}</Text>
      <Text>名称：{name}</Text>
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
export default DetailsPage;
