import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { getDecks, setInitialDecks } from '../utils/api'
import DeckItem from './DeckItem'
import { withNavigationFocus } from 'react-navigation';

class DeckList extends Component{
  state = {
    decks: null
  }

  fetchDecks = () => {
    getDecks().then((decks) => {
      this.setState({ decks: JSON.parse(decks)})
    })
  }
  
  render(){
    const decks = this.state.decks

    if(this.props.isFocused){
      this.fetchDecks()
    }

    return(
      <View style={styles.container}>
          {decks !== null && Object.keys(decks).length > 0
          ? Object.keys(decks).map((key) => <DeckItem deck={decks[key]} key={key}/>)
          : <Text>No decks have been created.</Text>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    justifyContent: 'space-between',
    marginLeft: 7.5,
    marginRight: 7.5,
  }
})

export default withNavigationFocus(DeckList)
