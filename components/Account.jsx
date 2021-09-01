import React, { useEffect } from "react";
import {
    Button,
    SafeAreaView,
    StyleSheet,
    Image,
    Text,
    View,
} from "react-native";
import { styles } from "../Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";

export default function Account({ setIsLoggedIn, user }) {
    const { colors } = useTheme();

    let logOut = async () => {
        await AsyncStorage.removeItem("auth-token");
        setIsLoggedIn(false);
    };

    return (
        <View style={styles.view}>
            <View style={{ flex: 1, flexDirection: "row",margin: 10, flexWrap: "wrap" }}>
                <View style={[{ flex: 1,}, styles.card]}>
                    <Text style={ { color: "white", textAlign:"center", }}>
                        {user && user.discordTag}
                    </Text>
                    <Text style={ { color: "white", textAlign:"center" }}>
                        {user && user.email}
                    </Text>
                
                </View>
                <View style={[{ flex: 1 }, styles.card]}>
                    <Image
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 100,
                            alignSelf: "center",
                            marginBottom: 5,
                        }}
                        source={{
                            uri: user && user.avatar.url,
                        }}
                    />
                    {user && (
                        <Text style={[{ color: colors.text }, styles.header]}>
                            {user.name}
                        </Text>
                    )}
                    <Button
                        style={{ alignSelf: "bottom", flex: 1 }}
                        onPress={logOut}
                        title="Log out"
                    />
                </View>
            </View>
        </View>
    );
}
