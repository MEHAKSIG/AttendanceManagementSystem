import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function ErrorMsg(props: { error?: string }) {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props?.error}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
    },
    text: {
        color: "red",
        fontWeight: "bold",
    },
});
