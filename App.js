// import Header from './src/Stack';

// export default Header;
// import Map from './src/Map' 

// export default Map;

// import TwoScreen from './src/TwoScreen'

// export default TwoScreen;

import { createAppContainer } from 'react-navigation';
import Drawer from './src/Drawer';

const AppContainer = createAppContainer(Drawer);

const App = () => (
  <AppContainer />
);

export default App;