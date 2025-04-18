import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {RootStackParamList} from '../types/types.ts';
// import {Button} from '@react-navigation/elements';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Button} from '@react-navigation/elements';
import {useNavigate} from '@/navigation/Navigate';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch} from '@reduxjs/toolkit';
import {setLanguageInfo, setTheme, setTopTabName} from '@/store/slice.tsx';
import {useIsFocused, useNavigationState} from '@react-navigation/native';
import DataStore from '@/hooks/DataStore.ts';
import PopularItem from '@/components/PopularItem.tsx';
import NavigationBar from '@/components/NavigationBar.tsx';

const Tab = createMaterialTopTabNavigator();

// type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Popular'>;
// const navigation = useNavigation<NavigationProp>();

type ItemProps = {name: string};
const Item = ({name}: ItemProps) => (
  <View>
    <Text>{name}</Text>
  </View>
);
const THEME_COLOR = '#2187b4';
const PopularPage: React.FC = () => {
  // const navigation = useNavigation<NavigationProp>();
  const {navigateTo} = useNavigate();
  const dispatch: Dispatch = useDispatch();
  const tabNames: string[] = [
    'Java',
    'Python',
    'Android',
    'IOS',
    'React Native',
    'PHP',
    'Scss',
    'CSS',
    'Shell',
    'C++',
    'C#',
    '.NET',
  ];

  const toDetails = (id: string | number, name: string) => {
    dispatch(setLanguageInfo({id, name}));
    // dispatch(setTheme('#2196F3')); // 测试设置绿色主题
    navigateTo('Details', {id, name});
  };

  //通用组件页
  const TabContent = ({tabName}: {tabName: string}) => {
    const isFocused = useIsFocused();
    const [fetchData] = DataStore();
    const [content, setContent] = useState<any[]>([]);
    const [selectedId, setSelectedId] = useState<string>();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true); // 是否还有更多
    const per_page = 10; //每页10条
    const [page, setPage] = useState(1); //当前页码
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
      if (isFocused) {
        _fetchData();
      }
    }, [isFocused]);

    useEffect(() => {
      // 页面加载后闪一下滚动指示器
      flatListRef.current?.flashScrollIndicators();
    }, []);

    const _fetchData = (isLoadMore = false) => {
      console.log(`顶部Tab【${tabName}】被选中`);
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setIsRefreshing(true);
      }
      const nextPage = isLoadMore ? page + 1 : 1;
      dispatch(setTopTabName(tabName));
      let url: string = `https://api.github.com/search/repositories?q=${tabName}&per_page=${per_page}&page=${nextPage}`;
      fetchData(url, 'popular')
        .then(res => {
          console.log('TEST 滑动顶部Tab获取对应 数据', res);
          // setContent(res.data.items);
          const items = res.data.items || [];
          if (isLoadMore) {
            setContent(prev => [...prev, ...items]);
            setPage(nextPage);
            if (items.length < per_page) setHasMore(false); // 没有更多了
          } else {
            setContent(items);
            setPage(1);
            setHasMore(true);
          }
          setIsRefreshing(false);
        })
        .catch(err => {
          console.error(err);
        })
        .finally(() => {
          setIsRefreshing(false);
          setLoadingMore(false);
        });
    };

    const onRefresh = async () => {
      setIsRefreshing(true);
      _fetchData();
    };

    const handleLoadMore = () => {
      if (!loadingMore && hasMore) {
        _fetchData(true); // 加载更多
      }
    };

    const scrollToItem = () => {
      flatListRef.current?.scrollToIndex({
        index: 1, // 目标 index
        animated: true,
        viewPosition: 0.5, // 0靠顶部，1靠底部，0.5居中
      });
    };

    const genLoadingMore = () => {
      return (
        <View>
          <ActivityIndicator></ActivityIndicator>
          <Text style={styles.loadingMore}>加载中...</Text>
        </View>
      );
    };

    return (
      <View style={styles.container}>
        {/*<Text>{tabName} Content</Text>*/}
        {/*<Button onPress={() => toDetails(666, tabName)}>*/}
        {/*  跳转到【{tabName}】详情页*/}
        {/*</Button>*/}
        <FlatList
          ref={flatListRef}
          data={content}
          renderItem={({item}) => (
            <PopularItem item={item} onPress={() => setSelectedId(item.id)} />
          )}
          keyExtractor={(item, index) => `${item.id.toString()}_${index}`}
          extraData={selectedId}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5} // 距离底部还有 50% 时触发
          ListFooterComponent={loadingMore ? genLoadingMore() : null}
        />
      </View>
    );
  };
  // 底部激活 所选选项
  // const currentTabName = useNavigationState((state) => {
  //   const currentRoute = state.routes[state.index];
  //   return currentRoute.name;
  // });
  //
  // useEffect(() => {
  //   console.log('当前激活底部 TabBar 是:', currentTabName);
  // }, [currentTabName]);

  return (
    <View style={styles.container}>
      <NavigationBar
        title='最热'
        statusBar={{
          backgroundColor: THEME_COLOR,
          barStyle: 'light-content',
        }}
        style={{backgroundColor: THEME_COLOR}}
      />
      <Tab.Navigator
        initialRouteName="Java"
        screenOptions={{
          tabBarLabelStyle: {fontSize: 12},
          tabBarItemStyle: {
            width: 'auto',
            justifyContent: 'center',
          },
          tabBarStyle: {
            backgroundColor: '#66aa9a',
          }, // 设置 tab bar 背景色
          tabBarIndicatorStyle: {
            backgroundColor: '#fff', // 设置指示器颜色
            height: 3, // 设置指示器的高度
          },
          swipeEnabled: true,
          tabBarScrollEnabled: true, // 启用水平滑动
        }}>
        {tabNames.map((item: string, index: number) => (
          <Tab.Screen
            key={index}
            name={item}
            children={() => <TabContent tabName={item} />}
          />
        ))}
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 200,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#e4ecec',
  },
  welcomeText: {
    textAlign: 'center',
    margin: 20,
  },
  tabStyle: {
    width: '100%',
  },
  loadingMore: {
    textAlign: 'center',
    color: '#939393',
    fontSize: 14,
  },
});

export default PopularPage;
