import {combineReducers, configureStore} from '@reduxjs/toolkit';
import slice from './slice';
import {persistReducer, persistStore} from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // 默认使用 localStorage 来存储
import AsyncStorage from '@react-native-async-storage/async-storage';

// 配置持久化选项
const persistConfig = {
  key: 'root', // 根键
  storage: AsyncStorage, // 使用默认的 localStorage
  // whitelist: ['root'], // 仅持久化 userInfo
};

const rootReducer = combineReducers({
  root: slice,
  // productDetail: slice,
});

//持久
const persistedUserReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedUserReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'], // 忽略 redux-persist 的非序列化检查
      },
    }),
});

export const persistor = persistStore(store); // 创建持久化实例

export default store;
