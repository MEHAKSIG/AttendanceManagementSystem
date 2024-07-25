import React from 'react'
import { View, Text } from 'react-native'
import GlobalStyles from '../../shared/GlobalStyles';
import DropDownModalSelector, { DropDownModalSelectorProps } from '../atom/DropDownModalSelector';

export interface BaseFormGropDDLProps {
    required?: boolean
    label?: string,
    hideLabel?: boolean
}

export type FormGropDDLProps = DropDownModalSelectorProps & BaseFormGropDDLProps;

export default function FormGroupDDL(props: FormGropDDLProps) {
    const { required, label, hideLabel, placeholder, listKeyLable, onChange } = props;

    return (
        <View style={GlobalStyles.formGroupContainer}>
            {
                hideLabel != true &&
                <Text style={GlobalStyles.formGroupLabel}>{label}
                    {required && <Text style={GlobalStyles.requiredAsterisk}>*</Text>}
                </Text>
            }
            <DropDownModalSelector listKeyLable={listKeyLable} placeholder={placeholder}
                onChange={onChange} />
        </View >
    )
}
