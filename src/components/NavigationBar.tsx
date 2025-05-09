import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StyleProp,
  ViewStyle,
  StatusBarStyle,
  StatusBar,
  Platform,
} from 'react-native';
import {
  NAV_BAR_HEIGHT_ANDROID,
  NAV_BAR_HEIGHT_IOS,
  STATUS_BAR_HEIGHT,
} from '@/common/config';
import DeviceInfo from 'react-native-device-info'; //判断设备
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'; // 使用 Hook 获取安全区域信息

type StatusBarShape = {
  barStyle?: StatusBarStyle; // 'light-content' | 'default' | 'dark-content'
  hidden?: boolean;
  backgroundColor?: string;
};
//类型检查
type PropTypes = {
  style?: StyleProp<ViewStyle>;
  title?: string;
  titleView?: React.ReactNode;
  titleLayoutStyle?: StyleProp<ViewStyle>;
  hide?: boolean;
  statusBar?: StatusBarShape;
  rightButton?: React.ReactNode;
  leftButton?: React.ReactNode;
};

//自定义 顶部导航栏
const NavigationBar: React.FC<PropTypes> = ({
  style,
  title = '',
  titleView,
  titleLayoutStyle,
  hide = false,
  statusBar = {
    barStyle: 'light-content',
    hidden: false,
  },
  rightButton,
  leftButton,
}) => {
  const insets = useSafeAreaInsets(); // 获取安全区域的边距信息
  const [deviceInfo, setDeviceInfo] = useState<string>('');


  useEffect(() => {
    const getDeviceDetails = () => {
      const model = DeviceInfo.getModel(); // 获取设备型号
      const systemVersion = DeviceInfo.getSystemVersion(); // 获取操作系统版本
      setDeviceInfo(`设备型号: ${model}, 系统版本: ${systemVersion}`);
    };

    getDeviceDetails();
  }, []);

  const StatusBarElement = () => {
    return !statusBar.hidden ? (
      <View style={[styles.statusBar, {marginTop: insets.top}]}>
        <StatusBar {...statusBar} />
      </View>
    ) : null;
  };

  const TitleViewElement = () => {
    return titleView ? (
      titleView
    ) : (
      <Text ellipsizeMode="head" numberOfLines={1} style={styles.title}>
        {title}
      </Text>
    );
  };

  const content = () => {
    return hide ? null : (
      <View style={styles.navBar}>
        {getButtonElement(leftButton)}
        <View style={[styles.navBarTitleContainer, titleLayoutStyle]}>
          {TitleViewElement()}
        </View>
        {getButtonElement(rightButton)}
      </View>
    );
  };

  const getButtonElement = (data: any) => {
    return <View style={styles.navBarButton}>{data ? data : null}</View>;
  };

  return (
    <View style={[styles.container, style]}>
      {StatusBarElement()}
      {/*{TitleViewElement()}*/}
      {content()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#f0f0f0', // 背景色可以根据需求自定义
  },
  statusBar: {
    // height: Platform.OS === 'ios' ? 59 : 0,
    // marginTop: 59,
  },
  title: {
    fontSize: 20,
    color: 'white',
  },
  navBar: {
    //bar整个容器样式
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
  },
  navBarTitleContainer: {
    //bar中间文字样式
    alignItems: 'center',
    justifyContent: 'center',
    // position: 'absolute',
    // left: 'auto',
    // right: 'auto',
    // top: 0,
    // bottom: 0,
  },
  navBarButton: {
    //bar两边按钮样式
    alignItems: 'center',
  },
});

export default NavigationBar;
