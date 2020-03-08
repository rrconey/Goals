/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {MaterialCommunityIcons} from 'react-native-vector-icons';

const Tab = createMaterialBottomTabNavigator();

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderBackground} from '@react-navigation/stack';
import HomeScreen from './Screens/HomeScreen';
import FriendsScreen from './Screens/FriendsScreen';
import UserDetailsScreen from './Screens/UserDetailsScreen';
import AddGoalScreen from './Screens/AddGoalScreen';
import TestScreen from './Screens/TestScreen';
import TabNavigator from './Navigators/TabNavigator';
import DetailsModal from './Modals/DetailsModal';

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
  Image,
} from 'react-native';

import firebase from '@react-native-firebase/app';
// import '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import firebaseConfig from './config.js';

import mockUsers from './Mock/Users';

const RootStack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      authenticatedUser: '',
      userGoals: [],
      allUsers: [],
    };
  }

  componentDidMount() {
    // firebase.initializeApp(firebaseConfig);
    ///asynchronous call to get user information
    const retrieveAuthenticatedUser = 'Cindy';
    const retrieveAuthenticatedUserDetails = mockUsers.find(
      p => (p.Fname = retrieveAuthenticatedUser),
    );
    this.setState({
      isLoading: false,
      allUsers: mockUsers,
      authenticatedUser: 'Cindy',
      authenticatedUserDetails: retrieveAuthenticatedUserDetails,
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
    
    const navi = (
      <Tab.Navigator
        initialRouteName="My Goals"
        activeColor="#f0edf6"
        inactiveColor="#3e2465"
        barStyle={{backgroundColor: '#694fad'}}>
        <Tab.Screen
          name="Friends"
          options={{
            tabBarLabel: 'Friends',
          }}>
          {props => <HomeScreen {...props} allUsers={allUsers} authenticatedUser={this.state} />}
        </Tab.Screen>
        <Tab.Screen name="My Goals">
          {props => (
            <FriendsScreen
              {...props}
              authenticatedUser={this.state.authenticatedUser}
              LoggedInUser={this.state.authenticatedUserDetails}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Add Goal" component={AddGoalScreen} />
      </Tab.Navigator>
    );
    return (
      <NavigationContainer>
        <RootStack.Navigator mode="modal">
          <RootStack.Screen name="My Goal" options={{headerShown: false}}>
            {props => <TabNavigator 
            {...props} 
            usersData={mockUsers} 
            authenticatedUser={this.state.authenticatedUser} 
            allUsers={this.state.allUsers}
            />}
          </RootStack.Screen>
          <RootStack.Screen name="MyModal" component={DetailsModal} />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
}
