import React from 'react';
import Navigator from './components/Navigator'
import NavigationService from './components/NavigationService'
import { setLocalNotification } from './utils/api'
import SplashScreen from './components/SplashScreen'

export default class App extends React.Component {
  state = {
    isLoading: true
  }

  async componentDidMount(){
      const data = await performTimeConsumingTask()

      if (data !== null) {
        this.setState({ isLoading: false })
      }
      setLocalNotification()
  }
  render(){
    if (this.state.isLoading){
      return (<SplashScreen />)
    }

    return (
      <Navigator ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    )
  }
}

const performTimeConsumingTask = async() => {
  return new Promise((resolve) =>
    setTimeout(
      () => { resolve('result') },
      3000
    )
  );
}
