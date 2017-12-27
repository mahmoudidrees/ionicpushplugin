'use strict';
import React, { Component } from 'react';
const firebase = require('firebase');
import {
  AppRegistry,
  Text,
  View,
  //Navigator,
  AsyncStorage
} from 'react-native';
import {
  Navigator,
} from 'react-navigation';

import Signup from '/Users/mac/Documents/Projects/rnfirebaseauth/src/Pages/signup';
import Account from '/Users/mac/Documents/Projects/rnfirebaseauth/src/Pages/account';

import Header from '/Users/mac/Documents/Projects/rnfirebaseauth/src/components/header';

//import Firebase from 'firebase';
// Initialize Firebase
const firebaseConfig = {
  apiKey: "API_",
  authDomain: "rnproject-1de3f.firebaseapp.com",
  databaseURL: "https://rnproject-1de3f.firebaseio.com",
};
const app = firebase.initializeApp(firebaseConfig);
//let app = new Firebase("https://rnproject-1de3f.firebaseio.com");

import styles from '/Users/mac/Documents/Projects/rnfirebaseauth/src/styles/common-styles.js';

class rnfirebaseauth extends Component {

  constructor(props){
    super(props);
    this.state = {
      component: null,
      loaded: false
    };
  }

  componentWillMount(){

    AsyncStorage.getItem('user_data').then((user_data_json) => {

      let user_data = JSON.parse(user_data_json);
      let component = {component: Signup};
      if(user_data != null){
        app.authWithCustomToken(user_data.token, (error, authData) => {
          if(error){
            this.setState(component);
          }else{
            this.setState({component: Account});
          }
        });
      }else{
        this.setState(component);
      }
    });

  }

  render(){

    if(this.state.component){
      return (
        <Navigator
          initialRoute={{component: this.state.component}}
          configureScene={() => {
            return Navigator.SceneConfigs.FloatFromRight;
          }}
          renderScene={(route, navigator) => {
            if(route.component){
              return React.createElement(route.component, { navigator });
            }
          }}
        />
      );
    }else{
      return (
        <View style={styles.container}>
          <Header text="React Native Firebase Auth" loaded={this.state.loaded} />
          <View style={styles.body}></View>
        </View>
      );
    }

  }

}

AppRegistry.registerComponent('rnfirebaseauth', () => rnfirebaseauth);
