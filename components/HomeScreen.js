import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import * as firebase from 'firebase';
import config from '../config';

import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.getCollection = this.getCollection.bind(this);
  }
  state = {
    roomId: null,
    name: 'Alex'
  };

  async getCollection(sessionName) {
    console.log('getting collection.....');

    const mobile = 'keepss!!!';
    const specificSession = `/sessions/${sessionName}`;
    const stuff = await firebase
      .database()
      .ref(specificSession)
      .set({
        mobile: mobile,
      });

    console.log(stuff);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => console.log('get collection')}>
          <Text>Get Collection Button</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.authenticateSession('123')}>
          <Text>Two</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.createNewSession()}>
          <Text>UniqueId</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log(this.props.navigation.navigate('New Session'))}>
          <Text>Create new Session</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.enterSession('Neyo')}>
          <Text>Enter (NeYo) Session</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
