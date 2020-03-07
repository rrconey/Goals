// Formik x React Native example
import React from 'react';
import { Button, TextInput, View, Text, SafeAreaView } from 'react-native';
import { Formik, MyInput } from 'formik';

export default GoalsFormScreen = props => (
  <SafeAreaView>
  <View style={{paddingTop: 10}} >
  <Formik
    initialValues={{ email: '' }}
    onSubmit={values => console.log(values)}
  >
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <View>

        <Text>Goal</Text>
        <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.email}
        />

        <Text># of days</Text>
        <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.email}
        />

        
        <Button onPress={handleSubmit} title="Submit" />
      </View>
    )}
  </Formik>
  </View>
  </SafeAreaView>
);