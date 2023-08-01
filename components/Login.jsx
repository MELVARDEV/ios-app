import React, { useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  StatusBar,
  View,
} from "react-native";
import { styles } from "../Styles";
import { Buffer } from "buffer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";

export default function Login({ isLoggedIn, setIsLoggedIn }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const { colors } = useTheme();

  let handleLogin = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " + Buffer.from(userName + ":" + password).toString("base64"),
      },
    };

    return fetch(`https://api-v2.exory.dev/login`, requestOptions)
      .then(handleResponse)
      .then(async (userResponse) => {
        //console.log(userResponse);
        await AsyncStorage.setItem("auth-token", userResponse.token);
        await AsyncStorage.setItem("userQuery", userName);
        setIsLoggedIn(true);
        // return user;
      })
      .catch((error) => {
        setErrMsg(error);
      });
  };

  // handle response != 200 and display message
  let handleResponse = (response) => {
    return response.json().then((json) => {
      if (!response.ok) {
        if (response.status === 401) {
        }

        const error = json || response.statusText;
        return Promise.reject(error);
      }
      return json;
    });
  };

  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <View style={[styles.view, styles.loginContainer]}>
        {/* <Text style={[styles.header, { marginBottom: 30 }]}>Exory</Text> */}
        <Text style={[styles.label, { marginLeft: 20 }]}>
          Username or E-Mail
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setUserName(text)}
          value={userName}
          autoCompleteType="username"
          keyboardAppearance="dark"
          returnKeyType="next"
          textContentType="username"
        />

        <Text style={[styles.label, { marginLeft: 20 }]}>Password</Text>
        <TextInput
          style={styles.input}
          autoCompleteType="password"
          textContentType="password"
          onSubmitEditing={handleLogin}
          keyboardAppearance="dark"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          returnKeyType="done"
        />
        <Text
          style={[
            styles.label,
            {
              color: "red",
              textAlign: "center",
              marginTop: -4,
              marginBottom: -13,
            },
          ]}
        >
          {errMsg && errMsg}
        </Text>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
          color="#dc1f42"
        >
          <Text
            style={{
              color: "white",
              fontWeight: "600",
              fontSize: 25,
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </>
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
