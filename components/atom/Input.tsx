import React from 'react'
import { View, Text, StyleSheet, TextInput, TextInput as DefaultTextInput } from 'react-native'
import Colors from '../../constants/Colors';
import Config from '../../constants/Config';

export interface BaseInputProps {
    // style: React.CSSProperties,
    // style?: any,
    value?: string,
    placeholder?: string,
    placeholderTextColor?: string,
    onChangeText?: (value: string) => void,
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void,
    iconLeft?: React.ReactElement,
    iconRight?: React.ReactElement,
    overrideProps?: any,
    isPasswordField?: boolean,
    keyboardType?: 'text' | 'numeric',
    multiline?: boolean,
    editable?: boolean
}
export type InputProps = BaseInputProps & DefaultTextInput['props'];

export default function Input(props: InputProps) {
    const { style, iconLeft, iconRight, overrideProps, value, placeholder, placeholderTextColor, onChangeText, onBlur, isPasswordField, keyboardType, multiline, editable } = props;

    const IconLeft = (): React.ReactElement => {
        return iconLeft ?? <></>;
    };
    const IconRight = (): React.ReactElement => {
        return iconRight ?? <></>;
    };

    // const IconRight = () => {
    //     return iconRight ? iconRight : null;
    // };

    return (
        <View style={[styles.inputContainer, style]}>

            {IconLeft && <IconLeft />}

            <TextInput
                editable={editable}
                keyboardType={keyboardType}
                multiline={multiline}
                value={value}
                placeholder={placeholder}
                onChangeText={onChangeText}
                onBlur={onBlur}
                style={[styles.input]}
                placeholderTextColor={placeholderTextColor ?? "darkgray"}
                {...overrideProps}
                secureTextEntry={isPasswordField}
            />
            <IconRight />
        </View>
    )
}


const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        // backgroundColor: '#e8e8e8',
        borderColor: Colors.appPrimaryColor,
        // height: 60,
        borderWidth: 1,
        width: "100%",
        padding: 15,
        borderRadius: 5,
        color: "black",
    },
    input: {
        flex: 1,
        marginLeft: 5,
    },
});
