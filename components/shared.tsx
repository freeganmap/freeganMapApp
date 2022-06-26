import { FontAwesome } from '@expo/vector-icons';
import {  StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {  Pressable } from 'react-native';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';
import { Text, View } from '../components/Themed';

export const Header = ({ children }: { children: any }) => (
  <View style={styles.header}>
    <Text style={{
      ...styles.headline,
      fontFamily: 'Raleway_700Bold'
    }}>{children}</Text>
  </View>
)

export const Row = ({ children, onPress, style={}, }: { children: any, onPress?: any, style?: any }) => (
  onPress ?
  <Pressable
    onPress={onPress}
    style={({ pressed }) => ({
      opacity: pressed ? 0.5 : 1,
    })}>
    <View style={{
      ...styles.row,
      ...style
    }}>
      {children}
    </View>
  </Pressable>
  : (
    <View style={{
      ...styles.row,
      ...style,
    }}>
      {children}
    </View>
  )
)

export const RowEnd = ({ children }: { children: any }) => (
  <View style={styles.rowEnd}>
    {children}
  </View>
)

export const Checkbox = ({ checked }: {
  checked?: boolean;
}) => {
  const colorScheme = useColorScheme()
  return (
    <FontAwesome
      name={ checked ? 'check' : 'square' }
      size={25}
      color={Colors[colorScheme].text}
      style={checked ? tw`text-green-400` : tw`text-gray-300`}
    />
  )
}

const styles = StyleSheet.create({
  container: tw`flex px-4 min-h-full`,
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  header: tw`mt-3 mb-0 px-1 pt-5 pb-6`,
  headline: tw`text-xl font-bold text-left items-start justify-start`,
  row: tw`mt-1 mb-4 relative`,
  rowEnd: tw`absolute right-0`,
  rowText: tw`text-lg text-gray-500`,
  rowLink: tw`text-lg text-red-500`,
});
