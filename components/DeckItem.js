import React from 'react';
import { View, Text,TouchableOpacity, TouchableWithoutFeedback,
    StyleSheet, Alert, Animated, Easing } from 'react-native'
import { green, white, blue, orange, ltblue } from '../utils/colors'
import { StackActions, NavigationActions } from 'react-navigation'
import NavigationService from './NavigationService'


export default class DeckItem extends React.Component {

  componentWillMount(){
    this.rotateValue = new Animated.Value(0)
  }

  render(){
    const deck = this.props.deck

     let rotation = this.rotateValue.interpolate({
       inputRange: [0,1],
       outputRange: ["0deg", "360deg"]
     })
    let transformStyle = {... styles.container, backgroundColor: deck.color, transform: [{rotate: rotation}]}

    return (
      <TouchableWithoutFeedback
      onPressIn={() => {
        Animated.timing(this.rotateValue, {
          toValue: 1,
          duration: 700,
          easing: Easing.linear
        }).start();

      }}
      onPressOut={() => {
        Animated.timing(this.rotateValue, {
          toValue: 0,
          duration: 350,
          easing: Easing.linear
        }).start();
        NavigationService.navigate('DeckView', { title: this.props.deck.title })
      }}>

        <Animated.View style={transformStyle} >
          <Text style={styles.text}>{deck.title}</Text>
          <Text style={{color: white }}>{deck.questions.length} cards</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 3,
    width: 150,
    height: 100,
    borderRadius: 5,
    color: blue,
    shadowColor: '#000',
    shadowOffset: {
    	width: 0,
    	height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  text: {
    color: white,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginLeft:  5,
    marginRight: 5
  }
})
