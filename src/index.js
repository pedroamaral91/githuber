import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import createNavigator from './routes';
import './config/ReactotronConfig';

function App() {
  const [userChecked, setUserChecked] = useState(false);
  const [userLogged, setUserLogged] = useState(false);

  async function getUser() {
    const user = await AsyncStorage.getItem('@Githuber:username');
    setUserLogged(!!user);
    setUserChecked(true);
  }
  useEffect(() => {
    getUser();
  }, []);

  if (!userChecked) return null;
  const Routes = createNavigator(userLogged);
  return <Routes />;
}

export default App;
