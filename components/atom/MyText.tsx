import { View, Text, TextStyle } from 'react-native'
import React from 'react'

interface MyTextBaseProps {
    text: string,
    textFont?: 'Normal' | 'source-sans' | 'space-mono',
    bold?: boolean,
    fontSize?: number,
    color?: string,
    mb5?: boolean,
    mt5?: boolean,
    ml5?: boolean,
    mr5?: boolean,
}

export type MyTextProps = MyTextBaseProps & Text['props'];

export default function MyText(props: MyTextProps) {
    const { text, textFont, fontSize, bold, color, mb5, ml5, mr5, mt5 } = props;
    const fontFamily: TextStyle = textFont == 'Normal' ? {} : { fontFamily: textFont }
    const boldStyle: TextStyle = bold ? { fontWeight: 'bold' } : {};
    const colorStyle: TextStyle = color ? { color: color } : {};
    const mt5Style: TextStyle = mt5 ? { marginTop: 5 } : {};
    const mb5Style: TextStyle = mb5 ? { marginBottom: 5 } : {};
    const ml5Style: TextStyle = mb5 ? { marginLeft: 5 } : {};
    const mr5Style: TextStyle = mb5 ? { marginRight: 5 } : {};
    const fontSizeStyle: TextStyle = fontSize ? { fontSize: fontSize } : {};

    return (
        <Text {...props} style={[props.style, fontFamily, boldStyle, colorStyle, mt5Style, mb5Style, ml5Style, mr5Style, fontSizeStyle]}>{text}</Text>
    )
}