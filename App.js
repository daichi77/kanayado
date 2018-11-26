import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MapView } from 'expo'
import touristSpotMarkerImg from './assets/678111-map-marker-512.png'

import {
  point 
} from '@turf/helpers'
import destination from '@turf/destination'

var json_data = []

export default class App extends React.Component{
  
  constructor(props){
    super(props)
    this.state = {
      facilities:[],
    }
  }

  componentDidMount(){
    this.fetchTouristSpot('https://infra-api.city.kanazawa.ishikawa.jp/facilities/search.json?lang=ja&page=1&count=50&area=1&genre=1')
  }

  fetchTouristSpot = async(url) => { 
    /*
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4) {
        if(xhr.status === 200) {
          console.log(xhr.readyState)
          console.log(xhr._response)
        }
      }
    }
    xhr.open("GET","http://jws.jalan.net/APIAdvance/HotelSearch/V1/?key=and16735d417c1&pref=190000")
    xhr.responseType = "document"
    xhr.send()
    */

    try {
      const response = await fetch(url)
      const json = await response.json()
      json_data = json_data.concat(json.facilities)
      if(json.next_page !== undefined) {
        this.fetchTouristSpot(json.next_page)
      } else {
        this.setState({facilities: json_data})
      }
    } catch (e) {
      console.log('error');
    }
  }

  render(){
    return(
      <View style = {styles.container}>
        <MapView
          style = {styles.mapview}
          region = {{
            latitude: 36.5780818,
            longitude: 136.6478206,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00521,
          }}>
          {
            this.state.facilities.map((facilitie) => {
              let title = "観光地名"
              if (facilitie["id"] !== undefined) {
                title = facilitie["name"]
              }
              return (<MapView.Marker
                coordinate={{
                  latitude: facilitie.coordinates.latitude,     
                  longitude: facilitie.coordinates.longitude,
                }}
                title = {title}
                image = {touristSpotMarkerImg}
                />)   
             })
           }
        </MapView>
      </View> 
    );
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
