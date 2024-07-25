import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import Colors from '../../constants/Colors';

export default function Loader(props: { loadingText?: string, containerStyle?: any }) {
    const { loadingText, containerStyle } = props;

    return (
        <View
            style={[{
                flex: 1,
                justifyContent: "center",
                padding: 10,
                backgroundColor: '#fff'
            }, containerStyle]}
        >
            <View>
                <ActivityIndicator size="large" color={Colors.appPrimaryColor} />
                <Text style={{ textAlign: "center", color: '#000' }}>
                    {loadingText ?? "Loading...."}
                </Text>
            </View>
        </View>
    )
}
