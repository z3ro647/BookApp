import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';  // Importing icons for the tabs

import HomeScreen from '../screens/HomeScreen';
import BookDetail from '../components/BookDetail';
import BorrowedScreen from '../screens/BorrowedScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

const HomeStackNavigator = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home' }} />
    <HomeStack.Screen name="BookDetail" component={BookDetail} options={{ title: 'Book Details' }} />
  </HomeStack.Navigator>
);

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#ff6347',  // Custom header color
      },
      headerTintColor: '#fff',  // White text on header
      tabBarStyle: {
        backgroundColor: '#f8f8f8',  // Light background for the tab bar
        borderTopWidth: 0,  // Removes the border on top of the tab bar
        paddingBottom: 5,  // Padding for a more balanced look
      },
      tabBarLabelStyle: {
        fontSize: 12,  // Smaller font size for tab labels
        fontWeight: 'bold',
      },
      tabBarActiveTintColor: '#ff6347',  // Active tab color
      tabBarInactiveTintColor: '#aaa',  // Inactive tab color
    }}
  >
    <Tab.Screen 
      name="Home" 
      component={HomeStackNavigator} 
      options={{
        headerShown: false, 
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" size={size} color={color} />
        ),
      }} 
    />
    <Tab.Screen 
      name="Borrowed" 
      component={BorrowedScreen} 
      options={{
        title: 'Borrowed Books',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="book" size={size} color={color} />
        ),
      }} 
    />
  </Tab.Navigator>
);

export default TabNavigator;
