import React from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, Platform,ScrollView } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import { saveDeckTitle } from '../utils/api'
import DismissKeyboard from './DismissKeyboard'
import ColorPalette from './ColorPalette'
import { allcolors } from '../utils/colors'

class AddDeck extends React.Component {
  state = {
    title: '',
    color: '#757575'
  }

  selectColor = (color) => {
    this.setState({color: color})
  }

  onPress = () => {
    if(this.state.title !== ''){

      let title = {
        [this.state.title] : {
          title: this.state.title,
          color: this.state.color,
          questions: []
        }
      }
      saveDeckTitle(title)
      this.goHome()

    }else{
      Alert.alert(
        'Missing Title',
        'Please provide a title for your new deck',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      )
    }
  }

  goHome = () => {
    this.props.navigation.dispatch(StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Home' })
              ],
            }))
  }

  render(){
    return (
      <DismissKeyboard>
      <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}} scrollEnabled={true}>
        <View style={styles.container}>
          <Text style={[styles.text, {color: 'blue'}]}>What is the title of your new deck?</Text>
          <View style={{alignItems: 'center'}}>
            <TextInput
              style={styles.textInput}
              placeholder='Deck title'
              onChangeText={(title) => this.setState({title})}
              value={this.state.title}
              maxLength={20}/>
              <Text style={{marginBottom: 10}}>Max length is 20 chars</Text>
              <Text style={{marginBottom: 5}}>Select a color for your deck:</Text>
            </View>
            <ColorPalette selectColor={this.selectColor}/>
            <TouchableOpacity style={styles.button} onPress={this.onPress}>
              <Text style={[styles.text, {color: 'white'}]}> Submit </Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
      </DismissKeyboard>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: 30
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  textInput: {
    height: 50,
    borderColor: 'blue',
    borderWidth: 2,
    borderRadius: 5,
    width: 350,
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 18,
    padding: 5,
    marginBottom: 5,
  },
  button : {
    alignItems: 'center',
    backgroundColor: 'blue',
    height: 50,
    justifyContent: 'center',
    borderRadius: 8,
    width: 300,
    marginTop: 20,
    marginBottom: 20
  }
})

export default AddDeck
