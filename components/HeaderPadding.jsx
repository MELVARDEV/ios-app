import React from 'react'
import { View, ScrollView, Text } from 'react-native'
import { useHeaderHeight } from '@react-navigation/elements';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';


export default function HeaderPadding({ children }) {

    const headerHeight = useHeaderHeight();
    
    return (
        <ScrollView style={{flex: 1, paddingTop: headerHeight}}>
            {children}
        </ScrollView>
    )
}
