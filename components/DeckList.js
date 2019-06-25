import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView,TouchableOpacity, Alert } from 'react-native'
import { getDecks, setInitialDecks, removeData } from '../utils/api'
import DeckItem from './DeckItem'
import { withNavigationFocus } from 'react-navigation'
import { gray } from '../utils/colors'

class DeckList extends Component{
  state = {
    decks: null,
  }

  componentDidMount(){
    this.fetchDecks
  }

  fetchDecks = () => {
    getDecks().then((decks) => {
      this.setState({ decks: JSON.parse(decks)})
    })
  }

  noDecks = () => {
    return (
      <View style={styles.textContainer}>
        <Text style={styles.text}>No decks have been created.</Text>
        <Text style={{fontSize: 18}}>Click the icon below,</Text>
        <Text style={{fontSize: 18}}>"Add Deck" to add a Deck.</Text>
      </View>
    )
  }

  listDecks = () => {
    const decks = this.state.decks
    return(
      <View style={styles.contentContainer}>
        <View style={styles.decksContainer}>
          {Object.keys(decks).map((key) => <DeckItem deck={decks[key]} key={key}/>)}
        </View>
        <TouchableOpacity onPress={this.deleteAll}>
          <Text style={{marginBottom: 10, color: gray}}>Delete ALL Deck</Text>
        </TouchableOpacity>
      </View>
    )
  }

  handleDeleteAll = () => {
    removeData()
  }

  deleteAll= () => {
    Alert.alert(
      'Delete ALL Decks?',
      `Are you sure you want to delete ALL decks?` ,
      [
        {text: 'Yes', onPress: () => this.handleDeleteAll()},
        {text: 'No', },
      ],
      {cancelable: false},
    )
  }

  render(){
    const decks = this.state.decks

    if(this.props.isFocused){
      this.fetchDecks()
    }

    return(
      <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}} scrollEnabled={true}>

        {decks !== null && Object.keys(decks).length > 0
        ? this.listDecks()
        : this.noDecks()}

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flex:1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  decksContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    justifyContent: 'space-between',
    marginLeft: 7.5,
    marginRight: 7.5,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 50
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
    color: 'red',
  },
})

export default withNavigationFocus(DeckList)
