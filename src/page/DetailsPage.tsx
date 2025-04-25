import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/types/types';
import {useSelector} from 'react-redux';
import {PageParams} from '@/interface';
import NavigationBar from '@/components/NavigationBar.tsx';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {WebView} from 'react-native-webview';
import {useFocusEffect} from '@react-navigation/native';

const THEME_COLOR = '#2187b4';
const TRENDING_URL = 'https://github.com/';
type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

const DetailsPage = ({route, navigation}: Props) => {
  const pageParams: PageParams = useSelector(
    (state: any) => state.root.pageParams,
  );
  const {id, name} = route.params || {};
  // const {html_url, full_name} = route.params || {};
  const [html_url, setHtml_url] = useState<string>();
  const [full_name, setFull_name] = useState<string>();
  const [canGoBack, setCanGoBack] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const webViewRef = useRef<WebView>(null);
  let url = html_url || TRENDING_URL + full_name;

  useEffect(() => {
    console.log('TEST store页面参数', pageParams);
    console.log('TEST route', route.params);
    // setHtml_url(route.params?.html_url)
    // setFull_name(route.params?.full_name)
    setHtml_url(route.params?.html_url);
    setFull_name(route.params?.full_name);
    // console.log('TEST 页面参数', html_url, full_name);
  }, []);

  useFocusEffect(//监听物理按键返回按钮
    React.useCallback(() => {
      const onBackPress = () => {
        if (canGoBack && webViewRef.current) {
          webViewRef.current.goBack();
          return true;
        }
        return false; // 页面交给系统导航处理
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        subscription.remove(); // ✅ 正确的取消订阅方式
      };
    }, [canGoBack])
  );

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
  // callback: () => void
  const getLeftButton = (callback: any) => {
    console.log('TEST 返回按钮回调', callback);

    return (
      <View style={{flexDirection: 'row'}}>
        {/*<TouchableOpacity onPress={() => navigation.goBack()}>*/}
        <TouchableOpacity onPress={callback}>
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

  /** navigateState
   @return canGoBack: true,
   @return canGoForward: false,
   @return loading: false,
   @return target: 2692,
   @return title: "Java/day01 at master · DuGuQiuBai/Java",
   @return url: "https://github.com/DuGuQiuBai/Java/tree/master/day01",
   */
  function onNavigationStateChange(navigateState: any) {
    console.log('TEST WebView 中导航发生变化navigateState：', navigateState);
    setCanGoBack(navigateState.canGoBack);
    // setHtml_url(navigateState.url);//这里加这个踩大雷，页面疯狂刷新webview
  }

  function onBack() {
    console.log('TEST onBack');
    console.log('TEST 打印webViewRef', webViewRef);
    console.log('TEST 打印webViewRef.current', webViewRef.current);
    if (canGoBack && webViewRef.current) {
      webViewRef.current.goBack(); // 这是重点：调用 WebView 的 goBack 方法
    } else {
      navigation.goBack(); // 如果 WebView 没法返回，就直接返回上一页
    }
  }

  return (
    <View style={styles.container}>
      <NavigationBar
        title={full_name}
        statusBar={{
          backgroundColor: THEME_COLOR,
          barStyle: 'light-content',
        }}
        style={{backgroundColor: THEME_COLOR}}
        // leftButton={getLeftButton(() => onBack())}
        leftButton={getLeftButton(onBack)}
        rightButton={getRightButton()}
      />
      <View
        style={{
          flex: 1,
          width: '100%',
        }}>
        <WebView
          ref={webViewRef}
          source={{uri: url || ''}}
          startInLoadingState={loading}
          onNavigationStateChange={e => onNavigationStateChange(e)}
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
