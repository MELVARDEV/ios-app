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
import { styles } from "../../Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import OptionsListItem from "../OptionsListItem";
import { useTheme } from "@react-navigation/native";
import { Header } from "react-native/Libraries/NewAppScreen";

import HeaderPadding from "../HeaderPadding";

export default function AdminPanel({ user, navigation }) {
  const { colors } = useTheme();

  return (
    <>
      <HeaderPadding>
        <View style={[{ paddingTop: 20 }, styles.view]}>
          <OptionsListItem
            onPress={() => {
              navigation.navigate("userList");
            }}
            icon={require("../../assets/user-list.png")}
            text="List of registered users"
          />
        </View>
      </HeaderPadding>
    </>
  );
}
