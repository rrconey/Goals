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

export default (AddGoalScreen = props => (
  <SafeAreaView>
    <View style={styles.container}>
      <Text style={styles.containerText}>Add Goal</Text>
      <Formik
        initialValues={{goal: '', duration: ''}}
        onSubmit={values => {
          console.log(values);
          Alert.alert(
            'Confirm Goal',
            `Add: ${values.goal} to be completed in ${values.duration} day(s)`,
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              //write async code to update list for the user
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: true},
          );
          console.log(props);
        }}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View>
            <Text>Goal</Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={handleChange('goal')}
              onBlur={handleBlur('goal')}
              value={values.goal}
            />

            <Text># of days</Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={handleChange('duration')}
              onBlur={handleBlur('duration')}
              value={values.duration}
            />

            <Button onPress={handleSubmit} title="Submit" />
          </View>
        )}
      </Formik>
    </View>
  </SafeAreaView>
));

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingTop: 15,
  },
  containerText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
