import React from 'react';
import MyGoalsScreen from '../Screens/MyGoalsScreen';
import FriendsScreen from '../Screens/FriendsScreen';
import AddGoalScreen from '../Screens/AddGoalScreen';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

function TabNavigator({
  name,
  navigation,
  // usersData,
  authenticatedUser,
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
  // const authenticatedUserDetails = usersData.find(
  //   p => (p.Fname = authenticatedUser),
  // );
  console.log('rowssss');
  console.log(sessionDetails);
  return (
    <Tab.Navigator
      initialRouteName="My Goals"
      activeColor="#9381FF"
      inactiveColor="#2C4251"
      // style={{backgroundColor: 'tomato'}}
      // style={{backgroundColor: 'red'}}

      barStyle={{backgroundColor: '#FFFFFA'}}>
      <Tab.Screen
        name="Friends"
        options={{
          tabBarLabel: 'Friends',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="bell" size={26} />
          ),
        }}>
        {props => (
          <FriendsScreen
            {...props}
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
            // authenticatedUserDetails={authenticatedUserDetails}
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
