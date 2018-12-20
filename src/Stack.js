import React from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import SearchIcon from 'react-native-vector-icons/AntDesign';
import CalendarIcon from 'react-native-vector-icons/EvilIcons';
import Map from './Map';

const StackNavigator = createStackNavigator({
  MainScreen: {
    screen: Map,
    navigationOptions: ({ navigation }) => ({
      title: 'MainScreen',
      headerLeft: (
        <TouchableOpacity onPress={() => Alert.alert('検索フォームが横から出るようにします')}>
          <SearchIcon
            name="search1"
            size={25}
            style={{ marginLeft: 15 }}
          />
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity>
          <CalendarIcon
            name="calendar"
            size={35}
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      ),
      headerStyle: ({
        marginTop: 10,
      }),
    }),
  },
});
const TheStack = createAppContainer(StackNavigator);

export default TheStack;
