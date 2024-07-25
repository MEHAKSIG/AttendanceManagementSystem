import React from 'react'
import { View, Text, StyleSheet, ViewStyle } from 'react-native'
import { Button } from 'react-native-elements';
import Colors from '../../constants/Colors';

export interface MyButtonProps {
    text: string,
    type?: 'outline' | 'clear' | 'solid',
    loading?: boolean,
    buttonStyle?: ViewStyle,
    containerStyle?: ViewStyle,
    onPress?: (event: any) => void,
    disabled?: boolean
}
export default function MyButton(props: MyButtonProps) {
    const { text, type, loading, buttonStyle, containerStyle, disabled, onPress } = props;

    return (
        <Button
            onPress={onPress}
            containerStyle={[styles.containerStyle, containerStyle]}
            buttonStyle={[styles.buttonStyle, buttonStyle]}
            type={type ?? 'solid'}
            title={text}
            titleStyle={{ padding: 0, margin: 0 }}
            loading={loading}
            disabled={disabled}
        />
    )
}
const styles = StyleSheet.create({
    buttonStyle: {
        paddingVertical: 15,
        // backgroundColor: Colors.appPrimaryColor

    },
    containerStyle: {
        width: '100%',
    }
})