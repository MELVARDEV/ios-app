import React from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { useTheme } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";

export default function UserEdit({ route, user, navigation, getUsers }) {
    const { colors } = useTheme();
    const { currentUser } = route.params;

    function getRankString(user){

        let rank = "User";
        let color = colors.text
        if(user.vip) {rank = "VIP"; color= "#e35f1e"}
        if(user.elite) {rank = "ELITE"; color = "#db07c3"}
        if(user.support) {rank = "SUPPORT"; color = "#0e8c73"}
        if(user.admin) {rank = "ADMIN"; color = '#cc1a02'}
      
        return {rank: rank, color: color}
      }
      

    let deleteUser = async () => {
        Alert.alert(
            "Delete account",
            "Do you really want to delete this account?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Remove",
                    style: "destructive",
                    onPress: async () => {
                        const requestOptions = {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "auth-token": await AsyncStorage.getItem(
                                    "auth-token"
                                ),
                            },
                            body: JSON.stringify({
                                _id: currentUser._id,
                                
                            }),
                        };

                        return fetch(
                            `https://api.exory.dev/api/user/remove`,
                            requestOptions
                        )
                            .then(async (userResponse) => {
                                // TODO: USER DELETED ACTION
                                if(userResponse.status === 200) {
                                    await getUsers()
                                    navigation.goBack()
                                    Alert.alert(
                                        "User deleted.",
                                        `User deletion completed successfully.`, [{ text: "Ok", style: "default" },]
                                    );
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    },
                },
            ]
        );
    };

    return (
        <AppearanceProvider>
            <View style={{ padding: 20 }}>
                <View
                    style={{
                        backgroundColor: colors.card,
                        width: "90%",
                        borderColor: colors.border,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignSelf: "center",
                        padding: 15,
                        justifyContent: "center",
                        flexDirection: "row",
                    }}
                >
                    <View style={{ flex: 1 }}>
                        <Image
                            style={{
                                width: 70,
                                height: 70,
                                borderRadius: 100,
                                alignSelf: "center",
                                marginBottom: 5,
                            }}
                            source={{
                                uri: currentUser && currentUser.avatar.url,
                            }}
                        />
                    </View>

                    <View style={{ justifyContent: "center", flex: 1.5 }}>
                        <Text
                            style={{
                                color: colors.text,
                                fontSize: 28,
                                fontWeight: "500",
                            }}
                        >
                            {currentUser && currentUser.name}
                        </Text>
                        <Text style={{color: getRankString(currentUser).color}}>
                            {getRankString(currentUser).rank}
                        </Text>
                    </View>
                </View>

                <TouchableOpacity onPress={deleteUser}>
                    <View
                        style={{
                            backgroundColor: "crimson",
                            padding: 12,
                            alignSelf: "center",
                            borderRadius: 20,
                            paddingHorizontal: 20,
                            margin: 20,
                        }}
                    >
                        <Text
                            style={{
                                color: "white",
                                fontSize: 18,
                                fontWeight: "400",
                            }}
                        >
                            Delete User
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </AppearanceProvider>
    );
}
