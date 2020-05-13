import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, Button} from 'react-native';
import {Card, ListItem} from 'react-native-elements';
// import * as firebase from 'firebase';
import {O2A} from 'object-to-array-convert';

export default function FriendsScreen({
  // sessionDetails,
  navigation,
  currentUser,
  sessionId,
  users,
}) {
  console.log('session DETAILS');
  // console.log(sessionDetails);
  console.log('FRIENDS SCREEEN');
  console.log('____________________________');
  console.log(   )
  console.log('____________________________');

  if (users.length === 1) {
    return (
      <SafeAreaView style={{backgroundColor: '#DE9E36'}}>
        <View style={styles.container}>
          <Text style={styles.containerFont}>Friends</Text>
        </View>
        <View>
          <Button
            title="Add Friend"
            color="#E9446A"
            accessibilityLabel="Button will take you to the next screen to send an invite to a friend"
            onPress={() => navigation.navigate('Add Friend')}
          />
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={styles.containerFont}>Friends</Text>
        </View>
        <Card containerStyle={{padding: 0}}>
          {users
            .filter(person => person.displayName !== currentUser.displayName)
            .map( user => {
              return (
                <ListItem
                  onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    navigation.navigate('Goals', {
                      title: user.displayName,
                      details: user,
                    });
                  }}
                  key={user.uid}
                  title={user.displayName}
                  rounded
                  subtitle={user.goals.length === 0 ? `No Goals` : `${user.goals.length} goal(s)`}
                  leftAvatar={{title: user.displayName.charAt(0) }}
                />
              );
            })}
        </Card>
        <View>
          <Button
            title="Add Friend"
            color="#E9446A"
            accessibilityLabel="Button will take you to the next screen to send an invite to a friend"
            onPress={() => navigation.navigate('Add Friend')}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    paddingLeft: 15,
    paddingTop: 15,
  },
  containerFont: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});
