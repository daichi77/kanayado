import React from 'react';
import {
  View, Text, ScrollView, StyleSheet, FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/AntDesign';
import PropTypes from 'prop-types';
import SearchBar from './Container/searchBar';

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

const DrawerCustom = ({ tourdata, navigation, filterText }) => {
  const keyExtractor = item => item.id;

  let data = tourdata;
  if (filterText) {
    data = data.filter(t => t.name.includes(filterText.text));
  }

  return (
    <SafeAreaView>
      <View style={styles.searchAndIcon}>
        <Icon
          name="left"
          size={25}
          onPress={() => {
            navigation.closeDrawer();
          }}
          style={styles.icon}
        />
        <SearchBar />
      </View>
      <ScrollView>
        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={({ item }) => (
            <View style={styles.kankouview}>
              <Text
                style={styles.kankoutext}
                onPress={() => {
                  // navigation.closeDrawer();
                  // navigation.navigate('Dist', { dist: item });
                  // console.log(item);
                }}
              >
                {item.name}
              </Text>
            </View>
          )}
        />
        {console.log(filterText)}
        <Text style={styles.scroll}>scrollのバグを解決するためのText</Text>
      </ScrollView>
    </SafeAreaView>
  );
};
DrawerCustom.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default DrawerCustom;
