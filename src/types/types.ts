export type RootStackParamList = {
  Home: undefined;
  Profile: {userId?: string} | undefined;
  Popular: undefined;
  Details: {id?: string; name?: string} | undefined;
  // 添加你其他的页面
};
