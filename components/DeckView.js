import React from 'react'
import { View, Text,TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { getDeck, deleteDeck } from '../utils/api'
import { ltblue, red, green, white } from '../utils/colors'
import { StackActions, withNavigationFocus } from 'react-navigation'


class DeckView extends React.Component {
  state = {
    deck: null,
  }

  componentDidMount(){
    this.fetchDeck()
  }

  addCard = () => {
    const pushAction = StackActions.push({
      routeName: 'AddCard',
      params: {
        title: this.state.deck.title,
        color: this.state.deck.color,
      },
    })

    this.props.navigation.dispatch(pushAction);
  }
  takeQuiz = () => {
    if(this.state.deck !== null && this.state.deck.questions.length < 1){
      Alert.alert(
        'Empty Deck',
        `You cannot take this quiz because there are no cards in the deck` ,
        [
          {text: 'OK', },
        ],
        {cancelable: false},
      )
    }else{
    const pushAction = StackActions.push({
      routeName: 'Quiz',
      params: {
        title: this.state.deck.title
      },
    })

    this.props.navigation.dispatch(pushAction)
    }
  }

  removeDeck = () => {
    Alert.alert(
      'Delete Deck?',
      `Are you sure you want to delete deck: "${this.state.deck.title}"` ,
      [
        {text: 'Yes', onPress: () => this.handleDeleteDeck()},
        {text: 'No', },
      ],
      {cancelable: false},
    )
  }

  handleDeleteDeck = () => {
    deleteDeck(this.state.deck.title)

    const popAction = StackActions.pop({
      n: 1,
    })
    this.props.navigation.dispatch(popAction)
  }

  fetchDeck = () => {
    const title = this.props.navigation.getParam('title')
    if( title !== null){
      getDeck(title).then((deck) => {
        this.setState({ deck: deck})
      })
    }
  }
  render(){
    const deck = this.state.deck
    const title = this.props.navigation.getParam('title')
    const number = deck !== null ? deck.questions.length : 0

    if(this.props.isFocused){
      this.fetchDeck()
    }

    return(
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
        <Text style={[styles.title, {color: deck !== null ? deck.color : 'blue'}]}>{title}</Text>
        <Text style={{fontSize: 18}}>{number} cards</Text>
        </View>
        <View style={styles.buttonContainer}>

          <TouchableOpacity style={[styles.button, {backgroundColor: ltblue}]} onPress={this.addCard}>
            <Text style={styles.buttonText}>Add Card</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, {backgroundColor: green}]} onPress={this.takeQuiz}>
            <Text style={styles.buttonText}>Take Quiz</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, {backgroundColor: red, marginTop: 60}]} onPress={this.removeDeck}>
            <Text style={styles.buttonText}>Delete Deck</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    marginTop: 30,
    fontWeight: 'bold',
    fontSize: 30,
  },
  buttonContainer: {
    width:300,
    justifyContent: 'space-between',
  },
  button : {
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    borderRadius: 8,
    margin: 30,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white'
  }
})

export default withNavigationFocus(DeckView)
