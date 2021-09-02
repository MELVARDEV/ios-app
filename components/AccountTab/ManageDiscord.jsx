import React from 'react'
import { View, Text, Image } from 'react-native'
import { useTheme } from "@react-navigation/native";
import styles from '../../Styles'


export default function ManageDiscord({ user }) {
    const { colors } = useTheme()

    return (
        <View style={{ padding: 20 }}>
            <View style={{
                flexDirection: 'row',
                backgroundColor: colors.card,
                padding: 20,
                borderRadius:10,
                justifyContent: 'center', alignItems: 'center'
            }}>
                <Image
                    style={{ width: 50, height: 50, marginRight: 20 }}
                    source={require('../../assets/discord-logo.png')}
                />
                <Text style={{ color: colors.text, marginTop: -4, fontWeight: '500', fontSize: 22 }}>{user ? user.discordTag : "Not connected"}</Text>
            </View>

        </View>
    )
}
