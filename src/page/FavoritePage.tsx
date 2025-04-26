import {FC, useEffect} from 'react';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FavoriteDao from '@/hooks/FavoriteDao.ts';
import {Button} from '@react-navigation/elements';

const FavoritePage: FC = () => {
  const fetchFavoriteKeys = async () => {
    const favoriteDao = FavoriteDao('github');
    const keys = await favoriteDao.getFavoriteKeys();
    const a =await favoriteDao.getAllItems()
    console.log('收藏的Keys:', keys);
    console.log('收藏的Keys:', a);
  };

  function getFavorite() {
    fetchFavoriteKeys().then(r => {
      console.log(r)
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>FavoritePage</Text>
      <Button onPress={getFavorite}>
        获取
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFC',
  },
  welcomeText: {
    textAlign: 'center',
    margin: 20,
  },
});

export default FavoritePage;
