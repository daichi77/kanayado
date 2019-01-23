import React from 'react';
import { SearchBar } from 'react-native-elements';
import { View } from 'react-native';
import PropTypes from 'prop-types';

class Search extends React.Component {
  dispatchfilter = (text) => {
    const { includeFilter } = this.props;
    return includeFilter(text);
  }

  render() {
    return (
      <View>
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
          onChangeText={(text) => { this.dispatchfilter(text); }}
        />
      </View>
    );
  }
}

Search.propTypes = {
  includeFilter: PropTypes.func.isRequired,
};

export default Search;
