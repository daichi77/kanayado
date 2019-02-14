import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView from 'react-native-maps';
import { DOMParser } from 'xmldom';
import touristSpotMarkerImg from '../assets/location.png';

let hotelsData = [];
let vacancysData = [];
let lodgingSpotData = [];
let touristSpotData = [];
let start1 = 1;
let start2 = 1;
const jalanKey = 'and16735d417c1';
const timeData = 20190130;

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

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      touristFacilities: [],
      lodgingFacilities: [],
    };
  }

  componentWillMount() {
    this.touristSpot('https://infra-api.city.kanazawa.ishikawa.jp/facilities/search.json?lang=ja&page=1&count=50&area=1&genre=1');
    this.lodgingSpot(`http://jws.jalan.net/APIAdvance/HotelSearch/V1/?key=${jalanKey}&s_area=192002&start=${start1}&count=100&xml_ptn=2`);
  }

  // 観光地取得
  touristSpot = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      touristSpotData = touristSpotData.concat(json.facilities);
      if (json.nextPage !== undefined) {
        this.touristSpot(json.nextPage);
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
            const hotelId = hotels[i].getElementsByTagName('HotelID')[0].textContent;
            const hotelName = hotels[i].getElementsByTagName('HotelName')[0].textContent;
            const planSampleRateFrom = hotels[i].getElementsByTagName('SampleRateFrom')[0].textContent;

            const jx = hotels[i].getElementsByTagName('X')[0].textContent / 1000 / 3600;
            const jy = hotels[i].getElementsByTagName('Y')[0].textContent / 1000 / 3600;
            const wx = (jx - jy * 0.000046038 - jx * 0.000083043 + 0.010040);
            const wy = (jy - jy * 0.00010695 + jx * 0.000017464 + 0.0046017);

            hotelData[i] = {
              HotelID: hotelId,
              HotelName: hotelName,
              X: wx,
              Y: wy,
              PlanSampleRateFrom: planSampleRateFrom,
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
          // eslint-disable-next-line no-underscore-dangle
          const sMyString = xmlhttp.responseText;
          const dom = parser.parseFromString(sMyString, 'text/xml');
          const hotels = dom.getElementsByTagName('Plan');

          for (let i = 0; i < hotels.length; i += 1) {
            const hotelId = hotels[i].getElementsByTagName('HotelID')[0].textContent;
            const hotelName = hotels[i].getElementsByTagName('HotelName')[0].textContent;
            const sampleRate = hotels[i].getElementsByTagName('SampleRate')[0].textContent;
            const jx = hotels[i].getElementsByTagName('X')[0].textContent / 1000 / 3600;
            const jy = hotels[i].getElementsByTagName('Y')[0].textContent / 1000 / 3600;
            const wx = (jx - jy * 0.000046038 - jx * 0.000083043 + 0.010040);
            const wy = (jy - jy * 0.00010695 + jx * 0.000017464 + 0.0046017);

            hotelData[i] = {
              HotelID: hotelId,
              HotelName: hotelName,
              X: wx,
              Y: wy,
              PlanSampleRateFrom: sampleRate,
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

  render() {
    const { lodgingFacilities, touristFacilities } = this.state;
    const { navigation } = this.props;
    const { coordinates } = navigation.getParam('dist');
    const region = {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      latitudeDelta: 0.00922,
      longitudeDelta: 0.00521,
    };
    return (
      <View style={styles.container}>
        <MapView
          style={styles.mapview}
          region={region}
        >
          {
            // 宿泊施設にピンを配置
            lodgingFacilities.map((lodgingFacilitie) => {
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
