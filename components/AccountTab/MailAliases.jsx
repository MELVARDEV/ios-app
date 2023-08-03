import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Alert,
  Button,
  Clipboard,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import styles from "../../Styles";
import HeaderPadding from "../HeaderPadding";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OptionsListItem from "../OptionsListItem";
import * as Progress from "react-native-progress";

export default function MailAliases({ user }) {
  const { colors } = useTheme();
  const [aliases, setAliases] = useState();

  async function removeAlias(id) {
    console.log(id);
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("auth-token")}`,
      },
    };

    fetch(
      `https://api-v2.exory.dev/mail/removeAlias?aliasID=${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then(async (res) => {
        Alert.alert("Message.", res.message, [
          { text: "Ok", style: "default" },
        ]);
        getAliases();
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Alert.", error, [{ text: "Ok", style: "default" }]);
      });
  }

  async function getAliases() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("auth-token")}`,
      },
    };

    fetch(`https://api-v2.exory.dev/mail/getAliases`, requestOptions)
      .then((response) => response.json())
      .then(async (aliases) => {
        setAliases(aliases);
        //console.log(aliases);
      })
      .catch((error) => {
        Alert.alert("Alert.", error, [{ text: "Ok", style: "default" }]);
      });
  }

  useEffect(() => {
    getAliases();
  }, []);

  return (
    <HeaderPadding>
      <View style={{ padding: 20, paddingBottom: 180 }}>
        {aliases && (
          <View>
            <Button
              onPress={async () => {
                Alert.prompt(
                  "New alias",
                  'Please enter new alias name (e.g. "mynewalias")',
                  async (result) => {
                    const requestOptions = {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${await AsyncStorage.getItem(
                          "auth-token"
                        )}`,
                      },
                    };
                    fetch(
                      `https://api-v2.exory.dev/mail/addAlias?aliasName=${result}`,
                      requestOptions
                    )
                      .then((response) => response.json())
                      .then(async (response) => {
                        Alert.alert("Message", response.message);
                        getAliases();
                      })
                      .catch((error) => {
                        Alert.alert("Alert.", error, [
                          { text: "Ok", style: "default" },
                        ]);
                      });
                  }
                );
              }}
              title={"Create new alias"}
            />
            <Progress.Bar
              progress={1}
              width={null}
              height={10}
              borderColor={"rgba(30,60,100,0.8)"}
              borderWidth={3}
              style={{
                alignSelf: "center",
                width: "75%",
                marginBottom: 15,
                marginTop: 10,
              }}
            />
            <Text
              style={{
                color: colors.text,
                marginTop: -4,
                alignSelf: "center",
                fontWeight: "500",
                marginBottom: 30,
                fontSize: 15,
              }}
            >
              {`You currently have 0/0 alias slots available.`}
            </Text>
            {aliases &&
              aliases.map((alias) => (
                <OptionsListItem
                  key={alias.Source}
                  onPress={() => {
                    Alert.alert(
                      "Remove",
                      "Are you sure that you want to delete this alias?",
                      [
                        {
                          text: "No",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel",
                        },
                        {
                          text: "Delete",
                          onPress: async () => {
                            await removeAlias(alias.ID);
                          },
                          style: "destructive",
                        },
                      ]
                    );
                  }}
                  onLongPress={() => {
                    Clipboard.setString(alias.Source);
                    this.toast.show("Email address copied to clipboard.");
                  }}
                  icon={require("../../assets/email.png")}
                  circle
                  text={alias.Source}
                />
              ))}
          </View>
        )}
      </View>
    </HeaderPadding>
  );
}
