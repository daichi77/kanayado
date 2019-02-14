import React from 'react';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/AntDesign';

const DistHeaderLeft = ({ navigation }) => {
  return (
    <Icon
      name="left"
      size={35}
      onPress={() => {
        navigation.navigate('MainScreen');
        navigation.toggleDrawer();
      }}
    />
  );
};

export default withNavigation(DistHeaderLeft);
