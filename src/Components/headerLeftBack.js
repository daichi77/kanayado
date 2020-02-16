import React from 'react';
import { TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import SearchIcon from 'react-native-vector-icons/AntDesign';

const HeaderLeft = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.goBack()}>
    <SearchIcon
      name="left"
      size={25}
      style={{ marginLeft: 15 }}
    />
  </TouchableOpacity>
);

HeaderLeft.propTypes = {
  navigation: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigation(HeaderLeft);
