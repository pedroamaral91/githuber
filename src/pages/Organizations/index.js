import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';

import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';
import Header from '../../components/Header';

import OrganizationItem from './OrganizationItem';
import styles from './styles';

function Organizations() {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function getRepositories() {
    setRefreshing(true);
    const username = await AsyncStorage.getItem('@Githuber:username');
    const { data } = await api.get(`/users/${username}/orgs`);
    setLoading(false);
    setRepositories(data);
    setRefreshing(false);
  }

  function renderListItem({ item }) {
    return <OrganizationItem organization={item} />;
  }

  function renderList() {
    return (
      <FlatList
        data={repositories}
        keyExtractor={item => String(item.id)}
        renderItem={renderListItem}
        onRefresh={getRepositories}
        refreshing={refreshing}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />
    );
  }

  useEffect(() => {
    getRepositories();
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Organizations" />
      {loading ? <ActivityIndicator style={styles.loading} /> : renderList()}
    </View>
  );
}

const TabBarIcon = ({ tintColor }) => <Icon name="building" size={20} color={tintColor} />;

TabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Organizations.navigationOptions = {
  tabBarIcon: TabBarIcon,
};

export default Organizations;
