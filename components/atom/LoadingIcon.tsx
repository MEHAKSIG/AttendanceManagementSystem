import React from 'react'
import { View, Text, ActivityIndicator, StyleProp, ViewStyle, TextStyle } from 'react-native'
import Colors from '../../constants/Colors';

export interface LoadingIconProps {
    size?: 'large' | 'small' | undefined,
    color?: string,
    style?: StyleProp<ViewStyle>
}
export default function LoadingIcon(props: LoadingIconProps) {
    const { size = 'large', style, color = Colors.appPrimaryColor } = props;
    return (
        <ActivityIndicator style={style} size={size} color={color} />
    )
}
