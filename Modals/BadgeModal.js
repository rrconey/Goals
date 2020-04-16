import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {Avatar, Input} from 'react-native-elements';

function BadgeModal({navigation, currentUser}) {
  const invites = [{sessionName: 1}, {sessionName: 2}, {sessionName: 3}];
  const invitesList = !invites.length ? (
    <Text>No Invites</Text>
  ) : (
    <FlatList
      data={invites}
      renderItem={({item}) => <Text>{item.sessionName}</Text>}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Avatar xlarge rounded title="CR" />
      </View>
      <View>
        <Text>{currentUser.points} Points</Text>
      </View>
      <Input placeholder={currentUser.displayName} />

      <View style={{alignContent: 'flex-end'}}>
        {invitesList}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
  },
});

export default BadgeModal;
