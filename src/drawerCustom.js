import React from 'react';
import {
  View, Text, ScrollView, StyleSheet, FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/AntDesign';
import PropTypes from 'prop-types';
import SearchBar from './searchBar';

const styles = StyleSheet.create({
  searchAndIcon: {
    flexDirection: 'row',
    marginTop: 30,
  },
  icon: {
    marginTop: 6,
    marginLeft: 10,
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
});

// 金沢の観光データのAPI
const kanazawaUrl = 'https://infra-api.city.kanazawa.ishikawa.jp/facilities/search.json?lang=ja&page=1&count=50&area=1&genre=1';

class DrawerCustom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kankouData: [],
      filterText: '',
    };
  }

  componentWillMount() {
    this.getSpot(kanazawaUrl);
  }

  keyExtractor = item => item.id;

  // 観光データ取得メソッド
  getSpot = (url) => {
    fetch(url)
      .then(response => response.json())
      .then((responseJson) => {
        const getKankouData = responseJson.facilities;
        this.setState(prevState => ({ kankouData: prevState.kankouData.concat(getKankouData) }));
        if (responseJson.nextPage !== undefined) {
          this.getSpot(responseJson.nextPage);
        }
      });
  };

  setFilter = (text) => {
    this.setState({
      filterText: text,
    });
  };

  render() {
    const { navigation } = this.props;
    const { filterText } = this.state;
    let { kankouData } = this.state;
    if (filterText !== '') {
      kankouData = kankouData.filter(t => t.name.includes(filterText));
    }
    return (
      <SafeAreaView>
        <View style={styles.searchAndIcon}>
          <Icon
            name="left"
            size={35}
            onPress={() => {
              navigation.closeDrawer();
              navigation.navigate('MainScreen');
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
            data={kankouData}
            keyExtractor={this.keyExtractor}
            renderItem={({ item }) => (
              <View style={styles.kankouview}>
                <Text
                  style={styles.kankoutext}
                  onPress={() => {
                    navigation.closeDrawer();
                    navigation.navigate('Dist', { dist: item });
                  }}
                >
                  {item.name}
                </Text>
              </View>
            )}
          />
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
