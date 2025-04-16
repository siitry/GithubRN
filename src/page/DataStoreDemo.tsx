import type {FC} from 'react';
import React from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import DataStore from '@/hooks/DataStore';

const key = 'save_key';
const DataStoreDemo: FC = () => {
  const [keywords, setKeywords] = React.useState<string>('');
  const [showText, setShowText] = React.useState('');
  const [fetchData] = DataStore();
  const loadData = () => {
    let url = `https://api.github.com/search/repositories?q=${keywords}&per_page=${20}&page=${1}`;
    fetchData(url)
      .then(res => {
        console.log('拿到回调数据', res);
        let showData = `初次数据加载时间：${new Date(
          res.timestamp,
        )}\n${JSON.stringify(res.data)}`;
        setShowText(showData);
      })
      .catch(error => {
        error && console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>DataStoreDemo</Text>
      <Text style={styles.welcomeText}>离线缓存框架</Text>
      <TextInput
        style={styles.input}
        value={keywords}
        onChangeText={setKeywords}></TextInput>
      <View>
        <Text onPress={() => loadData()}>获取</Text>
      </View>
      <ScrollView>
        <Text>{showText}</Text>
      </ScrollView>
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
  input: {
    width: '80%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
export default DataStoreDemo;
