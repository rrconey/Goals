import React from 'react';
import {View, Text, FlatList, StyleSheet, Button} from 'react-native';
import UserCard from '../components/UserCard';

function DetailsModal({navigation, route}) {
  const {goals, Fname} = route.params.details;
  console.log('MY Details Modal');
  console.log(goals)
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 30, marginTop: 15}}>{Fname}'s Goals</Text>
      <View style={{flex:1}}>
        <FlatList
         data={goals} 
         renderItem={({item}) => 
         <UserCard goal={{item}} username={Fname} />} />
      </View>
    </View>
  );
}

export default DetailsModal;
