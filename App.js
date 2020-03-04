/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

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


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true, dataSource: []};
  }

  componentDidMount(){
    return fetch('https://reactnative.dev/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.movies,
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
        <Header
          // leftComponent={{ icon: 'rowing', color: '#fff' }}
          centerComponent={{text: 'Goals', style: styles.header}}
          // rightComponent={{ icon: 'home', color: '#fff' }}
          containerStyle={{
            // backgroundColor: '#3D6DCC',
           justifyContent: 'space-around',
          }}

        />
        <View style={{paddingTop: 20}} >
          <Text style={{textAlign: 'center' }} >
            Add Goal
          </Text>
        </View>
<SafeAreaView>
    <Card containerStyle={{padding: 0}} >
      {
        this.state.dataSource.map((u, i) => {
          return (
            <ListItem
              key={i}
              // roundAvatar
              title={u.title}
              leftAvatar={{ source: { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' } }}
              subtitle="description"
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
    color: '#fff'
  }
})