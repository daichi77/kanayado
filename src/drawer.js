import { createDrawerNavigator } from 'react-navigation';
import { Dimensions } from 'react-native';
import Stack from './Stack';
import MapDist from './mapDist';
import DrawerCustom from './drawerCustom';
import Detail from './detailScreen';
import Hotel from './Hotelweb';

const screenWidth = Dimensions.get('window').width;
const drawerWidth = (screenWidth * 2) / 3;

const Drawer = createDrawerNavigator(
  {
    HomeScreen: { screen: Stack },
    Dist: { screen: MapDist },
    DetaiScreen: { screen: Detail },
    HotelWeb: { screen: Hotel },
  },
  {
    drawerWidth,
    drawerBackgroundColor: '#FFFFFF',
    drawerType: 'front',
    contentComponent: DrawerCustom,
  },
);

export default Drawer;
