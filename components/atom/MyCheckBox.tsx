import React from 'react'
import { View, Text } from 'react-native'
import { CheckBox, Icon } from 'react-native-elements';

export interface MyCheckboxProps {
    title?: string,
    val: boolean,
    setVal: any,
    onPress?: (isChecked: boolean) => void,
    center?: boolean,
    checkedColor?: string,
    checkedIcon?: any,
    checkedTitle?: string,
    iconRight?: boolean,
    right?: boolean
}

export default function MyCheckBox(props: MyCheckboxProps) {
    const { title, val, setVal, onPress, center, checkedColor, checkedIcon, checkedTitle, iconRight, right } = props;
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
            checkedTitle={checkedTitle}
            iconRight={iconRight}
            right={right}
            containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
        />
    )
}
