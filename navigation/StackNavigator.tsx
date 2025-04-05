import { View, Text } from 'react-native'
import React from 'react'
import HomeScreen from '../screens/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QuizScreen from '../screens/QuizScreen';
import ResultScreen from '../screens/ResultScreen';
import { createStaticNavigation } from '@react-navigation/native';

const RootStack = createNativeStackNavigator({
    screens: {
      Home: {
        screen:HomeScreen,
        options:{
          title:"Quiz Kategorileri",
        },
      },
      Quiz: QuizScreen,
      Result: ResultScreen,
    },
  });
  const StackNavigator = createStaticNavigation(RootStack);


export default StackNavigator