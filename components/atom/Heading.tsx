import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export interface HeadingProps {
    children?: any,
    style?: any,
    overrideProps?: any
}
export default function Heading(props: HeadingProps) {
    const { children, style, overrideProps } = props;
    return (
        <Text style={[styles.text, style]} {...overrideProps}>
            {children}

        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 32,
        color: "black",

    },
});
