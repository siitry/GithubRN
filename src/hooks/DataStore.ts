import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DataStore = () => {
  const fetchData = (url: string) => {
    fetchLocalData(url)
      .then(wrapData => {
        if (wrapData && checkTimestampValid(wrapData.timestamp)) {
          return wrapData;
        } else {
          fetchNetData(url).then(data => {
            return _wrapData(data);
          });
        }
      })
      .catch(err => {
        fetchNetData(url)
          .then(data => {
            return _wrapData(data);
          })
          .catch(err => {
            console.error(err);
          });
      });
  };

  const saveData = async (url: string, data: any, callback?: any) => {
    if (!data || !url) return;
    try {
      await AsyncStorage.setItem(
        url,
        JSON.stringify(_wrapData(data)),
        callback,
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
    }
  };

  /**
   * 获取网路数据
   * @param url
   */
  const fetchNetData = async (url: string) => {
    try {
      await fetch(url)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          throw new Error('Network error');
        })
        .then(resData => {
          saveData(url, resData);
        })
        .catch(err => {
          console.error(err);
        });
    } catch (e) {
      console.log(e);
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
