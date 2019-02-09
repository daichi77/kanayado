import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Image,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  line: {
    borderBottomWidth: 2.0,
    borderBottomColor: 'gray',
  },
  image: {
    flex: 3,
  },
  HotelName: {
    flex: 1,
    alignItems: 'center',
  },
  HotelNameText: {
    fontSize: 30,
    marginTop: 20,
  },
  callReserve: {
    flex: 1,
    flexDirection: 'row',
  },
  reserve: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    borderWidth: 4.0,
    borderColor: '#DDDDDD',
    borderRadius: 10,
    marginTop: 22,
    padding: 5,
  },
  reserveButtonText: {
    fontSize: 30,
    color: 'black',
  },
  price: {
    flex: 1,
    flexDirection: 'row',
  },
  priceScreen: {
    flex: 1,
    alignItems: 'center',
    marginTop: 25,
  },
  priceText: {
    color: 'green',
    fontSize: 35,
  },
  home: {
    flex: 1,
  },
  homeText: {
    color: 'gray',
    fontSize: 30,
    marginTop: 5,
    marginLeft: 5,
  },
  homeAddress: {
    marginTop: 5,
    alignItems: 'center',
  },
  homeAddressText: {
    color: 'black',
    fontSize: 20,
  },
});

class secondDetial extends React.Component {
  Hotelweb = (url) => {
    const { navigation } = this.props;
    navigation.navigate('HotelWeb', {
      hotelUrl: url,
    });
  };

  render() {
    const { navigation } = this.props;
    const { params } = navigation.state;
    const url = params.hotelUrl;
    return (
      <View style={styles.container}>
        <View style={styles.image}>
          <Image style={{ flex: 3 }} source={{ uri: params.pictureURL }} />
        </View>
        <View style={styles.line} />
        <View style={styles.HotelName}>
          <Text style={styles.HotelNameText}>{params.hotelName}</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.callReserve}>
          <View style={styles.reserve}>
            <TouchableOpacity onPress={() => this.Hotelweb(url)} style={styles.button}>
              <Text style={styles.reserveButtonText}>ネット予約</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.price}>
          <View style={styles.priceScreen}>
            <Text style={styles.priceText}>料金</Text>
          </View>
          <View style={styles.priceScreen}>
            <Text style={styles.priceText}>
              {params.planSampleRateFrom}
円
            </Text>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.home}>
          <Text style={styles.homeText}>住所</Text>
          <View style={styles.homeAddress}>
            <Text style={styles.homeAddressText}>{params.hotelAddress}</Text>
          </View>
        </View>
      </View>
    );
  }
}

secondDetial.propTypes = {
  navigation: PropTypes.func.isRequired,
};

export default withNavigation(secondDetial);
