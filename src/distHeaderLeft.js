import React from 'react';
import { withNavigation } from 'react-navigation';
import SearchIcon from 'react-native-vector-icons/AntDesign';
import PropTypes from 'prop-types';

const DistHeaderLeft = ({ navigation }) => (
  <SearchIcon
    name="search1"
    size={25}
    style={{ marginLeft: 15 }}
    onPress={() => {
      navigation.navigate('MainScreen');
      navigation.toggleDrawer();
    }}
  />
);

DistHeaderLeft.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigation(DistHeaderLeft);
