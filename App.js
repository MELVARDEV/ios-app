
import React, { useState, useEffect } from "react";
import { SafeAreaView, ActivityIndicator, Text, View, StatusBar } from "react-native";
import Login from "./components/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";


import Navigator from "./components/Navigator";
import { styles } from "./Styles";


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  const scheme = useColorScheme();

  useEffect(() => {
    async function checkLogin() {
      if (await AsyncStorage.getItem("auth-token")) {
        setIsLoggedIn(true)
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json", "auth-token": await AsyncStorage.getItem("auth-token") },
        };

        return fetch(`https://api.exory.dev/api/user/${await AsyncStorage.getItem("userQuery")}`, requestOptions)
          .then(handleResponse)
          .then(async (userResponse) => {
            console.trace("Fetched user");
            setUser(JSON.parse(userResponse))
            setIsLoggedIn(true);
            // return user;
          })
          .catch((error) => {
            console.log(error);
            setIsLoggedIn(false)
          });


      } else {
        setIsLoggedIn(false)
      }
    }
    checkLogin();


  }, [isLoggedIn])


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

      <View style={styles.view}>

        {isLoggedIn ? (
          <Navigator setIsLoggedIn={setIsLoggedIn} user={user} />
        ) : (
          <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        )}
      </View>



  );
}
