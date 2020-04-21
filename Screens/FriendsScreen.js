import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, Button} from 'react-native';
import {Card, ListItem} from 'react-native-elements';
import * as firebase from 'firebase';
import {O2A} from 'object-to-array-convert';



export default function FriendsScreen({
  sessionDetails,
  allUsers,
  navigation,
  currentUser,
  sessionId,
  users,
}) {
  console.log('session DETAILS');
  console.log(sessionDetails);
  console.log('FRIENDS SCREEEN');
  console.log('____________________________');
  
  console.log(users)

  // console.log( users.forEach(user => {console.log(user)}) )

  console.log('____________________________');

  if (!users.length === 0) {
    return (
      <SafeAreaView>
        <Text>NO FRIENDS</Text>
      </SafeAreaView>
    );
  } else {

    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.containerFont}>Friends</Text>
        </View>
        <Card containerStyle={{padding: 0}}>
          {users
            // .filter(person => person.key !== currentUser.uid)
            .map( (user, index) => {
              return (
                <ListItem
                  onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    navigation.navigate('Goals', {
                      title: user.displayName,
                      details: user,
                    });
                  }}
                  key={index}
                  title={user.displayName}
                  title={user.displayName + ` (/5)`}
                  leftAvatar={{
                    source: {
                      uri:
                        'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                    },
                  }}
                  // subtitle={user.goals[0].message || 'bum life :( '}
                  // avatar={{uri:u.avatar}}
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
    paddingLeft: 15,
    paddingTop: 15,
  },
  containerFont: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});
