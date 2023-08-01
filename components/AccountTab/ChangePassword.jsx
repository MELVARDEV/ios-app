import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderPadding from "../HeaderPadding";

export default function ChangePassword({ user, navigation }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [smsCode, setSmsCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const { colors } = useTheme();

  let requestSMSCode = async () => {
    //console.log(user);

    if (password !== confirmPassword) {
      Alert.alert(
        "Passwords don't match.",
        `Please make sure that you typed in the same password twice.`,
        [{ text: "Ok", style: "default" }]
      );
      return;
    }

    if (password.length < 8) {
      Alert.alert(
        "Password is too short.",
        `Please make sure that your new password is at least 8 characters long.`,
        [{ text: "Ok", style: "default" }]
      );
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": await AsyncStorage.getItem("auth-token"),
      },
      body: JSON.stringify({
        name: user.name,
        password: password,
      }),
    };

    return fetch(
      `https://api.exory.dev/api/user/reset-password`,
      requestOptions
    )
      .then(handleResponse)
      .then(async () => {
        setCodeSent(true);
      })
      .catch((error) => {
        Alert.alert("Alert.", error, [{ text: "Ok", style: "default" }]);
      });
  };

  let verifyCode = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": await AsyncStorage.getItem("auth-token"),
      },
      body: JSON.stringify({
        name: user.name,
        password: password,
        code: smsCode,
      }),
    };

    return fetch(
      `https://api.exory.dev/api/user/reset-password/verify`,
      requestOptions
    )
      .then(handleResponse)
      .then(async () => {
        Alert.alert("Success.", "Your password has been changed successfully", [
          { text: "Ok", style: "default" },
        ]);
        navigation.navigate("account");
      })
      .catch((error) => {
        Alert.alert("Alert.", error, [{ text: "Ok", style: "default" }]);
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
    <>
      <HeaderPadding>
        <View style={{ padding: 20 }}>
          <Text
            style={{
              color: colors.text,
              marginBottom: 5,
              marginLeft: 10,
              opacity: 0.7,
            }}
          >
            New password
          </Text>
          <TextInput
            onChangeText={(text) => setPassword(text)}
            value={password}
            textContentType="newPassword"
            secureTextEntry={true}
            style={{
              backgroundColor: colors.card,
              fontSize: 20,
              color: colors.text,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: colors.border,
              padding: 10,
            }}
          ></TextInput>

          <Text
            style={{
              color: colors.text,
              marginBottom: 5,
              marginLeft: 10,
              marginTop: 16,
              opacity: 0.7,
            }}
          >
            Confirm new password
          </Text>
          <TextInput
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            textContentType="newPassword"
            secureTextEntry={true}
            style={{
              backgroundColor: colors.card,
              fontSize: 20,
              color: colors.text,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: colors.border,
              padding: 10,
            }}
          ></TextInput>

          <Text
            style={{
              color: colors.text,
              marginBottom: 5,
              marginLeft: 10,
              marginTop: 16,
              opacity: 0.7,
            }}
          >
            SMS Verification code
          </Text>
          <TextInput
            textContentType="oneTimeCode"
            onChangeText={(text) => setSmsCode(text)}
            value={smsCode}
            secureTextEntry={false}
            style={{
              backgroundColor: colors.card,
              fontSize: 20,
              color: colors.text,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: colors.border,
              padding: 10,
            }}
          ></TextInput>

          {codeSent ? (
            <TouchableOpacity onPress={verifyCode}>
              <View
                style={{
                  margin: 20,
                  alignSelf: "center",
                  padding: 16,
                  borderRadius: 30,
                  backgroundColor: "#dc1f42",
                  width: "50%",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 15,
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  Reset Password
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={requestSMSCode}>
              <View
                style={{
                  margin: 20,
                  alignSelf: "center",
                  padding: 16,
                  borderRadius: 30,
                  backgroundColor: "#dc1f42",
                  width: "50%",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 15,
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  Send SMS Code
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </HeaderPadding>
    </>
  );
}
