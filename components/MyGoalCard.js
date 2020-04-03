import {View, Text, Image, SafeAreaView, Alert, StyleSheet} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements';
import React from 'react';

function MyGoalCard({goal, removeGoal}) {
  console.log('My GOAL CARD');
  console.log(goal);
  return (
    <View>
      <SafeAreaView>
        <Card title={goal.message.toUpperCase()}>
          <Text style={styles.goalText}>Duration: {goal.duration} days</Text>
          <Text style={styles.goalText}>Created: {goal.createdAt} days</Text>
          <Button
            onPress={() => {
              const completionMessage = (goal.duration == 1) ? `You received a point!` : `You have received ${goal.duration}pts!`

              Alert.alert(
                'You Did it!',
                completionMessage,
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'Done',
                    onPress: () => removeGoal(goal.key, goal.duration),
                  },
                ],
                {cancelable: false},
              );
            }}
            // icon={<Icon name='code' color='#ffffff' />}
            buttonStyle={{
              backgroundColor: 'green',
            }}
            title="Complete"
          />
        </Card>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  goalText: {
    marginBottom: 10,
  },
});

export default MyGoalCard;
