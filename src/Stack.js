import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HeaderLeft from './headerLeft';
import HeaderLeftBack from './headerLeftBack';
import HeaderRight from './headerRight';
// import MapDist from './mapDist';
import Detail from './Container/detailScreen';
// import Hotel from './Hotelweb';
import Map from './Container/Map';
import Dummy from './dummyComponent';

const Stack = createStackNavigator({
  MainScreen: {
    screen: Map,
    navigationOptions: () => ({
      title: 'マップ',
      headerLeft: <HeaderLeft />,
      headerRight: <HeaderRight />,
    }),
  },
  Dist: {
    screen: Dummy,
  },
  DetailScreen: {
    screen: Detail,
    navigationOptions: () => ({
      title: '詳細',
      headerLeft: <HeaderLeftBack />,
    }),
  },
  HotelWeb: {
    screen: Dummy,
    navigationOptions: () => ({
      title: 'ネット予約',
      headerLeft: <HeaderLeftBack />,
    }),
  },
});

export default Stack;
