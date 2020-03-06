/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackground } from '@react-navigation/stack';
import HomeScreen from './Screens/HomeScreen';
import UserDetailsScreen from './Screens/UserDetailsScreen';
import GoalsFormScreen from './Screens/GoalsFormScreen';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  FlatList,
  Image
} from 'react-native';

import firebase from '@react-native-firebase/app';
// import '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import firebaseConfig from './config.js'

import mockUsers from './Mock/Users'

const Stack = createStackNavigator();


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true};
  }


 componentDidMount(){
    firebase.initializeApp(firebaseConfig);

    return fetch('https://reactnative.dev/movies.json')
      
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: mockUsers,
        }, function(){
        });

      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="50th Street Goals" component={HomeScreen} />
          <Stack.Screen name="User Details" component={UserDetailsScreen} />
          <Stack.Screen name="Add Goal" component={GoalsFormScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
