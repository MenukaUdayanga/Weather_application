import React from 'react';
import {View, Text} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home';
import Detail from './screens/Detail';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Cate Catalog" component={Home} />
        <Stack.Screen name="Cate Details" component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
