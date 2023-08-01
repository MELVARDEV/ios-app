import React from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { useTheme } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderPadding from "../HeaderPadding";
import { useColorScheme } from "react-native";
import { BlurView } from "expo-blur";
import Entry from "../Entry";

export default function UserEdit({ route, user, navigation, getUsers }) {
  const colorScheme = useColorScheme();
  const { colors } = useTheme();
  const { currentUser } = route.params;

  function getRankString(user) {
    let rank = "User";
    let color = colors.text;
    if (user.vip) {
      rank = "VIP";
      color = "#e35f1e";
    }
    if (user.elite) {
      rank = "ELITE";
      color = "#db07c3";
    }
    if (user.support) {
      rank = "SUPPORT";
      color = "#0e8c73";
    }
    if (user.admin) {
      rank = "ADMIN";
      color = "#cc1a02";
    }

    return { rank: rank, color: color };
  }

  let deleteUser = async () => {
    Alert.alert(
      "Delete account",
      "Do you really want to delete this account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            const requestOptions = {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${await AsyncStorage.getItem(
                  "auth-token"
                )}`,
              },
            };

            return fetch(
              `https://api-v2.exory.dev/user/${currentUser._id}`,
              requestOptions
            )
              .then(async (userResponse) => {
                // TODO: USER DELETED ACTION
                if (userResponse.status === 200) {
                  await getUsers();
                  navigation.goBack();
                  Alert.alert(
                    "User deleted.",
                    `User deletion completed successfully.`,
                    [{ text: "Ok", style: "default" }]
                  );
                }
              })
              .catch((error) => {
                console.log(error);
              });
          },
        },
      ]
    );
  };

  return (
    <>
      <View style={{ height: "100%" }}>
        <BlurView
          style={{
            zIndex: 5,
            height: "100%",
            width: "100%",
            position: "absolute",
          }}
          intensity={100}
          tint={colorScheme}
        >
          <HeaderPadding>
            <View style={{ padding: 20 }}>
              <Image
                style={{
                  alignSelf: "center",
                  marginBottom: 20,
                  marginTop: 25,
                  width: 150,
                  height: 150,

                  borderRadius: 20,
                }}
                resizeMode={"contain"}
                source={{
                  uri: currentUser.avatar.url,
                }}
              />
              <Entry left="Name" right={currentUser.name} />
              <Entry
                left="Rank"
                right={getRankString(currentUser).rank}
                color={getRankString(currentUser).color}
              />
              <Entry left="Email" right={currentUser.email} />
              <Entry
                left="Phone Number"
                right={currentUser.phoneNumber.slice(0, -3) + "***"}
              />
              {!!currentUser.discordTag && (
                <Entry left="Discord" right={currentUser.discordTag} />
              )}
              <Entry left="Exory Coins" right={currentUser.exoryCoins} />
              <TouchableOpacity onPress={deleteUser}>
                <View
                  style={{
                    backgroundColor: "crimson",
                    padding: 12,
                    alignSelf: "center",
                    borderRadius: 20,
                    opacity: 0.8,
                    paddingHorizontal: 20,
                    margin: 20,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 18,
                      fontWeight: "400",
                    }}
                  >
                    Delete User
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </HeaderPadding>
        </BlurView>

        <Image
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: 1,
            opacity: 0.7,
          }}
          resizeMode="cover"
          source={{
            uri: currentUser.bgImg.url,
          }}
        ></Image>
      </View>
    </>
  );
}
