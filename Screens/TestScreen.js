import React from 'react';
import {View, Text, FlatList, StyleSheet, Button} from 'react-native';

function TestScreen({navigation}) {
  console.log('MY TEST SCREEN');
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 30}}>This is the TESTING screen!!!!!</Text>
      <Button onPress={() => navigation.navigate('Goals')} title="Open Modal" />
    </View>
  );
}

export default TestScreen;
