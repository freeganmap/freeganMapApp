// @ts-nocheck
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import MapView, { Marker, MarkerAnimated } from 'react-native-maps';
import { getPermittedLocation, requestPermissionLocation } from '../handle-permissions'
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import MOCK_LISTINGS from '../helpers/mock-listings';
import { FontAwesome, Octicons } from '@expo/vector-icons'; 
import tw from 'tailwind-react-native-classnames';
import dayjs from 'dayjs';
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const IMAGE_HEIGHT = 120;

export type Listing = {
  title: string;
  imageUrl: string;
}

const MapListingThumbnail = ({
  listing={},
  onPress,
}: {
  listing: any;
  onPress: any;
}) => {
  const {
    imageUrl,
    title,
    lastAvailableAt,
    location,
  } = listing;
  const fromNow = dayjs(lastAvailableAt).fromNow();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.9 : 1,
      })}>
      <View style={styles.container}>
        <View style={styles.thumbnail}>
          <FontAwesome style={styles.favoriteIcon} name="heart-o" size={17} color="#fff" />
          <Image
            style={styles.image}
            source={{
              uri: imageUrl
            }}
            resizeMode="cover"
          />
          <View style={styles.content}>
            <View style={styles.titleWrapper}>
              <Text
                numberOfLines={3}
                style={{
                  ...styles.title,
                  fontFamily: 'Raleway_700Bold'
                }}>{title}</Text>
            </View>
            <View>
              <Text
                numberOfLines={1}
                style={{
                  ...styles.time,
                  fontFamily: 'Raleway_400Regular'
                }}>{fromNow}</Text>
            </View>
          </View>
        </View>
      </View> 
    </Pressable>
  )
}

export default MapListingThumbnail;

const BORDER_RADIUS = 7;

const styles = StyleSheet.create({
  container: Object.assign(
    tw`flex flex-row w-10 mr-4 mb-3 p-0 bg-transparent`,
    {
    width: '100%',
    maxWidth: 300,
    height: IMAGE_HEIGHT,
  }),
  favoriteIcon: tw`text-gray-700 pt-2.5 pr-2.5 absolute right-0 z-10`,
  thumbnail: {
    ...tw`flex flex-row rounded-lg bg-white rounded-xl`,
    height: IMAGE_HEIGHT,
    shadowColor: 'black',
    shadowOpacity: 0.33,
    width: '100%',
    shadowRadius: 4,
  },
  image: {
    // ...tw`flex-1`,
    width: IMAGE_HEIGHT,
    height: IMAGE_HEIGHT,
    borderTopLeftRadius: BORDER_RADIUS,
    borderBottomLeftRadius: BORDER_RADIUS,
  },
  content: {
    ...tw`flex-1 p-2 text-base`,
    height: IMAGE_HEIGHT,
    borderTopRightRadius: BORDER_RADIUS,
    borderBottomRightRadius: BORDER_RADIUS,
  },
  contentInner: {
    ...tw`p-2`,
    height: 150,
    width: '100%',
    backgroundColor: 'red',
  },
  title: {
    ...tw`text-sm text-gray-700 pr-1 font-bold overflow-hidden`,
  },
  titleWrapper: tw`pr-3`,
  time: {
    ...tw`pt-2 text-gray-500`,
  },
});