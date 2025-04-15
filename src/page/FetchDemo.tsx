import type {FC} from 'react';
import React from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {Button} from '@react-navigation/elements';

const FetchDemo: FC = () => {
  const [keywords, setKeywords] = React.useState('');
  const [result, setResult] = React.useState('');
  const fetchData = () => {
    if (!keywords) return;
    fetch(
      `https://api.github.com/search/repositories?q=${keywords}&per_page=${10}&page=${1}`,
    )
      .then(response => {
        return response.json(); // 将响应解析为 JSON
      })
      .then(data => {
        console.log(data);
        setResult(JSON.stringify(data));
      })
      .catch(error => console.error(error));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>FetchDemo</Text>
      <TextInput
        style={styles.input}
        onChangeText={setKeywords}
        value={keywords}
        placeholder={'输入关键词'}
      />
      <Button onPress={() => fetchData()}>搜索</Button>
      <ScrollView>
        <Text>{result}</Text>
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
export default FetchDemo;
