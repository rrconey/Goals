import {View, Text, Image, SafeAreaView, Alert} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements';
import React from 'react';

function UserCard({goal}) {
  console.log('FINAL CARD', goal);
  return (
    <View >
      <SafeAreaView>
        <Card
        //   title='HELLO WORLD'
        // image={require('../images/pic2.jpg')}>
        >
          <Text style={{marginBottom: 10}}>
            {/* The idea with React Native Elements is more about component structure
          than actual design. */}
            {goal.item}
          </Text>
          <Button
          onPress={()=> Alert.alert('You GO Giiirl!!!!')}
            // icon={<Icon name='code' color='#ffffff' />}
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
              backgroundColor: 'green',
            }}
            title="Complete"
          />
        </Card>
      </SafeAreaView>
    </View>
  );
}

export default UserCard;
