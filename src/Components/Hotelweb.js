import React from 'react';
import { WebView } from 'react-native';

class Hotelweb extends React.Component {
  render() {
    const { navigation } = this.props;
    const { params } = navigation.state;
    console.log(params.hotelUrl);
    return <WebView source={{ uri: params.hotelUrl }} style={{ marginTop: 20 }} />;
  }
}

export default Hotelweb;
