import React from 'react';
import {View, Text, FlatList, StyleSheet, SafeAreaView} from 'react-native';
import MyGoalCard from '../components/MyGoalCard';

function MyGoalsScreen({
  authenticatedUserDetails,
  authenticatedUser,
  currentUser,
  removeGoal,
}) {
  console.log('MY GOALS SCREEN');

  const currentUserGoals = Object.values(currentUser.goals);
  const currentUserKeys = Object.keys(currentUser.goals);

  const userGoals = currentUserGoals.map((user, i) => {
    user.key = currentUserKeys[i];
    return user;
  });

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.containerFont}>
          {currentUser.displayName}'s Goals
        </Text>
        <Text style={styles.points}>Points Total: {currentUser.points}</Text>
        <View style={styles.container}>
          <FlatList
            data={userGoals}
            renderItem={({item}) => (
              <MyGoalCard goal={item} removeGoal={removeGoal} />
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingTop: 15,
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
});

export default MyGoalsScreen;
