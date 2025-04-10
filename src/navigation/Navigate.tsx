// import React from 'react';
import {useNavigation} from '@react-navigation/native';

// 封装跳转函数
export const useNavigate = () => {
  const navigation = useNavigation();

  const navigateTo = (screenName: string, params?: object) => {
    // @ts-ignore
    navigation.navigate(screenName, params);
  };

  return {navigateTo};
};

