import React from 'react';
import { SearchBar } from 'react-native-elements';
import { View, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const drawerWidth = (screenWidth * 2) / 3;
const searchBarWidth = drawerWidth - 40;

const Search = ({ sendFilterText }) => (
  <View>
    <SearchBar
      round
      placeholder="観光地を検索"
      containerStyle={{
        width: searchBarWidth,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        marginLeft: 10,
      }}
      inputStyle={{ backgroundColor: '#F8FBEF' }}
      returnKeyType="done"
      onChangeText={(text) => {
        sendFilterText(text);
      }}
    />
  </View>
);

export default Search;
