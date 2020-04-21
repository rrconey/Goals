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
import {O2A} from 'object-to-array-convert';
import MyGoalsScreen from './Screens/MyGoalsScreen';
import RegisterScreen from './Screens/RegisterScreen';
import AddGoalScreen from './Screens/AddGoalScreen';
import TabNavigator from './Navigators/TabNavigator';
import DetailsModal from './Modals/DetailsModal';
import InputModal from './Modals/InputModal';
import LoadingScreen from './components/LoadingScreen';
import SessionsScreen from './components/SessionsScreen';
import LoginScreen from './components/LoginScreen';
import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import * as firebase from 'firebase';
import firebaseAccess from './config';
// import '@react-native-firebase/auth';
import CreateNewSessionScreen from './Screens/CreateNewSessionScreen';
import mockUsers from './Mock/Users';
import BadgeModal from './Modals/BadgeModal';

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
    this.sendInvite = this.sendInvite.bind(this);
    this.acceptInvite = this.acceptInvite.bind(this);
    this.snapshotToArray = this.snapshotToArray.bind(this);
  }
  state = {
    isLoading: true,
    authenticatedUser: '',
    userGoals: [],
    allUsers: [],
    sessionId: '',
    sessionName: '',
    sessionDetails: {},
    users: [],
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

  snapshotToArray = snapshot => {
    let returnArr = [];
    snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
    });
    return returnArr;
  };

  getUserAuthInfo(uid) {
    console.log('#############################');
    console.log(uid);
    const userRef = firebase.database().ref(`/users/${uid}`);
    const userRefSessions = firebase.database().ref(`/users/${uid}/sessions/`);
    console.log('user Ref sessions located at b elow');
    console.log(userRefSessions);

    let sessionsArray = [];

    userRefSessions.on('value', function(snap) {
      console.log('this user has a SNAP!');
      console.log(snap);
      if (snap !== null) {
        sessionsArray = O2A(snap);
      }
    });

    userRef.once('value').then(snapshot => {
      const userDetails = snapshot.val();
      console.log(userDetails);

      console.log('Nooo money');
      this.setState({
        currentUser: {
          uid: userDetails.uid,
          displayName: userDetails.displayName,
          email: userDetails.email,
          goals: userDetails.goals,
          points: userDetails.points,
          sessions: sessionsArray || [],
          invites: userDetails.invites || [],
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

  acceptInvite(sessionId, sessionName) {
    console.log('ACCEPTING INVITE by session => ' + sessionId);
    const {uid, displayName} = this.state.currentUser;
    //we want to add currentUser to sessions/users
    const sessionUsersRef = firebase
      .database()
      .ref(`/sessions/${sessionId}/users/${uid}`);

    console.log('accept invite url: ', sessionUsersRef);
    sessionUsersRef.set({displayName, goals: []});

    //delete invite from db

    const userSessionRef = firebase.database().ref(`/users/${uid}/sessions`);

    userSessionRef.push({
      id: sessionId,
      name: sessionName,
    });
  }

  sendInvite(email) {
    const sender = this.state.currentUser.displayName;
    let currentUserId = this.state.currentUser.uid;
    console.log('sender is...', sender);
    const {sessionId} = this.state;
    const session = firebase.database().ref(`/sessions/${sessionId}`);

    const usersRef = firebase.database().ref('/users');
    usersRef
      .orderByChild('email')
      .equalTo(email.toLowerCase())
      .on('child_added', function(snapshot) {
        if (snapshot.val().uid && snapshot.val().uid !== currentUserId) {
          const receiverInvite = firebase
            .database()
            .ref(`/users/${snapshot.key}/invites/`);

          session.once('value').then(function(snap) {
            console.log('sending INvitation');
            console.log(
              `${sender} sent an invitation to session# ${sessionId}(${snap.val()})`,
            );
            receiverInvite.push({
              sender,
              sessionId,
              sessionName: snap.val().sessionName,
            });
          });
        } else {
          console.log('error invite not sent!');
        }
      });
  }

  authenticateSession(sessionId) {
    const sessionRef = firebase.database().ref(`/sessions/${sessionId}`);
    const sessionUsersRef = firebase
      .database()
      .ref(`/sessions/${sessionId}/users`);

      sessionUsersRef.once('value').then(snapshot => {
        console.log('LOSING MY WANDOPPER')
        console.log( O2A(snapshot) )

        const newArr = [];

        Object.keys(snapshot.val()).map( (key,index)=>{
          console.log(key);
          console.log("||");
          console.log(index);
          newArr.push(snapshot.val()[key]);
      });

        this.setState({
          users: (newArr)
        })
      })


    let storage = {};
    let money = [];
    sessionRef.once('value').then(snapshot => {
      console.log('INFORMATION');
      const sessionDetails = snapshot.val();
      console.log(sessionDetails);
      console.log('GET THE USERS ONLY!');
      let users = sessionDetails.users;
      // let data = O2A(users)
      console.log(users);

      console.log('...');

      Array.from(users).forEach(user => {
        const sessionRef = firebase.database().ref(`/users/${user.id}`);

        sessionRef.once('value').then(function(person) {
          //   console.log('person')
          //   console.log(person)
          console.log('zzzzzzzzz');
          console.log(user.id);
          storage[user.id] = person;
          money.push(person.displayName);
          console.log(storage);
        });

        console.log('money1', money);
      });
      console.log('money2', money);
      console.log('HAPPPPYYY');

      console.log(storage);

      this.setState({
        sessionId,
        sessionDetails,
        // users,
      });
    });

    console.log('goodbye');
    console.log('money3', money);
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

  removeGoal = (goalId, pointTotal) => {
    console.log('INSIDE REMOVE GOAL');
    const goalRef = firebase
      .database()
      .ref(`/users/${this.state.currentUser.uid}/goals/${goalId}`);
    const pointsRef = firebase
      .database()
      .ref(`/users/${this.state.currentUser.uid}/points`);

    // console.log(this.state.currentUser.points);
    goalRef.remove();
    // var adaRankRef = firebase.database().ref('users/ada/rank');
    pointsRef.transaction(function(currentRank) {
      // If users/ada/rank has never been set, currentRank will be `null`.
      return Number(currentRank) + Number(pointTotal);
    });

    this.getUserAuthInfo(this.state.currentUser.uid);
  };

  addGoal(message, duration) {
    // const userRef = firebase
    //   .database()
    //   .ref(`/users/${this.state.currentUser.uid}/goals`);

    // console.log(
    //   `${message} was triggered with a duration of ${duration} days!`,
    // );
    // console.log(userRef);
    // userRef.push({
    //   createdAt: firebase.database.ServerValue.TIMESTAMP,
    //   duration,
    //   message,
    // });
    // console.log('goal updated!');
    // this.getUserAuthInfo(this.state.currentUser.uid);

    const userGoalRef = firebase
      .database()
      .ref(
        `/sessions/${this.state.sessionId}/users/${
          this.state.currentUser.uid
        }/goals`,
      );

    userGoalRef.push({message, duration});
    console.log('Goal of ' + message + ' added successfully!');
  }

  createUser(displayName, email, userId) {
    console.log('creating userrrrrr');
    //create users ref
    const newUserRef = firebase.database().ref(`/users/${userId}`);
    //update user ref details
    newUserRef.set({
      displayName,
      sessions: [{name: 'Sessions'}],
      creationDate: new Date(),
      email: email.toLowerCase(),
      points: 0,
      goals: [{message: 'enjoy the app', duration: 5}],
      uid: userId,
      invites: [],
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

    userRef.set({
      name: sessionName,
      id: userRef.key,
    });

    //access userId through state
    newSessionRef.set({
      sessionName,
      chats: ['welcome to goals'],
      users: [{id: this.state.currentUser.uid}],
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    });

    this.setState({
      sessionId: sessionRefId,
      sessionName,
    });

    this.getUserAuthInfo(this.state.currentUser.uid);
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
      console.log(
        `CURRENT USER ${
          this.state.currentUser.uid
        } IS LOGGED IN UNDER SESSION ${this.state.sessionId} `,
      );

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
                  removeGoal={this.removeGoal}
                  users={this.state.users}
                />
              )}
            </RootStack.Screen>
            <RootStack.Screen name="Goals" component={DetailsModal} />
            <RootStack.Screen name="Badge" options={{headerShown: true}}>
              {props => (
                <BadgeModal
                  {...props}
                  currentUser={this.state.currentUser}
                  acceptInvite={this.acceptInvite}
                  sessionDetails={this.state.sessionDetails}
                />
              )}
            </RootStack.Screen>
            <RootStack.Screen name="Add Friend" options={{headerShown: true}}>
              {props => (
                <InputModal
                  {...props}
                  message="Email Address:"
                  buttonText="Send Invite"
                  component={InputModal}
                  action={this.sendInvite}
                />
              )}
            </RootStack.Screen>
          </RootStack.Navigator>
        </NavigationContainer>
      );
    }

    if (this.state.currentUser.uid) {
      console.log('USer authenticated Details!222222222222');
      console.log(
        'THE CURRENT USER IS LOGGED IN UNDER ID: ' + this.state.currentUser.uid,
      );
      console.log(this.state);
      return (
        <NavigationContainer>
          <SessionStack.Navigator mode="modal" initialRouteName="Sessions">
            <SessionStack.Screen name="Sessions" options={{headerShown: true}}>
              {props => (
                <SessionsScreen
                  {...props}
                  sessions={this.state.currentUser.sessions}
                  currentUser={this.state.currentUser}
                  authenticateSession={this.authenticateSession}
                />
              )}
            </SessionStack.Screen>

            <SessionStack.Screen
              name="New Session"
              options={{headerShown: true}}>
              {props => (
                <InputModal
                  {...props}
                  message="Session Name:"
                  buttonText="Create Session"
                  action={this.createNewSession}
                />
              )}
            </SessionStack.Screen>
          </SessionStack.Navigator>
        </NavigationContainer>
      );
    }
  }
}
