import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';

import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';
import Header from '../../components/Header';

import RepositoryItem from './RepositoryItem';
import styles from './styles';

function Repositories() {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function getRepositories() {
    setRefreshing(true);
    const username = await AsyncStorage.getItem('@Githuber:username');
    const { data } = await api.get(`/users/${username}/repos`);
    setLoading(false);
    setRepositories(data);
    setRefreshing(false);
  }

  function renderListItem({ item }) {
    return <RepositoryItem repository={item} />;
  }

  function renderList() {
    return (
      <FlatList
        data={repositories}
        keyExtractor={item => String(item.id)}
        renderItem={renderListItem}
        onRefresh={getRepositories}
        refreshing={refreshing}
      />
    );
  }

  useEffect(() => {
    getRepositories();
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Repositories" />
      {loading ? <ActivityIndicator style={styles.loading} /> : renderList()}
    </View>
  );
}
const TabBarIcon = ({ tintColor }) => <Icon name="list-alt" size={20} color={tintColor} />;

TabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Repositories.navigationOptions = {
  tabBarIcon: TabBarIcon,
};
export default Repositories;
