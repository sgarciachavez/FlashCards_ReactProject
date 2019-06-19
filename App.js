import React from 'react';
import Navigator from './components/Navigator'
import NavigationService from './components/NavigationService';

export default class App extends React.Component {
  render(){
    return (
      <Navigator ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    )
  }
}
