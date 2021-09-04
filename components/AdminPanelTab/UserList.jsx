import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, ActivityIndicator, TextInput } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import OptionsListItem from '../OptionsListItem';
import { useTheme } from "@react-navigation/native";


export default function UserList({ user, navigation, users, getUsers }) {
    const { colors } = useTheme();
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredUsers, setFilteredUsers] = useState(users)




    // useEffect(() => {
    //     getUsers()
    // }, [])


    // handle response != 200 and display message
    let handleResponse = (response) => {
        return response.text().then((text) => {
            if (!response.ok) {
                if (response.status === 401) {
                }

                const error = text || response.statusText;
                return Promise.reject(error);
            }
            return text;
        });
    };

    let updateQuery = async (text) => {
        let usersArray = []

        users.forEach(user => {
            if (user.name.toLowerCase().includes(text.toLowerCase())) {
                usersArray.push(user)
            }
        });
        setFilteredUsers(usersArray)
    }

    return (
        <ScrollView style={{}}>
            <View style={{ paddingVertical: 20 }}>
                <TextInput onChangeText={(text) => {
                    updateQuery(text)
                    setSearchQuery(text)
                }}
                    value={searchQuery} placeholder="Search..." style={{ backgroundColor: colors.card, color: colors.text, padding: 14, width: "90%", alignSelf: 'center', marginBottom: 20, borderRadius: 8 }} />
                {filteredUsers ? filteredUsers.map((user =>
                    <View key={user._id}>
                        <OptionsListItem onPress={()=> {
                            navigation.navigate("userEdit", {currentUser: user})
                        }} icon={{ uri: user && user.avatar.url }} circle text={user.name} />
                    </View>)) : <ActivityIndicator style={{ alignSelf: 'center', flex: 1 }} size="large" />}
            </View>

        </ScrollView>
    )
}
