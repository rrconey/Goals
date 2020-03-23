import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  SafeAreaView
} from 'react-native';

import * as firebase from 'firebase';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    email: '',
    password: '',
    errorMessage: null,
  };

  handleLogin = () => {
     this.props.authenticateUser('Max')
    const {email, password} = this.state;
    // firebase
    //   .auth()
    //   .signInWithEmailAndPassword(email, password)
    //   .catch(err => this.setState({errorMessage: err.message}));
      this.props.navigation.navigate('Register')
  };

  render() {
      console.log('LOGIN SCREEEEENNNNn')
      console.log(this.props)
    return (
      <View style={styles.container}>
        <Text style={styles.greeting}>{'Hello\n Back so soon?'}</Text>

        <View style={styles.errorMessage}>
          <Text>Error</Text>
        </View>

        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>Email Address</Text>
            <TextInput
              style={styles.input}
              onChangeText={email => this.setState({email})}
            />
          </View>

          <View>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={styles.input}
              onChangeText={password => this.setState({password})}
            />
          </View>

          <Button
            style={styles.button}
            title="Sign In"
            onPress={this.handleLogin}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    marginTop: 15,
    marginHorizontal: 30,
    backgroundColor: '#E9446A',
    borderRadius: 4,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
