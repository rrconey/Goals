import React from 'react';
import {View, Text, FlatList, StyleSheet, Button} from 'react-native';

function MyGoalsScreen(props) {
  console.log('MY GOALS SCREEN')
  const {Fname, goals} = props.LoggedInUser
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:50 }}>
      <Text>{Fname}s' Goals</Text>
      <View style={styles.container}>
        <FlatList
          data={goals}
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  })
export default MyGoalsScreen;
