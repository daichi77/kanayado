import React from 'react';
import { StyleSheet, View, Image, Platform } from 'react-native';
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
    alignItems: 'center',
  },
  HotelNameText: {
    fontSize: 25,
    fontFamily: Platform.select({ ios: 'HiraMinProN-W3', android: 'serif' }),
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
    alignItems: 'center',
  },
  homeAddressText: {
    color: '#A6B395',
    fontSize: 20,
  },
});

const DetailScreen = ({ hotelData, navigation }) => {
  const Hotelweb = () => {
    const url = hotelData.hotelData.HotelUrl;
    navigation.navigate('HotelWeb', {
      hotelUrl: url,
    });
  };

  const hotelArray1 = [];
  const hotelArray2 = [];
  const hotelArray3 = [];
  for (s in hotelData.hotelData.HotelName) {
    if (hotelArray1.length < 13) {
      hotelArray1.push(hotelData.hotelData.HotelName[s]);
    } else if (hotelArray2.length < 13) {
      hotelArray2.push(hotelData.hotelData.HotelName[s]);
    } else {
      hotelArray3.push(hotelData.hotelData.HotelName[s]);
    }
  }
  const hotel1 = hotelArray1.join('');
  const hotel2 = hotelArray2.join('');
  const hotel3 = hotelArray3.join('');
  return (
    <Container>
      <View style={styles.container}>
        <View style={styles.image}>
          <Image style={{ flex: 3 }} source={{ uri: hotelData.hotelData.PictureURL }} />
        </View>

        <View style={styles.HotelName}>
          <Text style={styles.HotelNameText}>{hotel1}</Text>
          <Text style={styles.HotelNameText}>{hotel2}</Text>
          <Text style={styles.HotelNameText}>{hotel3}</Text>
        </View>

        <View style={styles.Price}>
          <View style={styles.PriceScreen}>
            <Text style={styles.PriceText}>¥{hotelData.hotelData.PlanSampleRateFrom}</Text>
          </View>
          <View style={styles.mbutton}>
            <Button iconRight info onPress={() => Hotelweb()} style={styles.button}>
              <Text> ネット予約 </Text>
              <Icon name="arrow-forward" />
            </Button>
          </View>
        </View>

        <View style={styles.Home}>
          <View style={styles.homeAddress}>
            <Text style={styles.homeAddressText}>{hotelData.hotelData.HotelAddress}</Text>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default DetailScreen;
