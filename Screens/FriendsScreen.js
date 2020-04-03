import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {Card, ListItem} from 'react-native-elements';
import * as firebase from 'firebase';

export default function FriendsScreen({
  sessionDetails,
  allUsers,
  navigation,
  currentUser,
  sessionId,
}) {
  const users = sessionDetails.users;
  console.log('session DETAILS');
  console.log(sessionDetails);
  console.log('FRIENDS SCREEEN');
  console.log(users);
  console.log('____________________________');
  console.log(currentUser)
  let fireUsers = [];
  users.forEach(user => {
    const userRef = firebase.database().ref(`/users/${user}`);

    userRef.on('value', function(snapshot) {
      let data = snapshot.val();
      data.key = snapshot.key;

      fireUsers.push(data);
      console.log('DATA', data);
    });

    console.log('TOMMMY');

    console.log(fireUsers);
  });



  // console.log(sessionRef)
  // sessionRef.on('value', function(snapshot) {
  //   snapshot.forEach(childSnapshot => {
  //     let item = childSnapshot.val();
  //     item.key = childSnapshot.key;
  //     fireUsers.push(item);
  //     console.log('item:', item)
  //   });

  // })

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.containerFont}>Friends</Text>
      </View>
      <Card containerStyle={{padding: 0}}>
        {fireUsers
          .filter(person => person.key !== currentUser.uid)
          .map((user) => {
            return (
              <ListItem
                onPress={() => {
                  /* 1. Navigate to the Details route with params */
                  navigation.navigate('Goals', {
                    title: user.displayName,
                    details: user.goals,
                  });
                }}
                key={user.key}
                title={user.displayName}
                title={user.displayName + ` (${user.goals.length}/5)`}
                
                leftAvatar={{
                  source: {
                    uri:
                      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                  },
                }}
                subtitle={user.goals[0].message || 'bum life :( '}
                // avatar={{uri:u.avatar}}
              />
            );
          })}
      </Card>
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
});
