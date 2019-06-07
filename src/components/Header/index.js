import React from 'react';
import { withNavigation } from 'react-navigation';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';

function Header({ title, navigation }) {
  async function signOut() {
    await AsyncStorage.clear();

    navigation.navigate('Welcome');
  }
  return (
    <View style={styles.container}>
      <View style={styles.left} />
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={signOut}>
        <Icon name="exchange" size={16} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default withNavigation(Header);
