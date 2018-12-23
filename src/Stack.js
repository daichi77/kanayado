import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HeaderLeft from './headerLeft';
import HeaderRight from './headerRight';
import Map from './Map';
import MapDist from './mapDist';

const Stack = createStackNavigator({
  MainScreen: { screen: Map, key: '1234' },
  Dist: { screen: MapDist },
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
