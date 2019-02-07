import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView from 'react-native-maps-super-cluster';
import { Marker } from 'react-native-maps';
import { DOMParser } from 'xmldom';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import Modal from './modal';
import touristSpotMarkerImg from '../assets/location.png';
import 'date-utils';


let hotelsData = [];
let vacancysData = [];
let lodgingSpotData = [];
let touristSpotData = [];
let data = [];
let start1 = 1;
let start2 = 1;
const jalanKey = 'and16735d417c1';
let timeData = 0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  mapview: {
    ...StyleSheet.absoluteFillObject,
  },

  mark_red: {
    width: 15,
    height: 15,
    marginTop: 5,
    marginRight: 2,
    backgroundColor: 'red',
    borderRadius: 10,
  },
  mark_blue: {
    width: 15,
    height: 15,
    marginTop: 5,
    marginRight: 2,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  marker_red: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 10,
  },
  marker_blue: {
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


// 関数名や変数名の修正
class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      touristFacilities: [],
      lodgingFacilities: [],
      isOpen: false,
    };
  }

  componentWillMount() {
    this.nowTime();
    this.touristSpot('https://infra-api.city.kanazawa.ishikawa.jp/facilities/search.json?lang=ja&page=1&count=50&area=1&genre=1');
    this.lodgingSpot(`http://jws.jalan.net/APIAdvance/HotelSearch/V1/?key=${jalanKey}&s_area=192002&start=${start1}&count=100&xml_ptn=2`);
  }

  toggleIsOpen = () => this.setState(state => ({ isOpen: !state.isOpen }))

  gotoElementScreen = (lodgingFacilitie) => {
    data = lodgingFacilitie;
    this.setState({ isOpen: true });
  }

  detailScreen = () => {
    const { navigation } = this.props;
    navigation.navigate('DetailScreen', {
      hotelName: data.HotelName,
      hotelAddress: data.HotelAddress,
      pictureURL: data.PictureURL,
      planSampleRateFrom: data.PlanSampleRateFrom,
      hotelUrl: data.HotelUrl,
    });
  }

  // 観光地取得
  touristSpot = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      touristSpotData = touristSpotData.concat(json.facilities);
      if (json.next_page !== undefined) {
        this.touristSpot(json.next_page);
      } else {
        this.setState({ touristFacilities: touristSpotData });
      }
    } catch (error) {
      console.error('error');
    }
  }

  lodgingSpot(url) {
    const hotelData = [];
    const parser = new DOMParser();
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState !== 4) {
        return;
      }

      if (xmlhttp.readyState === 4) {
        if (xmlhttp.status === 200) {
          const sMyString = xmlhttp.responseText;
          const dom = parser.parseFromString(sMyString, 'text/xml');
          const hotels = dom.getElementsByTagName('Hotel');

          for (let i = 0; i < hotels.length; i += 1) {
            let pictureURL = '';
            const hotelId = hotels[i].getElementsByTagName('HotelID')[0].textContent;
            const hotelName = hotels[i].getElementsByTagName('HotelName')[0].textContent;
            const hotelAddress = hotels[i].getElementsByTagName('HotelAddress')[0].textContent;
            const hotelURL = hotels[i].getElementsByTagName('HotelDetailURL')[0].textContent;
            const planSampleRateFrom = hotels[i].getElementsByTagName('SampleRateFrom')[0].textContent;
            if (hotels[i].getElementsByTagName('PictureURL')[0] !== undefined) {
              pictureURL = hotels[i].getElementsByTagName('PictureURL')[0].textContent;
            }
            const jx = hotels[i].getElementsByTagName('X')[0].textContent / 1000 / 3600;
            const jy = hotels[i].getElementsByTagName('Y')[0].textContent / 1000 / 3600;
            const wx = (jx - jy * 0.000046038 - jx * 0.000083043 + 0.010040);
            const wy = (jy - jy * 0.00010695 + jx * 0.000017464 + 0.0046017);

            hotelData[i] = {
              HotelID: hotelId,
              HotelName: hotelName,
              HotelAddress: hotelAddress,
              PlanSampleRateFrom: planSampleRateFrom,
              PictureURL: pictureURL,
              HotelUrl: hotelURL,
              X: wx,
              Y: wy,
              State: 'noVacancy',
            };
          }

          start1 += 100;
          hotelsData = hotelsData.concat(hotelData);
          this.lodgingSpot(`http://jws.jalan.net/APIAdvance/HotelSearch/V1/?key=${jalanKey}&s_area=192002&start=${start1}&count=100&xml_ptn=2`);
        } else if (xmlhttp.status === 400) {
          this.lodgingVacancySpot(`http://jws.jalan.net/APIAdvance/StockSearch/V1/?key=${jalanKey}&s_area=192002&stay_date=${timeData}&start=${start2}&count=100&order=2`);
        }
      }
    };

    xmlhttp.open('GET', url);
    xmlhttp.send();
  }

  // 宿泊地取得
  lodgingVacancySpot(url) {
    let hotelData = [];
    const parser = new DOMParser();
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState !== 4) {
        return;
      }

      if (xmlhttp.readyState === 4) {
        if (xmlhttp.status === 200) {
          const sMyString = xmlhttp.responseText;
          const dom = parser.parseFromString(sMyString, 'text/xml');
          const hotels = dom.getElementsByTagName('Plan');

          for (let i = 0; i < hotels.length; i += 1) {
            let pictureURL = '';
            const hotelId = hotels[i].getElementsByTagName('HotelID')[0].textContent;
            const hotelName = hotels[i].getElementsByTagName('HotelName')[0].textContent;
            const sampleRate = hotels[i].getElementsByTagName('SampleRate')[0].textContent;
            const hotelAddress = hotels[i].getElementsByTagName('HotelAddress')[0].textContent;
            const hotelURL = hotels[i].getElementsByTagName('HotelDetailURL')[0].textContent;
            if (hotels[i].getElementsByTagName('PictureURL')[0] !== undefined) {
              pictureURL = hotels[i].getElementsByTagName('PictureURL')[0].textContent;
            }
            const jx = hotels[i].getElementsByTagName('X')[0].textContent / 1000 / 3600;
            const jy = hotels[i].getElementsByTagName('Y')[0].textContent / 1000 / 3600;
            const wx = (jx - jy * 0.000046038 - jx * 0.000083043 + 0.010040);
            const wy = (jy - jy * 0.00010695 + jx * 0.000017464 + 0.0046017);

            hotelData[i] = {
              HotelID: hotelId,
              HotelName: hotelName,
              PlanSampleRateFrom: sampleRate,
              HotelAddress: hotelAddress,
              HotelUrl: hotelURL,
              PictureURL: pictureURL,
              X: wx,
              Y: wy,
              State: 'vacancy',
            };
          }

          hotelData = hotelData.filter((v1, i1, a1) => (a1.findIndex(v2 => (v1.HotelID === v2.HotelID)) === i1));
          // 100件の空室データから重複したIDを削除(値段が安いのが残る)
          vacancysData = vacancysData.concat(hotelData);
          start2 += 100;
          this.lodgingVacancySpot(`http://jws.jalan.net/APIAdvance/StockSearch/V1/?key=${jalanKey}&s_area=192002&stay_date=${timeData}&start=${start2}&count=100&order=2`);
        } else if (xmlhttp.status === 400) {
          // 全ての空室データから重複したIDを削除(値段が安いのが残る)
          vacancysData = vacancysData.filter((v1, i1, a1) => (a1.findIndex(v2 => (v1.HotelID === v2.HotelID)) === i1));
          // 空室データと宿泊施設データを結合し、重複したIDを削除(空室データが優先して残る)
          lodgingSpotData = vacancysData.concat(hotelsData);
          lodgingSpotData = lodgingSpotData.filter((v1, i1, a1) => (a1.findIndex(v2 => (v1.HotelID === v2.HotelID)) === i1));
          this.setState({ lodgingFacilities: lodgingSpotData });
        }
      }
    };
    xmlhttp.open('GET', url);
    xmlhttp.send();
  }

  // 現在の時刻を取得
  // eslint-disable-next-line class-methods-use-this
  nowTime() {
    const now = new Date();
    timeData = now.toFormat('YYYYMMDD');
  }

  // eslint-disable-next-line class-methods-use-this
  _convertPoints(data1) {
    const results = {
      type: 'MapCollection',
      features: [],
    };
    // eslint-disable-next-line array-callback-return
    data1.map((value) => {
      // eslint-disable-next-line no-undef
      array = {
        value,
        location: {
          latitude: value.coordinates.latitude,
          longitude: value.coordinates.longitude,
        },
      };
      // eslint-disable-next-line no-undef
      results.features.push(array);
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
  )

  renderCluster = (cluster, onPress) => (
    <Marker coordinate={cluster.coordinate} onPress={onPress}>
      <View style={styles.clusterContainer}>
        <Text style={styles.counterText}>
          {cluster.pointCount}
        </Text>
      </View>
    </Marker>
  )

  render() {
    const { lodgingFacilities, touristFacilities, isOpen } = this.state;
    const data1 = this._convertPoints(touristFacilities);
    return (
      <View style={styles.container}>
        <Modal
          isOpen={isOpen}
          toggleIsOpen={this.toggleIsOpen}
          data={data}
          detailScreen={this.detailScreen}
        />
        <MapView
          style={styles.mapview}
          data={data1}
          animateClusters={false}
          renderMarker={this.renderMarker}
          renderCluster={this.renderCluster}
          initialRegion={{
            latitude: 36.5780818,
            longitude: 136.6478206,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00521,
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <View style={styles.mark_blue} />
            <Text style={styles.text1}>空室</Text>
            <View style={styles.mark_red} />
            <Text style={styles.text1}>満室</Text>
          </View>
          {
            // 宿泊施設にピンを配置
            lodgingFacilities.map((lodgingFacilitie) => {
              let title = '値段';
              if (lodgingFacilitie.HotelID !== undefined) {
                title = lodgingFacilitie.PlanSampleRateFrom;
              }
              return (
                <Marker
                  coordinate={{
                    latitude: lodgingFacilitie.Y,
                    longitude: lodgingFacilitie.X,
                  }}
                  onPress={() => this.gotoElementScreen(lodgingFacilitie)}
                  key={lodgingFacilitie.HotelID}
                >
                  <View style={lodgingFacilitie.State === 'vacancy' ? styles.marker_blue : styles.marker_red}>
                    <Text style={styles.text}>
                      {title}
                    </Text>
                  </View>
                </Marker>);
            })
          }
        </MapView>
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
