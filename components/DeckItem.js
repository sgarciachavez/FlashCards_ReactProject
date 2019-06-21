import React from 'react';
import { View, Text,TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { green, white, blue, orange, ltblue } from '../utils/colors'
import { StackActions, NavigationActions } from 'react-navigation'
import NavigationService from './NavigationService'

export default class DeckItem extends React.Component {

  onPress = () => {
    NavigationService.navigate('DeckView', { title: this.props.deck.title })
  }

  render(){
    const deck = this.props.deck
    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={[styles.container, {backgroundColor: deck.color}]} >
          <Text style={{color: white, fontWeight: 'bold', fontSize: 18}}>{deck.title}</Text>
          <Text style={{color: white }}>{deck.questions.length} cards</Text>
        </View>
      </TouchableOpacity>
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
})
