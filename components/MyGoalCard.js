import {View, Text, Image, SafeAreaView, Alert, StyleSheet} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements';
import React from 'react';

function MyGoalCard({goal}) {
  console.log('FINAL CARD');
  return (
    <View>
      <SafeAreaView>
        <Card title="# Days Count">
          <Text style={styles.goalText}>{goal.item}</Text>
          <Button
            onPress={() => Alert.alert('Wham Bam Done!')}
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
