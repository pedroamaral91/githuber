import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import api from '../../services/api';
import styles from './styles';

function Welcome({ navigation }) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function checkUserExists() {
    const user = await api.get(`/users/${username}`);
    return user;
  }

  async function saveUser() {
    await AsyncStorage.setItem('@Githuber:username', username);
  }

  async function signIn() {
    try {
      setLoading(true);
      await checkUserExists(username);
      await saveUser(username);
      navigation.navigate('User');
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.text}>To continue, we need your username in GitHub</Text>
      {error && <Text style={styles.textError}>User not found.</Text>}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Your username"
          underlineColorAndroid="transparent"
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <TouchableOpacity style={styles.button} onPress={signIn}>
          {loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Next</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
Welcome.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default Welcome;
