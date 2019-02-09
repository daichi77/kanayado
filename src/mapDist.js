import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView from 'react-native-maps';
import global from './global';
import touristSpotMarkerImg from '../assets/678111-map-marker-512.png';

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

const Map = ({ navigation }) => {
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
          global.lodgingF.map((lodgingFacilitie) => {
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
          global.touristF.map((touristFacilitie) => {
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
};

export default Map;
