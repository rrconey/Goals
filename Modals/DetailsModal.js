import React from 'react';
import {View, Text, FlatList} from 'react-native';
import UserCard from '../components/UserCard';
import {O2A} from 'object-to-array-convert';
import {List, ListItem} from 'react-native-elements';

function DetailsModal({navigation, route}) {
  // const {goals, Fname} = route.params.details;
  const {displayName, goals} = route.params.details;
  console.log('MY Details Modal');
  console.log(goals);

  console.log('SPACE');
  console.log(Object.entries(goals).map(e => Object.assign(e[1], {key: e[0]})));
  let refund = Object.entries(goals).map(e => Object.assign(e[1], {key: e[0]}));

  console.log(refund[0].message);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 30, marginTop: 15}}>
        {route.params.title}'s Goals
      </Text>
      <View style={{flex: 1}}>
        <View>
          <FlatList
            data={refund}
            renderItem={({item}) => <Text>{item.message}</Text>}
          />
        </View>
      </View>
    </View>
  );
}

export default DetailsModal;
