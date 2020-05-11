import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import Styles from './CategoryListStyle';
import FastImage from 'react-native-fast-image';
import {Images} from 'src/Theme';

const SearchBox = props => {
  return (
    <View style={Styles.HomeSearchArea}>
      <View style={Styles.HomeSearchInputContainer}>
        <TextInput
          placeholder={'keyword'}
          style={Styles.HomeSearchInput}
          onChangeText={props.inputProc}
        />
      </View>
      <TouchableOpacity
        onPress={props.handleSearch}
        style={Styles.HomeSearchBtn}>
        <Text>search</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBox;
