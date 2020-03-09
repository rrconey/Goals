import React from 'react';
import MyGoalsScreen from '../Screens/MyGoalsScreen';
import FriendsScreen from '../Screens/FriendsScreen';
import AddGoalScreen from '../Screens/AddGoalScreen';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

function TabNavigator({
  name,
  navigation,
  usersData,
  authenticatedUser,
  allUsers,
}) {
  console.log('TabNavigator');
  const authenticatedUserDetails = usersData.find(
    p => (p.Fname = authenticatedUser),
  );

  return (
    <Tab.Navigator
      initialRouteName="My Goals"
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      barStyle={{backgroundColor: '#694fad'}}>
      <Tab.Screen name="Friends">
        {props => <FriendsScreen {...props} allUsers={allUsers} />}
      </Tab.Screen>
      <Tab.Screen
        name="My Goals"
        options={{
          tabBarLabel: 'My Goals',
        }}>
        {props => (
          <MyGoalsScreen
            {...props}
            authenticatedUserDetails={authenticatedUserDetails}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Add Goal">
        {props => <AddGoalScreen {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default TabNavigator;
