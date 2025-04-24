export type RootStackParamList = {
  Home: undefined;
  Profile: {userId?: string} | undefined;
  Popular: undefined;
  Details:
    | {full_name?: string; html_url?: string; id?: string; name?: string}
    | undefined;
  // 添加你其他的页面
};
