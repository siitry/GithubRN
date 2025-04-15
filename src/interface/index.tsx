interface Theme {
  tabBarActiveTintColor?: string; // tab激活
  tabBarInactiveTintColor?: string; // tab非激活
  tabBarLabelStyle?: {
    fontSize?: number;
    fontFamily?: string;
    fontWeight?: number;
  };
  tabBarBadgeStyle?: {
    color?: string;
    backgroundColor?: string;
  };
}



interface PageParams {
  id?: string | number;
  name?: string;
}

export type {Theme, PageParams};
