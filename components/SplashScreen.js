import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { purple } from '../utils/colors'

export default class SplashScreen extends React.Component{
  render() {

    return (
      <View style={styles.view}>
        <Text style={styles.text}>Virtual</Text>
        <Text style={styles.text}>Flash Cards</Text>
        <Text style={styles.text}>Application</Text>
        <Text style={[styles.text, {fontSize: 20}]}>{`\n\n\nDeveloped by`}</Text>
        <Text style={[styles.text, {fontSize: 20}]}>Sylvia D. Garcia-Chavez</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
     backgroundColor: purple,
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center'
  },
  text:{
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})
