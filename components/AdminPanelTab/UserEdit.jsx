import React from "react";
import { View, Text, Image } from "react-native";
import { useTheme } from "@react-navigation/native";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";

export default function UserEdit({ route, user }) {
    const { colors } = useTheme();
    const { currentUser } = route.params;

    return (
        <AppearanceProvider>
            <View style={{ padding: 20 }}>
                <View
                    style={{
                        backgroundColor: colors.card,
                        width: "90%",
                        borderColor:colors.border,
                        borderWidth:1,
                        borderRadius:8,
                        alignSelf: "center",
                        padding: 15,
                        justifyContent: "center",
                        flexDirection: "row",
                    }}
                >
                    <View style={{flex:1}}>
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
                        <Text style={{ color: colors.text, fontSize: 28, fontWeight:'500' }}>
                            {currentUser && currentUser.name}
                        </Text>
                    </View>
                </View>
            </View>
        </AppearanceProvider>
    );
}
