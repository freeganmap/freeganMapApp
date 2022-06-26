import { EvilIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Button, Platform, ScrollView, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { ColorSchemeName, Pressable, Image } from 'react-native';
import useColorScheme from '../hooks/useColorScheme';
import Colors, { highlightColor, RALEWAY_BOLD, ROBOTO_MONO_BOLD, ROBOTO_MONO_REG, tokenColor } from '../constants/Colors';
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

  const locationObj = d.coordinates || {
    neighborhood: 'Manhattan - Flatiron',
  };
  const {
    neighborhood,
  } = locationObj;

  const creatorProfileImageUri = 'https://lh3.googleusercontent.com/a-/AOh14GhQ4HNn26yZ8PsAUqONvXlvod_0bH0WB_x76TV7lg=s96-c';
  const creatorName = 'Amy Hua';

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
            {neighborhood} · 0.5 mi away
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
        <View style={tw`mb-0 mt-5`}>
          <View style={{
            ...tw`bg-green-400 p-3 flex flex-row relative`,
            borderRadius: 6,
          }}>
            <EvilIcons name="check" style={tw`mr-0.5 -mt-0.5`} size={38} color="white" />
            <Text style={{
              ...tw`text-lg text-white pl-1 pr-5`,
              fontFamily: RALEWAY_BOLD
            }}>Claim this free item</Text>
            <View style={tw`absolute mt-0.5 right-0 py-3 px-5 text-right bg-transparent flex flex-row`}>
              <FontAwesome5 name="coins" style={tw`bg-transparent mr-2 mt-1`} size={16} color="white" />
              <Text style={{
                ...tw`text-base text-white`,
                fontFamily: ROBOTO_MONO_BOLD
              }}>+ 50</Text>
            </View>
          </View>
        </View>
        <Text style={{
          ...LABEL_STYLE,
          ...tw`mt-5 mb-2`,
        }}>
          Description
        </Text>
        <Text style={{
          ...tw`text-base mb-3`,
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
        {
          creatorProfileImageUri && (
            <>
              <View style={tw`mt-6 mb-0`}>
                <Text style={{
                  ...tw`text-base text-gray-400`,
                  fontFamily: 'Poppins_600SemiBold',
                }}>
                  Posted by
                </Text>
              </View>
              <View style={tw`mt-6 mb-3 flex flex-row`}>
                <Image
                  source={{
                    uri: creatorProfileImageUri,
                  }}
                  style={tw`rounded-full h-12 w-12 mt-0.5`}
                />
                <View style={tw`ml-5`}>
                  <Text style={{
                    ...tw`mt-0 text-lg`,
                    fontFamily: RALEWAY_BOLD
                  }}>
                    {creatorName}
                  </Text>
                  <View style={tw`flex flex-row items-center`}>
                    <FontAwesome5 name="coins" style={tw`mr-2 mt-1`} size={16} color={tokenColor} />
                    <Text style={{
                      ...tw`text-black text-base mr-3`,
                      fontFamily: ROBOTO_MONO_BOLD,
                      color: tokenColor
                    }}>
                       520
                    </Text>
                    <View style={tw`flex flex-row mt-1 opacity-30`}>
                      {/* pencil */}
                      <EvilIcons name="pencil" style={tw`mr-0.5`} size={24} color="black" />
                      <Text style={{
                        ...tw`text-black text-base mr-3 -mt-0.5`,
                        fontFamily: ROBOTO_MONO_REG,
                      }}>
                        3
                      </Text>
                      {/* heart */}
                      <EvilIcons name="heart" style={tw`mr-0.5 mt-0.5`} size={24} color="black" />
                      <Text style={{
                        ...tw`text-black text-base mr-3 mt-0`,
                        fontFamily: ROBOTO_MONO_REG,
                      }}>
                        2
                      </Text>
                      {/* check */}
                      <EvilIcons name="check" style={tw`mr-0.5 mt-0.5`} size={24} color="black" />
                      <Text style={{
                        ...tw`text-black text-base mr-3`,
                        fontFamily: ROBOTO_MONO_REG,
                      }}>
                        1
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </>
          )
        }
        <View style={tw`mt-14`}>
          <Button
            title="Report this listing"
            color={highlightColor}
          />
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
