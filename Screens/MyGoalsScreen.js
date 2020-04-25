import React from 'react';
import {View, Text, FlatList, StyleSheet, SafeAreaView} from 'react-native';
import MyGoalCard from '../components/MyGoalCard';
import {Avatar, Badge} from 'react-native-elements';

function MyGoalsScreen({
  authenticatedUser,
  currentUser,
  removeGoal,
  navigation,
  users,
}) {
  console.log('MY GOALS SCREEN');
  console.log(users);

  let foundUser =
    users.find(user => user.displayName === currentUser.displayName) || [];
  console.log('JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ');
  // console.log(foundUser);
  let currentUserGoals = Object.values(foundUser.goals || []);
  // const currentUserKeys = Object.keys(foundUser.goals || []);
  const firstInitial = currentUser.displayName.charAt(0);
  // const userGoals = currentUserGoals.map(user => user);
  console.log(currentUserGoals);
  currentUserGoals = currentUserGoals.filter(goal => goal.message !== 'roscoe')

  const userGoalsView =
    currentUserGoals.length === 0 ? (
      <Text>No Goals :(</Text>
    ) : (
      <View>
        <FlatList
          data={currentUserGoals}
          keyExtractor={item => item.createdAt}
          renderItem={({item}) => (
            <MyGoalCard goal={item} removeGoal={removeGoal} />
          )}
        />
      </View>
    );

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text style={styles.containerFont}>
              {currentUser.displayName}'s Goals
            </Text>
          </View>
          <View
            style={styles.badge}
            onStartShouldSetResponder={() => navigation.navigate('Badge')}>
            <Avatar
              rounded
              title={firstInitial}
              size="medium"
              overlayContainerStyle={{backgroundColor: 'blue'}}
            />
            <Badge
              status="success"
              containerStyle={{position: 'absolute', top: 4, right: 0}}
            />
          </View>
        </View>
        {userGoalsView}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  containerFont: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  points: {
    fontSize: 13,
    color: '#ff00ff',
  },
  badge: {
    marginRight: 20,
  },
});

export default MyGoalsScreen;
