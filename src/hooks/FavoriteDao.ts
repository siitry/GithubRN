import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITE_KEY_PREFIX = 'favorite';
const FAVORITE_KEYS_PREFIX = 'favorite_keys';

const FavoriteDao = (flag: string) => {
  const favoriteKey: string = `${FAVORITE_KEYS_PREFIX}_${flag}`;

  // 保存收藏项
  const saveFavoriteItem = async (key: string, value: Record<string, any>) => {
    try {
      // 使用 Promise.all 并发保存收藏项和更新收藏keys
      await Promise.all([
        AsyncStorage.setItem(`${FAVORITE_KEY_PREFIX}_${key}`, JSON.stringify(value)),
        updateFavoriteKeys(key, true),
      ]);
      console.log('✔️ 收藏 - 数据存储成功', key);
    } catch (error) {
      console.error('❌ 收藏 - 存储数据时出错:', error);
    }
  };

  // 更新收藏key集合
  const updateFavoriteKeys = async (key: string, isAdd: boolean) => {
    console.log('updateFavoriteKeys isAdd+++', isAdd);
    try {
      const result = await AsyncStorage.getItem(favoriteKey);
      let favoriteKeys: string[] = result ? JSON.parse(result) : [];

      // 判断是否添加或移除
      let index = favoriteKeys.indexOf(key);
      if (isAdd) {
        // 如果是添加且key不存在则添加
        if (index === -1) favoriteKeys.push(key);
      } else {
        // 如果是移除且key存在则删除
        if (index !== -1) favoriteKeys.splice(index, 1);
      }

      await AsyncStorage.setItem(favoriteKey, JSON.stringify(favoriteKeys));
      console.log('✔️ 更新收藏keys成功:', favoriteKeys);
    } catch (error) {
      console.error('❌ 更新收藏 key 出错:', error);
    }
  };

  // 获取收藏的所有keys
  const getFavoriteKeys = async (): Promise<string[]> => {
    try {
      const result = await AsyncStorage.getItem(favoriteKey);
      const keys = result ? JSON.parse(result) : [];
      console.log('✔️ 获取收藏keys成功:', keys);
      return keys;
    } catch (error) {
      console.error('❌ 获取收藏 keys 出错:', error);
      return [];
    }
  };

  // 取消收藏
  const removeFavoriteKey = async (key: string) => {
    try {
      await AsyncStorage.removeItem(`${FAVORITE_KEY_PREFIX}_${key}`);
      await updateFavoriteKeys(key, false);
      console.log('✔️ 移除收藏成功:', key);
    } catch (error) {
      console.error('❌ 移除收藏 key 出错:', error);
    }
  };

  // 获取所有收藏项
  const getAllItems = async () => {
    try {
      const keys = await getFavoriteKeys();
      console.log('✔️ 获取的收藏keys:', keys); // 打印所有收藏的key
      const stores = await AsyncStorage.multiGet(keys);
      console.log('✔️ 获取到的所有收藏项:', stores); // 打印获取到的所有存储项

      // 解析并返回所有数据
      return stores
        .map(store => {
          const value = store[1];
          return value ? JSON.parse(value) : null;
        })
        .filter(item => item !== null);
    } catch (error) {
      console.error('❌ 获取所有收藏 items 出错:', error);
      return [];
    }
  };

  return {
    saveFavoriteItem,
    updateFavoriteKeys,
    getFavoriteKeys,
    removeFavoriteKey,
    getAllItems,
  };
};

export default FavoriteDao;
