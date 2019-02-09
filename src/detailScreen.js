import React from 'react';
import {
  StyleSheet,
  // Text,
  View,
  // TouchableOpacity,
  Image,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Container, Button, Text, Icon } from 'native-base';

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  Line: {
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
    fontSize: 25,
    marginTop: 20,
  },
  CallReserve: {
    flex: 1,
    flexDirection: 'row',
  },
  Reserve: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    borderWidth: 4.0,
    borderColor: '#1EE514',
    borderRadius: 10,
    marginTop: 22,
    padding: 5,
    marginRight: 'auto',
    marginLeft: 'auto',
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
  Hotelweb = (url) => {
    const { navigation } = this.props;
    navigation.navigate('HotelWeb', {
      hotelUrl: url,
    });
    console.log(url);
  }

  render() {
    const { navigation } = this.props;
    const { params } = navigation.state;
    const url = params.hotelUrl;
    console.log(params.hotelUrl);
    return (
      <Container>
        <View style={styles.container}>
          <View style={styles.image}>
            <Image
              style={{flex: 3}}
              source={{ uri: params.pictureURL }}
            />
          </View>

          <View style={styles.Line} />

          <View style={styles.HotelName}>
            <Text style={styles.HotelNameText}>{ params.hotelName }</Text>
          </View>

          <View style={styles.Line} />

          <View style={styles.CallReserve}>
            <View style={styles.Reserve}>
              {/* <TouchableOpacity onPress={() => this.Hotelweb(url)} style={styles.button}>
                <Text style={styles.reserveButtonText}>ネット予約</Text>
              </TouchableOpacity> */}
              <Button iconRight primary onPress={() => this.Hotelweb(url)} style={styles.button}>
                <Text> ネット予約 </Text>
                <Icon name='arrow-forward' />
              </Button>
            </View>
          </View>

          <View style={styles.Line} />

          <View style={styles.Price}>
            <View style={styles.PriceScreen}>
              <Text style={styles.PriceText}>料金</Text>
            </View>
            <View style={styles.PriceScreen}>
              <Text style={styles.PriceText}>{ params.planSampleRateFrom }円</Text>
            </View>
          </View>

          <View style={styles.Line} />

          <View style={styles.Home}>
            <Text style={styles.homeText}>住所</Text>
            <View style={styles.homeAddress}>
              <Text style={styles.homeAddressText}>{ params.hotelAddress}</Text>
            </View>
          </View>
        </View>
      </Container>
    );
  }
}

export default withNavigation(secondDetial);
