import React from 'react';
import FriendsScreen from '../Screens/FriendsScreen'
import HomeScreen from '../Screens/HomeScreen'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
// import { Ionicons } from '@expo/vector-icons';

const Tab = createMaterialBottomTabNavigator();

function TabNavigator({name, navigation, usersData, authenticatedUser, allUsers}) {
  console.log('TabNavigator')
  console.log(usersData,)
  console.log('______________')
  console.log(authenticatedUser)
  const authenticatedUserDetails = usersData.find(
    p => (p.Fname = authenticatedUser),
  );
  console.log(authenticatedUserDetails)

  return (
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
        {props => <HomeScreen {...props} allUsers={allUsers}/>}
      </Tab.Screen>
      <Tab.Screen name="My Goals">
        {props => <FriendsScreen {...props} authenticatedUserDetails={authenticatedUserDetails} />}
      </Tab.Screen>
      <Tab.Screen name="Add Goal">
        {props => <AddGoalScreen {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default TabNavigator;
