import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import { styles } from "../Styles";

import { useTheme } from "@react-navigation/native";

export default function Home() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.view, {}]}>
      <View style={{ padding: 20 }}>
        <Text style={{ color: colors.text }}>Home Page</Text>
      </View>
    </SafeAreaView>
  );
}
