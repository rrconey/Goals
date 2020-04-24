import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import 'react-native-get-random-values';

export default function SessionsScreen({
  authenticateSession,
  navigation,
  sessions,
}) {
  console.log('SESSIONS SCREEN');
  console.log(sessions)
  return (
    <View style={styles.container}>
      <FlatList
        data={sessions}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => authenticateSession(item.id)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.object_key}
      />

      <TouchableOpacity
        style={{marginBottom: 35}}
        onPress={() => navigation.navigate('New Session')}>
        <Text style={{color: 'purple', fontSize: 20, fontWeight: 'bold'}}>
          Create new Session
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
});
