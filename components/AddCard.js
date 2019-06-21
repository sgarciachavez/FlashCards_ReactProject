import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity,Alert } from 'react-native'
import { addCard } from '../utils/api'
import { StackActions } from 'react-navigation'

class AddCard extends Component{
  state = {
    title: '',
    question: '',
    answer: '',
  }
  componentDidMount(){
    const title = this.props.navigation.getParam('title')
    const color = this.props.navigation.getParam('color')
    this.setState({
      title: title !== null ? title : '',
      color: color !== null ? color : 'blue'
    })
  }
  onPress = () => {
    const question = this.state.question
    const answer = this.state.answer
    const title = this.state.title

    if(question.trim() !== '' && answer.trim() !== ''){
      const card = {
        question: question,
        answer: answer,
      }

      addCard(title, card).then(() => {
        const popAction = StackActions.pop({
          n: 1,
        })
        this.props.navigation.dispatch(popAction)
      })

    }else{
      if(question.trim() === ''){
        Alert.alert(
          'Missing Question',
          'Please provide a question for the new card',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false},
        )
      }else{
        Alert.alert(
          'Missing Answer',
          'Please provide an answer for the new card',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false},
        )
      }
    }
  }

  render(){
    const color = this.state.color ? this.state.color : 'blue'
    return(
      <DismissKeyboard>
        <View style={styles.container}>
          <View style={{alignItems: 'center'}}>

            <Text style={[styles.title, {color: color }]}>{this.state.title}</Text>
          </View>

            <View style={{width: 350}}>
              <TextInput
                style={[styles.textInput, {height: 60, borderColor: color}]}
                placeholder='Question'
                onChangeText={(question) => this.setState({question: question})}
                multiline={true}
                maxLength={80}
                value={this.state.question}/>
            </View>
            <View style={{width: 350}}>
              <TextInput
                style={[styles.textInput, {height: 100, borderColor: color}]}
                placeholder='Answer'
                onChangeText={(answer) => this.setState({answer: answer})}
                multiline={true}
                maxLength={160}
                value={this.state.answer}/>
            </View>

          <View>
            <TouchableOpacity style={[styles.button, {backgroundColor: color}]} onPress={this.onPress}>
              <Text style={[styles.buttonText, {color: 'white'}]}> Submit </Text>
            </TouchableOpacity>
          </View>
        </View>
      </DismissKeyboard>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    //justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 15,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  textInput: {
    textAlignVertical: "top",

    borderWidth: 2,
    borderRadius: 5,
    width: 350,
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 18,
    padding: 5,
    marginBottom: 10,
  },
  button : {
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 60,
    width: 300,
  }
})
export default AddCard
