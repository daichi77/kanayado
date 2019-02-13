import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Platform,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Container, Button, Text, Icon } from 'native-base';

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  image: {
    flex: 3,
  },
  HotelName: {
    flex: 1,
    marginTop: 20,
    marginLeft: 30,
  },
  HotelNameText: {
    fontSize: 25,
    fontFamily: Platform.select({ios:'HiraMinProN-W3', android: 'serif'}),
  },
  HotelNameText2: {
    fontSize: 25,
    marginLeft: 30,
    fontFamily: Platform.select({ios:'HiraMinProN-W3', android: 'serif'}),
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
    borderWidth: 2.0,
    borderColor: '#DEEDCB',
    borderRadius: 10,
    padding: 5,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  Price: {
    flex: 1,
    flexDirection: 'row',
  },
  PriceScreen: {
    flex: 1,
    alignItems: 'center',
  },
  mbutton: {
    flex: 1,
    alignItems: 'center',
  },
  PriceText: {
    color: 'green',
    fontSize: 35,
  },
  Home: {
    flex: 1,
  },
  homeAddress: {
    marginTop: 30,
    marginLeft: 30,
  },
  homeAddressText: {
    color: '#A6B395',
    fontSize: 20,
    textAlign: 'left',
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
    const hotelArray1 = [];
    const hotelArray2 = [];
    const url = params.hotelUrl;
    console.log(params.hotelName);

    for (s in params.hotelName) {
      if (hotelArray1.length < 13) {
        hotelArray1[s] = params.hotelName[s]
      }
      else {
        hotelArray2[s] = params.hotelName[s]
      }
    }

    const hotel1 = hotelArray1.join('');
    const hotel2 = hotelArray2.join('');

    return (
      <Container>
        <View style={styles.container}>
          <View style={styles.image}>
            <Image
              style={{flex: 3}}
              source={{ uri: params.pictureURL }}
            />
          </View>

          <View style={styles.HotelName}>
            <Text style={styles.HotelNameText}>{ hotel1 }</Text>
            <Text style={styles.HotelNameText2}>{ hotel2 }</Text>
          </View>

          <View style={styles.Price}>
            <View style={styles.PriceScreen}>
              <Text style={styles.PriceText}>¥{ params.planSampleRateFrom }</Text>
            </View>
            <View style={styles.mbutton}>
              <Button iconRight info onPress={() => this.Hotelweb(url)} style={styles.button}>
                <Text> ネット予約 </Text>
                <Icon name='arrow-forward' />
              </Button>
            </View>
          </View>


          <View style={styles.Home}>
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
