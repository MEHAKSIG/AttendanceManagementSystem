import React from 'react'
import { View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native'
import GlobalStyles from '../../shared/GlobalStyles';
import MyCheckBox, { MyCheckboxProps } from '../atom/MyCheckBox';

export interface BaseFormGroupCheckBoxProps {
    label: string,
    formGroupContainerStyle?: StyleProp<ViewStyle>,
    formGroupLabelStyle?: StyleProp<TextStyle>,
}

export type FormGroupCheckBoxProps = BaseFormGroupCheckBoxProps & MyCheckboxProps;

export default function FormGroupCheckBox(props: FormGroupCheckBoxProps) {

    const { val, setVal, label, formGroupContainerStyle, formGroupLabelStyle, onPress } = props;
    return (
        <View style={[GlobalStyles.formGroupContainer, formGroupContainerStyle]}>
            {/* <Text style={[GlobalStyles.formGroupLabel, formGroupLabelStyle]}>{label}</Text> */}
            <MyCheckBox title={label} val={val} setVal={setVal} onPress={onPress} />
        </View>
    )
}
