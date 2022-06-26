// @ts-nocheck
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import MapView, { Marker, MarkerAnimated } from 'react-native-maps';
import { getPermittedLocation, requestPermissionLocation } from '../handle-permissions'
import { useState, useEffect, useContext } from 'react';
import * as Location from 'expo-location';
import MOCK_LISTINGS from '../helpers/mock-listings';
import { FontAwesome, Octicons } from '@expo/vector-icons'; 
import tw from 'tailwind-react-native-classnames';
import MapListingThumbnail from '../components/MapListingThumbnail';
import ListingModalScreen from '../screens/ListingModalScreen';
import AppContext from '../contexts/app-context';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { createOrUpdateUser } from '../helpers/auth-helpers';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.1222;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MyLocationPin = () => (
  <Octicons name="dot-fill" size={24} color="##3ac4e8" />
);

function GetLocationPermissionScreen({ navigation, setAnticipatedLocationAllow }: RootTabScreenProps<'GetLocationPermissionScreen'> & {
  setAnticipatedLocationAllow: any;
}) {
  return (
    <View style={styles.containerCentered}>
      <Text style={styles.title}>Freegan Map needs to your location to show you nearby listings, send you alerts of nearby listings, and enable you to claim nearby free items.</Text>
      <Text style={styles.body}>
        Grant permission so we can show you free stuff around you.
      </Text>
    </View>
  );
}

/*
location:
{
  "coords": {
    "altitude",
    "altitudeAccuracy",
    "latitude",
    "accuracy",
    "longitude",
    "header": // -1,
    "speed": // -1,
    "timestamp": 123512341234.72343
  }
}
*/

export default function ExploreScreen({ navigation }: RootTabScreenProps<'ExploreScreen'>) {
  const colorScheme = useColorScheme();
  const { activateListing } = useContext(AppContext);
  // @ts-ignore
  const [location, setLocation] = useState(null);
  // @ts-ignore
  const [errorMsg, setErrorMsg] = useState(null);
  // const [anticipatedLocationAllow, setAnticipatedLocationAllow] = useState(false);


  const onThumbnailPress = (listing: any) => () => {
    activateListing(listing);
    navigation.push('Listing');
  }

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied.');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch(e) {
        // TODO
      } finally {
        // TODO
      }
    })();
    
  }, []);

  if (!location) return null;
  return (
    <View style={styles.container}>
      {/* <Text>{JSON.stringify(location)}</Text> */}
      {/* @ts-ignore */}
      <View style={{
        ...tw`bg-transparent absolute top-0 right-0 mx-4 mt-14 z-10`,
      }}>
        <Pressable
          onPress={() => navigation.navigate('Map Filters')}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
          })}>
            <View style={{
              borderRadius: 50,
              shadowColor: 'black',
              shadowOpacity: 0.25,
              shadowRadius: 10,
            }}>
              <FontAwesome
                name="sliders"
                size={25}
                color={Colors[colorScheme].text}
                style={{
                  ...tw`bg-transparent p-4`,
                  // color: highlightColor
                }}
              />
            </View>
        </Pressable>
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          // image={{
          //   uri: 'images/my-location-pin.png',
          // }}
        />
      </MapView>
      <View style={styles.thumbnailBrowser}>
        <ScrollView
          snapToInterval={310}
          snapToAlignment="start"
          alwaysBounceHorizontal={true}
          alwaysBounceVertical={false}
          horizontal={true}
          style={styles.thumbnailScroller}>
          {
            MOCK_LISTINGS.map((listing: any, i: number) =>
              <MapListingThumbnail
                onPress={onThumbnailPress(listing)}
                key={i}
                listing={listing}
              />
            )
          }
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerCentered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 18,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  thumbnailBrowser: tw`flex absolute left-0 right-0 bottom-24 pb-4 flex-row mb-2 p-0 ml-4 h-10 bg-transparent`,
  thumbnailScroller: {
    ...tw`w-full h-full pb-2`,
    height: 120,
    width: '100%',
    
  },
});
