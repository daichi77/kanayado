import React from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import touristSpotMarkerImg from '../assets/location.png';

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
    // justifyContent: 'center',
    alignSelf: 'flex-end',
    top: '134%',
    width: 86,
    height: 86,
  },
  imageButton: {
    flex: 0,
    // flexDirection: 'row-reverse',
    // justifyContent: 'flex-end',
    // alignItems: 'flex-end',
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

class Map extends React.Component {
  render() {
    const { lodgingdata, tourdata } = this.props;
    if (lodgingdata) {
      return (
        <MapView
          style={styles.mapView}
        >
          {
            lodgingdata.map((lodgingFacility) => {
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
                    <Text style={styles.text}>
                      {title}
                    </Text>
                  </View>
                </Marker>
              );
            })
          }
          {
            // 観光施設にピンを配置
            tourdata.map((touristFacilitie) => {
              let title = '観光地名';
              if (touristFacilitie.id !== undefined) {
                title = touristFacilitie.name;
              }
              return (
                <Marker
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
      );
    } // else {
    return (
      <MapView
        style={styles.mapView}
        initialRegion={{
          latitude: 36.5780818,
          longitude: 136.6478206,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00521,
        }}
      />
    );
  }
}


export default Map;
