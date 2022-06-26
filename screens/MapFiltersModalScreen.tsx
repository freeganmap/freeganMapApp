import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';
import { Platform, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { ColorSchemeName, Pressable } from 'react-native';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { useReducer, useState } from 'react';
import { uniq, without } from 'lodash';

const Header = ({ children }: { children: any }) => (
  <View style={styles.header}>
    <Text style={{
      ...styles.headline,
      fontFamily: 'Raleway_700Bold'
    }}>{children}</Text>
  </View>
)

const Row = ({ children, onPress }: { children: any, onPress: any }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => ({
      opacity: pressed ? 0.5 : 1,
    })}>
    <View style={styles.row}>
      {children}
    </View>
  </Pressable>
)

const RowEnd = ({ children }: { children: any }) => (
  <View style={styles.rowEnd}>
    {children}
  </View>
)

const Checkbox = ({ checked }: {
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

enum ListingCondition {
  NewOrLikeNew = 'NewOrLikeNew',
  GreatCondition = 'GreatCondition',
  WornConditionWorks = 'WornConditionWorks',
  NeedsRepairOrMissingParts = 'NeedsRepairOrMissingParts',
}

enum CheckedConditionActionType {
  Add,
  Remove,
  SelectAll,
  DeselectAll,
  ToggleCondition,
}

const ALL_CONDITIONS = [
  ListingCondition.NewOrLikeNew,
  ListingCondition.GreatCondition,
  ListingCondition.WornConditionWorks,
  ListingCondition.NeedsRepairOrMissingParts,
]

const checkedConditionsReducer = (state: any, action: any) => {
  switch (action.type) {
    case CheckedConditionActionType.Add:
      return uniq(state.concat([action.condition]));
    case CheckedConditionActionType.Remove:
      return without(state, action.condition);
    case CheckedConditionActionType.SelectAll:
      return ALL_CONDITIONS;
    case CheckedConditionActionType.ToggleCondition:
      if (state.find((cond: ListingCondition) => cond === action.condition)) {
        return without(state, action.condition);
      } else {
        return uniq(state.concat([action.condition]));
      }
    case CheckedConditionActionType.DeselectAll:
      return [];
    default:
      return state;
  }
}

export default function ModalScreen() {
  const [checkedConditions, checkedConditionsDispatch] = useReducer(checkedConditionsReducer, ALL_CONDITIONS);
  const [selectAllIsChecked, setSelectAllIsChecked] = useState(true);
  const onToggleSelectAll = (e: any) => {
    if (selectAllIsChecked) {
      // deselect all
      checkedConditionsDispatch({
        type: CheckedConditionActionType.DeselectAll,
      });
      setSelectAllIsChecked(false); 
    } else {
      // select all
      checkedConditionsDispatch({
        type: CheckedConditionActionType.SelectAll,
      });
      setSelectAllIsChecked(true); 
    }
  }
  const itemOnPress = (condition: ListingCondition) => (e: any) => {
    if (checkedConditions.includes(condition)) {
      checkedConditionsDispatch({
        type: CheckedConditionActionType.Remove,
        condition,
      });
    } else {
      checkedConditionsDispatch({
        type: CheckedConditionActionType.Add,
        condition,
      });
    }
  };
  return (
    <View style={styles.container}>
      <Header>Item Condition</Header>
      <Row onPress={itemOnPress(ListingCondition.NewOrLikeNew)}>
        <Text style={styles.rowText}>
          New / Like New
        </Text>
        <RowEnd>
          <Checkbox
            checked={checkedConditions.includes(ListingCondition.NewOrLikeNew)}
           />
        </RowEnd>
      </Row>
      <Row onPress={itemOnPress(ListingCondition.GreatCondition)}>
        <Text style={styles.rowText}>
          Great Condition
        </Text>
        <RowEnd>
          <Checkbox
            checked={checkedConditions.includes(ListingCondition.GreatCondition)}
          />
        </RowEnd>
      </Row>
      <Row onPress={itemOnPress(ListingCondition.WornConditionWorks)}>
        <Text style={styles.rowText}>
          Worn Condition (Works)
        </Text>
        <RowEnd>
          <Checkbox
            checked={checkedConditions.includes(ListingCondition.WornConditionWorks)}
          />
        </RowEnd>
      </Row>
      <Row onPress={itemOnPress(ListingCondition.NeedsRepairOrMissingParts)}>
        <Text style={styles.rowText}>
          Needs Repair / Missing Parts
        </Text>
        <RowEnd>
          <Checkbox
            checked={checkedConditions.includes(ListingCondition.NeedsRepairOrMissingParts)}
          />
        </RowEnd>
      </Row>
      <Row onPress={onToggleSelectAll}>
        <Text style={styles.rowLink}>
          {
            checkedConditions.length === ALL_CONDITIONS.length ?
              'Clear All' :
              'Select All'
          }
        </Text>
      </Row>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
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
  row: tw`mt-1 mb-4 px-1 relative`,
  rowEnd: tw`absolute right-0`,
  rowText: tw`text-lg text-gray-500`,
  rowLink: tw`text-lg text-red-500`,
});
