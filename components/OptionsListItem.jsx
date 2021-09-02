import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useTheme } from "@react-navigation/native";


export default function OptionsListItem({ text, icon, onPress, circle }) {
    const { colors } = useTheme();

    function action() {
        console.log(text)
    }

    return (

        <TouchableOpacity onPress={onPress} style={
            {
                backgroundColor: colors.card,
                width: '90%',
                alignSelf: 'center',
                borderWidth: 0,
                borderColor: colors.border,

                marginBottom: 15,
                padding: 12,
                paddingHorizontal: 20,
                flexDirection: 'row',
                justifyContent: 'left',
                borderRadius: 10
            }
        } >
            <View style={{}}>
                <Image
                    style={{ height: 25, width: 25, marginRight: 20, borderRadius: circle ? 100 : 0, }}
                    source={icon}

                />
            </View>

            <View style={{ justifyContent: 'center' }}>
                <Text style={{ color: colors.text, fontSize: 16, fontWeight: "500", textAlignVertical: 'center' }}>{text}</Text>
            </View>
        </TouchableOpacity>


    )
}