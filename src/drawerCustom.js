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

// 観光データ（page1およびpage2）
let kankoudata = [];

class DrawerCustom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalkankoudata: [],
      filterText: '',
    };
  }

  componentWillMount() {
    this.getSpottoPage1();
    this.getSpottoPage2();
  }

  keyExtractor = item => item.id;

  // 観光データ(page1)の取得
  getSpottoPage1 = () => {
    fetch(
      'https://infra-api.city.kanazawa.ishikawa.jp/facilities/search.json?lang=ja&page=1&count=50&area=1&genre=1',
    )
      .then(response => response.json())
      .then((responseJson) => {
        // グローバル変数kankoudataに格納
        kankoudata = responseJson.facilities;
      });
  };

  // 観光データ(page2)の取得
  getSpottoPage2 = () => {
    fetch(
      'https://infra-api.city.kanazawa.ishikawa.jp/facilities/search.json?lang=ja&page=2&count=50&area=1&genre=1',
    )
      .then(response => response.json())
      .then((responseJson) => {
        // グローバル変数kankoudataに要素を結合
        kankoudata = kankoudata.concat(responseJson.facilities);
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
    let { totalkankoudata } = this.state;
    totalkankoudata = kankoudata;
    if (filterText !== '') {
      totalkankoudata = totalkankoudata.filter(t => t.name.includes(filterText));
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
            data={totalkankoudata}
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
