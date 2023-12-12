import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Today from './screens/Today';
import Forecast from './screens/ForeCasting';


const Stack = createStackNavigator();


export default function App() {
    return (

        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="today" component={Today} options={{ headerShown: false }} />
                <Stack.Screen name="foreCaste" component={Forecast} options={{ headerShown: false }} />
                <Stack.Screen name="home" component={Home} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>

    )
}