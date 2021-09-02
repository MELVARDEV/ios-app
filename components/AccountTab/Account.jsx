import React, { useEffect } from "react";
import {
    Button,
    Image,
    ScrollView,
    Alert,
    FlatList,
    Text,
    Vibration,
    View,
} from "react-native";
import { styles } from "../Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import OptionsListItem from './OptionsListItem'

export default function Account({ setIsLoggedIn, user, navigation }) {
    const { colors } = useTheme();
    const { scheme } = useColorScheme();

    let logOut = async () => {


        Alert.alert(
            "Log out",
            "Do you really want to log out?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Log out", onPress: async () => {
                        await AsyncStorage.removeItem("auth-token");
                        setIsLoggedIn(false);
                    },

                }
            ]
        );


    };


    return (
        <AppearanceProvider>
            <ScrollView style={styles.view}>

                {/* User details cards */}
                <View style={{ flex: 1, flexDirection: "row", margin: 10, flexWrap: "wrap" }}>
                    {/* Card 1 */}
                    <View style={[{ flex: 1, flexDirection: 'column', justifyContent: 'center' }, styles.card, { backgroundColor: colors.card }]}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Image
                                style={styles.discordLogo}
                                source={require('../assets/discord-logo.png')}
                            />
                            <Text style={{ color: colors.text, textAlign: "center", marginTop: 5 }}>
                                {user && user.discordTag ? user.discordTag : "Not connected"}
                            </Text>
                        </View>

                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Image
                                style={styles.discordLogo}
                                source={require('../assets/email.png')}
                            />
                            <Text style={{ color: colors.text, textAlign: "center", marginTop: 5 }}>
                                {user && user.email}
                            </Text>
                        </View>

                    </View>
                    {/* Card 2 */}
                    <View style={[{ flex: 1, justifyContent: 'center' }, styles.card, { backgroundColor: colors.card }]}>
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
                <View>
                    <OptionsListItem onPress={() => {navigation.navigate("Change Password")}} text="Change password" icon={require('../assets/fingerprint.png')}/>
                    <OptionsListItem text="Connect discord account" icon={require('../assets/discord-logo.png')}/>
                    <OptionsListItem text="View account info" icon={require('../assets/user-details.png')}/>
                    <OptionsListItem text="App settings" icon={require('../assets/settings.png')}/>
                </View>
            </ScrollView>
        </AppearanceProvider>

    );
}
