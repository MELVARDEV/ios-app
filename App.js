import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NativeRouter, Route, Link } from "react-router-native";
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/Login'

export default function App() {
  return (
    <NativeRouter>
      <Route path={`/`} default component={Login} />
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
