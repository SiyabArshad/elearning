import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//screens
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LessonsScreen from '../screens/LessonsScreen';
import TranslationScreen from '../screens/TranslationScreen';
import Video from '../screens/Video';

const Stack = createStackNavigator();

export default function ProtectedScreen() {

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="LessonsScreen" component={LessonsScreen} />
        <Stack.Screen name="TranslationScreen" component={TranslationScreen} />
        <Stack.Screen name="VideoScreen" component={Video} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


// Happy Coding :)


