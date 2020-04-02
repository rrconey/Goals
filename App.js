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
// import firebaseAccess from './config.js';
import CreateNewSessionScreen from './Screens/CreateNewSessionScreen';
import mockUsers from './Mock/Users';

const AuthStack = createStackNavigator();
const RootStack = createStackNavigator();
const SessionStack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.addGoal = this.addGoal.bind(this);
    this.authenticateSession = this.authenticateSession.bind(this);
    this.authenticateUser = this.authenticateUser.bind(this);
    this.createNewSession = this.createNewSession.bind(this);
    this.getUserAuthInfo = this.getUserAuthInfo.bind(this);
    this.createUser = this.createUser.bind(this);
  }
  state = {
    isLoading: true,
    authenticatedUser: '',
    userGoals: [],
    allUsers: [],
    sessionId: '',
    sessionDetails: {},
    displayName: '',
    email: '',
    uid: '',
    currentUser: {
      uid: '',
      displayName: '',
      email: '',
      goals: [],
      points: 0,
      sessions: [],
      sessionId: '',
    },
  };

  getUserAuthInfo(uid) {
    console.log('#############################');
    console.log(uid);
    const userRef = firebase.database().ref(`/users/${uid}`);
    userRef.once('value').then(snapshot => {
      console.log('MONEY TIME');
      const userDetails = snapshot.val();
      console.log(userDetails);
      console.log('Nooo money');
      this.setState({
        currentUser: {
          uid,
          displayName: userDetails.displayName,
          email: userDetails.email,
          goals: userDetails.goals,
          points: userDetails.points,
          sessions: userDetails.sessions,
        },
      });
    });
  }

  componentDidMount() {
    console.log('DID MOUNT^^^^^^^^^^^^^^^^^^^^^^^');
    const retrieveAuthenticatedUser = this.state.authenticatedUser;
    const retrieveAuthenticatedUserDetails = mockUsers.find(
      p => (p.Fname = retrieveAuthenticatedUser),
    );
    this.setState({
      isLoading: false,
      allUsers: mockUsers,
      authenticatedUser: '',
      authenticatedUserDetails: retrieveAuthenticatedUserDetails,
    });
  }

  authenticateSession(sessionId) {
    const sessionRef = firebase.database().ref(`/sessions/${sessionId}`);
    sessionRef.once('value').then(snapshot => {
      console.log('INFORMATION');
      const sessionDetails = snapshot.val();
      this.setState({
        sessionId,
        sessionDetails,
      });
    });
  }

  authenticateUser(userDetail) {
    console.log('authentication in process$$$$$$, welcome ' + userDetail);
    console.log(this.state.currentUser);
    console.log('current State ^^^^^^^^^^');
    this.setState({
      authenticatedUser: userDetail,
      uid: userDetail,
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

  createUser(displayName, email, userId) {
    console.log('creating userrrrrr');
    //create users ref
    const newUserRef = firebase.database().ref(`/users/${userId}`);
    //update user ref details
    newUserRef.set({
      displayName,
      sessions: [
        {
          name: 'default',
          color: 'white',
        },
      ],
      creationDate: new Date(),
      email,
      points: 0,
      goals: [{message: 'enjoy the app', duration: 5}],
    });

    this.authenticateUser(userId);

    this.setState({
      currentUser: {
        uid: userId,
        email,
        displayName,
      },
    });

    console.log('THIS IS THE NEWEST CURRENT USER DETAILS AFTER LOGIN');
    console.log(this.state.currentUser);
  }

  createNewSession(sessionName) {
    //access sessions
    const sessionsListRef = firebase.database().ref('sessions');
    //create a new session
    const newSessionRef = sessionsListRef.push();
    console.log('New Session created at:', newSessionRef);
    //get sessionId
    const lastSlashIndex = newSessionRef.toString().lastIndexOf('/');
    const sessionRefId = newSessionRef.toString().slice(lastSlashIndex + 1);

    console.log('The new sessions Id is: ', sessionRefId);
    console.log(this.state.currentUser);

    console.log('this SHOULD BE THE URL');
    console.log(`/users/${this.state.currentUser.uid}/sessions`);
    // //create user referenace for current user
    const userRef = firebase
      .database()
      .ref(`/users/${this.state.currentUser.uid}/sessions/${sessionRefId}`);

    const pushSessionsRef = userRef.set({
      name: sessionName,
      color: 'verde',
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    });

    // const newSession = sessionsRef.push(sessionRefId);

    //access userId through state
    newSessionRef.set({
      sessionName,
      chats: ['welcome to goals'],
      users: ['mack'],
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      sessions: ['niice'],
    });

    this.getUserAuthInfo(this.state.currentUser.uid);
    // this.setState({
    //   currentUser: {sessionId: sessionRefId}
    // });

    // console.log('LOGGED IN DETAILS:');
    // console.log(
    //   `The current user is ${this.state.authenticatedUser} using session ${
    //     this.state.sessionId
    //   }`,
    // );

    // console.log(path);
  }

  render() {
    if (!this.state.currentUser.uid) {
      console.log('1111111111111111111111');
      console.log(this.state);
      return (
        <NavigationContainer>
          <AuthStack.Navigator mode="modal" initialRouteName="Login">
            <AuthStack.Screen name="Login" options={{headerShown: true}}>
              {props => (
                <LoginScreen
                  {...props}
                  authenticatedUser={'rambo'}
                  authenticateUser={this.authenticateUser}
                  getUserAuthInfo={this.getUserAuthInfo}
                />
              )}
            </AuthStack.Screen>
            <AuthStack.Screen name="Register" options={{headerShown: true}}>
              {props => (
                <RegisterScreen
                  {...props}
                  createUser={this.createUser}
                  authenticateUser={this.authenticateUser}
                  getUserAuthInfo={this.getUserAuthInfo}
                />
              )}
            </AuthStack.Screen>
          </AuthStack.Navigator>
        </NavigationContainer>
      );
    }

    if (this.state.currentUser.uid && this.state.sessionId) {
      console.log('33333333333333333300!');

      console.log(this.state);
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
                  currentUser={this.state.currentUser}
                  sessionDetails={this.state.sessionDetails}
                  sessionId={this.state.sessionId}
                />
              )}
            </RootStack.Screen>
            <RootStack.Screen name="Goals" component={DetailsModal} />
          </RootStack.Navigator>
        </NavigationContainer>
      );
    }

    if (this.state.currentUser.uid) {
      console.log('USer authenticated Details!222222222222');
      console.log(this.state);
      return (
        <NavigationContainer>
          <SessionStack.Navigator mode="modal" initialRouteName="Sessions">
            <SessionStack.Screen name="Sessions" options={{headerShown: true}}>
              {props => (
                <HomeScreen
                  {...props}
                  currentUser={this.state.currentUser}
                  authenticateSession={this.authenticateSession}
                />
              )}
            </SessionStack.Screen>
            <SessionStack.Screen
              name="New Session"
              options={{headerShown: true}}>
              {props => (
                <CreateNewSessionScreen
                  createNewSession={this.createNewSession}
                  {...props}
                />
              )}
            </SessionStack.Screen>
          </SessionStack.Navigator>
        </NavigationContainer>
      );
    }
  }
}
