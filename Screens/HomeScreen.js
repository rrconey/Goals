import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';

import {
  Card,
  ListItem,
  Button,
  Icon,
  Avatar,
  Header,
} from 'react-native-elements';

import firebase from '@react-native-firebase/app';
// import '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import firebaseConfig from '../config.js';

import mockUsers from '../Mock/Users';

const Stack = createStackNavigator();

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    console.log('HOME SCREEN')
    console.log(props)
    console.log('----------------')
    
    this.state = {isLoading: true, dataSource: [], users: []};
  }

  componentDidMount() {
    // firebase.initializeApp(firebaseConfig);
    this.setState({
      isLoading: false,
      dataSource: mockUsers,
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.containerFont}>Friends</Text>
        </View>
        <Card containerStyle={{padding: 0}}>
          {this.state.dataSource
            .filter(person => person.Fname !== 'Cindy')
            .map((user, i) => {
              return (
                <ListItem
                  onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    this.props.navigation.navigate('Goals', {
                      title: user.Fname,
                      details: user,
                    });
                  }}
                  key={i}
                  // roundAvatar
                  title={user.Fname + ` (${user.goals.length}/5)`}
                  leftAvatar={{
                    source: {
                      uri:
                        'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                    },
                  }}
                  subtitle={user.goals[0] || 'bum life :( '}
                  // avatar={{uri:u.avatar}}
                />
              );
            })}
        </Card>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft:15,
    paddingTop: 15,
  }, containerFont: {
    fontSize: 28,
    fontWeight: 'bold',
  }
});
