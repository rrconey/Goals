/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

const Tab = createMaterialBottomTabNavigator();

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackground } from '@react-navigation/stack';
import HomeScreen from './Screens/HomeScreen';
import MyGoalsScreen from './Screens/MyGoalsScreen';
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
const RootStack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true, 
      authenticatedUser: '',
      userGoals: [],
      dataSource: [],
    }
  }

 componentDidMount(){
    // firebase.initializeApp(firebaseConfig);
    
    ///asynchronous call to get user information
    const retrieveAuthenticatedUser = 'Cindy';
    const retrieveAuthenticatedUserDetails = mockUsers.find( p => p.Fname = retrieveAuthenticatedUser)
    this.setState({
      isLoading: false,
      dataSource: mockUsers,
      authenticatedUser: 'Cindy',
      authenticatedUserDetails: retrieveAuthenticatedUserDetails,
    })

    // console.log('AAAAHHHHHH')
    // console.log( this.state.dataSource )
    // const userGoals = this.state.dataSource.find( user => user.Fname === this.state.authenticatedUser )

    // this.setState({
    //   individualGoals: userGoals
    // })
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
        <Tab.Navigator
          initialRouteName="My Goals"
          activeColor="#f0edf6"
          inactiveColor="#3e2465"
          
          barStyle={{backgroundColor: '#694fad'}}>
          <Tab.Screen 
            name="Friends"
            options={{
              tabBarLabel: 'Friends'
              }}>
            {props => <HomeScreen {...props} authenticatedUser={this.state} />}
          </Tab.Screen>
          <Tab.Screen name="My Goals">
            {props => <MyGoalsScreen {...props} authenticatedUser={this.state} LoggedInUser={this.state.authenticatedUserDetails} />}
          </Tab.Screen>
          <Tab.Screen name="Add Goal" component={GoalsFormScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    )
  }
}


