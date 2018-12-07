import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MapView } from 'expo'
import touristSpotMarkerImg from '../assets/678111-map-marker-512.png'

var lodgingSpotData = []
var touristSpotData = []

export default class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      touristFacilities: [],
      lodgingFacilities: [],
    }
  }

  componentDidMount() {
    this.touristSpot('https://infra-api.city.kanazawa.ishikawa.jp/facilities/search.json?lang=ja&page=1&count=50&area=1&genre=1')
    this.lodgingSpot("http://jws.jalan.net/APIAdvance/HotelSearch/V1/?key=and16735d417c1&l_area=192000&start=1&count=100")
  }
  //宿泊地取得
  lodgingSpot(url) {
    var DOMParser = require("xmldom").DOMParser
    var parser = new DOMParser()
    var xmlhttp = new XMLHttpRequest()
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4) {
        if (xmlhttp.status === 200) {
          var sMyString = xmlhttp._response
          var dom = parser.parseFromString(sMyString, "text/xml")
          var hotels = dom.getElementsByTagName("Hotel")
          for (var i = 0; i < hotels.length; i++) {
            var hotelId = hotels[i].getElementsByTagName("HotelID")[0].textContent
            var hotelName = hotels[i].getElementsByTagName("HotelName")[0].textContent
            var jx = hotels[i].getElementsByTagName("X")[0].textContent / 1000 / 3600
            var jy = hotels[i].getElementsByTagName("Y")[0].textContent / 1000 / 3600
            var wx = (jx - jy * 0.000046038 - jx * 0.000083043 + 0.010040)
            var wy = (jy - jy * 0.00010695 + jx * 0.000017464 + 0.0046017)
            lodgingSpotData[i] = { "HotelID": hotelId, "HotelName": hotelName, "X": wx, "Y": wy }
          }
          this.setState({ lodgingFacilities: lodgingSpotData })
        }
      }
    }.bind(this)
    xmlhttp.open("GET", url)
    xmlhttp.responseType = "document"
    xmlhttp.send()
  }

  //観光地取得
  touristSpot = async (url) => {
    try {
      const response = await fetch(url)
      const json = await response.json()
      touristSpotData = touristSpotData.concat(json.facilities)
      if (json.next_page !== undefined) {
        this.touristSpot(json.next_page)
      } else {
        this.setState({ touristFacilities: touristSpotData })
      }
    } catch (e) {
      console.log('error');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.mapview}
          region={{
            latitude: 36.5780818,
            longitude: 136.6478206,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00521,
          }}>
          {
            //宿泊施設にピンを配置
            this.state.lodgingFacilities.map((lodgingFacilitie) => {
              let title = "宿泊地"
              if (lodgingFacilitie["HotelID"] !== undefined) {
                title = lodgingFacilitie["HotelName"]
              }
              return (<MapView.Marker
                coordinate={{
                  latitude: lodgingFacilitie["Y"],
                  longitude: lodgingFacilitie["X"],
                }}
                title={title}
                key={lodgingFacilitie["HotelID"]}
              />)
            })
          }
          {
            // 観光施設にピンを配置
            this.state.touristFacilities.map((touristFacilitie) => {
              let title = "観光地名"
              if (touristFacilitie["id"] !== undefined) {
                title = touristFacilitie["name"]
              }
              return (<MapView.Marker
                coordinate={{
                  latitude: touristFacilitie.coordinates.latitude,
                  longitude: touristFacilitie.coordinates.longitude,
                }}
                title={title}
                key={touristFacilitie["id"]}
                image={touristSpotMarkerImg}
              />)
            })
          }
        </MapView>
      </View>
    )
  }
}

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
});
