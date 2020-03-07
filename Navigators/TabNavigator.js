import React from 'react';
import FriendsScreen from '../Screens/HomeScreen'
import MyGoalsScreen from '../Screens/TestScreen';
import AddGoalScreen from '../Screens/GoalsFormScreen';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

function TabNavigator({name, navigation}) {
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
        {props => <FriendsScreen {...props} />}
      </Tab.Screen>
      <Tab.Screen name="My Goals">
        {props => <MyGoalsScreen {...props} />}
      </Tab.Screen>
      <Tab.Screen name="Add Goal">
        {props => <AddGoalScreen {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default TabNavigator;
