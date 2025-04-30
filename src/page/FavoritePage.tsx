import {FC, useEffect, useRef, useState} from 'react';
import React from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, View} from 'react-native';
import FavoriteDao from '@/hooks/FavoriteDao.ts';
import {Button} from '@react-navigation/elements';
import PopularItem from '@/components/PopularItem.tsx';
import {useNavigate} from '@/navigation/Navigate.tsx';

const FavoritePage: FC = () => {
    const flatListRef = useRef<FlatList>(null);
    const [content, setContent] = useState<any[]>([]);
    const [items, setItems] = useState<object[]>([]);
    const [selectedId, setSelectedId] = useState<string>();
    const {navigateTo} = useNavigate();
    const favoriteDao = FavoriteDao('github');
    const [favoriteKeys, setFavoriteKeys] = useState<string[]>([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true); // 是否还有更多
    const per_page = 10; //每页10条
    const [page, setPage] = useState(1); //当前页码

    const fetchFavoriteKeys = async () => {
        const favoriteDao = FavoriteDao('github');
        const keys = await favoriteDao.getFavoriteKeys();
        const allItems = await favoriteDao.getAllItems();
        console.log('收藏的Keys:', keys);
        console.log('获取所有收藏数据:', allItems);
        setItems(allItems);
    };

    function getFavorite() {
        fetchFavoriteKeys().then(() => {});
    }

    useEffect(() => {
        getFavorite();
    }, []);

    useEffect(() => {
        // 页面加载后闪一下滚动指示器
        flatListRef.current?.flashScrollIndicators();
    }, []);

    const selectItem = (item: any) => {
        console.log('TEST 点击最热ITEM', item);
        setSelectedId(item.id);
        const params = {
            html_url: item.html_url,
            full_name: item.full_name,
        };
        navigateTo('Details', params);
    };

    // 处理收藏操作
    const handleFavorite = async (item: any) => {
        const index = favoriteKeys.indexOf(item.full_name);
        if (index !== -1) {
            // 如果已收藏，取消收藏
            await favoriteDao.removeFavoriteKey(item.full_name);
            setFavoriteKeys(prev =>
                prev.filter(key => {
                    return key !== item.full_name;
                }),
            );
        } else {
            // 如果未收藏，添加收藏
            await favoriteDao.saveFavoriteItem(item.full_name, item);
            setFavoriteKeys(prev => [...prev, item.full_name]);
        }

        // const all = favoriteDao.getAllItems();
        // console.log('aaa', item);
    };

    const onRefresh = async () => {
        setIsRefreshing(true);
        // _fetchData();
    };

    const handleLoadMore = () => {
        if (!loadingMore && hasMore) {
            // _fetchData(true); // 加载更多
        }
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
            <FlatList
                ref={flatListRef}
                data={content}
                renderItem={({item}) => (
                    <PopularItem
                        item={item}
                        onPress={() => selectItem(item)}
                        isFavorite={favoriteKeys.includes(item.full_name)} // 根据 favoriteKeys 判断是否为收藏
                        onFavorite={() => handleFavorite(item)} // 收藏/取消收藏方法
                    />
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // height: 200,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#e4ecec',
    },
    welcomeText: {
        textAlign: 'center',
        margin: 20,
    },
    loadingMore: {
        textAlign: 'center',
        color: '#939393',
        fontSize: 14,
    },
});

export default FavoritePage;
