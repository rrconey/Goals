import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {O2A} from 'object-to-array-convert';
import RegisterScreen from './Screens/RegisterScreen';
import TabNavigator from './Navigators/TabNavigator';
import DetailsModal from './Modals/DetailsModal';
import InputModal from './Modals/InputModal';
import SessionsScreen from './components/SessionsScreen';
import LoginScreen from './components/LoginScreen';
import React from 'react';
import {Alert} from 'react-native';
import * as firebase from 'firebase';
import mockUsers from './Mock/Users';
import BadgeModal from './Modals/BadgeModal';
import FirebaseAccess from './config'
const AuthStack = createStackNavigator();
const RootStack = createStackNavigator();
const SessionStack = createStackNavigator()

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
    this.removeInvite = this.removeInvite.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }
  state = {
    isLoading: true,
    authenticatedUser: '',
    userGoals: [],
    loginErrorMessage: ' ',
    signUpErrorMessage: ' ',
    allUsers: [],
    sessionId: '',
    sessionName: '',
    sessionDetails: {},
    users: [],
    displayName: '',
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
    const userRef = firebase.database().ref(`/users/${uid}`);
    const userRefSessions = firebase.database().ref(`/users/${uid}/sessions/`);
    let sessionsArray = [];

    userRefSessions.on('value', function(snap) {
      if (snap !== null) {
        sessionsArray = O2A(snap);
      }
    });

    userRef.once('value').then(snapshot => {
      const userDetails = snapshot.val();

      this.setState({
        currentUser: {
          uid: userDetails.uid,
          displayName: userDetails.displayName,
          email: userDetails.email,
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
      allUsers: mockUsers,
      authenticatedUser: '',
      authenticatedUserDetails: retrieveAuthenticatedUserDetails,
    });
  }

  acceptInvite(sessionId, sessionName, inviteKey) {
    console.log('ACCEPTING INVITE by session => ' + sessionId);
    const {uid, displayName} = this.state.currentUser;
    //we want to add currentUser to sessions/users
    const sessionUsersRef = firebase
      .database()
      .ref(`/sessions/${sessionId}/users/${uid}`);

    console.log('accept invite url: ', sessionUsersRef);
    sessionUsersRef.set({
      displayName,
      uid: sessionUsersRef.key,
      goals: [
        {
          message: `joined friends in ${sessionName}`,
          duration: 1,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        },
      ],
    });

    const userSessionRef = firebase.database().ref(`/users/${uid}/sessions`);

    userSessionRef.push({
      id: sessionId,
      name: sessionName,
    });

    this.removeInvite(inviteKey);
  }

  handleSignUp = (email, password, name) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        this.createUser(name, email, userCredentials.user.uid);
        this.getUserAuthInfo(userCredentials.user.uid);
        this.authenticateUser(userCredentials.user.uid);
      })
      .catch(err => this.setState({signUpErrorMessage: err.message}));

  };



  handleLogin(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(userToken => {
        this.getUserAuthInfo(userToken.user.uid);
      })
      .catch(err => this.setState({loginErrorMessage: err.message}));
  }

  removeInvite(inviteKey) {
    const userId = this.state.currentUser.uid;
    firebase
      .database()
      .ref(`/users/${userId}/invites/${inviteKey}`)
      .remove();

    this.getUserAuthInfo(this.state.currentUser.uid);
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
            receiverInvite
              .push({
                sender,
                sessionId,
                sessionName: snap.val().sessionName,
              })
              .then(s => {
                receiverInvite.child(s.key).update({inviteKey: s.key});
              });
          });
        } else {
          console.log('error invite not sent!');
        }
      });

    Alert.alert('Sent!', `to: ${email}`, [{text: 'OK'}]);
  }

  authenticateSession(sessionId) {
    const sessionRef = firebase.database().ref(`/sessions/${sessionId}`);
    const sessionUsersRef = firebase
      .database()
      .ref(`/sessions/${sessionId}/users`);

    sessionUsersRef.once('value').then(snapshot => {
      const newArr = [];

      Object.keys(snapshot.val()).map((key, index) => {
        console.log(key);
        console.log('||');
        console.log(index);
        newArr.push(snapshot.val()[key]);
      });

      this.setState({
        users: newArr,
      });
    });

    sessionRef.once('value').then(snapshot => {
      const sessionDetails = snapshot.val();

      this.setState({
        sessionId,
        sessionDetails: snapshot.val(),
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

  removeGoal = (pointTotal, goalKey) => {
    const goalRef = firebase
      .database()
      .ref(
        `/sessions/${this.state.sessionId}/users/${
          this.state.currentUser.uid
        }/goals/${goalKey}`,
      );
    const pointsRef = firebase
      .database()
      .ref(`/users/${this.state.currentUser.uid}/points`);

    goalRef.remove();
    pointsRef.transaction(function(currentRank) {
      return Number(currentRank) + Number(pointTotal);
    });

    this.getUserAuthInfo(this.state.currentUser.uid);
    this.authenticateSession(this.state.sessionId);
  };

  
  addGoal(message, duration) {
    const time = new Date()
    const userGoalRef = firebase
      .database()
      .ref(
        `/sessions/${this.state.sessionId}/users/${
          this.state.currentUser.uid
        }/goals`,
      );
    userGoalRef
      .push({
        message,
        duration,
        createdAt: time.toString(),
      })
      .then(s => {
        userGoalRef.child(s.key).update({goalKey: s.key});

      });
    console.log('Goal of ' + message + ' added successfully!');
    this.getUserAuthInfo(this.state.currentUser.uid);
    this.authenticateSession(this.state.sessionId);
  }

  createUser(displayName, email, userId) {
    console.log('creating userrrrrr');
    //create users ref
    const newUserRef = firebase.database().ref(`/users/${userId}`);
    //update user ref details
    newUserRef.set({
      displayName,
      sessions: [{name: ' '}],
      creationDate: new Date(),
      email: email.toLowerCase(),
      AggregatePoints: 0,
      // goals: [{message: 'enjoy the app', duration: 5}],
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
    if (sessionName.trim().length < 4) {
      return;
    }

    //access sessions
    const sessionsListRef = firebase.database().ref('sessions');
    //create a new session
    const newSessionRef = sessionsListRef.push();
    console.log('New Session created at:', newSessionRef);
    //get sessionId
    const newSessionId = newSessionRef.key;
    console.log('The new sessions Id is: ', newSessionId);
    console.log(this.state.currentUser);

    // //create user referenace for current user
    const userRef = firebase
      .database()
      .ref(`/users/${this.state.currentUser.uid}/sessions/${newSessionId}`);

    userRef
      .set({
        name: sessionName,
        id: userRef.key,
      })
      .then(() => {
        this.setState({
          sessionId: newSessionId,
          sessionName,
        });
      });

    //access userId through state
    newSessionRef.set({
      sessionName,
      chats: ['welcome to goals'],
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    });

    const addToUsersRef = firebase
      .database()
      .ref(`/sessions/${newSessionId}/users/${this.state.currentUser.uid}`);

    addToUsersRef.set({
      displayName: this.state.currentUser.displayName,
      goals: [{message: 'roscoe', duration: 2, createdAt: 5}],
      uid: addToUsersRef.key,
    });

    // this.setState({
    //   sessionId: newSessionId,
    //   sessionName,
    // });

    this.getUserAuthInfo(this.state.currentUser.uid);
    this.authenticateSession(this.state.sessionId);
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
                  loginErrorMessage={this.state.loginErrorMessage}
                  handleLogin={this.handleLogin}
                  authenticateUser={this.authenticateUser}
                  getUserAuthInfo={this.getUserAuthInfo}
                />
              )}
            </AuthStack.Screen>
            <AuthStack.Screen name="Register" options={{headerShown: true}}>
              {props => (
                <RegisterScreen
                  {...props}
                  handleSignUp={this.handleSignUp}
                  signUpErrorMessage={this.state.loginErrorMessage}
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
            <RootStack.Screen name="Friends" options={{headerShown: false}}>
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
