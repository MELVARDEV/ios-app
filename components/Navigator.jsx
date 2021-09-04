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
import ConnectDiscord from "./AccountTab/ManageDiscord";
import AdminPanel from './AdminPanelTab/AdminPanel'
import UserList from "./AdminPanelTab/UserList";
import UserEdit from "./AdminPanelTab/UserEdit";

const Tab = createBottomTabNavigator();

export default function Navigator({ setIsLoggedIn, user, users, filteredUsers, setFilteredUsers, setUsers, getUsers }) {
    const scheme = useColorScheme();

    const AccountStack = createNativeStackNavigator();

    function AccountStackScreen() {
        return (
            <AccountStack.Navigator>
                <AccountStack.Screen options={{ title: 'Account' }} name="account">
                    {props => <Account {...props} setIsLoggedIn={setIsLoggedIn} user={user} />}
                </AccountStack.Screen>
                <AccountStack.Screen options={{ title: 'Change Password' }} name="changePassword">
                    {props => <ChangePassword {...props} setIsLoggedIn={setIsLoggedIn} user={user} />}
                </AccountStack.Screen>
                <AccountStack.Screen options={{ title: 'Manage Discord' }} name="manageDiscord">
                    {props => <ConnectDiscord {...props} user={user} />}
                </AccountStack.Screen>
            </AccountStack.Navigator>
        );
    }

    const AdminStack = createNativeStackNavigator();

    function AdminStackScreen() {
        return (
            <AdminStack.Navigator>
                <AdminStack.Screen options={{ title: 'Admin' }} name="admin">
                    {props => <AdminPanel {...props} setIsLoggedIn={setIsLoggedIn} user={user} />}
                </AdminStack.Screen>
                <AdminStack.Screen options={{ title: 'User List' }} name="userList">
                    {props => <UserList {...props} setIsLoggedIn={setIsLoggedIn} user={user} users={users} getUsers={getUsers} />}
                </AdminStack.Screen>
                <AdminStack.Screen options={{ title: 'Edit User' }} name="userEdit">
                    {props => <UserEdit {...props} setIsLoggedIn={setIsLoggedIn} getUsers={getUsers} user={user} />}
                </AdminStack.Screen>
            </AdminStack.Navigator>
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
                            } else if (route.name === "Admin") {
                                iconName = focused
                                ? "ios-hammer"
                                : "ios-hammer-outline";
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
                    {user && user.admin && <Tab.Screen
                        name="Admin"
                        options={{ headerShown: false }}
                        children={() => (
                            <AdminStackScreen setIsLoggedIn={setIsLoggedIn} user={user} />
                        )}
                    />}
                    <Tab.Screen
                        name="Account"
                        options={{ headerShown: false }}
                        children={() => (
                            <AccountStackScreen setIsLoggedIn={setIsLoggedIn} user={user} />
                        )}
                    />

                </Tab.Navigator>
            </NavigationContainer>
        </AppearanceProvider>
    );
}
