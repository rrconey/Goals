import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {Card, ListItem} from 'react-native-elements';

export default function FriendsScreen(props) {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.containerFont}>Friends</Text>
      </View>
      <Card containerStyle={{padding: 0}}>
        {props.allUsers
          .filter(person => person.Fname !== 'Cindy')
          .map((user, i) => {
            return (
              <ListItem
                onPress={() => {
                  /* 1. Navigate to the Details route with params */
                  props.navigation.navigate('Goals', {
                    title: user.Fname,
                    details: user,
                  });
                }}
                key={i}
                // roundAvatar
                title={user.Fname + ` (${user.goals.length}/5)`}
                leftAvatar={{
                  source: {
                    uri:
                      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                  },
                }}
                subtitle={user.goals[0] || 'bum life :( '}
                // avatar={{uri:u.avatar}}
              />
            );
          })}
      </Card>
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
