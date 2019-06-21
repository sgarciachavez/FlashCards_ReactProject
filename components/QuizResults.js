import React, { Component } from 'react'
import { Text, View, StyleSheet,TouchableOpacity, Alert } from 'react-native'
import {ltblue, green} from '../utils/colors'
import { StackActions } from 'react-navigation';

class QuizResults extends Component{

  gotoDeck = () => {
    this.goto(1)
  }

  gotoAllDecks = () => {
    this.goto(2)
  }

  goto = (n) => {
    const popAction = StackActions.pop({
      n: n,
    })

    this.props.navigation.dispatch(popAction)
  }

  render(){
    const score = this.props.navigation.getParam('score')
    const deck = this.props.navigation.getParam('deck')
    const number = deck.questions.length
    const percent = Math.round((score / number) * 100)

    return(
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <Text style={[styles.title, {color: deck.color}]}>{deck.title}</Text>
          <Text style={styles.title}>Your Quiz Results!</Text>
        </View>
        <View>
          <Text style={styles.text}>{score === number && `🏆 Perfect Score!!`}</Text>
        </View>
        <View>
          <Text style={[styles.text, {color: 'red'}]}>{percent}%</Text>
        </View>
        <View>
          <Text style={[styles.text, {color: 'red'}]}>{score} / {number}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, {backgroundColor: green}]} onPress={this.gotoDeck}>
            <Text style={styles.buttonText}>Deck View</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, {backgroundColor: 'blue'}]} onPress={this.gotoAllDecks}>
            <Text style={styles.buttonText}>All Decks View</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    marginTop: 30,
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 30,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
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

export default QuizResults
