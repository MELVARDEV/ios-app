import React from "react";
import { SafeAreaView, StyleSheet, Text, View, StatusBar } from "react-native";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import Ionicons from "react-native-vector-icons/Ionicons";
import Account from "./AccountTab/Account";
import ChangePassword from "./AccountTab/ChangePassword";
import ConnectDiscord from "./AccountTab/ManageDiscord";
import AccountInfo from "./AccountTab/AccountInfo";
import AdminPanel from "./AdminPanelTab/AdminPanel";
import UserList from "./AdminPanelTab/UserList";
import UserEdit from "./AdminPanelTab/UserEdit";
import MailAliases from "./AccountTab/MailAliases";
import { BlurView } from "expo-blur";
import { Appearance, useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { styles } from "../Styles";
import { HeaderStyleInterpolators } from "@react-navigation/stack";
import HeaderPadding from "./HeaderPadding";

const Tab = createBottomTabNavigator();

export default function Navigator({
  setIsLoggedIn,
  user,
  users,
  filteredUsers,
  setFilteredUsers,
  setUsers,
  getUsers,
}) {
  const AccountStack = createNativeStackNavigator();
  const colorScheme = useColorScheme();
  function AccountStackScreen() {
    return (
      <AccountStack.Navigator
        screenOptions={{
          headerTransparent: true,
          headerBlurEffect: "systemUltraThinMaterial",
        }}
      >
        <AccountStack.Screen options={{ title: "Account" }} name="account">
          {(props) => (
            <Account {...props} setIsLoggedIn={setIsLoggedIn} user={user} />
          )}
        </AccountStack.Screen>
        <AccountStack.Screen
          options={{ title: "Change Password" }}
          name="changePassword"
        >
          {(props) => (
            <ChangePassword
              {...props}
              setIsLoggedIn={setIsLoggedIn}
              user={user}
            />
          )}
        </AccountStack.Screen>
        <AccountStack.Screen
          options={{ title: "Manage Discord" }}
          name="manageDiscord"
        >
          {(props) => <ConnectDiscord {...props} user={user} />}
        </AccountStack.Screen>
        <AccountStack.Screen
          options={{ title: "E-Mail Aliases" }}
          name="mailAliases"
        >
          {(props) => <MailAliases {...props} user={user} />}
        </AccountStack.Screen>
        <AccountStack.Screen
          options={{ title: "Account Info" }}
          name="accountInfo"
        >
          {(props) => <AccountInfo {...props} user={user} />}
        </AccountStack.Screen>
      </AccountStack.Navigator>
    );
  }

  const AdminStack = createNativeStackNavigator();

  function AdminStackScreen() {
    return (
      <AdminStack.Navigator
        screenOptions={{
          headerTransparent: true,
          intensity: 100,
          headerBlurEffect: "systemUltraThinMaterial",
        }}
      >
        <AdminStack.Screen options={{ title: "Admin" }} name="admin">
          {(props) => (
            <AdminPanel {...props} setIsLoggedIn={setIsLoggedIn} user={user} />
          )}
        </AdminStack.Screen>
        <AdminStack.Screen options={{ title: "User List" }} name="userList">
          {(props) => (
            <UserList
              {...props}
              setIsLoggedIn={setIsLoggedIn}
              user={user}
              users={users}
              getUsers={getUsers}
            />
          )}
        </AdminStack.Screen>
        <AdminStack.Screen options={{ title: "Edit User" }} name="userEdit">
          {(props) => (
            <UserEdit
              {...props}
              setIsLoggedIn={setIsLoggedIn}
              getUsers={getUsers}
              user={user}
            />
          )}
        </AdminStack.Screen>
      </AdminStack.Navigator>
    );
  }

  return (
    <>
      <StatusBar />
      <NavigationContainer
        theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      >
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarStyle: { position: "absolute" },
            tabBarBackground: () => (
              <BlurView
                intensity={100}
                tint={colorScheme}
                style={StyleSheet.absoluteFill}
              />
            ),
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused ? "ios-home" : "ios-home-outline";
              } else if (route.name === "Account") {
                iconName = focused ? "ios-person" : "ios-person-outline";
              } else if (route.name === "Admin") {
                iconName = focused ? "ios-hammer" : "ios-hammer-outline";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen
            name="Home"
            options={{
              headerShown: false,

              headerStyleInterpolator: HeaderStyleInterpolators.forFade,
            }}
            component={Home}
          />
          {user && user.admin && (
            <Tab.Screen
              name="Admin"
              options={{ headerShown: false }}
              children={() => (
                <AdminStackScreen setIsLoggedIn={setIsLoggedIn} user={user} />
              )}
            />
          )}
          <Tab.Screen
            name="Account"
            options={{ headerShown: false }}
            children={() => (
              <AccountStackScreen setIsLoggedIn={setIsLoggedIn} user={user} />
            )}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
