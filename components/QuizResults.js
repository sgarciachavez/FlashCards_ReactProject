import React, { Component } from 'react'
import { Text, View, StyleSheet,TouchableOpacity, Alert } from 'react-native'
import {ltblue, green} from '../utils/colors'
import { StackActions } from 'react-navigation'
import { setLocalNotification, clearLocalNotification} from '../utils/api'

class QuizResults extends Component{
  state = {
    deck: null,
  }

  componentWillMount(){
    const deck = this.props.navigation.getParam('deck')
    this.setState({ deck: deck})
    clearLocalNotification() //The user just completed a quiz, Clear the notication!
    setLocalNotification() //Set a new notication for tomorrow. 
  }

  retakeQuiz = () => {
    this.goto(1)
    const pushAction = StackActions.push({
      routeName: 'Quiz',
      params: {
        title: this.state.deck.title
      },
    })

    this.props.navigation.dispatch(pushAction)
  }

  backToDeckView = () => {
    this.goto(1)
  }

  goto = (n) => {
    const popAction = StackActions.pop({
      n: n,
    })

    this.props.navigation.dispatch(popAction)
  }

  render(){
    const score = this.props.navigation.getParam('score')
    deck = this.state.deck

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
          <TouchableOpacity style={[styles.button, {backgroundColor: green}]} onPress={this.retakeQuiz}>
            <Text style={styles.buttonText}>Retake Quiz</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, {backgroundColor: deck.color}]} onPress={this.backToDeckView}>
            <Text style={styles.buttonText}>Back to Deck</Text>
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
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 30,
    textAlign: 'center',
    marginLeft: 5,
    marginRight: 5,
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
