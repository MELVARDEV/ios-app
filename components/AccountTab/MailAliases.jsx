import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, Alert, Button, Clipboard } from 'react-native';
import { useTheme } from '@react-navigation/native';
import styles from '../../Styles';
import HeaderPadding from '../HeaderPadding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OptionsListItem from '../OptionsListItem';
import * as Progress from 'react-native-progress';


export default function MailAliases({ user }) {
  const { colors } = useTheme();
  const [aliases, setAliases] = useState();

  async function removeAlias(id) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': await AsyncStorage.getItem('auth-token')
      }
    };

    fetch(`https://api.exory.dev/api/user/removeAlias/${id}`, requestOptions)
      .then((response) => response.text())
      .then(async (text) => {
        Alert.alert("Message.", text, [
          { text: "Ok", style: "default" },
        ]);
        getAliases()
      })
      .catch((error) => {
        Alert.alert('Alert.', error, [{ text: 'Ok', style: 'default' }]);
      });
  }

  async function getAliases() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': await AsyncStorage.getItem('auth-token')
      }
    };

    fetch(`https://api.exory.dev/api/user/getAliases`, requestOptions)
      .then((response) => response.json())
      .then(async (aliases) => {
        setAliases(aliases);
        console.log(aliases);
      })
      .catch((error) => {
        Alert.alert('Alert.', error, [{ text: 'Ok', style: 'default' }]);
      });
  }

  useEffect(() => {
    getAliases();
  }, []);

  return (
    <HeaderPadding>
      <View style={{ padding: 20, paddingBottom: 180 }}>
        {aliases && (
          <View>
            <Button onPress={async () => {
              Alert.prompt('New alias', 'Please enter new alias name (e.g. "mynewalias")', (async result => {
                const requestOptions = {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'auth-token': await AsyncStorage.getItem('auth-token')
                  }
                };
                fetch(`https://api.exory.dev/api/user/addAlias/${result}`, requestOptions)
                  .then((response) => response.text())
                  .then(async (response) => {
                    Alert.alert("Message", response)
                    getAliases()
                  })
                  .catch((error) => {
                    Alert.alert('Alert.', error, [{ text: 'Ok', style: 'default' }]);
                  });
              }))
            }}
            title={'Create new alias'} />
            <Progress.Bar
              progress={aliases.amount / aliases.limit}
              width={null}
              height={10}
              borderColor={'rgba(30,60,100,0.8)'}
              borderWidth={3}
              style={{
                alignSelf: 'center',
                width: '75%',
                marginBottom: 15,
                marginTop: 10
              }}
            />
            <Text
              style={{
                color: colors.text,
                marginTop: -4,
                alignSelf: 'center',
                fontWeight: '500',
                marginBottom: 30,
                fontSize: 15
              }}
            >
              {`You currently have ${aliases.limit - aliases.amount} alias slots available.`}
            </Text>
            {aliases &&
              aliases.aliases.map((alias) => (
                <OptionsListItem
                  key={alias.source}
                  onPress={() => {
                    Alert.alert("Remove", "Are you sure that you want to delete this alias?", [
                      {
                        text: "No",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                      },
                      {
                        text: "Delete",
                        onPress: async () => {
                          await removeAlias(alias.id)
                        },
                        style: "destructive",
                      },
                    ]);
                  }}
                  onLongPress={() => {
                    Clipboard.setString(alias.source)
                    this.toast.show('Email address copied to clipboard.');
                  }} 
                  icon={require('../../assets/email.png')}
                  circle
                  text={alias.source}
                />
              ))}
          </View>
        )}
      </View>
    </HeaderPadding>
  );
}
