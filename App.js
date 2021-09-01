import { StatusBar } from "expo-status-bar";
import React from "react";
import { NativeRouter, Route, Link } from "react-router-native";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Login from "./components/Login";
import Home from "./components/Home";
import {styles} from './Styles'

export default function App() {
  return (
    <SafeAreaView style={styles.view}>
      <NativeRouter>
        <Route path={`/`} default component={Login} />
        <Route path={`/home`} default component={Home} />
      </NativeRouter>
    </SafeAreaView>
  );
}

