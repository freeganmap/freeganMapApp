// @ts-nocheck
/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import { ColorSchemeName, Pressable, StyleSheet, View, Text, Button, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Buffer } from "buffer";


import Colors, { highlightColor } from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import MapFiltersModalScreen from '../screens/MapFiltersModalScreen';
import ListingModalScreen from '../screens/ListingModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import ExploreScreen from '../screens/ExploreScreen';
import SavedScreen from '../screens/SavedScreen';
import CameraScreen from '../screens/CameraScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import {
  useFonts,
  Raleway_400Regular,
  Raleway_400Regular_Italic,
  Raleway_700Bold,
  Raleway_700Bold_Italic,
  Raleway_600SemiBold,
} from '@expo-google-fonts/raleway';
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import {
  RobotoMono_400Regular,
  RobotoMono_500Medium,
  RobotoMono_600SemiBold
} from '@expo-google-fonts/roboto-mono';

import { MaterialCommunityIcons, FontAwesome, Ionicons, EvilIcons, Fontisto } from '@expo/vector-icons'; 
import AppContext from '../contexts/app-context';
import { createOrUpdateUser } from '../helpers/auth-helpers';
import { Web3AuthIOClientId } from "../constants/Auth";
import Web3Auth, { LOGIN_PROVIDER, OPENLOGIN_NETWORK } from "@web3auth/react-native-sdk";
import * as WebBrowser from "expo-web-browser";

// TODO: display for dark theme well, too. For now, focus on light

// const ADAPTER_EVENTS = {
//   ADAPTER_DATA_UPDATED: "adapter_data_updated",
//   NOT_READY: "not_ready",
//   READY: "ready",
//   CONNECTING: "connecting",
//   CONNECTED: "connected",
//   DISCONNECTED: "disconnected",
//   ERRORED: "errored",
// }

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_400Regular_Italic,
    Raleway_700Bold,
    Raleway_700Bold_Italic,
    Raleway_600SemiBold,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    RobotoMono_400Regular,
    RobotoMono_500Medium,
    RobotoMono_600SemiBold
  });
  if (!fontsLoaded) return null
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      // theme={DefaultTheme}
      >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

export const web3auth = new Web3Auth(WebBrowser, {
  clientId: Web3AuthIOClientId,
  network: OPENLOGIN_NETWORK.TESTNET,
});

