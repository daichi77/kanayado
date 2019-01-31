import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView from 'react-native-maps';
import { DOMParser } from 'xmldom';
import Modal from './modal';
import touristSpotMarkerImg from '../assets/678111-map-marker-512.png';
import 'date-utils';
import { Location, Permissions } from 'expo';

let hotelsData = [];
let vacancysData = [];
let lodgingSpotData = [];
let touristSpotData = [];
let data = [];
let start1 = 1;
let start2 = 1;
let lat = 0;
let lon = 0;
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

  marker: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 10,
  },
  marker1: {
    backgroundColor: 'blue',
    padding: 5,
    borderRadius: 10,
  },
  text: {
    color: '#FFF',
    fontWeight: 'bold',
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
      locationResult: null,
    };
  }

  componentWillMount() {
    this.getLocationAsync();
    this.nowTime();
    this.touristSpot('https://infra-api.city.kanazawa.ishikawa.jp/facilities/search.json?lang=ja&page=1&count=50&area=1&genre=1');
    this.lodgingSpot(`http://jws.jalan.net/APIAdvance/HotelSearch/V1/?key=${jalanKey}&s_area=192002&start=${start1}&count=100&xml_ptn=2`);
  }

  // 現在地取得
  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permisstion to access location was Denied',
      });
    }

    const location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location) });
    lat = location.coords.latitude;
    lon = location.coords.longitude;
    lat = lat.toFixed(7);
    lon = lon.toFixed(7);
    console.log('getLocationAsync関数内：');
    console.log(lat);
    console.log(lon);
  };

  toggleIsOpen = () => this.setState(state => ({ isOpen: !state.isOpen }))

  gotoElementScreen = (lodgingFacilitie) => {
    data = lodgingFacilitie;
    this.setState({ isOpen: true });
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
              PlanSampleRateFrom: planSampleRateFrom,
              PictureURL: pictureURL,
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

  // 次の画面へ遷移します
  // eslint-disable-next-line class-methods-use-this
  detailScreen() {
    console.log(data);
  }

  render() {
    console.log('render内：');
    console.log(lat);
    console.log(lon);
    const { lodgingFacilities, touristFacilities, isOpen } = this.state;
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
          initialRegion={{
            // 現在住所(少数第７位まで)
            // 36.5289133
            // 136.6285175
            latitude: lat , // 緯度
            longitude: lon , // 経度
            // ズーム
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00521,
          }}
        >

          {
            // 宿泊施設にピンを配置
            lodgingFacilities.map((lodgingFacilitie) => {
              // const { navigation } = this.props;
              // navigaftion.setParams({ lodging: lodgingFacilitie });
              let title = '値段';
              if (lodgingFacilitie.HotelID !== undefined) {
                title = lodgingFacilitie.PlanSampleRateFrom;
              }
              if (lodgingFacilitie.State === 'noVacancy') {
                return (
                  <MapView.Marker
                    coordinate={{
                      latitude: lodgingFacilitie.Y,
                      longitude: lodgingFacilitie.X,
                    }}
                    onPress={() => this.gotoElementScreen(lodgingFacilitie)}
                    key={lodgingFacilitie.HotelID}
                  >
                    <View style={styles.marker}>
                      <Text style={styles.text}>
                        {title}
                      </Text>
                    </View>
                  </MapView.Marker>);
              }
              return (
                <MapView.Marker
                  coordinate={{
                    latitude: lodgingFacilitie.Y,
                    longitude: lodgingFacilitie.X,
                  }}
                  onPress={() => this.gotoElementScreen(lodgingFacilitie)}
                  key={lodgingFacilitie.HotelID}
                >
                  <View style={styles.marker1}>
                    <Text style={styles.text}>{title}</Text>
                  </View>
                </MapView.Marker>
              );
            })
          }
          {
            // 観光施設にピンを配置
            touristFacilities.map((touristFacilitie) => {
              // const { navigation } = this.props;
              // navigation.setParams({ tourist: touristFacilitie });
              let title = '観光地名';
              if (touristFacilitie.id !== undefined) {
                title = touristFacilitie.name;
              }
              return (
                <MapView.Marker
                  coordinate={{
                    latitude: touristFacilitie.coordinates.latitude,
                    longitude: touristFacilitie.coordinates.longitude,
                  }}
                  title={title}
                  key={touristFacilitie.id}
                  image={touristSpotMarkerImg}
                />
              );
            })
          }

        </MapView>
      </View>
    );
  }
}

export default Map;
