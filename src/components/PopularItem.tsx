import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface ItemProps {
  item: {
    name: string;
    owner: {
      login: string;
      avatar_url: string;
      type: string;
    };
    description: string;
    stargazers_count: number;
    language: string;
    full_name: string;
  };
  onPress: () => void;
  isFavorite?: boolean;
  onFavorite?: () => void;
}

const PopularItem: React.FC<ItemProps> = ({
  item,
  onPress,
  isFavorite,
  onFavorite,
}) => {
  // 格式化星星数量
  const formatStarCount = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num.toString();
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.top}>
          <Image
            style={[
              styles.avatar,
              item.owner.type === 'Organization' ? styles.square : styles.round,
            ]}
            source={{uri: item.owner.avatar_url}}
          />
          <Text style={styles.title}>{item.full_name}</Text>
        </View>

        <Text style={styles.describe}>{item.description}</Text>

        <View style={styles.bottom}>
          <View style={styles.bottom}>
            <MaterialIcons style={styles.star} name="star" size={20} />
            <Text style={styles.gray}>
              {formatStarCount(item.stargazers_count)}
            </Text>
          </View>

          <Text style={styles.gray}>{item.language}</Text>

          <MaterialIcons
            onPress={onFavorite} // 触发父组件传入的收藏/取消收藏方法
            style={{color: isFavorite ? '#ffcd09' : '#9a9a9a'}}
            name={isFavorite ? 'star' : 'star-border'}
            size={26}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 2,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 4,
    borderColor: '#ddd',
    shadowColor: 'gray',
    shadowOffset: {width: 10.5, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 4,
  },
  top: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bottom: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  gray: {
    color: '#6b6b6b',
  },
  star: {
    color: '#ffcd09',
    marginRight: 5,
  },
  title: {
    fontSize: 16,
    color: '#575757',
  },
  describe: {
    color: '#707070',
    fontSize: 12,
    textAlign: 'justify',
    marginTop: 4,
    marginBottom: 4,
  },
  avatar: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  round: {
    borderRadius: 10,
  },
  square: {
    borderRadius: 2,
  },
});

export default PopularItem;
