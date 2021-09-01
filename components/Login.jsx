import React, { useState, useEffect } from "react";
import {
    Button,
    StyleSheet,
    TouchableOpacity,
    Text,
    TextInput,
    Touchable,
    View,
} from "react-native";
import { styles } from "../Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    let handleLogin = async () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: userName,
                password: password,
            }),
        };

        return fetch(`https://api.exory.dev/api/user/login`, requestOptions)
            .then(handleResponse)
            .then(async (userResponse) => {
                console.log(userResponse);
                await AsyncStorage.setItem("auth-token", userResponse);
                await AsyncStorage.setItem("userQuery", userName);
          
                // return user;
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // handle response != 200 and display message
    let handleResponse = (response) => {
        return response.text().then((text) => {
            if (!response.ok) {
              
                if (response.status === 401) {
                }
          
                const error = text || response.statusText;
                return Promise.reject(error);
            }
            return text;
        });
    };

    return (
        <View style={styles.loginContainer}>
            <Text style={[styles.header, { marginBottom: 30 }]}>Login</Text>
            <Text style={[styles.label, { marginLeft: 20 }]}>
                Username or E-Mail
            </Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setUserName(text)}
                value={userName}
                autoCompleteType="username"
                returnKeyType="next"
                textContentType="username"
                keyboardAppearance="dark"
            />

            <Text style={[styles.label, { marginLeft: 20 }]}>Password</Text>
            <TextInput
                style={styles.input}
                autoCompleteType="password"
                textContentType="password"
                onSubmitEditing={handleLogin}
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={true}
                returnKeyType="done"
                keyboardAppearance="dark"
            />
            <TouchableOpacity
                onPress={handleLogin}
                style={styles.button}
                color="#dc1f42"
            >
                <Text
                    style={{ color: "white", fontWeight: "600", fontSize: 25 }}
                >
                    Login
                </Text>
            </TouchableOpacity>
        </View>
    );
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
