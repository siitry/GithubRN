import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITE_KEY_PREFIX = 'favorite_dao';
const FavoriteDao = ({flag}: any) => {
  const favoriteKey = `${FAVORITE_KEY_PREFIX}${flag}`;

  const saveFavoriteItem = async (key: string, value: any, callback: any) => {
    try {
      await AsyncStorage.setItem(`${FAVORITE_KEY_PREFIX}${key}`, value);
      await updateFavoriteKeys(key, true)
      console.log('收藏 - 数据存储成功');
    } catch (error) {
      console.error('收藏 - 存储数据时出错:', error);
    }
  };
  /**
   * 更新Favorite key集合
   * @param key
   * @param isAdd  true 添加， false 删除
   */
  const updateFavoriteKeys =async (key: string, isAdd: boolean) => {
    try {
      await AsyncStorage.getItem(favoriteKey, (error, result) => {
        if (!error && result) {
          let favoriteKeys = [];
          if(result) {
            favoriteKeys = JSON.parse(result);
          }
          let index = favoriteKeys.indexOf(key);
          if(isAdd) {//如果是添加且key不存在则添加到数组中
            if(index === -1) favoriteKeys.push(key);
          } else {//如果是删除且key存在则将其从数值中移除
            if(index !== -1) favoriteKeys.splice(index, 1);
          }
          AsyncStorage.setItem(favoriteKey, JSON.stringify(favoriteKeys));
        }
      });
    }catch(error) {
      console.log(error)
    }
  };
};

export default FavoriteDao;
