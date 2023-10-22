import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from '../pages/Home/Home'
import ListNotePage from '../pages/ListNote/ListNote'

const Stack = createNativeStackNavigator()

const RootNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name='Home' component={Home}/>
                <Stack.Screen name='ListNotePage' component={ListNotePage} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigation