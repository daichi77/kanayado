import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, Alert } from 'react-native';
import { DOMParser } from 'xmldom';

class TwoScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('title', '')
    }
  }

  static navigationOptions = {
    title: '戻る',
  }

  render() {
      const { navigation } = this.props
      const element = navigation.getParam('element', undefined)
      if (element === undefined) {
        return (<View />)
      }

      return (
        <View style={styles.header}>
          <Text>{element.id}</Text>
        </View>
        <View style={styles.container}>
      
          <View style={styles.header}>

          </View>
          <View style={styles.image}>
            <Image
              source={{ uri: 'https://facebook.github.io/react-native/img/header_logo.png' }}
              // style={{ width: 66, height: 58 }}
              style={{ flex: 3 }}
            />
          </View>

          <View style={styles.Line}>
          </View>

          <View style={styles.HotelName}>
            <Text style={styles.HotelNameText}>{ hotelName }</Text>
          </View>

          <View style={styles.Line}>
          </View>

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

          <View style={styles.Line}>
          </View>

          <View style={styles.Price}>
            <View style={styles.PriceScreen}>
              <Text style={styles.PriceText}>料金</Text>
            </View>
            <View style={styles.PriceScreen}>
              <Text style={styles.PriceText}>¥2800</Text>
            </View>
          </View>

          <View style={styles.Line}>
          </View>

          <View style={styles.Home}>
            <Text style={styles.homeText}>住所</Text>
            <View style={styles.homeAddress}>
              <Text style={styles.homeAddressText}>〒921-8822 石川県野々市市矢作３丁目２６</Text>
            </View>
          </View>
        </View>
    )      
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  header: {
    backgroundColor: '#0000FF',
    height: '20%',
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