import React from 'react';
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
  const StatusBarElement = () => {
    return !statusBar.hidden ? (
      <View style={styles.statusBar}>
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
    console.log("TEST是否hide", hide)
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
    height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0,
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
    height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
  },
  navBarTitleContainer: {
    //bar中间文字样式
    alignItems: 'center',
    justifyContent: 'center',
    // position: 'absolute',
    left: 'auto',
    right: 'auto',
    top: 0,
    bottom: 0,
  },
  navBarButton: {
    //bar两边按钮样式
    alignItems: 'center',
  },
});

export default NavigationBar;
