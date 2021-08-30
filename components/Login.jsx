import React from 'react'
import { StyleSheet,SafeAreaView, Text, View } from 'react-native';
import {styles} from '../Styles'


export default function Login() {
    return (
        <SafeAreaView style={styles.view}>
            <View style={styles.loginContainer}>
                
                <Text style={styles.header}>Login</Text>



            </View>
            
        </SafeAreaView>
    )
}

// const styles = StyleSheet.create({
//   container: {
      
//   },
//   bigBlue: {
//     color: 'blue',
//     fontWeight: 'bold',
//     fontSize: 30,
//   },
//   red: {
//     color: 'red',
//   },
// });