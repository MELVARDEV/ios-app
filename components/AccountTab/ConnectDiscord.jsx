import React from 'react'
import { View, Text } from 'react-native'
import { useTheme } from "@react-navigation/native";


export default function ConnectDiscord() {
    const {colors} = useTheme()

    return (
        <View>
            <Text style={{color:colors.text}}>Connect discord</Text>
        </View>
    )
}
