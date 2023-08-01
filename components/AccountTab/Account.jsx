import React, { useEffect } from "react";
import {
  Button,
  Image,
  ScrollView,
  Alert,
  FlatList,
  Text,
  Vibration,
  View,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { styles } from "../../Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderPadding from "../HeaderPadding";
import OptionsListItem from "../OptionsListItem";
import { useTheme } from "@react-navigation/native";

export default function Account({ setIsLoggedIn, user, navigation }) {
  const { colors } = useTheme();
  const headerHeight = useHeaderHeight();

  let logOut = async () => {
    Alert.alert("Log out", "Do you really want to log out?", [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Log out",
        onPress: async () => {
          await AsyncStorage.removeItem("auth-token");
          setIsLoggedIn(false);
        },
        style: "destructive",
      },
    ]);
  };

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

  return (
    <>
      <HeaderPadding>
        <View style={styles.view}>
          {/* User details cards */}
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              margin: 10,
              flexWrap: "wrap",
            }}
          >
            {/* Card 1 */}
            <View
              style={[
                {
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                },
                styles.card,
                { backgroundColor: colors.card },
              ]}
            >
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Image
                  style={styles.discordLogo}
                  source={require("../../assets/discord-logo.png")}
                />
                <Text
                  style={{
                    color: colors.text,
                    textAlign: "center",
                    marginTop: 5,
                  }}
                >
                  {user && user.discordTag ? user.discordTag : "Not connected"}
                </Text>
              </View>

              <View style={{ flex: 1, justifyContent: "center" }}>
                <Image
                  style={styles.discordLogo}
                  source={require("../../assets/email.png")}
                />
                <Text
                  style={{
                    color: colors.text,
                    textAlign: "center",
                    marginTop: 5,
                  }}
                >
                  {user && user.email}
                </Text>
              </View>
            </View>
            {/* Card 2 */}
            <View
              style={[
                { flex: 1, justifyContent: "center" },
                styles.card,
                { backgroundColor: colors.card },
              ]}
            >
              <Image
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 100,
                  alignSelf: "center",
                  marginBottom: 5,
                }}
                source={{
                  uri: user && user.avatar.url,
                }}
              />
              {user && (
                <View>
                  {getRankString(user).rank !== "User" && (
                    <Text
                      style={{
                        textAlign: "center",
                        color: getRankString(user).color,
                        marginBottom: -4,
                        marginTop: 14,
                        fontWeight: "700",
                      }}
                    >
                      {getRankString(user).rank}
                    </Text>
                  )}
                  <Text
                    style={[
                      { color: colors.text },
                      styles.header,
                      { fontSize: 26 },
                    ]}
                  >
                    {user.name}
                  </Text>
                </View>
              )}
              <Button
                style={{ alignSelf: "bottom", flex: 1 }}
                onPress={logOut}
                title="Log out"
              />
            </View>
          </View>
          <View>
            <OptionsListItem
              onPress={() => {
                navigation.navigate("changePassword");
              }}
              text="Change password"
              icon={require("../../assets/fingerprint.png")}
            />
            <OptionsListItem
              onPress={() => {
                navigation.navigate("manageDiscord");
              }}
              text="Manage Discord"
              icon={require("../../assets/discord-logo.png")}
            />
            <OptionsListItem
              onPress={() => {
                navigation.navigate("mailAliases");
              }}
              text="Manage your email aliases"
              icon={require("../../assets/email.png")}
            />
            <OptionsListItem
              onPress={() => {
                navigation.navigate("accountInfo");
              }}
              text="View account info"
              icon={require("../../assets/user-details.png")}
            />
            <OptionsListItem
              text="App settings"
              icon={require("../../assets/settings.png")}
            />
          </View>
        </View>
      </HeaderPadding>
    </>
  );
}
