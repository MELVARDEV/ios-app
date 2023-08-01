import React from "react";
import {
  View,
  ScrollView,
  Button,
  Text,
  ImageBackground,
  Image,
} from "react-native";
import { BlurView } from "expo-blur";
import { useTheme } from "@react-navigation/native";
import { useHeaderHeight } from "@react-navigation/elements";
import HeaderPadding from "../HeaderPadding";
import { styles } from "../../Styles";
import Entry from "../Entry";
import { useColorScheme } from "react-native";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

export default function AccountInfo({ user }) {
  const colorScheme = useColorScheme();
  const { colors } = useTheme();
  const scheme = useColorScheme();

  function getRankString(user) {
    let rank = "User";
    let color = colors.text;
    if (user.vip) {
      rank = "Vip";
      color = "#e35f1e";
    }
    if (user.elite) {
      rank = "Elite";
      color = "#db07c3";
    }
    if (user.support) {
      rank = "Support";
      color = "#0e8c73";
    }
    if (user.admin) {
      rank = "Admin";
      color = "#cc1a02";
    }

    return { rank: rank, color: color };
  }

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
            <View style={{ flex: 1, padding: 20, paddingBottom: 120 }}>
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
                  uri: user.avatar.url,
                }}
              />
              <Entry left="Name" right={user.name} />
              <Entry
                left="Rank"
                right={getRankString(user).rank}
                color={getRankString(user).color}
              />
              <Entry left="Email" right={user.email} />
              <Entry left="Phone Number" right={user.phoneNumber} />
              {user.discordTag && (
                <Entry left="Discord Username" right={user.discordTag} />
              )}
              <Entry left="Exory Coins" right={user.exoryCoins} />
            </View>
          </HeaderPadding>
        </BlurView>

        <Image
          style={{ width: "100%", height: "100%", zIndex: 1, opacity: 0.5 }}
          resizeMode="cover"
          source={{
            uri: user.bgImg.url,
          }}
        ></Image>
      </View>
    </>
  );
}
