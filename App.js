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
    this.enterSession = this.enterSession.bind(this);
    this.getUserAuthInfo = this.getUserAuthInfo.bind(this);
    this.createUser = this.createUser.bind(this);
  }
  state = {
    isLoading: true,
    authenticatedUser: '',
    userGoals: [],
    allUsers: [],
    sessionId: null,
    displayName: '',
    email: '',
    uid: '',
    currentUser: {
      uid: '',
      email: '',
      displayName: '',
    },
  };

  getUserAuthInfo(uid) {
    console.log('#############################');
    console.log(uid);
    const userRef = firebase.database().ref(`/users/${uid}`);
    userRef.once('value').then(snapshot => {
      console.log('MONEY TIME');
      const userDetails = snapshot.val();

      this.setState({
        currentUser: {
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
      groupId: '123',
    });
  }

  authenticateSession(id) {
    this.setState({
      sessionId: id,
    });
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

  createUser(displayName, email, userId) {
    console.log('creating userrrrrr');
    //create users ref
    const newUserRef = firebase.database().ref(`/users/${userId}`);
    //update user ref details
    newUserRef.set({
      displayName,
      sessions: ['123'],
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
    const sessionsListRef = firebase.database().ref('sessions');
    const newSessionRef = sessionsListRef.push();
    const currentUserId = this.state.currentUser.uid;

    const userRef = firebase.database().ref(`/users/${currentUserId}`);
    // console.log('CROSSSEES FINGEERRSS!!!')
    // console.log(currentUserRef)

    //get sessionId
    const lastSlashIndex = newSessionRef.toString().lastIndexOf('/');
    const sessionRefId = newSessionRef.toString().slice(lastSlashIndex + 1);

    let sessions = [];
    //getSession Details
    const sessionsRef = userRef.child('sessions');
    const newSession = sessionsRef.push()
    newSession.set(sessionRefId)

    // userRef.once('value').then(function(snapshot) {
    //   console.log(snapshot.val());
    //   sessions = [snapshot.val().sessions];
    // });
    //add SessionID to User Object
    // userRef.update({sessions: [...sessions, sessionRefId]});

    //access userId through state
    newSessionRef.set({
      sessionName,
      datetime: new Date(),
      chats: ['welcome to goals'],
      users: [currentUserId],
    });

    const path = newSessionRef.toString();
    this.setState({
      sessionId: sessionName,
    });

    console.log('LOGGED IN DETAILS:');
    console.log(
      `The current user is ${this.state.authenticatedUser} using session ${
        this.state.sessionId
      }`,
    );

    console.log(path);
  }

  async enterSession(sessionName) {
    const testSessionName = 'Neyo';

    var ref = firebase.database().ref(`sessions/${testSessionName}`);
    ref.once('value').then(function(snapshot) {
      console.log(snapshot.toJSON());
      // var hasName = snapshot.hasChild("name"); // true
      // var hasAge = snapshot.hasChild("age"); // false
    });
  }

  render() {
    if (!this.state.authenticatedUser) {
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

    if (this.state.authenticatedUser && this.state.sessionId) {
      console.log('333333333333333333!');
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
                />
              )}
            </RootStack.Screen>
            <RootStack.Screen name="Goals" component={DetailsModal} />
          </RootStack.Navigator>
        </NavigationContainer>
      );
    }

    if (this.state.authenticatedUser) {
      console.log('USer authenticated Details!222222222222');
      console.log(this.state);
      return (
        <NavigationContainer>
          <SessionStack.Navigator mode="modal" initialRouteName="Sessions">
            <SessionStack.Screen name="Sessions" options={{headerShown: true}}>
              {props => (
                <HomeScreen {...props} enterSession={this.enterSession} />
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
