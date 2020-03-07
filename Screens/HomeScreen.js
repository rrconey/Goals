
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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
    this.state = {isLoading: true, dataSource: [], users: []};
  }

  async getData () {
    console.log('getData HIT!!!!')
    // const documentSnapshot = await firestore()
    // .collection('goals')
    // .doc('zErxWj5IUgSf8u9HxNMT')
    // .get()
    // const allUsers = documentSnapshot.docs.map(doc => doc.data());

    // console.log(documentSnapshot) //add documentSnapshot.data()
    console.log('$$$$$$$$$$$$')
    // console.log(mockUsers)

    this.setState({
      users: mockUsers,
    })

    console.log(this.state.users)
    }


  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

 componentDidMount(){
    // firebase.initializeApp(firebaseConfig);
    this.setState({
    isLoading: false,
    dataSource: mockUsers,
    })
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      );
    }
    return (

        
    <SafeAreaView>
    <View >
          <Text >Friends</Text>
        </View>
    <Card containerStyle={{padding: 0}} >
      {

        this.state.dataSource.filter(person => person.Fname !== 'Cindy')
        .map((user, i) => {
          return (
            <ListItem
            onPress={() => {
                /* 1. Navigate to the Details route with params */
                this.props.navigation.navigate(`MyModal`, {
                  title: user.Fname,
                  details: user
                })}}
              key={i}
              // roundAvatar
              title={user.Fname + ` (${user.goals.length}/5)`}
              leftAvatar={{ source: { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' } }}
              subtitle={user.goals[0] || 'bum life :( '}
              // avatar={{uri:u.avatar}}
            />
          );
        })
      }
    </Card>
        </SafeAreaView>
      
       
    );
  }
}

const styles = StyleSheet.create({
  header: {
    color: '#fff',
    fontSize: 23,
    fontWeight: 'bold',
  },
});
