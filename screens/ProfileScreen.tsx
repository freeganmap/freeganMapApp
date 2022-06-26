import { useContext, useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { POPPINS_REG, RALEWAY_BOLD, RALEWAY_REG, ROBOTO_MONO_BOLD, ROBOTO_MONO_MED, ROBOTO_MONO_REG, tokenColor } from '../constants/Colors';
import AppContext from '../contexts/app-context';
import { RootTabScreenProps } from '../types';
import { Entypo, EvilIcons, FontAwesome5 } from '@expo/vector-icons'; 
import Web3Auth from '@web3auth/react-native-sdk';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const { user } = useContext(AppContext);
  if (!user) return null;
  const currBalance = 520
  return (
    <View style={styles.container}>
      <ScrollView>
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
            }}>{currBalance} $FGM</Text>
          </View>
          <View style={tw`flex`}>
            <View style={tw`flex flex-row mr-3 mb-1`}>
              <EvilIcons name="pencil" style={tw`mr-2`} size={24} color="black" />
              <Text style={{
                ...tw`text-sm text-gray-700 w-14`,
                fontFamily: ROBOTO_MONO_BOLD,
              }}>3 </Text>
              <Text style={{
                ...tw`text-sm text-gray-500`,
                fontFamily: ROBOTO_MONO_REG,
              }}>items reported</Text>
            </View>
            <View style={tw`flex flex-row mr-3 mb-1`}>
              <EvilIcons name="heart" style={tw`mr-2`} size={24} color="black" />
              <Text style={{
                ...tw`text-sm text-gray-700 w-14`,
                fontFamily: ROBOTO_MONO_BOLD,
              }}>2 </Text>
              <Text style={{
                ...tw`text-sm text-gray-500`,
                fontFamily: ROBOTO_MONO_REG,
              }}>given away</Text>
            </View>
            <View style={tw`flex flex-row mr-3`}>
              <EvilIcons name="check" style={tw`mr-2`} size={24} color="black" />
              <Text style={{
                ...tw`text-sm text-gray-700 w-14`,
                fontFamily: ROBOTO_MONO_BOLD,
              }}>1 </Text>
              <Text style={{
                ...tw`text-sm text-gray-500`,
                fontFamily: ROBOTO_MONO_REG,
              }}>collected</Text>
            </View>
          </View>
          <View style={tw`border-t border-gray-200 mt-6 mb-4 pt-7 px-3`}>
            <Text style={{
              ...tw`text-base text-gray-500`,
              fontFamily: RALEWAY_BOLD,
            }}>
              How It Works
            </Text>
          </View>
          <View style={tw`flex max-w-xl`}>
            <View style={tw`text-gray-500 text-sm text-left mb-2`}>
              <Text style={{
                ...tw`text-gray-500 text-sm mb-1`,
                fontFamily: RALEWAY_BOLD
              }}>What is $FGM?</Text>
              <Text style={{
                ...tw`text-gray-500 text-sm mb-2`
              }}>
                Your Karmic Balance ($FGM) represents how active and reliable you are at reporting, offering, and posting free items.
              </Text>
            </View>
            <View style={tw`text-gray-500 text-sm text-left mb-2`}>
              <Text style={{
                ...tw`text-gray-500 text-sm mb-1`,
                fontFamily: RALEWAY_BOLD
              }}>Earn $FGM </Text>
              <Text style={tw`text-gray-500 text-sm mb-2`}>
                By doing good karma on FreeganMap: report, offer, and collect free items. The more free items you report or exchange, the more you earn!
              </Text>
            </View>
            <View style={tw`text-gray-500 text-sm text-left mb-2`}>
              <Text style={{
                ...tw`text-gray-500 text-sm mb-1`,
                fontFamily: RALEWAY_BOLD
              }}>Spend $FGM </Text>
              <Text style={tw`text-gray-500 text-sm`}>
                To get earlier alerts on the top items you're watching or to get first dibs on the free pickup items you want.
              </Text>
            </View>
          </View>
          {/* <Text style={tw`text-lg`}>
            {JSON.stringify(user)}
          </Text> */}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
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
