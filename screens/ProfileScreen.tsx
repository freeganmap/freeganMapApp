import { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RALEWAY_BOLD, ROBOTO_MONO_BOLD, ROBOTO_MONO_MED, tokenColor } from '../constants/Colors';
import AppContext from '../contexts/app-context';
import { RootTabScreenProps } from '../types';
import { Entypo, EvilIcons, FontAwesome5 } from '@expo/vector-icons'; 
import Web3Auth from '@web3auth/react-native-sdk';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const { user } = useContext(AppContext);
  if (!user) return null;
  return (
    <View style={styles.container}>
      <View style={tw`pt-7 px-5 flex items-center pb-10`}>
        {
          user.profileImage ? (
            <Image
              source={{
                uri: user.profileImage,
              }}
              style={tw`rounded-full h-20 w-20 mb-5 mr-3`}
            />
          ) : (
            <EvilIcons name="user" size={50} color="black" />
          )
        }
        <Text style={{
          ...tw`text-2xl`,
          fontFamily: ROBOTO_MONO_BOLD
        }}>
          {String(user.name).toUpperCase()}
        </Text>
        {/* Wallet, Points */}
        <View style={tw`mt-5 mb-2 text-base text-gray-300`}>
          <Text>Karmic Balance</Text>
        </View>
        <View style={tw`mb-8 flex flex-row`}>
          <FontAwesome5 name="coins" style={tw`mr-2 mt-1`} size={22} color={tokenColor} />
          <Text style={{
            ...tw`text-xl text-gray-700`,
            color: '#7d6528',
            fontFamily: ROBOTO_MONO_BOLD,
          }}>3,635 $FGM</Text>
          <Entypo style={tw`mx-3`} name="dot-single" size={5} color="black" />
          <Text style={{
            ...tw`text-xl text-gray-700`,
            fontFamily: ROBOTO_MONO_BOLD,
          }}>50</Text>
        </View>
        <View style={tw`border-t border-gray-200 mt-5 pt-7 px-3`}>
          <Text style={{
            ...tw`text-base mb-2 text-gray-600`,
            fontFamily: RALEWAY_BOLD,
          }}>
            How $FGM Karma Works
          </Text>
        </View>
        <View style={tw`flex max-w-xl`}>
        <Text style={tw`text-gray-500 text-sm text-left mb-2`}>
            Your karmic $FGM balance represents how active you are on FreeganMap and represents how reliable you are at offering, reporting, and posting free items to others.
          </Text>
          <Text style={tw`text-gray-500 text-sm text-left mb-2`}>
            Earn $FGM by doing good karma on FreeganMap: report, offer, and collect free items. The more free items you report or exchange, the more you earn!
          </Text>
          <Text style={tw`text-gray-500 text-sm text-left mt-3`}>
            Spend $FGM to get earlier alerts on the top items on your watchlist or to get higher priority with owners who are offering items you want.
          </Text>
        </View>
        {/* <Text style={tw`text-lg`}>
          {JSON.stringify(user)}
        </Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
