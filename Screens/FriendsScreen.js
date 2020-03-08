import React from 'react';
import {View, Text, FlatList, StyleSheet, SafeAreaView} from 'react-native';

function FriendsScreen({authenticatedUserDetails}) {
  console.log('MY GOALS SCREEN');
  // const {Fname, goals} = props.LoggedInUser
  // console.log(props)
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.containerFont}>
          {authenticatedUserDetails.Fname}'s Goals
        </Text>
        <View style={styles.container}>
          <FlatList
            data={authenticatedUserDetails.goals}
            renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
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
export default FriendsScreen;
