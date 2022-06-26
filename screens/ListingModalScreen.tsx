import { FontAwesome } from '@expo/vector-icons';
import { Platform, ScrollView, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { ColorSchemeName, Pressable, Image } from 'react-native';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';
import { Text, View } from '../components/Themed';
import { useContext, useReducer, useState } from 'react';
import { uniq, without } from 'lodash';
import { Listing } from '../types'
import AppContext from '../contexts/app-context';
import { formatListingCondition, formatListingPickupMethod } from '../helpers/listing-helpers';
import { Row, RowEnd } from '../components/shared';
import dayjs from 'dayjs';
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const RowItem = ({
  label,
  value,
}: { label: string, value: any }) => (
  <Row style={{
    ...tw`mb-2 mt-2 mx-0`
  }}>
    <Text style={{
      ...styles.rowText,
      ...tw`text-gray-400 text-base`,
      fontFamily: 'Poppins_600SemiBold',
    }}>
      {label}
    </Text>
    <RowEnd>
      <Text style={{
        ...tw`text-base`,
        fontFamily: 'Poppins_400Regular',
      }}>
        {value}
      </Text>
    </RowEnd>
  </Row>
)

export default function ModalScreen() {
  const { activeListing: d } = useContext(AppContext);

  if (!d) return null;

  const LABEL_STYLE = {
    ...styles.rowText,
    ...tw`text-gray-400 text-base`,
    fontFamily: 'Poppins_600SemiBold',
  };

  const locationObj = d.location || {
    neighborhood: 'Manhattan - Flatiron',
  };
  const {
    neighborhood,
  } = locationObj;

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={tw`absolute right-0 top-1 px-5 py-7`}>
          <FontAwesome name="heart-o" size={28} color="#000" />
        </View>
        <Text style={{
          fontFamily: 'Poppins_700Bold',
          ...tw`text-2xl mb-2 mt-8 mr-8`
        }}>{d.title}</Text>
        <View style={tw`mb-1`}>
          <Text style={{
            ...tw`text-base text-gray-500`,
            fontFamily: 'Poppins_400Regular'
          }}>
            {neighborhood}
          </Text>
        </View>
        <View style={tw`mb-3`}>
          <Text style={{
            ...tw`text-base text-gray-500`,
            fontFamily: 'Poppins_400Regular'
          }}>
            Available as of <Text style={tw`text-green-600`}>{dayjs(d.lastAvailableAt).fromNow()}</Text>
          </Text>
        </View>
        <Image
          style={{
            ...styles.image,
            ...tw`mb-0 mt-2`
          }}
          source={{
            uri: d.imageUrl
          }}
          resizeMode="cover"
        />
        <Text style={{
          ...LABEL_STYLE,
          ...tw`mt-8 mb-2`,
        }}>
          Description
        </Text>
        <Text style={{
          ...tw`text-lg mb-3`,
          fontFamily: 'Poppins_400Regular',
        }}>
          {d.description}
        </Text>
        <View style={tw`my-3`}>
          {/* Condition */}
          <RowItem
            label="Condition"
            value={formatListingCondition(d)}
          />
          {/* Pickup */}
          <RowItem
            label="Pickup Method"
            value={formatListingPickupMethod(d)}
          />
        </View>
        <View style={tw`mt-6 mb-3`}>
          <Text style={{
            ...tw`text-base text-gray-400`,
            fontFamily: 'Poppins_600SemiBold',
          }}>
            Posted by
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const IMAGE_HEIGHT = '80%';
const BORDER_RADIUS = 10;

const styles = StyleSheet.create({
  container: tw`flex px-5 min-h-full relative mb-20`,
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  header: tw`mt-3 mb-0 pt-5 pb-6`,
  headline: tw`text-xl font-bold text-left items-start justify-start`,
  row: tw`mt-1 mb-4 px-1 relative`,
  rowEnd: tw`absolute right-0`,
  rowText: tw`text-lg text-gray-300`,
  rowLink: tw`text-lg text-red-500`,
  image: {
    width: '100%',
    height: 400,
    borderRadius: BORDER_RADIUS,
  },
  label: {
    ...tw`text-base text-gray-400 mt-7 mb-1`,
    fontFamily: 'Poppins_600SemiBold',
  },
});
