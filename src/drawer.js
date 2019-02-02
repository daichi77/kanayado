import { createDrawerNavigator } from 'react-navigation';
import Stack from './Stack';
import DrawerCustom from './drawerCustom';
import MapDist from './mapDist';
import Detail from './detailScreen';
import Hotel from './Hotelweb';

const Drawer = createDrawerNavigator({
  HomeScreen: { screen: Stack },
  Dist: { screen: MapDist },
  DetaiScreen: { screen: Detail },
  HotelWeb: { screen: Hotel },
}, {
  drawerWidth: 350,
  drawerBackgroundColor: '#FFFFFF',
  drawerType: 'front',
  contentComponent: DrawerCustom,
});

export default Drawer;
