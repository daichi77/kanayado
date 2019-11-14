import React from 'react';
import {
  StyleSheet, View, Text, Image, TouchableOpacity,
} from 'react-native';
import { Location, Permissions } from 'expo';
import ClusteredMapView from 'react-native-maps-super-cluster';
import { Marker } from 'react-native-maps';
import { DOMParser } from 'xmldom';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { API_KEY } from 'react-native-dotenv';
import Modal from './modal';
import global from './global';
import touristSpotMarkerImg from '../assets/location.png';
import currentPlaceImg from '../assets/currentPlace.png';
import 'date-utils';

let hotelsData = [];
let vacancysData = [];
let lodgingSpotData = [];
let touristSpotData = [];
let data = [];
let start1 = 1;
let start2 = 1;
const jalanKey = API_KEY;
let timeData = 0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapView: {
    ...StyleSheet.absoluteFillObject,
  },
  markRed: {
    width: 15,
    height: 15,
    marginTop: 5,
    marginRight: 2,
    backgroundColor: 'red',
    borderRadius: 10,
  },
  markBlue: {
    width: 15,
    height: 15,
    marginTop: 5,
    marginRight: 2,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  markerRed: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 10,
  },
  markerBlue: {
    backgroundColor: 'blue',
    padding: 5,
    borderRadius: 10,
  },
  text: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  text1: {
    fontSize: 20,
    marginTop: 2,
    marginRight: 5,
    fontWeight: 'bold',
  },
  counterText: {
    fontSize: 12,
    color: '#04B431',
    fontWeight: 'bold',
  },
  image: {
    flex: 0,
    flexDirection: 'row-reverse',
    alignSelf: 'flex-end',
    top: '134%',
    width: 86,
    height: 86,
  },
  imageButton: {
    flex: 0,
    right: '340%',
    top: '583%',
    width: 86,
    height: 86,
  },
  clusterContainer: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 12,
    alignItems: 'center',
    borderColor: '#04B431',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
});

