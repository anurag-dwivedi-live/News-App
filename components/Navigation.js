import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NewsDetails from './NewsDetails';
import Headlines from './Headlines';

const Stack = createStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Headlines">
                <Stack.Screen name="Headlines" component={Headlines} options={{ headerShown: false }}/>
                <Stack.Screen name="NewsDetails" component={NewsDetails} options={{ headerShown: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
