import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/types/types';
import {useSelector} from 'react-redux';
import {PageParams} from '@/interface';
import NavigationBar from '@/components/NavigationBar.tsx';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {WebView} from 'react-native-webview';

const THEME_COLOR = '#2187b4';
type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

const DetailsPage = ({route, navigation}: Props) => {
  const pageParams: PageParams = useSelector(
    (state: any) => state.root.pageParams,
  );
  const {id, name} = route.params || {};
  const {html_url, full_name} = route.params || {};

  useEffect(() => {
    console.log('TEST store页面参数', pageParams);
    console.log('TEST 页面参数', html_url, full_name);
  }, []);

  const getRightButton = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity>
          <View style={{padding: 5, marginRight: 8, flexDirection: 'row'}}>
            <MaterialIcons name="star-border" size={24} color={'white'} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={{padding: 5, marginRight: 8, flexDirection: 'row'}}>
            <MaterialIcons name="star" size={24} color={'#ffcd09'} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={{padding: 5, marginRight: 8, flexDirection: 'row'}}>
            <MaterialIcons name="share" size={24} color={'white'} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const getLeftButton = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={{padding: 8, marginLeft: 12}}>
            <MaterialIcons
              name="arrow-back-ios-new"
              size={24}
              color={'white'}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const [loading, setLoading] = useState(true);

  const handleLoadStart = () => {
    setLoading(true); // 开始加载，显示 loading
  };

  const handleLoadEnd = () => {
    setLoading(false); // 加载完成，隐藏 loading
  };

  const handleError = (error: any) => {
    console.error(error); // 错误处理
    setLoading(false); // 发生错误也隐藏 loading
  };

  return (
    <View style={styles.container}>
      <NavigationBar
        title={full_name}
        statusBar={{
          backgroundColor: THEME_COLOR,
          barStyle: 'light-content',
        }}
        style={{backgroundColor: THEME_COLOR}}
        rightButton={getRightButton()}
        leftButton={getLeftButton()}
      />
      <View
        style={{
          flex: 1,
          width: '100%',
        }}>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={THEME_COLOR} />
            <Text style={{color: THEME_COLOR}}>正在加载...</Text>
          </View>
        )}
        <WebView
          source={{uri: html_url || ''}}
          onLoadStart={handleLoadStart} // 开始加载
          onLoadEnd={handleLoadEnd} // 加载结束
          onError={handleError} // 处理加载错误
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#F5FCFC',
  },
  welcomeText: {
    textAlign: 'center',
    margin: 20,
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '55%',
    transform: [{translateX: -50}, {translateY: -50}],
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
});
export default DetailsPage;
