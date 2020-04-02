import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import * as firebase from 'firebase';
import config from '../config';

import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    // this.getCollection = this.getCollection.bind(this);
  }
  state = {
    roomId: null,
    name: 'Alex',
    sessions: [],
  };

  render() {
    console.log('MUMUMUMUMUMU UMMMU');
    const {uid} = this.props.currentUser;
    //store user sessions
    let userSessions = [];
    //get users Sessions
    const userSessionsRef = firebase.database().ref(`/users/${uid}/sessions`);
    //convert object into array format
    userSessionsRef.on('value', function(snapshot) {
      snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        userSessions.push(item);
      });
    });

    return (
      <View style={styles.container}>
        <FlatList
          data={userSessions}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => this.props.authenticateSession(item.key)}>
              <Text>Actual -{item.name}</Text>
            </TouchableOpacity>
          )}
        />

        <TouchableOpacity
          onPress={() =>
            console.log(this.props.navigation.navigate('New Session'))
          }>
          <Text>Create new Session</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log('this button does nothing')}>
          <Text>Creates a space between the Real vs. Fake</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.createNewSession()}>
          <Text>UniqueId</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
});
