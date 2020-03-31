import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {TextInput} from 'react-native-paper';

export default function CreateNewSessionScreen(props) {
  const [session, changeSessionName] = React.useState('');
  console.log('CNS', props);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Group Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={sessionName => changeSessionName(sessionName)}
        value={session}
      />

      <Button
        title="Submit button creates new Session"
        onPress={() => props.createNewSession(session)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    justifyContent: 'center',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  text: {
    fontSize: 18,
    fontWeight: '300',
    marginTop: 10,
    marginBottom: 5,
  },
});
