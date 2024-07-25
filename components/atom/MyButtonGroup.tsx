import { View, Text, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { ButtonGroup } from 'react-native-elements'

interface MyButtonGroupProps {
    buttons: string[],
    onPress?: (selectedIndex: number) => void,
    selectedIndex?: number | null,
    containerStyle?: StyleProp<ViewStyle>,
    vertical?: boolean,
    disabled?: boolean | number[];
}

export default function MyButtonGroup(props: MyButtonGroupProps) {
    const { buttons, onPress, selectedIndex, containerStyle, vertical = false, disabled } = props;
    return (
        <ButtonGroup
            disabled={disabled}
            onPress={onPress}
            selectedIndex={selectedIndex}
            buttons={buttons}
            containerStyle={containerStyle}
            vertical={vertical}
        />
    )
}