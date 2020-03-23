/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import FriendsScreen from './Screens/FriendsScreen';
import MyGoalsScreen from './Screens/MyGoalsScreen';
import RegisterScreen from './Screens/RegisterScreen';
import AddGoalScreen from './Screens/AddGoalScreen';
import TabNavigator from './Navigators/TabNavigator';
import DetailsModal from './Modals/DetailsModal';
import LoadingScreen from './components/LoadingScreen';
import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {View, Text, ActivityIndicator} from 'react-native';

import * as firebase from 'firebase';
// import '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import firebaseConfig from './config.js';

import mockUsers from './Mock/Users';

const AuthStack = createStackNavigator();
const RootStack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.addGoal = this.addGoal.bind(this);
    this.authenticateSession = this.authenticateSession.bind(this);
    this.authenticateUser = this.authenticateUser.bind(this);
    this.state = {
      isLoading: true,
      authenticatedUser: '',
      userGoals: [],
      allUsers: [],
      sessionId: null,
    };
  }

  componentDidMount() {
    firebase.initializeApp(firebaseConfig);
    ///asynchronous call to get user information
    const retrieveAuthenticatedUser = this.state.authenticatedUser;
    const retrieveAuthenticatedUserDetails = mockUsers.find(
      p => (p.Fname = retrieveAuthenticatedUser),
    );
    this.setState({
      isLoading: false,
      allUsers: mockUsers,
      authenticatedUser: '',
      authenticatedUserDetails: retrieveAuthenticatedUserDetails,
      groupId: '123',
    });
  }

  authenticateSession(id) {
    this.setState({
      sessionId: id
    })
  }

  authenticateUser(userDetail) {
    console.log('authentication in process$$$$$$, welcome ' + userDetail);
    this.setState({
      authenticatedUser: userDetail,
    });
  }

  addGoal(goal, days) {
    console.log(`${goal} was triggered with a duration of ${days} days!`);
    const updatedGoals = this.state.authenticatedUserDetails.goals.unshift(
      goal,
    );
    this.setState({
      authenticatedUserDetails: {
        goals: updatedGoals,
      },
    });
    console.log('goal updated!');
  }

  render() {
    if (!this.state.authenticatedUser) {
      return (
        <NavigationContainer>
          <AuthStack.Navigator mode="modal" initialRouteName="Login">
            <AuthStack.Screen name="Login" options={{headerShown: true}}>
              {props => (
                <LoginScreen
                  {...props}
                  authenticatedUser={'rambo'}
                  authenticateUser={this.authenticateUser}
                />
              )}
            </AuthStack.Screen>
            <AuthStack.Screen name="Register" options={{headerShown: true}}>
              {props => (
                <RegisterScreen
                  {...props}
                  authenticateUser={this.authenticateUser}
                />
              )}
            </AuthStack.Screen>
          </AuthStack.Navigator>
        </NavigationContainer>
      );
    }

    if (this.state.authenticatedUser && this.state.sessionId) {
      return (
        <NavigationContainer>
          <RootStack.Navigator mode="modal">
            <RootStack.Screen name="My Goal" options={{headerShown: false}}>
              {props => (
                <TabNavigator
                  {...props}
                  usersData={mockUsers}
                  authenticatedUser={this.state.authenticatedUser}
                  allUsers={this.state.allUsers}
                  addGoal={this.addGoal}
                />
              )}
            </RootStack.Screen>
            <RootStack.Screen name="Goals" component={DetailsModal} />
          </RootStack.Navigator>
        </NavigationContainer>
      );
    }

    if (this.state.authenticatedUser) {
      return <HomeScreen authenticateSession={this.authenticateSession} />;
    }
  }
}
