import React from 'react';
import { TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import CalendarIcon from 'react-native-vector-icons/EvilIcons';

const HeaderRight = () => (
  <TouchableOpacity>
    <CalendarIcon
      name="calendar"
      size={35}
      style={{ marginRight: 10 }}
    />
  </TouchableOpacity>
);

export default withNavigation(HeaderRight);
