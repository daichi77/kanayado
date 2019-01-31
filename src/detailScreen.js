import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  header: {
    backgroundColor: '#0000FF',
    height: '3%',
  },
  image: {
    flex: 3,
    backgroundColor: 'red',
  },
  Line: {
    borderBottomWidth: 2.0,
    borderBottomColor: 'gray',
  },
  HotelName: {
    flex: 1,
    alignItems: 'center',
  },
  HotelNameText: {
    fontSize: 50,
    marginTop: 20,
  },
  CallReserve: {
    flex: 1,
    flexDirection: 'row',
  },
  Call: {
    flex: 1,
    alignItems: 'center',
  },
  Reserve: {
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
  callButtonText: {
    fontSize: 30,
    color: 'black',
  },
  reserveButtonText: {
    fontSize: 30,
    color: 'black',
  },
  Price: {
    flex: 1,
    flexDirection: 'row',
  },
  PriceScreen: {
    flex: 1,
    alignItems: 'center',
    marginTop: 25,
  },
  PriceText: {
    color: 'green',
    fontSize: 35,
  },
  Home: {
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
  onPressCallButton = () => {
    Alert.alert('You tapped the button!');
  }

  onPressReserveButton = () => {
    Alert.alert('You tapped the button');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header} />


        <View style={styles.image} />

        <View style={styles.Line} />

        <View style={styles.HotelName}>
          <Text style={styles.HotelNameText}>ホテルの名前</Text>
        </View>

        <View style={styles.Line} />

        <View style={styles.CallReserve}>
          <View style={styles.Call}>
            <TouchableOpacity onPress={this.onPressCallButton} style={styles.button}>
              <Text style={styles.callButtonText}>電話予約</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.Reserve}>
            <TouchableOpacity onPress={this.onPressReserveButton} style={styles.button}>
              <Text style={styles.reserveButtonText}>ネット予約</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.Line} />

        <View style={styles.Price}>
          <View style={styles.PriceScreen}>
            <Text style={styles.PriceText}>料金</Text>
          </View>
          <View style={styles.PriceScreen}>
            <Text style={styles.PriceText}>¥2800</Text>
          </View>
        </View>

        <View style={styles.Line} />

        <View style={styles.Home}>
          <Text style={styles.homeText}>住所</Text>
          <View style={styles.homeAddress}>
            <Text style={styles.homeAddressText}>〒921-8822 石川県野々市市矢作３丁目２６</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default secondDetial;
