import React from 'react';
import {
  View, Text, ScrollView, StyleSheet, FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/AntDesign';
import PropTypes from 'prop-types';
import SearchBar from './searchBar';
import global from './global';

const styles = StyleSheet.create({
  searchAndIcon: {
    flexDirection: 'row',
    marginTop: 10,
  },
  icon: {
    marginTop: 10,
    marginLeft: 5,
  },
  kankouview: {
    padding: 10,
    borderStyle: 'solid',
    borderBottomWidth: 1,
  },
  kankoutext: {
    fontSize: 16,
    lineHeight: 25,
  },
  scroll: {
    marginBottom: 64,
    color: 'white',
  },
});

class DrawerCustom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
    };
  }

  keyExtractor = item => item.id;

  setFilter = (text) => {
    this.setState({
      filterText: text,
    });
  };

  render() {
    const { navigation } = this.props;
    const { filterText } = this.state;
    let kankoudata = global.touristF;
    if (filterText !== '') {
      kankoudata = kankoudata.filter(t => t.name.includes(filterText));
    }
    return (
      <SafeAreaView>
        <View style={styles.searchAndIcon}>
          <Icon
            name="left"
            size={25}
            onPress={() => {
              navigation.closeDrawer();
              // navigation.navigate('MainScreen');
            }}
            style={styles.icon}
          />
          <SearchBar
            includeFilter={(text) => {
              this.setFilter(text);
            }}
          />
        </View>
        <ScrollView>
          <FlatList
            data={kankoudata}
            keyExtractor={this.keyExtractor}
            renderItem={({ item }) => (
              <View style={styles.kankouview}>
                <Text
                  style={styles.kankoutext}
                  onPress={() => {
                    navigation.closeDrawer();
                    navigation.navigate('Dist', { dist: item });
                    console.log(item);
                  }}
                >
                  {item.name}
                </Text>
              </View>
            )}
          />
          <Text style={styles.scroll}>scrollのバグを解決するためのText</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

DrawerCustom.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default DrawerCustom;
