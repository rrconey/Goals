/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import FriendsScreen from './Screens/FriendsScreen';
import MyGoalsScreen from './Screens/MyGoalsScreen';
import AddGoalScreen from './Screens/AddGoalScreen';
import TabNavigator from './Navigators/TabNavigator';
import DetailsModal from './Modals/DetailsModal';

import React from 'react';
import {View, ActivityIndicator} from 'react-native';

import firebase from '@react-native-firebase/app';
// import '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import firebaseConfig from './config.js';

import mockUsers from './Mock/Users';

const RootStack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.addGoal = this.addGoal.bind(this);
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
      groupId: '123',
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
          {props => (
            <FriendsScreen
              {...props}
              allUsers={allUsers}
              authenticatedUser={this.state}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="My Goals">
          {props => (
            <MyGoalsScreen
              {...props}
              authenticatedUser={this.state.authenticatedUser}
              LoggedInUser={this.state.authenticatedUserDetails}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Add Goal"
          component={AddGoalScreen}
          addGoal={this.addGoal}
        />
      </Tab.Navigator>
    );
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
}
