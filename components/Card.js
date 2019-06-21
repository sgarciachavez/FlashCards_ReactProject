import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Animated, Alert } from 'react-native'
import { getDeck } from '../utils/api'
import { ltblue, pink, red, green, yellow } from '../utils/colors'
import { StackActions, NavigationActions } from 'react-navigation'
import NavigationService from './NavigationService'

//This Animation code (flipCard)came from an example provided by:
//https://codedaily.io/screencasts/12/Create-a-Flip-Card-Animation-with-React-Native
//https://github.com/browniefed/examples.git

export default class Card extends Component{

  state = {
    flag: 'Question',
    deck: null,
    index: 0,
    correct: 0,
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
  }

  componentDidMount(){
    const title = this.props.navigation.getParam('title')
    if( title !== null){
      getDeck(title).then((deck) => {
        this.setState({ deck: deck})
      })
    }
  }

  next = () => {
    if((this.state.index + 1) < this.state.deck.questions.length){
      this.flipCard()
      this.setState((state) => {
        return{
          flag: 'Question',
          index: this.state.index + 1
        }
      })
    }else{
      const popAction = StackActions.pop({
        n: 1,
      })

      this.props.navigation.dispatch(popAction)
      const pushAction = StackActions.push({
        routeName: 'QuizResults',
        params: {
          score: this.state.correct,
          //number: this.state.deck.questions.length
          deck: this.state.deck
        },
      })

      this.props.navigation.dispatch(pushAction)

    }
  }

  response(answer) {
    if(answer === 'yes'){
      this.setState((state) => {
        return {correct: state.correct + 1}
      }, this.next)
    }else{
      this.next()
    }
  }

  flipCard() {
    if (this.value >= 90) {
        Animated.spring(this.animatedValue,{
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else {
      this.setState({flag: 'Answer'})
      Animated.spring(this.animatedValue,{
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
    }
  }

  showButton = () => {
    if(this.state.flag === 'Question'){
      return(
        <TouchableOpacity onPress={() => this.flipCard()}>
          <Text style={styles.text}>↩️  Flip card to see the answer!</Text>
        </TouchableOpacity>
      )
    }else{
      return(
        <View >
        <Text style={styles.text}>Was your answer correct?</Text>
        <View style={styles.yesno}>
        <TouchableOpacity onPress={() => this.response('yes')} style={[{backgroundColor: green}, styles.button]}>
          <Text style={[styles.text, {color: 'white'}]}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.response('no')} style={[{backgroundColor: red}, styles.button]}>
          <Text style={[styles.text, {color: 'white'}]}>No</Text>
        </TouchableOpacity>
        </View>
        </View>
      )
    }
  }

  render() {
    const frontAnimatedStyle = {
      transform: [
        { rotateX: this.frontInterpolate}
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateX: this.backInterpolate }
      ]
    }

    const title = this.props.navigation.getParam('title')
    const color = this.state.deck ? this.state.deck.color : 'blue'

    return (
        <View style={styles.container}>
          <Text style={[styles.title, {color: color}]}>{title}</Text>
          <Text style={styles.text}>{this.state.deck !== null &&
              `\n\n${this.state.flag} ${this.state.index + 1} of ${this.state.deck.questions.length}`}</Text>
          <View style={styles.cardContainer}>

            <Animated.View style={[frontAnimatedStyle, styles.flipCard, {backgroundColor: color}]}>
              <Text style={styles.flipText}>
                {this.state.deck !== null && this.state.deck.questions[this.state.index].question}
              </Text>
            </Animated.View>
            <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
              <Text style={styles.flipText}>
                {this.state.deck !== null && this.state.deck.questions[this.state.index].answer}
              </Text>
            </Animated.View>
          </View>
          {this.showButton()}
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  cardContainer: {
    marginTop: 50,
    marginBottom: 50
  },
  flipCard: {
    width: 300,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    borderRadius: 8
  },
  flipCardBack: {
    backgroundColor: 'black',
    position: "absolute",
    top: 0,
  },
  flipText: {
    width: 250,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  title: {
    marginTop: 30,
    fontWeight: 'bold',
    fontSize: 30,
  },
  yesno: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'blue'
  },
  button: {
    margin: 30,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  }
})
