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
  addGoal,
  currentUser,
  sessionDetails,
  sessionId,
  removeGoal,
  users,
}) {
  // const currentUserId = currentUser.uid;
  // const currentSessionId = sessionId;
  console.log('TabNavigator', currentUser);
  const authenticatedUserDetails = usersData.find(
    p => (p.Fname = authenticatedUser),
  );
  console.log('rowssss');
  console.log(sessionDetails);
  return (
    <Tab.Navigator
      initialRouteName="My Goals"
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      barStyle={{backgroundColor: '#694fad'}}>
      <Tab.Screen name="Friends">
        {props => (
          <FriendsScreen
            {...props}
            allUsers={allUsers}
            sessionDetails={sessionDetails}
            currentUser={currentUser}
            sessionId={sessionId}
            users={users}
          />
        )}
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
            authenticatedUser={authenticatedUser}
            currentUser={currentUser}
            removeGoal={removeGoal}
            users={users}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Add Goal">
        {props => <AddGoalScreen addGoal={addGoal} {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default TabNavigator;
