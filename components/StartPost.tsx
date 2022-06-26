import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Image} from 'react-native'
import {Camera} from 'expo-camera'
import tw from 'tailwind-react-native-classnames'
import { Ionicons } from '@expo/vector-icons'
import { highlightColor, RALEWAY_BOLD } from '../constants/Colors'

const StartPost = ({ startCamera }: { startCamera: any }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <TouchableOpacity
        onPress={startCamera}
        style={{
          borderRadius: 4,
          backgroundColor: highlightColor,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: 40,
          ...tw`px-8`
        }}
      >
        <Text
          style={{
            color: '#fff',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 18,
          }}
        >
          Take Photo
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default StartPost
