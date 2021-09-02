import React from 'react';
import { View, Text } from 'react-native';
import { AppearanceProvider } from "react-native-appearance";
import { useTheme } from "@react-navigation/native";


export default function ChangePassword({  }) {
    const {colors} = useTheme()

    return (
        <AppearanceProvider>
            <View>
                <Text style={{ color: colors.text }}>Change PAsssword</Text>
            </View>
        </AppearanceProvider>

    )
}
