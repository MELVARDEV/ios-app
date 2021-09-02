import React from "react";
import { SafeAreaView, StyleSheet, Text, View, StatusBar } from "react-native";
import {
    NavigationContainer,
    DarkTheme,
    DefaultTheme,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./Home";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import Ionicons from "react-native-vector-icons/Ionicons";
import Account from "./AccountTab/Account";
import ChangePassword from "./AccountTab/ChangePassword";
import ConnectDiscord from "./AccountTab/ConnectDiscord";

const Tab = createBottomTabNavigator();

export default function Navigator({ setIsLoggedIn, user }) {
    const scheme = useColorScheme();

    const AccountStack = createNativeStackNavigator();

    function AccountStackScreen() {
        return (
            <AccountStack.Navigator>
                <AccountStack.Screen options={{title:'Account'}} name="account">
                    {props => <Account {...props} setIsLoggedIn={setIsLoggedIn} user={user} />}
                </AccountStack.Screen>
                <AccountStack.Screen options={{title: 'Change Password'}} name="changePassword">
                    {props => <ChangePassword {...props} setIsLoggedIn={setIsLoggedIn} user={user} />}
                </AccountStack.Screen>            
                <AccountStack.Screen options={{title: 'Connect Discord'}} name="connectDiscord">
                    {props => <ConnectDiscord {...props} user={user} />}
                </AccountStack.Screen>     
            </AccountStack.Navigator>
        );
    }


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
                        options={{ headerShown: false}}
                        children={() => (
                            <AccountStackScreen setIsLoggedIn={setIsLoggedIn} user={user} />
                        )}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </AppearanceProvider>
    );
}
