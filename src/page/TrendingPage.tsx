import {FC, useEffect, useState} from 'react';
import React from 'react';
import {DeviceEventEmitter, StyleSheet, Text, View} from 'react-native';
import NavigationBar from '@/components/NavigationBar';
import TrendingDialog from '@/components/TrendingDialog.tsx';

const THEME_COLOR = '#2187b4';
const TrendingPage: FC = () => {
  const renderTitleView = () => {
    return (
      <View style={styles.top}>
        <Text style={styles.topText}>趋势</Text>
        <TrendingDialog onSelect={handleSelectTimeSpan}/>
      </View>
    );
  };

  const handleSelectTimeSpan = (item: { name: string; value: string }) => {
    console.log('外部收到时间段选择：', item);
    // 你可以 setState 拉数据，切换页面啥的
    // DeviceEventEmitter.emit()
  };

  return (
    <View style={styles.container}>
      <NavigationBar
        // title={'趋势'}
        titleView={renderTitleView()}
        statusBar={{
          backgroundColor: THEME_COLOR,
          barStyle: 'light-content',
        }}
        style={{backgroundColor: THEME_COLOR}}
      />
      <Text style={styles.welcomeText}>TrendingPage</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFC',
  },
  welcomeText: {
    textAlign: 'center',
    margin: 20,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    color: 'white',
    fontSize: 20,
  },
  topText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  }
});
export default TrendingPage;
