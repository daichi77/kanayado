import { createStackNavigator } from 'react-navigation';
import Map from './Map';
import TwoScreen from './TwoScreen';

const Drawer = createStackNavigator({
  Map: { screen: Map },
  Two: { screen: TwoScreen },
}, {
  drawerWidth: 350,
  drawerBackgroundColor: '#FFFFFF',
  drawerType: 'front',
});

export default Drawer;