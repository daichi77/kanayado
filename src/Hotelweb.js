import React from 'react';
import { WebView } from 'react-native';
import PropTypes from 'prop-types';

const Hotelweb = (props) => {
  const { navigation } = props;
  const { params } = navigation.state;
  return (
    <WebView
      source={{ uri: params.hotelUrl }}
      style={{ marginTop: 20 }}
    />
  );
};

Hotelweb.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Hotelweb;
