import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, Alert, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import ReactNativeBiometrics from 'react-native-biometrics'
import LinearGradient from 'react-native-linear-gradient'

const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true })
const { height, width } = Dimensions.get('window')

const Home = () => {

    const navigation = useNavigation()

    useEffect(() => {
        onCheckBiometricAvaillable()
    },[])

    const onCheckBiometricAvaillable = () => {
        rnBiometrics.isSensorAvailable()
            .then((result) => {
                const { available } = result
                if (available) {
                    onHandleBiometrics()
                } else {
                    Alert.alert('Attention', 'Your device do not have any type of biometric sensor')
                }
            })
            .catch(e => {
                Alert.alert('Error', `Error : ${e}`)
            })
    }

    const onHandleBiometrics = () => {
        console.log('onHandleBiometrics')
        rnBiometrics.simplePrompt({promptMessage: 'Authenticate', fallbackPromptMessage: 'Failed to authenticate using biometric'})
            .then((result) => {
                const { success } = result

                if (success) {
                    console.log('success authenticate : ', )
                    navigation.navigate('ListNotePage')
                } else {
                    console.log('failed to authenticate')
                }
            })
            .catch((e) => {
                console.log('Biometrics failed : ', e)
            })
        
    }


    return (
        <SafeAreaView>
            <LinearGradient colors={["#b05ede", "#534d73" ]} style={styles.container}>
                <Text style={styles.titleText}>Notes App</Text>
            </LinearGradient>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: height,
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff'
    }
})

export default Home