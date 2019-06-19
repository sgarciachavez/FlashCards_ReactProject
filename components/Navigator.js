import React from 'react';
import { Platform } from 'react-native';
import DeckList from './DeckList'
import AddDeck from './AddDeck'
import DeckView from './DeckView'
import AddCard from './AddCard'
import QuizQuestion from './QuizQuestion'

import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'

const Tabs = createBottomTabNavigator({
  "All Decks": {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: "All Decks",
      tabBarIcon: ({tintColor}) => Platform.OS === 'ios'
      ? <Ionicons name='ios-albums' size={30} color={tintColor} />
      : <Ionicons name='md-albums' size={30} color={tintColor} />
    }
  },
  "Add Deck": {
    screen: AddDeck,
    navigationOptions:{
      tabBarLabel: "Add Deck",
      tabBarIcon: ({tintColor}) =>
        <MaterialIcons name='add-box' size={30} color={tintColor} />
    }
  }
})

Tabs.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  let title = routeName
  // You can do whatever you like here to pick the title based on the route name
  if(routeName === 'Add Deck'){
    title = 'Add New Deck'
  }
  const headerTitle = title;

  return {
    headerTitle,
  }
}

const Stack = createStackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckView: {
    screen: DeckView,
  },
  AddCard: {
    screen: AddCard
  },
  Quiz: {
    screen: QuizQuestion
  },

}, {initialRouteName: 'Home',})

export default createAppContainer(Stack)