const placeRequire = require('../assets/place.png');

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      },
      touristFacilities: [],
      lodgingFacilities: [],
      isOpen: false,
      errorMessage: null,
      error: '',
    };
  }

  componentDidMount() {
    this.getLocationAsync().catch(e => this.setState({ errorMessage: e }));
    this.nowTime();
    this.touristSpot(
      'https://infra-api.city.kanazawa.ishikawa.jp/facilities/search.json?lang=ja&page=1&count=50&area=1&genre=1',
    );
    this.lodgingSpot(
      `http://jws.jalan.net/APIAdvance/HotelSearch/V1/?key=${jalanKey}&s_area=192002&start=${start1}&count=100&xml_ptn=2`,
    );
  }

  // 現在地取得
  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permisstion to access location was Denied',
      });
    }

    const location = await Location.getCurrentPositionAsync({});
    this.setState(
      {
        current: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0,
          longitudeDelta: 0,
        },
      },
      () => {
        this.animateToCurrent();
      },
    );
  };

  setMapRef = (clusteredMap) => {
    this.mapView = clusteredMap.getMapRef();
  };

  setCurrentMarker = (marker) => {
    this.currentMarker = marker;
  };

  animateToCurrent = () => {
    const { current } = this.state;
    this.mapView.animateToRegion(current, 1000);
  };

  toggleIsOpen = () => this.setState(state => ({ isOpen: !state.isOpen }));

  gotoElementScreen = (lodgingFacility) => {
    data = lodgingFacility;
    this.setState({ isOpen: true });
    const { navigation } = this.props;
    navigation.setParams({ inf: this.mapView });
  };

  detailScreen = () => {
    const { navigation } = this.props;
    navigation.navigate('DetailScreen', {
      hotelName: data.HotelName,
      hotelAddress: data.HotelAddress,
      pictureURL: data.PictureURL,
      planSampleRateFrom: data.PlanSampleRateFrom,
      hotelUrl: data.HotelUrl,
    });
  };

  // 観光地取得
  touristSpot = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      touristSpotData = touristSpotData.concat(json.facilities);
      global.touristF = global.touristF.concat(json.facilities);
      if (json.next_page !== undefined) {
        this.touristSpot(json.next_page);
      } else {
        this.setState({ touristFacilities: touristSpotData });
      }
    } catch (error) {
      this.setState({ error });
    }
  };

  // 現在の時刻を取得
  nowTime = () => {
    const now = new Date();
    timeData = now.toFormat('YYYYMMDD');
  };

  lodgingSpot(url) {
    const hotelData = [];
    const parser = new DOMParser();
    const request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState !== 4) {
        return;
      }

      if (request.readyState === 4) {
        if (request.status === 200) {
          const sMyString = request.responseText;
          const dom = parser.parseFromString(sMyString, 'text/xml');
          const hotels = dom.getElementsByTagName('Hotel');

          for (let i = 0; i < hotels.length; i += 1) {
            let pictureURL = '';
            const hotelId = hotels[i].getElementsByTagName('HotelID')[0].textContent;
            const hotelName = hotels[i].getElementsByTagName('HotelName')[0].textContent;
            const hotelAddress = hotels[i].getElementsByTagName('HotelAddress')[0].textContent;
            const hotelURL = hotels[i].getElementsByTagName('HotelDetailURL')[0].textContent;
            const planSampleRateFrom = hotels[i].getElementsByTagName('SampleRateFrom')[0]
              .textContent;
            const hotelReview = hotels[i].getElementsByTagName('Rating')[0].textContent;
            if (hotels[i].getElementsByTagName('PictureURL')[0] !== undefined) {
              pictureURL = hotels[i].getElementsByTagName('PictureURL')[0].textContent;
            }
            const jx = hotels[i].getElementsByTagName('X')[0].textContent / 1000 / 3600;
            const jy = hotels[i].getElementsByTagName('Y')[0].textContent / 1000 / 3600;
            const wx = jx - jy * 0.000046038 - jx * 0.000083043 + 0.01004;
            const wy = jy - jy * 0.00010695 + jx * 0.000017464 + 0.0046017;

            hotelData[i] = {
              HotelID: hotelId,
              HotelName: hotelName,
              HotelAddress: hotelAddress,
              PlanSampleRateFrom: planSampleRateFrom,
              PictureURL: pictureURL,
              HotelUrl: hotelURL,
              HotelReview: hotelReview,
              X: wx,
              Y: wy,
              State: 'noVacancy',
            };
          }
          start1 += 100;
          hotelsData = hotelsData.concat(hotelData);
          this.lodgingSpot(
            `http://jws.jalan.net/APIAdvance/HotelSearch/V1/?key=${jalanKey}&s_area=192002&start=${start1}&count=100&xml_ptn=2`,
          );
        } else if (request.status === 400) {
          this.lodgingVacancySpot(
            `http://jws.jalan.net/APIAdvance/StockSearch/V1/?key=${jalanKey}&s_area=192002&stay_date=${timeData}&start=${start2}&count=100&order=2`,
          );
        }
      }
    };
    request.open('GET', url);
    request.send();
  }

  // 宿泊地取得
  lodgingVacancySpot(url) {
    let hotelData = [];
    const parser = new DOMParser();
    const request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState !== 4) {
        return;
      }

      if (request.readyState === 4) {
        if (request.status === 200) {
          const sMyString = request.responseText;
          const dom = parser.parseFromString(sMyString, 'text/xml');
          const hotels = dom.getElementsByTagName('Plan');

          for (let i = 0; i < hotels.length; i += 1) {
            let pictureURL = '';
            const hotelId = hotels[i].getElementsByTagName('HotelID')[0].textContent;
            const hotelName = hotels[i].getElementsByTagName('HotelName')[0].textContent;
            const sampleRate = hotels[i].getElementsByTagName('SampleRate')[0].textContent;
            const hotelAddress = hotels[i].getElementsByTagName('HotelAddress')[0].textContent;
            const hotelURL = hotels[i].getElementsByTagName('HotelDetailURL')[0].textContent;
            const hotelReview = hotels[i].getElementsByTagName('Rating')[0].textContent;
            if (hotels[i].getElementsByTagName('PictureURL')[0] !== undefined) {
              pictureURL = hotels[i].getElementsByTagName('PictureURL')[0].textContent;
            }
            const jx = hotels[i].getElementsByTagName('X')[0].textContent / 1000 / 3600;
            const jy = hotels[i].getElementsByTagName('Y')[0].textContent / 1000 / 3600;
            const wx = jx - jy * 0.000046038 - jx * 0.000083043 + 0.01004;
            const wy = jy - jy * 0.00010695 + jx * 0.000017464 + 0.0046017;

            hotelData[i] = {
              HotelID: hotelId,
              HotelName: hotelName,
              PlanSampleRateFrom: sampleRate,
              HotelAddress: hotelAddress,
              HotelUrl: hotelURL,
              PictureURL: pictureURL,
              HotelReview: hotelReview,
              X: wx,
              Y: wy,
              State: 'vacancy',
            };
          }

          hotelData = hotelData.filter(
            (v1, i1, a1) => a1.findIndex(v2 => v1.HotelID === v2.HotelID) === i1,
          );
          // 100件の空室データから重複したIDを削除(値段が安いのが残る)
          vacancysData = vacancysData.concat(hotelData);
          start2 += 100;
          this.lodgingVacancySpot(
            `http://jws.jalan.net/APIAdvance/StockSearch/V1/?key=${jalanKey}&s_area=192002&stay_date=${timeData}&start=${start2}&count=100&order=2`,
          );
        } else if (request.status === 400) {
          // 全ての空室データから重複したIDを削除(値段が安いのが残る)
          vacancysData = vacancysData.filter(
            (v1, i1, a1) => a1.findIndex(v2 => v1.HotelID === v2.HotelID) === i1,
          );
          // 空室データと宿泊施設データを結合し、重複したIDを削除(空室データが優先して残る)
          lodgingSpotData = vacancysData.concat(hotelsData);
          lodgingSpotData = lodgingSpotData.filter(
            (v1, i1, a1) => a1.findIndex(v2 => v1.HotelID === v2.HotelID) === i1,
          );
          this.setState({ lodgingFacilities: lodgingSpotData });
          global.lodgingF = lodgingSpotData;
        }
      }
    };
    request.open('GET', url);
    request.send();
  }

  convertPoints(data1) {
    let array = [];
    const results = {
      type: 'MapCollection',
      features: [],
    };
    data1.map((value) => {
      array = {
        value,
        location: {
          latitude: value.coordinates.latitude,
          longitude: value.coordinates.longitude,
        },
      };
      const featuresArray = results.features.push(array);
      return featuresArray;
    });
    return results.features;
  }

  renderMarker = pin => (
    <Marker
      key={pin.value.id}
      coordinate={pin.location}
      image={touristSpotMarkerImg}
      title={pin.value.name}
    />
  );

  renderCluster = (cluster, onPress) => (
    <Marker coordinate={cluster.coordinate} onPress={onPress}>
      <View style={styles.clusterContainer}>
        <Text style={styles.counterText}>{cluster.pointCount}</Text>
      </View>
    </Marker>
  );

  render() {
    const {
      lodgingFacilities,
      touristFacilities,
      isOpen,
      current,
      errorMessage,
      error,
    } = this.state;
    if (error.state) {
      return <Text>Caught an error</Text>;
    }
    const KanazawaStation = {
      latitude: 36.5780818,
      longitude: 136.6478206,
      latitudeDelta: 0.00922,
      longitudeDelta: 0.00521,
    };
    const data1 = this.convertPoints(touristFacilities);

    if (errorMessage) {
      return <Text>errorMessage</Text>;
    }
    return (
      <View style={styles.container}>
        <Modal
          isOpen={isOpen}
          toggleIsOpen={this.toggleIsOpen}
          data={data}
          detailScreen={this.detailScreen}
        />
        <ClusteredMapView
          style={styles.mapView}
          ref={this.setMapRef}
          data={data1}
          animateClusters={false}
          renderMarker={this.renderMarker}
          renderCluster={this.renderCluster}
          initialRegion={KanazawaStation}
        >
          <TouchableOpacity style={styles.image} onPress={this.animateToCurrent}>
            <Image style={styles.imageButton} source={placeRequire} />
          </TouchableOpacity>
          <Marker
            ref={this.setCurrentMarker}
            coordinate={{
              latitude: current.latitude,
              longitude: current.longitude,
            }}
            title="現在地"
            image={currentPlaceImg}
          />
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.markBlue} />
            <Text style={styles.text1}>空室</Text>
            <View style={styles.markRed} />
            <Text style={styles.text1}>満室</Text>
          </View>
          {// 宿泊施設にピンを配置
          lodgingFacilities.map((lodgingFacility) => {
            let title = '値段';
            if (lodgingFacility.HotelID !== undefined) {
              title = lodgingFacility.PlanSampleRateFrom;
            }
            return (
              <Marker
                coordinate={{
                  latitude: lodgingFacility.Y,
                  longitude: lodgingFacility.X,
                }}
                onPress={() => this.gotoElementScreen(lodgingFacility)}
                key={lodgingFacility.HotelID}
              >
                <View
                  style={lodgingFacility.State === 'vacancy' ? styles.markerBlue : styles.markerRed}
                >
                  <Text style={styles.text}>{title}</Text>
                </View>
              </Marker>
            );
          })}
        </ClusteredMapView>
      </View>
    );
  }
}

Map.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigation(Map);
