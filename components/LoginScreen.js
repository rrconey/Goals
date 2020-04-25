import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function LoginScreen(props) {
  console.log('This')
  console.log(props.navigation)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>{'Hello\n Welcome to Goalist!'}</Text>

      <View style={styles.errorMessage}>
        {props.loginErrorMessage && (
          <Text style={styles.error}>{props.loginErrorMessage}</Text>
        )}
      </View>

      <View style={styles.form}>
        <View>
          <Text style={styles.inputTitle}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={val => setEmail(val)}
            value={email}
          />
        </View>

        <View>
          <Text style={styles.inputTitle}>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={val => setPassword(val)}
            value={password}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => props.handleLogin(email, password)}>
          <Text style={styles.submitButtonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signUpButtonInput}
          onPress={() => props.navigation.navigate('Register')}>
          <Text style={styles.signUpButtonText}>
            New to Goals App?
            <Text style={styles.signUpLink}> SignUp</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  signUpButtonInput: {
    alignSelf: 'center',
    marginTop: 32,
  },
  signUpButtonText: {fontWeight: '500', fontSize: 13},
  container: {
    flex: 1,
  },
  submitButtonText: {
    color: 'white',
  },
  signUpLink: {fontWeight: '500', color: 'orange'},

  greeting: {
    marginTop: 32,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '400',
  },
  errorMessage: {
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  error: {
    color: 'red',
    fontSize: 13,
    fontWeight: '400',
  },
  inputTitle: {
    color: 'green',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
  },
  input: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: '#161F3D',
  },
  button: {
    marginTop: 32,
    marginHorizontal: 30,
    backgroundColor: '#E9446A',
    borderRadius: 4,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
