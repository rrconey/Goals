import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {Avatar, Input} from 'react-native-elements';

function BadgeModal({navigation, currentUser, acceptInvite, sessionDetails}) {
  console.log('Badge MODALLLLL!!!')
  //get users invites
  const arrayResult =
    currentUser.invites &&
    Object.keys(currentUser.invites).map(invite => {
      return {key: invite, info: currentUser.invites[invite]};
});
  const invitesList = !arrayResult.length ? (
    <Text>No Invites</Text>
  ) : (
    <FlatList
      data={arrayResult}
      keyExtractor={item => item.inviteKey}
      renderItem={({item}) => 
        <View style={{borderColor:'red', borderWidth: 0.5, margin: 5}} onStartShouldSetResponder={()=> acceptInvite(item.info.sessionId, item.info.sessionName, item.info.inviteKey)}>
          <Text style={{fontSize: 20}}>{item.info.sessionName}</Text>
          <Text style={{fontSize: 10}}>{`Sent by ${item.info.sender}`}</Text>
        </View>}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.h1container}>
        <Text style={styles.containerFont}>{currentUser.displayName}</Text>
      </View>
      <View>
        <Text>{currentUser.points} Points</Text>
      </View>
      <View style={styles.lineStyle} />
      <View style={{alignContent: 'flex-end'}}>
        <Text>Invitations</Text>
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

  h1container: {
    paddingLeft: 15,
    paddingTop: 15,
  },
  containerFont: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  lineStyle:{
    borderWidth: 0.5,
    borderColor:'black',
    margin:10,
}
});

export default BadgeModal;
