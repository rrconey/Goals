import {View, Text, SafeAreaView, Alert, StyleSheet} from 'react-native';
import {Card, Button} from 'react-native-elements';
import React from 'react';
import moment from 'moment';

function MyGoalCard({goal, removeGoal}) {
  console.log('My GOAL CARD');
  return (
    <View>
      <SafeAreaView>
        <Card title={goal && goal.message.toUpperCase()}>
          <Text style={styles.goalText}>Duration: {goal.duration} days</Text>
          <Text style={styles.goalText}>
            {moment(goal.createdAt).calendar()}
          </Text>
          <Button
            onPress={() => {
              const completionMessage =
                goal.duration == 1
                  ? 'You received a point!'
                  : `${goal.duration}pts Earned!`;

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
                    onPress: () => removeGoal(goal.duration, goal.goalKey),
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
