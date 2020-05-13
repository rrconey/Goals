import React from 'react';
import {View, Text, FlatList, StyleSheet, SafeAreaView} from 'react-native';
import UserCard from '../components/UserCard';
import {O2A} from 'object-to-array-convert';
import {List, ListItem} from 'react-native-elements';

function DetailsModal({navigation, route}) {
  // const {goals, Fname} = route.params.details;
  const {displayName, goals} = route.params.details;
  console.log('MY Details Modal');
  console.log(goals);

  console.log('SPACE');
  console.log(Object.entries(goals)); //.map(e => Object.assign(e[1], {key: e[0]})));
  let refund = Object.entries(goals); //.map(e => Object.assign(e[1], {key: e[0]}));

  // console.log(refund[0]);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.containerFont}>{route.params.title}'s Goals</Text>
        <View style={{flex: 1}}>
          <View>
            <FlatList
              data={refund}
              renderItem={({item}) => <Text>{item.message}</Text>}
              keyExtractor={item => item[0]}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingTop: 15,
  },
  containerFont: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default DetailsModal;
