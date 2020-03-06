
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  FlatList,
  Image
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

  // async function fetchUsers() {
  //   let response = await fetch(url);
  //   this.usersRef = firestore.collection('goals')
  //     .doc('KLcfvaTG5N4LZBs7X3ZO')
  //     .get();
  //     console.log(usersRef)
  // }

  // async getUsers () {
  //   const documentSnapshot = await firestore()
  //   .collection('goals')
  //   .doc('KLcfvaTG5N4LZBs7X3ZO')
  //   .get();
  
  
  //     console.log(documentSnapshot)
  // }

 componentDidMount(){
    firebase.initializeApp(firebaseConfig);
   console.log('users:')
  console.log(this.state.users)

    return fetch('https://reactnative.dev/movies.json')
      
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: mockUsers,
        }, function(){
        });

      })
      .catch((error) => {
        console.error(error);
      });
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
      <View>
        <View style={{paddingTop: 15}} >
          <Button title="Add Goal" type="clear" onPress={()=> this.props.navigation.navigate("Add Goal")}/>
        </View>
    <SafeAreaView>
        
    <Card containerStyle={{padding: 0}} >
      {
        this.state.dataSource.map((u, i) => {
          return (
            <ListItem
              onPress={()=> {this.getData()}}
              key={i}
              // roundAvatar
              title={u.Fname}
              leftAvatar={{ source: { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' } }}
              subtitle={u.goals[0] || 'bum life :( '}
              // avatar={{uri:u.avatar}}
            />
          );
        })
      }
    </Card>
        </SafeAreaView>
      </View> 
       
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
