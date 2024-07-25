import React from 'react'
import { View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native'
import GlobalStyles from '../../shared/GlobalStyles';
import MyCheckBox, { MyCheckboxProps } from '../atom/MyCheckBox';
import MyRadioButton, { MyRadioButtonProps } from '../atom/MyRadioButton';

export interface BaseFormGroupRadioBoxProps {
    label: string | undefined,
    formGroupContainerStyle?: StyleProp<ViewStyle>,
    formGroupLabelStyle?: StyleProp<TextStyle>,
    radioButtonContainerStyle?: StyleProp<ViewStyle>;

}

export type FormGroupRadioBoxProps = BaseFormGroupRadioBoxProps & MyRadioButtonProps;

export default function FormGroupRadioButton(props: FormGroupRadioBoxProps) {

    const { val, setVal, label, formGroupContainerStyle, formGroupLabelStyle, onPress, radioButtonContainerStyle } = props;
    return (
        <View style={[GlobalStyles.formGroupContainer, formGroupContainerStyle]}>
            {/* <Text style={[GlobalStyles.formGroupLabel, formGroupLabelStyle]}>{label}</Text> */}
            <MyRadioButton
                title={label}
                val={val}
                setVal={setVal}
                onPress={onPress}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                containerStyle={radioButtonContainerStyle}
            />
        </View>
    )
}
