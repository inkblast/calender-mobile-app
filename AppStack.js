import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Calender from './Calendar';
import EventForm from './EventForm';

const stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <stack.Navigator>
        <stack.Screen options={{headerShown:false}} name="Calender" component={Calender} />
        <stack.Screen options={{headerShown:false}} name="EventForm" component={EventForm} />
    </stack.Navigator>

  )
}

export default AppStack;
