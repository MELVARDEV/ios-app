import React from "react";
import { SafeAreaView, StyleSheet, Text, View, StatusBar } from "react-native";
import {
    NavigationContainer,
    DarkTheme,
    DefaultTheme,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import Ionicons from "react-native-vector-icons/Ionicons";
import Account from "./Account";

const Tab = createBottomTabNavigator();

export default function Navigator({ setIsLoggedIn, user }) {
    const scheme = useColorScheme();

    return (
        <AppearanceProvider>
            <StatusBar
                barStyle={scheme === "light" ? "dark-content" : "light-content"}
            />
            <NavigationContainer
                theme={scheme === "dark" ? DarkTheme : DefaultTheme}
            >
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === "Home") {
                                iconName = focused
                                    ? "ios-home"
                                    : "ios-home-outline";
                            } else if (route.name === "Account") {
                                iconName = focused
                                    ? "ios-person"
                                    : "ios-person-outline";
                            }
                            return (
                                <Ionicons
                                    name={iconName}
                                    size={size}
                                    color={color}
                                />
                            );
                        },
                        tabBarActiveTintColor: "tomato",
                        tabBarInactiveTintColor: "gray",
                    })}
                >
                    <Tab.Screen name="Home" component={Home} />
                    <Tab.Screen
                        name="Account"
                        children={() => (
                            <Account setIsLoggedIn={setIsLoggedIn} user={user} />
                        )}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </AppearanceProvider>
    );
}
