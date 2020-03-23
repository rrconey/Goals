import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    roomId: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <Text>One</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.authenticateSession('123')}>
          <Text>Two</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text>Three</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text>Create new Session</Text>
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
