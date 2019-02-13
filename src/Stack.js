import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HeaderLeft from './headerLeft';
import HeaderLeftBack from './headerLeftBack';
import HeaderRight from './headerRight';
import HeaderLeftBack from './headerLeftBack';
import Map from './Map';
import MapDist from './mapDist';
import Detail from './detailScreen';
import Hotel from './Hotelweb';

const Stack = createStackNavigator({
  MainScreen: {
    screen: Map,
    navigationOptions: () => ({
      title: 'マップ',
      headerLeft: <HeaderLeft />,
      headerRight: <HeaderRight />,
    }),
<<<<<<< HEAD
  },
=======
  }, 
>>>>>>> 3e7418fe592e66bbad2801f118e5c9b39430de45
  Dist: {
    screen: MapDist,
    navigationOptions: () => ({
      title: 'マップ',
      headerLeft: <HeaderLeft />,
      headerRight: <HeaderRight />,
    }),
  },
  DetailScreen: {
    screen: Detail,
    navigationOptions: () => ({
      title: '詳細',
      headerLeft: <HeaderLeftBack />,
    }),
  },
  HotelWeb: {
    screen: Hotel,
    navigationOptions: () => ({
      title: 'ネット予約',
      headerLeft: <HeaderLeftBack />,
    }),
  },
});

export default Stack;
