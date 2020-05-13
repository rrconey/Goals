// Formik x React Native example
import React from 'react';
import {
  Button,
  TextInput,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import {Formik} from 'formik';

export default function AddGoalScreen(props) {
  console.log('-------ADDD GOALS props');
  console.log(props);
  console.log('--------------');

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.containerText}>Add Goal</Text>
        <Formik
          initialValues={{goal: '', duration: ''}}
          onSubmit={values => {
            Alert.alert(
              'Confirm Goal',
              `Add: ${values.goal} to be completed in ${
                values.duration
              } day(s)`,
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                //write async code to update list for the user
                {
                  text: 'OK',
                  onPress: () => {
                    props.addGoal(values.goal, values.duration);
                    values.goal = '';
                    values.duration = '';
                    props.navigation.navigate('My Goals');
                  },
                },
              ],
              {cancelable: true},
            );
          }}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <View>
              {/* <Text style={styles.labelText}>Goal</Text> */}
              <TextInput
              placeholder='  Goal'
                style={styles.textInputBox}
                onChangeText={handleChange('goal')}
                onBlur={handleBlur('goal')}
                value={values.goal}
              />

              {/* <Text># of days</Text> */}
              <TextInput
              placeholder=" # of days"
                style={styles.textInputBox}
                onChangeText={handleChange('duration')}
                onBlur={handleBlur('duration')}
                keyboardType="number-pad"
                value={values.duration}
                clearButtonMode="always"
              />

              <Button onPress={handleSubmit} title="Submit" />
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  containerText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  textInputBox: {
    marginBottom: 15,
    height: 40,
    backgroundColor: '#fafafa',
    borderRadius: 5,
  },
  labelText: {

  }
});
