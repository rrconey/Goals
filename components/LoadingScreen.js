import React, {Component} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

export default class LoadingScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('Loading Screenbb')
    console.log(this.props)
    return (
      <View style={styles.container}>
        <Text> Loading...</Text>
        <ActivityIndicator size="large" />
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
