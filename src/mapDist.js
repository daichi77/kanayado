import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView from 'react-native-maps-super-cluster';
import { Marker } from 'react-native-maps';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import Modal from './modal';
import global from './global';
import touristSpotMarkerImg from '../assets/location.png';
import DistHeaderLeft from './distHeaderLeft';

import 'date-utils';

let data = [];

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
class MapDist extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { name } = navigation.getParam('dist', '観光地');
    return {
      title: name,
      headerLeft: <DistHeaderLeft />,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      region: '',
      isOpen: false,
    };
  }

  componentWillMount() {
    const { navigation } = this.props;
    const { coordinates } = navigation.getParam('dist');
    const getregion = {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      latitudeDelta: 0.00922,
      longitudeDelta: 0.00521,
    };
    this.setState({ region: getregion });
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

  // eslint-disable-next-line class-methods-use-this
  convertPoints(data1) {
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
    const { isOpen, region } = this.state;
    const data1 = this.convertPoints(global.touristF);
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
          region={region}
          zoomEnabled
        >
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <View style={styles.mark_blue} />
            <Text style={styles.text1}>空室</Text>
            <View style={styles.mark_red} />
            <Text style={styles.text1}>満室</Text>
          </View>
          {
            // 宿泊施設にピンを配置
            global.lodgingF.map((lodgingFacilitie) => {
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

MapDist.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigation(MapDist);
