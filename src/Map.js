import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MapView } from 'expo'
import touristSpotMarkerImg from '../assets/678111-map-marker-512.png'

let hotelsData = []
let vacancysData = []
let lodgingSpotData = []
let touristSpotData = []

let start1 = 1
let start2 = 1

const jalanKey = 'and16735d417c1'

export default class Map extends React.Component{
  
  constructor(props){
    super(props)
    this.state = {
      touristFacilities:[], 
      lodgingFacilities:[],
    }
  }

  componentDidMount(){
    this.touristSpot('https://infra-api.city.kanazawa.ishikawa.jp/facilities/search.json?lang=ja&page=1&count=50&area=1&genre=1')
    this.lodgingSpot('http://jws.jalan.net/APIAdvance/HotelSearch/V1/?key=' + jalanKey + '&s_area=192002&start='  + start1 + '&count=100&xml_ptn=2')
  }

  //宿泊地取得
  lodgingSpot(url){
    let hotelData = []
    const DOMParser = require("xmldom").DOMParser
    const parser = new DOMParser()
    const xmlhttp = new XMLHttpRequest()

    xmlhttp.onreadystatechange = function() {
      if(xmlhttp.readyState === 4) {
        if(xmlhttp.status === 200) {
          const sMyString = xmlhttp._response
          const dom = parser.parseFromString(sMyString, "text/xml")
          const hotels = dom.getElementsByTagName("Hotel")

          for (var i = 0; i < hotels.length; i++){
            let hotelId = hotels[i].getElementsByTagName("HotelID")[0].textContent
            let hotelName = hotels[i].getElementsByTagName("HotelName")[0].textContent
            let planSampleRateFrom = hotels[i].getElementsByTagName("SampleRateFrom")[0].textContent

            let jx = hotels[i].getElementsByTagName("X")[0].textContent / 1000 / 3600
            let jy = hotels[i].getElementsByTagName("Y")[0].textContent / 1000 / 3600
            let wx = (jx - jy * 0.000046038 - jx * 0.000083043 + 0.010040) 
            let wy = (jy - jy * 0.00010695 + jx * 0.000017464 + 0.0046017)

            hotelData[i] = {"HotelID":hotelId,"HotelName":hotelName,"X":wx,"Y":wy,"PlanSampleRateFrom":planSampleRateFrom,"State":"noVacancy"}
          }

          start1 += 100
          hotelsData = hotelsData.concat(hotelData)
          this.lodgingSpot('http://jws.jalan.net/APIAdvance/HotelSearch/V1/?key=' + jalanKey + '&s_area=192002&start=' + start1 + '&count=100&xml_ptn=2')

        }else if(xmlhttp.status === 400){
          this.lodgingVacancySpot('http://jws.jalan.net/APIAdvance/StockSearch/V1/?key=' + jalanKey + '&s_area=192002&stay_date=20181220&start=' + start2 + '&count=100&order=2')
        }
      }
    }.bind(this)

    xmlhttp.open("GET",url)
    xmlhttp.responseType = "document"   
    xmlhttp.send()
  }

    //宿泊地取得
    lodgingVacancySpot(url){
      let hotelData = []
      const DOMParser = require("xmldom").DOMParser
      const parser = new DOMParser()
      const xmlhttp = new XMLHttpRequest()

      xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState === 4) {
          if(xmlhttp.status === 200) {
            const sMyString = xmlhttp._response
            const dom = parser.parseFromString(sMyString, "text/xml")
            const hotels = dom.getElementsByTagName("Plan")

            for (var i = 0; i < hotels.length; i++){
              let hotelId = hotels[i].getElementsByTagName("HotelID")[0].textContent
              let hotelName = hotels[i].getElementsByTagName("HotelName")[0].textContent
              let sampleRate = hotels[i].getElementsByTagName("SampleRate")[0].textContent
              let jx = hotels[i].getElementsByTagName("X")[0].textContent / 1000 / 3600
              let jy = hotels[i].getElementsByTagName("Y")[0].textContent / 1000 / 3600
              let wx = (jx - jy * 0.000046038 - jx * 0.000083043 + 0.010040) 
              let wy = (jy - jy * 0.00010695 + jx * 0.000017464 + 0.0046017)

              hotelData[i] = {"HotelID":hotelId,"HotelName":hotelName,"X":wx,"Y":wy,"PlanSampleRateFrom":sampleRate,"State":"vacancy"}
            }           

            hotelData = hotelData.filter(function(v1,i1,a1){ 
              return (a1.findIndex(function(v2){ 
                return (v1.HotelID===v2.HotelID) 
              }) === i1)
            })
            //100件の空室データから重複したIDを削除(値段が安いのが残る)
            vacancysData = vacancysData.concat(hotelData)
            start2 += 100
            this.lodgingVacancySpot('http://jws.jalan.net/APIAdvance/StockSearch/V1/?key=' + jalanKey + '&s_area=192002&stay_date=20181220&start=' + start2 + '&count=100&order=2')

          }else if(xmlhttp.status === 400){
            //全ての空室データから重複したIDを削除(値段が安いのが残る)
            vacancysData = vacancysData.filter(function(v1,i1,a1){ 
              return (a1.findIndex(function(v2){ 
                return (v1.HotelID===v2.HotelID) 
              }) === i1)
            })
            //空室データと宿泊施設データを結合し、重複したIDを削除(空室データが優先して残る)
            lodgingSpotData = vacancysData.concat(hotelsData)
            lodgingSpotData = lodgingSpotData.filter(function(v1,i1,a1){ 
              return (a1.findIndex(function(v2){ 
                return (v1.HotelID===v2.HotelID) 
              }) === i1)
            })
            this.setState({lodgingFacilities: lodgingSpotData})
          }
        }
      }.bind(this)
      xmlhttp.open("GET",url)
      xmlhttp.responseType = "document"   
      xmlhttp.send()
    }

  //観光地取得
  touristSpot = async(url) => { 
    try {
      const response = await fetch(url)
      const json = await response.json()
      touristSpotData = touristSpotData.concat(json.facilities)
      if(json.next_page !== undefined) {
        this.touristSpot(json.next_page)
      } else {
        this.setState({touristFacilities: touristSpotData})
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
            //宿泊施設にピンを配置
            this.state.lodgingFacilities.map((lodgingFacilitie) => {
              if (lodgingFacilitie["HotelID"] !== undefined) {
                title = lodgingFacilitie["PlanSampleRateFrom"]
              }
              if(lodgingFacilitie["State"] === "noVacancy"){
                console.log("0")
                return (<MapView.Marker
                  coordinate={{
                    latitude: lodgingFacilitie["Y"],     
                    longitude: lodgingFacilitie["X"],
                  }}
                  key = {lodgingFacilitie["HotelID"]}>
                  <View style={styles.marker}>
                    <Text style={styles.text}>¥{title}~</Text>
                  </View>
                </MapView.Marker>)   
              }else{
                return (<MapView.Marker
                  coordinate={{
                    latitude: lodgingFacilitie["Y"],     
                    longitude: lodgingFacilitie["X"],
                  }}
                  key = {lodgingFacilitie["HotelID"]}>
                  <View style={styles.marker1}>
                    <Text style={styles.text}>¥{title}~</Text>
                  </View>
                </MapView.Marker>) 
              }
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
                
                title = {title}
                key = {touristFacilitie["id"]}
                image = {touristSpotMarkerImg}
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
    color: "#FFF",
    fontWeight: 'bold',
  },
});