function RootNavigator() {
  // @ts-ignore
  const [activeListing, setActiveListing] = useState();
  const [user, setUser] = useState();
  const [authenticated, setAuthenticated] = useState(false);

  const web3auth = new Web3Auth(WebBrowser, {
    clientId: Web3AuthIOClientId,
    network: OPENLOGIN_NETWORK.TESTNET,
  });

  async function loadUserInfo() {
    if (web3auth && web3auth.getUserInfo) {
      user = await web3auth.getUserInfo();
      setUser(user);
      return user
    }
  }

  useEffect(() => {
    (
      async () => {
        if (authenticated) {
          const user = await loadUserInfo()
          if (user) createOrUpdateUser(user)
        }
      }
    )()
  }, [authenticated])

  const appContextState = {
    web3auth,
    walletId: null,
    authenticated,
    notifications: [],
    activeListing,
    activateListing: (listing: any) => setActiveListing(listing),
    setAuthenticated,
    user,
    setUser,
  };

  return (
    <AppContext.Provider value={appContextState}>
      <Stack.Navigator>
        <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
        <Stack.Group screenOptions={{ 
          presentation: 'modal',
          headerShown: false,
        }}>
          <Stack.Screen name="Map Filters" component={MapFiltersModalScreen} />
          <Stack.Screen name="Listing" component={ListingModalScreen} />
          <Stack.Screen name="Post" component={CameraScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </AppContext.Provider>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const {
    authenticated,
    notifications,
    user,
  } = React.useContext(AppContext);
  const colorScheme = useColorScheme()
  if (authenticated && user && user.profileImage) {
    return (
      <BottomTab.Navigator
        initialRouteName="Explore"
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme].tint,
          tabBarStyle: {
            paddingTop: 8,
          },
          headerShown: false,
        }}>
        <BottomTab.Screen
          name="Explore"
          component={ExploreScreen}
          options={({ navigation }: RootTabScreenProps<'Explore'>) => ({
            title: 'Explore',
            tabBarIcon: ({ color }) => <Ionicons name="search" size={24} color={color} />,
            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate('Map Filters')}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}>
                <FontAwesome
                  name="sliders"
                  size={25}
                  color={Colors[colorScheme].text}
                  style={{ marginRight: 15 }}
                />
              </Pressable>
            ),
          })}
        />
        <BottomTab.Screen
          name="Saved"
          component={SavedScreen}
          options={{
            title: 'Saved',
            tabBarIcon: ({ color }) => <FontAwesome name="heart-o" size={24} color={color} />,
          }}
        />
        <BottomTab.Screen
          name="Post"
          component={CameraScreen}
          options={{
            title: ({ color }) => <Text style={styles.bigLabel}>Post</Text>,
            tabBarIcon: ({ color }) => <View style={styles.bigView}>
              <Fontisto style={styles.bigIcon} name="camera" size={24} color={color === Colors[colorScheme].tabIconSelected ?
                Colors[colorScheme].tabIconSelected : Colors.tintAccent
              } />
            </View>,
          }}
        />
        <BottomTab.Screen
          name="Updates"
          component={SavedScreen}
          options={{
            title: 'Updates',
            tabBarIcon: ({ color }) => (notifications && notifications.length) ?
            <MaterialCommunityIcons name="bell-badge-outline" size={24} color={color} /> :
            <MaterialCommunityIcons name="bell-outline" size={24} color={color} />,
          }}
        />
        <BottomTab.Screen
          name="Login"
          component={authenticated ? ProfileScreen : LoginScreen}
          options={{
            title: '',
            tabBarIcon: ({ color }) => (
              <Image
                source={{
                  uri: user.profileImage,
                }}
                style={{
                  ...tw`mt-4 rounded-full h-10 w-10`,
                }}
              />
            ),
            headerTitle: '',
            headerRight: () => (
              <Button
                onPress={Web3Auth.logout}
                title="Logout"
              />
            )
          }}
        />
      </BottomTab.Navigator>
    );  
  }
  return (
    <BottomTab.Navigator
      initialRouteName="Explore"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarStyle: {
          paddingTop: 8,
        },
        headerShown: false,
      }}>
      <BottomTab.Screen
        name="Explore"
        component={ExploreScreen}
        options={({ navigation }: RootTabScreenProps<'Explore'>) => ({
          title: 'Explore',
          tabBarIcon: ({ color }) => <Ionicons name="search" size={24} color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Map Filters')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="sliders"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Saved"
        component={SavedScreen}
        options={{
          title: 'Saved',
          tabBarIcon: ({ color }) => <FontAwesome name="heart-o" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Post"
        component={CameraScreen}
        options={{
          title: ({ color }) => <Text style={styles.bigLabel}>Post</Text>,
          tabBarIcon: ({ color }) => <View style={styles.bigView}>
            <Fontisto style={styles.bigIcon} name="camera" size={24} color={color === Colors[colorScheme].tabIconSelected ?
              Colors[colorScheme].tabIconSelected : Colors.tintAccent
            } />
          </View>,
        }}
      />
      <BottomTab.Screen
        name="Updates"
        component={SavedScreen}
        options={{
          title: 'Updates',
          tabBarIcon: ({ color }) => (notifications && notifications.length) ?
          <MaterialCommunityIcons name="bell-badge-outline" size={24} color={color} /> :
          <MaterialCommunityIcons name="bell-outline" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: 'Login',
          tabBarIcon: ({ color }) => (
            <EvilIcons name="user" size={36} color={color} />
          ),
          headerShown: false,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}


const styles = StyleSheet.create({
  bigView: {
    transform: [{ scale: 2.2 }, { translateY: 2, }],
    zIndex: 10,
    padding: 4,
    paddingTop: 8,
    backgroundColor: Colors.light.tabIconSelected,
    borderRadius: 10,
    color: 'white',
  },
  bigLabel: {
    color: 'white',
    transform: [{ scale: 0.8 }],
    display: 'none'
  },
  bigIcon: {
    transform: [{ scale: 0.8 }, { translateY: -4, }],
    color: 'white',
    zIndex: 99,
  },
  bigTab: {
    backgroundColor: Colors.light.tabIconSelected,
    color: 'white',
    padding: 10,
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
  highlight: {
    color: Colors.tintAccent,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
