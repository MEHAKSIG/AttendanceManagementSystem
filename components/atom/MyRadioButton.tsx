import React from 'react'
import { View, Text, StyleProp, ViewStyle } from 'react-native'
import { CheckBox, Icon } from 'react-native-elements';

export interface MyRadioButtonProps {
    title?: string | undefined,
    val: boolean,
    setVal?: any,
    onPress?: (isChecked: boolean) => void,
    center?: boolean,
    checkedColor?: string,
    checkedIcon?: string | React.ReactElement<{}>,
    uncheckedIcon?: string | React.ReactElement<{}>,
    checkedTitle?: string,
    iconRight?: boolean,
    right?: boolean,
    containerStyle?: StyleProp<ViewStyle>;
}

export default function MyRadioButton(props: MyRadioButtonProps) {
    const { title, val, setVal, onPress, center, checkedColor, checkedIcon, uncheckedIcon, checkedTitle, iconRight, right, containerStyle } = props;
    return (
        <CheckBox
            center={center}
            title={title}
            checked={val}
            onPress={() => {
                setVal && setVal(!val)
                onPress && onPress(!val);
            }}
            checkedColor={checkedColor}
            checkedIcon={checkedIcon}
            uncheckedIcon={uncheckedIcon}
            checkedTitle={checkedTitle}
            iconRight={iconRight}
            right={right}
            containerStyle={[{ borderWidth: 0, marginRight: 80 }, containerStyle]}
        />
    )
}
