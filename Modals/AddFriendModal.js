import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {TextInput} from 'react-native-paper';

export default function AddFriend(props) {
  const [friend, addFriend] = React.useState('');
  console.log('CNS', props);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Email Address:</Text>
      <TextInput
        style={styles.input}
        onChangeText={sessionName => addFriend(sessionName)}
        value={friend}
      />

      <Button
        title="Send Invite"
        // onPress={() => props.createNewSession(session)}
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
