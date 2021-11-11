import React from 'react'
import { View, Text } from 'react-native'
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import { useTheme } from "@react-navigation/native";


export default function Entry({left, right, color}) {
    const { colors } = useTheme();
    const scheme = useColorScheme();


    return (

            <View
              style={{
                backgroundColor: colors.card,
                width: "100%",
                alignSelf: "center",
                borderWidth: 0,
                borderColor: colors.border,
                marginBottom: 12,
                padding: 14,
                paddingHorizontal: 30,
                flexDirection: "row",
                justifyContent: "space-between",
                borderRadius: 10,
                flex: 1,
                opacity: 0.65,
              }}
            >
              <Text
                style={{
                  color: colors.text,
                  fontSize: 16,
                  fontWeight: "500",
                  textAlignVertical: "center",
                  alignSelf: "flex-start",
                }}
              >
                {left ? left : "None"}
              </Text>
              <Text
                style={{
                  color: !color ? colors.text : color,
                  fontSize: 16,
                  opacity: 0.6,
                  fontWeight: "500",
                  textAlignVertical: "center",
                  alignSelf: "flex-end",
                }}
              >
                {right ? right : "None"}
              </Text>
            </View>
    )
}
