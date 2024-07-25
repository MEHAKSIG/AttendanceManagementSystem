import React from 'react'
import { View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native'
import GlobalStyles from '../../shared/GlobalStyles';
import Input, { InputProps } from '../atom/Input';

export interface BaseFormGropProps {
    label: string,
    val: string | undefined,
    setVal: any,
    required?: boolean,
    formGroupContainerStyle?: StyleProp<ViewStyle>,
    formGroupLabelStyle?: StyleProp<TextStyle>,
}
export type FormGropProps = InputProps & BaseFormGropProps;

export default function FormGroup(props: FormGropProps) {
    const { required, label, val, setVal, placeholder, keyboardType, formGroupLabelStyle, formGroupContainerStyle } = props;
    return (
        <View style={[GlobalStyles.formGroupContainer, formGroupContainerStyle]}>
            <Text style={[GlobalStyles.formGroupLabel, formGroupLabelStyle]}>{label}
                {required && <Text style={GlobalStyles.requiredAsterisk}>*</Text>}
            </Text>
            <Input value={val} onChangeText={text => setVal(text)}
                style={{ padding: 4 }}
                placeholder={placeholder}
                keyboardType={keyboardType}
                {...props}
            />
        </View>
    )
}
