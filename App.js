import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Constants } from 'expo';
import { Foundation } from '@expo/vector-icons';
import DeckList from './components/DeckList';
import AddDeck from './components/AddDeck';
import DeckView from './components/DeckView';
import QuizView from './components/QuizView';
import AddCard from './components/AddCard';
import QuizCompleteView from './components/QuizCompleteView';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Foundation name="folder" size={25} color={tintColor} />
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Foundation name="folder-add" size={25} color={tintColor} />
    },
  },
}, {
  tabBarOptions: {
    activeBackgroundColor: '#333333',
    activeTintColor: '#fefefe',
    inactiveBackgroundColor: '#333333',
    inactiveTintColor: '#9e9e9e',
    style: {
      height: 56,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 6,
      shadowOpacity: 1,
    },
    labelStyle: {
      fontSize: 13,
    },
  },
});

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null,
    },
  },
  DeckView: {
    screen: DeckView,
  },
  AddCard: {
    screen: AddCard,
  },
  QuizView: {
    screen: QuizView,
  },
  QuizCompleteView: {
    screen: QuizCompleteView,
    navigationOptions: {
      header: null,
    },
  },
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <View style={{height: Constants.statusBarHeight, backgroundColor: 'transparent'}} />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
