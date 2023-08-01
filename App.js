import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ActivityIndicator,
  Text,
  View,
  StatusBar,
} from "react-native";
import Login from "./components/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast, { DURATION } from "react-native-easy-toast";

import Navigator from "./components/Navigator";
import { styles } from "./Styles";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    async function checkLogin() {
      if (await AsyncStorage.getItem("auth-token")) {
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization:
              "Bearer " + (await AsyncStorage.getItem("auth-token")),
          },
        };

        return fetch(`https://api-v2.exory.dev/user`, requestOptions)
          .then(handleResponse)
          .then(async (userResponse) => {
            console.trace("Fetched user");
            let user = userResponse;
            setUser(user);
            setIsLoggedIn(true);

            if (user.admin === true) {
              getUsers();
            }

            // return user;
          })
          .catch((error) => {
            console.log(error);
            setIsLoggedIn(false);
          });
      } else {
        setIsLoggedIn(false);
      }
    }
    checkLogin();
  }, [isLoggedIn]);

  let getUsers = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await AsyncStorage.getItem("auth-token")),
      },
    };

    return fetch(`https://api-v2.exory.dev/users`, requestOptions)
      .then(handleResponse)
      .then(async (userResponse) => {
        let usersArray = [];
        //console.log(userResponse);
        userResponse.forEach((user) => {
          user.avatar.url = user.avatar.url.replace(".svg", ".png");
          usersArray.push(user);
        });

        setUsers(usersArray);

        return true;
      })
      .catch((error) => {
        setErrMsg(error);
        console.log(error);
        return false;
      });
  };

  // handle response != 200 and display message
  let handleResponse = (response) => {
    return response.json().then((text) => {
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
      <Toast ref={(toast) => (this.toast = toast)} />
      {isLoggedIn ? (
        <Navigator
          setIsLoggedIn={setIsLoggedIn}
          user={user}
          users={users}
          getUsers={getUsers}
          setUsers={setUsers}
        />
      ) : (
        <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}
    </View>
  );
}
