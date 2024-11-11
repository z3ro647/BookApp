import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BookList from '../components/BookList';
import BookDetail from '../components/BookDetail';

const Stack = createStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Books List" component={BookList} />
    <Stack.Screen name="Book Detail" component={BookDetail} />
  </Stack.Navigator>
);

export default StackNavigator;
