import React from 'react';
import {View, Text, FlatList} from 'react-native';
import UserCard from '../components/UserCard';

function DetailsModal({navigation, route}) {
  // const {goals, Fname} = route.params.details;
  const {displayName} = route.params.details
  console.log('MY Details Modal');
  console.log(route)
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 30, marginTop: 15}}>{route.params.title}'s Goals</Text>
      <View style={{flex: 1}}>
        <FlatList
          data={route.params.details}
          renderItem={({item}) => <UserCard goal={{item}} username={displayName} />}
        />
      </View>
    </View>
  );
}

export default DetailsModal;
