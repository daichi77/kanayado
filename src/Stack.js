import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HeaderLeft from './headerLeft';
import HeaderRight from './headerRight';
import Map from './Map';
import MapDist from './mapDist';
import Detail from './detailScreen';
import Hotel from './Hotelweb';

const Stack = createStackNavigator({
  MainScreen: { screen: Map },
  Dist: { screen: MapDist },
  DetailScreen: { screen: Detail },
  HotelWeb: { screen: Hotel },
}, {
  defaultNavigationOptions: {
    title: '現在地',
    headerLeft: <HeaderLeft />,
    headerRight: <HeaderRight />,
    headerStyle: ({
      marginTop: 10,
    }),
  },
});

export default Stack;
