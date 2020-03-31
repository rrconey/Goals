import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  SafeAreaView,
} from 'react-native';

import * as firebase from 'firebase';

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    name: '',
    email: '',
    password: '',
    errorMessage: null,
  };

  handleSignUp = () => {
    const {email, password, name} = this.state;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        //userDetails obtained
        console.log('SSSSSSSSSSSSSSSSSSSSSS');
        console.log(userCredentials.user);
        this.props.createUser(name, email, userCredentials.user.uid);
        this.props.getUserAuthInfo(userCredentials.user.uid);
      })
      .catch(err => this.setState({errorMessage: err.message}));

    // console.log(userCredentials.user)
    

    //   this.props.authenticateUser(name);
  };

  render() {
    console.log('LOGIN');
    console.log(this.props);
    return (
      <View style={styles.container}>
        <Text style={styles.greeting}>{'Start achieving your goals'}</Text>

        <View style={styles.errorMessage}>
          {this.state.errorMessage && (
            <Text style={styles.error}>{this.state.errorMessage}</Text>
          )}
        </View>

        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={name => this.setState({name})}
              value={this.state.name}
            />
          </View>

          <View>
            <Text style={styles.inputTitle}>Email</Text>
            <TextInput
              style={styles.input}
              onChangeText={email => this.setState({email})}
              value={this.state.email}
            />
          </View>

          <View>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={styles.input}
              onChangeText={password => this.setState({password})}
              value={this.state.password}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
            <Text style={{color: 'white'}}>Sign Up</Text>
          </TouchableOpacity>
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
