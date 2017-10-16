import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { addQuestion } from '../actions';
import { NavigationActions } from 'react-navigation';

class AddCard extends Component {
  static navigationOptions = {
    headerTintColor: '#333333',
    headerStyle: {

    },
  };
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      answer: '',
    };
  }
  async _addQuestion() {
    const { deckName } = this.props.navigation.state.params;
    const { question, answer } = this.state;
    // Update Redux
    this.props.dispatch(addQuestion(deckName, question, answer));
    // Save to DB
    const response = await AsyncStorage.getItem('decks');
    const decks = await JSON.parse(response);
    const updatedDecks = {
      ...decks,
      [deckName]: [...decks[deckName], { question, answer }],
    };
    await AsyncStorage.setItem('decks', JSON.stringify(updatedDecks));
    this.setState({ question: '', answer: '' });
    // Navigate to Home
    this.props.navigation.navigate('DeckList');
  }
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.labelText}>
          Question
        </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(question) => this.setState({question})}
          value={this.state.question}
        />
        <Text style={[styles.labelText, { marginTop: 10 }]}>
          Answer
        </Text>
        <TextInput
          style={[styles.textInput]}
          onChangeText={(answer) => this.setState({answer})}
          value={this.state.answer}
        />
        <TouchableOpacity style={[styles.mainBtn, { marginTop: 100 }]} onPress={() => {this._addQuestion()}}>
          <Text style={{color: '#f7f7f7'}}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainBtn: {
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 40,
    backgroundColor: '#333333',
  },
  textInput: {
    height: 40,
    width: 280,
    borderColor: '#333333',
    borderWidth: 1,
    borderRadius: 3,
  },
  labelText: {
    fontSize: 26,
    fontWeight: '700',
  },
});

export default connect()(AddCard);
