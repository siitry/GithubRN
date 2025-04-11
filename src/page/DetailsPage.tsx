import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/types/types';
import {useSelector} from 'react-redux';
import {PageParams} from '@/interface';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;
const DetailsPage = ({route, navigation}: Props) => {
  const pageParams: PageParams = useSelector(
    (state: any) => state.root.pageParams,
  );
  const {id, name} = route.params || {};

  useEffect(() => {
    console.log('TEST 页面参数', pageParams);
  }, []);

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
