import React from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import { saveDeckTitle } from '../utils/api'
import DismissKeyboard from './DismissKeyboard'

class AddDeck extends React.Component {
  state = {
    title: ''
  }

  onPress = () => {
    if(this.state.title !== ''){
      let title = {
        [this.state.title] : {
          title: this.state.title,
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
        <View style={styles.container}>
          <Text style={[styles.text, {color: 'blue'}]}>{`\n\nWhat is the title of \n your new deck?`}</Text>
          <View style={{alignItems: 'center'}}>
            <TextInput
              style={styles.textInput}
              placeholder='Deck title'
              onChangeText={(title) => this.setState({title})}
              value={this.state.title}
              maxLength={20}/>
              <Text>Max length is 20 chars</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={this.onPress}>
              <Text style={[styles.text, {color: 'white'}]}> Submit </Text>
            </TouchableOpacity>
        </View>
      </DismissKeyboard>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    
  },
  text: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  textInput: {
    height: 50,
    borderColor: 'blue',
    borderWidth: 2,
    borderRadius: 5,
    width: 350,
    marginTop: 60,
    fontWeight: 'bold',
    fontSize: 18,
    padding: 5,
    marginBottom: 10,
  },
  button : {
    alignItems: 'center',
    backgroundColor: 'blue',
    height: 50,
    justifyContent: 'center',
    borderRadius: 8,
    margin: 30,
    width: 300,
  }
})

export default AddDeck
