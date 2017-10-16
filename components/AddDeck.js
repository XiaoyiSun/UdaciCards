import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { NavigationActions } from 'react-navigation';

class AddDeck extends Component {
  state = {
    text: '',
  }
  async _addDeck() {
    // Update Redux
    this.props.dispatch(addDeck({
      [this.state.text]: [],
    }));
    // Save to DB
    const response = await AsyncStorage.getItem('decks');
    const decks = await JSON.parse(response);
    const updatedDecks = {
      ...decks,
      [this.state.text]: [],
    };
    await AsyncStorage.setItem('decks', JSON.stringify(updatedDecks));
    this.setState({text: ''});
    // Navigate to Home
    this.props.navigation.navigate('DeckList');
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={styles.title}>What is the title of your new deck?</Text>
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
          <TouchableOpacity style={[styles.mainBtn, { marginTop: 20 }]} onPress={() => this._addDeck()}>
            <Text style={{color: '#f7f7f7'}}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    flex: 2,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: '#333333',
    fontWeight: '500',
    textAlign: 'center',
  },
  textInput: {
    height: 40,
    width: 280,
    borderColor: '#333333',
    borderWidth: 1,
    borderRadius: 3,
  },
  mainBtn: {
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 40,
    backgroundColor: '#333333',
  },
});

export default connect()(AddDeck);
