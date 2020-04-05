import React from 'react';
import {Text, StyleSheet, Button, SafeAreaView} from 'react-native';
import {TextInput} from 'react-native-paper';

export default function InputModal({navigation, message, buttonText, action}) {
  const [input, changeInput] = React.useState('');
  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.containerFont}>{message}</Text>
      <TextInput
        style={styles.input}
        onChangeText={field => changeInput(field)}
        value={input}
      />

      <Button
        title={buttonText}
        // onPress={() => action(input)}
        onPress={() => action(input)}
      />
    </SafeAreaView>
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
  containerFont: {
    margin: 5,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
