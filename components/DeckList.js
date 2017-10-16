import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, AsyncStorage } from 'react-native';
import DeckCard from './DeckCard';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions';

class DeckList extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this._updateList();
  }
  async _updateList() {
    const response = await AsyncStorage.getItem('decks');
    const decks = await JSON.parse(response) || {};
    this.props.dispatch(receiveDecks(decks));
    // initialize AsyncStorage
    // if (decks === null) {
    //   await AsyncStorage.setItem('decks', JSON.stringify({}));
    // }
  }
  render() {
    const { decks } = this.props;
    return (
      <ScrollView style={{flex: 1}}>
        {Object.entries(decks).map(([key, value]) =>
          <DeckCard
            key={key}
            name={key}
            questions={value}
            navigation={this.props.navigation}
          />
        )}
      </ScrollView>
    );
  }
}

function mapStateToProps(decks) {
  return { decks };
}

export default connect(mapStateToProps)(DeckList);
