import React from 'react';
import {View, Text, FlatList, StyleSheet, SafeAreaView} from 'react-native';
import MyGoalCard from '../components/MyGoalCard';

function MyGoalsScreen({authenticatedUserDetails}) {
  console.log('MY GOALS SCREEN');
  // const {Fname} = props.LoggedInUser

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.containerFont}>
          {authenticatedUserDetails.Fname}'s Goals
        </Text>
        <View style={styles.container}>
          <FlatList
            data={authenticatedUserDetails.goals}
            renderItem={({item}) => <MyGoalCard goal={{item}} />}
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
});

export default MyGoalsScreen;
