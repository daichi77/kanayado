import { createDrawerNavigator } from 'react-navigation';
import Stack from './Stack';
import DrawerCustom from './drawerCustom';
import MapDist from './mapDist';

const Drawer = createDrawerNavigator({
  HomeScreen: { screen: Stack },
  Dist: { screen: MapDist },
}, {
  drawerWidth: 350,
  drawerBackgroundColor: '#FFFFFF',
  drawerType: 'front',
  contentComponent: DrawerCustom,
});

export default Drawer;
