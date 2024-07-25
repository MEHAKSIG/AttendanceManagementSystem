import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthContext, { AuthProvider } from './context/AuthContext';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation, { LoginNavigation } from './navigation';
import WithAxios from './services/axios-interceptor/withAxios';
import { getUserDetail, setSettingsLocalStorage } from './services/DataStorageService';
import { GetSettingsAsync } from './services/SettingsService';

export interface BaseProps {
  navigation: NavigationProp<ParamListBase, string, any, any>;
  route: RouteProp<ParamListBase>;
}

export default function App() {

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const isLoadingComplete = useCachedResources();

  const colorScheme = useColorScheme();

  const authProvider: AuthProvider = {
    onAuthenticationSuccess: (isSuccess, userRole) => {
      setIsAuthenticated(isSuccess);
    }
  }

  const checkIfUserAlreadyAuthenticated = async () => {
    const userData = await getUserDetail();
    if (userData?.userId && userData.userId > 0) {
      setIsAuthenticated(true);
    }

    // console.log(userData, "userData-App.tsx");
  }

  React.useEffect(() => {
    checkIfUserAlreadyAuthenticated();
  }, [])

  React.useEffect(() => {
    if (isAuthenticated) {
      GetAndSaveSettingsInLocalStorage();
    }
  }, [isAuthenticated])

  const GetAndSaveSettingsInLocalStorage = async () => {
    try {
      const res = await GetSettingsAsync();
      const data = res.data;
      // console.log(data, "data-GetSettingsAsync");
      if (data.IsSuccess) {
        const settings = data.Result.settings;
        setSettingsLocalStorage(settings);
      } else {
        alert('Error : ' + data.Msg);
        console.log('Error : ' + data.Msg);
      }
    } catch (e) {
      console.log("Error(GetAndSaveSettingsInLocalStorage) : " + e);
    }
  }


  if (!isLoadingComplete) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <AuthContext.Provider value={authProvider}>
        {/* <LoginScreen /> */}
        <SafeAreaProvider>
          <LoginNavigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </AuthContext.Provider>
    )
  }

  //return console.log('checking navigation');

  return (
    <AuthContext.Provider value={authProvider}>
      <WithAxios>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </WithAxios>
    </AuthContext.Provider>
  );

}
