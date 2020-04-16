import React from 'react';
import {View, Text, FlatList, StyleSheet, SafeAreaView} from 'react-native';
import MyGoalCard from '../components/MyGoalCard';
import {Avatar, Badge, Overlay} from 'react-native-elements';

function MyGoalsScreen({
  authenticatedUserDetails,
  authenticatedUser,
  currentUser,
  removeGoal,
  navigation,
}) {
  console.log('MY GOALS SCREEN');
  console.log(navigation)

  const currentUserGoals = Object.values(currentUser.goals);
  const currentUserKeys = Object.keys(currentUser.goals);
  const firstInitial = currentUser.displayName.charAt(0);
  const userGoals = currentUserGoals.map((user, i) => {
    user.key = currentUserKeys[i];
    return user;
  });



  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text style={styles.containerFont}>
              {currentUser.displayName}'s Goals
            </Text>
          </View>
          <View style={styles.badge} onStartShouldSetResponder={()=> navigation.navigate('Badge')}>
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

        <View>
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
