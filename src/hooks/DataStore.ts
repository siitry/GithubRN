import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DataStore = () => {
  const fetchData = async (url: string) => {
    try {
      const wrapData = await fetchLocalData(url);
      if (wrapData && checkTimestampValid(wrapData.timestamp)) {
        return wrapData;
      } else {
        const netData = await fetchNetData(url);
        return _wrapData(netData);
      }
    } catch (err) {
      console.error('获取本地或网络数据失败:', err);
      const netData = await fetchNetData(url);
      return _wrapData(netData);
    }
  };

  const saveData = async (url: string, data: any, callback?: any) => {
    if (!data || !url) return;
    try {
      await AsyncStorage.setItem(
        url,
        JSON.stringify(_wrapData(data)),
      );
      console.log('数据存储成功');
    } catch (error) {
      console.error('存储数据时出错:', error);
    }
  };

  /**
   * 从本地获取数据
   * @param url
   */
  const fetchLocalData = async (url: string) => {
    try {
      const value = await AsyncStorage.getItem(url);
      if (value !== null) {
        const parsedValue = JSON.parse(value);
        console.log('获取的数据:', parsedValue);
        return parsedValue;
      }
    } catch (error) {
      console.error('获取数据时出错:', error);
      return fetchNetData(url).then(data => _wrapData(data));
    }
  };

  /**
   * 获取网路数据
   * @param url
   */
  const fetchNetData = async (url: string) => {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const resData = await res.json();
        await saveData(url, resData);
        return resData;
      } else {
        throw new Error('Network error');
      }
    } catch (err) {
      console.error('获取网络数据失败:', err);
      throw err;
    }
  };

  const _wrapData = (data: any) => {
    return {data: data, timestamp: new Date().getTime()};
  };

  const checkTimestampValid = (timestamp: any) => {
    const currentDate = new Date();
    const targetDate = new Date();
    targetDate.setTime(timestamp);
    if (currentDate.getMonth() !== targetDate.getMonth()) {
      return false;
    }
    if (currentDate.getDate() !== targetDate.getDate()) {
      return false;
    }
    if (currentDate.getHours() - targetDate.getHours() > 4) {
      return false;
    }
    return true;
  };

  return [fetchData];
};

export default DataStore;
