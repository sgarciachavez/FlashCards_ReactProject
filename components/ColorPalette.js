import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import RadioGroup from 'react-native-radio-buttons-group'
import { allColors } from '../utils/colors'

class ColorPalette extends Component{
  state = {
    colors: allColors
  }

  onPress = (colors) => {
    let selectedButton = this.state.colors.find(e => e.selected == true)
    let colorValue = selectedButton ? selectedButton.value : '#757575'
    this.props.selectColor(colorValue)
  }

  //onPress = colors => this.setState({ colors })
  render(){
     //let selectedButton = this.state.colors.find(e => e.selected == true)
    // let label = selectedButton ? selectedButton.label : this.state.colors[0].label
        //selectedButton = selectedButton ? selectedButton.value : this.state.colors[0].label
        let selectedButton = this.state.colors.find(e => e.selected == true)
        let label = selectedButton ? selectedButton.label : 'Gray'
        let colorValue = selectedButton ? selectedButton.value : '#757575'

        return (
          <View style={styles.container}>

          <TouchableOpacity style={[styles.button, {backgroundColor: colorValue}]}>
            <Text style={[styles.valueText, ]}>{label}</Text>
          </TouchableOpacity>

            <View>
                <RadioGroup
                  radioButtons={this.state.colors}
                  onPress={this.onPress}
                  //onPress={this.props.selectColor}
                  flexDirection='column'/>
            </View>
          </View>
        )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      marginTop: 15
    },
    valueText: {
      fontWeight: 'bold',
      fontSize: 20,
      color: 'white'
    },
    button : {
      alignItems: 'center',
      height: 100,
      justifyContent: 'center',
      borderRadius: 8,
      width: 100,
      marginRight: 30
    }
})
export default ColorPalette
