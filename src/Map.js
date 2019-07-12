import React from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import ClusteredMapView from 'react-native-maps-super-cluster';
import { BarIndicator } from 'react-native-indicators';
import MapView, { Marker } from 'react-native-maps';
import Modal from './Container/madal';
import touristSpotMarkerImg from '../assets/location.png';

let data1 = null;

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

  comeOutModal = (lodgingFacility) => {
    const { modalIsOpen, saveHotelData } = this.props;
    saveHotelData(lodgingFacility);
    modalIsOpen();
  };

  setMapRef = (clusteredMap) => {
    this.mapView = clusteredMap.getMapRef();
  };

  // eslint-disable-next-line arrow-parens
  convertPoints = data => {
    const results = {
      type: 'MapCollection',
      features: [],
    };
    // eslint-disable-next-line arrow-parens
    data.map(value => {
      const array = {
        value,
        location: {
          latitude: value.coordinates.latitude,
          longitude: value.coordinates.longitude,
        },
      };
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
  );

  renderCluster = (cluster, onPress) => (
    <Marker
      coordinate={cluster.coordinate}
      onPress={onPress}
    >
      <View style={styles.clusterContainer}>
        <Text style={styles.counterText}>
          {cluster.pointCount}
        </Text>
      </View>
    </Marker>
  );

  render() {
    const { lodgingdata, tourdata, } = this.props;
    const KanazawaStation = {
      latitude: 36.5780818,
      longitude: 136.6478206,
      latitudeDelta: 0.00922,
      longitudeDelta: 0.00521,
    };
    if (tourdata) {
      data1 = this.convertPoints(tourdata);
    }

    if (lodgingdata) {
      return (
        <View style={styles.container}>
          <Modal />
          <ClusteredMapView
            style={styles.mapView}
            ref={this.setMapRef}
            data={data1}
            animateClusters={false}
            renderMarker={this.renderMarker}
            renderCluster={this.renderCluster}
            initialRegion={KanazawaStation}
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
                    onPress={() => this.comeOutModal(lodgingFacility)}
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
          </ClusteredMapView>
        </View>
      );
    } // else
    return (
      <BarIndicator />
    );
  }
}

export default Map;
