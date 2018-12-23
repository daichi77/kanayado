import React from 'react';
import {
  View, Text, ScrollView, StyleSheet, FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/AntDesign';
import { SearchBar } from 'react-native-elements';
import PropTypes from 'prop-types';

class DrawerCustom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kankoudata: null,
      filterText: '',
    };
  }

  componentWillMount() {
    this.fetch();
  }

  keyExtractor = item => item.id;

  fetch = () => {
    fetch('https://infra-api.city.kanazawa.ishikawa.jp/facilities/search.json?lang=ja&page=1&count=50&area=1&genre=1')
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({ kankoudata: responseJson.facilities });
      });
  };

  render() {
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
    const { navigation } = this.props;
    const { filterText } = this.state;
    let { kankoudata } = this.state;
    if (filterText !== '') {
      kankoudata = kankoudata.filter(t => t.name.includes(filterText));
    }

    return (
      <SafeAreaView>
        <View style={styles.searchAndIcon}>
          <Icon
            name="left"
            size={35}
            onPress={() => navigation.navigate('MainScreen')}
            style={styles.icon}
          />
          <SearchBar
            round
            placeholder="観光地を検索"
            containerStyle={{
              width: 270,
              backgroundColor: '#FFFFFF',
              borderTopWidth: 0,
              borderBottomWidth: 0,
              marginLeft: 20,
            }}
            inputStyle={{ backgroundColor: '#F8FBEF' }}
            returnKeyType="done"
            onChangeText={text => this.setState({ filterText: text })}
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
                  }}
                >
                  {item.name}
                </Text>
              </View>
            )
            }
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
