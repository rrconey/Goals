import React from 'react';
import {View, Text, FlatList, StyleSheet, Button} from 'react-native';

function UserDetailsModal(props) {
  const {Fname, goals} = props.route.params.details;


  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text> Details</Text>
      <View style={styles.container}>
        {/* <FlatList
          data={goals}
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
        /> */}
        <Button
          title="Friends"
          type="clear"
          onPress={() => props.navigation.navigate('Team Goals')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default UserDetailsModal;
