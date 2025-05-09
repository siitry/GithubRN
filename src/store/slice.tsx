import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Theme, PageParams} from '@/interface';

const initialState = {
  theme: {
    tabBarActiveTintColor: '#2187b4', //tab激活
    tabBarInactiveTintColor: '#ccc', //tab非激活
    tabBarLabelStyle: {
      // fontSize: number,
      // fontFamily: string,
      // fontWeight: number,
    },
    tabBarBadgeStyle: {
      //徽章样式
      color: '#fff',
      backgroundColor: 'red',
    },
  } as Theme, //默认蓝色 '#2196F3'
  pageParams: {} as PageParams,
  topTabName: "",// 最热页 顶部选项
};

const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = {...state.theme, ...action.payload};
    },
    setLanguageInfo(state, action: PayloadAction<PageParams>) {
      state.pageParams = {...state.pageParams, ...action.payload}; // 更新 userInfo
    },
    setTopTabName(state, action: PayloadAction<string>) {
      state.topTabName = action.payload;
    },

    // 重置特定字段
    resetUserInfo(state) {
      state.pageParams = {} as PageParams; // 重置 userInfo
    },
  },
});

export const {
  setTheme,
  setLanguageInfo,
  setTopTabName,

  resetUserInfo,
} = slice.actions;

export default slice.reducer;
