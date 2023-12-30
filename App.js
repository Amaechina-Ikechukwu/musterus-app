import {registerRootComponent} from 'expo';
import React, {useState} from 'react';
import store from './src/redux/store/index';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useEffect} from 'react';
import {Color} from './src/components/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';

import chatStack from './src/messaging/navigation/chatStack';
import groupStack from './src/messaging/navigation/groupStacks';
import AuthStack from './src/navigations/authStack';
import FeedNavigation from './src/feeds/navigation';
import MusterPointNavigation from './src/muster-points/navigation';
import ProfileNavigation from './src/user/navigation';
import notificationStack from './src/navigations/notificationStack';
import CreateFeed from './src/feeds/pages/createFeed';
import Search from './src/events/pages/search';
import {ActivityIndicator} from 'react-native';
import {
  useFonts,
  Montserrat_400Regular as Montserrat_Regular,
  Montserrat_500Medium as Montserrat,
  Montserrat_300Light as Montserrat_light,
  Montserrat_800ExtraBold as Montserrat_ExtraBold,
} from '@expo-google-fonts/montserrat';
const headerColor = '#fffdfb';
const navTheme = DefaultTheme;

const Colors = Color();
navTheme.colors.background = Colors.light;

const Stack = createStackNavigator();

function App() {
  const [signedIn, setSignedIn] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const value = await AsyncStorage.getItem('persist:user');

        const parsedValue = JSON.parse(value);

        if (parsedValue && parsedValue.User !== null) {
          setSignedIn(true);
        } else {
          setSignedIn(false);
        }
      } catch (e) {
        setSignedIn(false);
        console.error(e);
      }

      SplashScreen?.hide();
    }

    fetchData();
  }, [signedIn]);

  // useEffect(() => {
  // async function fetchData() {
  //   const keys = await AsyncStorage.getAllKeys();
  //   // Iterate through all keys and remove their values
  //   await AsyncStorage.multiRemove(keys);

  //   console.log('AsyncStorage cleared successfully.');
  //   setSignedIn(false);
  // }

  // fetchData();
  // }, []);
  let [fontsLoaded, fontError] = useFonts({
    Montserrat_Regular,
    Montserrat,
    Montserrat_ExtraBold,
    Montserrat_light,
  });
  if (!fontsLoaded) {
    return null; // Return a loading indicator until fonts are loaded
  }

  if (signedIn === null) {
    return <ActivityIndicator />; // Return a loading indicator while checking sign-in status
  }
  if (!fontsLoaded && !fontError) {
    return null;
  }
  if (signedIn == null) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <Provider store={store().store}>
        <PersistGate loading={null} persistor={store().persistor}>
          <NavigationContainer theme={navTheme}>
            <Stack.Navigator
              screenOptions={({route}) => ({
                headerStyle: {
                  backgroundColor: headerColor,
                },
              })}>
              {signedIn == true ? (
                <>
                  <Stack.Screen
                    name="Dashboard"
                    component={FeedNavigation}
                    options={{header: () => null}}
                  />
                  <Stack.Screen
                    name="Chat"
                    component={chatStack}
                    options={{header: () => null}}
                  />
                  <Stack.Screen
                    name="Group"
                    component={groupStack}
                    options={{header: () => null}}
                  />
                  <Stack.Screen
                    name="Notification"
                    component={notificationStack}
                    options={{header: () => null, title: 'Donation campaigns'}}
                  />
                  <Stack.Screen
                    name="Profile"
                    component={ProfileNavigation}
                    options={{header: () => null}}
                    initialParams={{close: () => setSignedIn(false)}}
                  />
                  <Stack.Screen
                    name="Search"
                    component={Search}
                    options={{header: () => null}}
                  />
                  <Stack.Screen
                    name="Muster Point"
                    component={MusterPointNavigation}
                    options={{header: () => null}}
                  />
                  <Stack.Screen
                    name="CreatePost"
                    component={CreateFeed}
                    options={{header: () => null}}
                  />
                </>
              ) : (
                <Stack.Screen
                  name="Auth"
                  component={AuthStack}
                  options={{header: () => null}}
                  initialParams={{logged: () => setSignedIn(true)}}
                />
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
registerRootComponent(App);
