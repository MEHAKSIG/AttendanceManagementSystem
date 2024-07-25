import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function EmptyListMessage(props: { text?: string }) {
    const { text } = props;

    return (
        <View style={styles.container}>
            <Text style={styles.emptyListStyle}>
                {text != null ? text : "No Data Found"}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // textAlign: 'center',
        // textAlignVertical: 'center'
    },
    emptyListStyle: {
        // flex:1,
        padding: 10,
        fontSize: 18,
        textAlign: "center",
        // textAlignVertical: 'center'
        // fontWeight:'bold'
    },
});


