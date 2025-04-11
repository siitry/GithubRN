import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';

const LoadingScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.loadingText}>加载中...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // 背景色可以根据需求自定义
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#333',
  },
});

export default LoadingScreen;
