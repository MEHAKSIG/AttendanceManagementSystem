import React from 'react'
import { View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native'
import GlobalStyles from '../../shared/GlobalStyles';
import MyDateTimePickerV2, { MyDateTimePickerPropsV2 } from '../atom/MyDateTimePickerV2';
// import MyDateTimePicker, { MyDateTimePickerProps } from '../atom/MyDateTimePicker';

export interface BaseFormGroupDateProps {
    label: string,
    formGroupContainerStyle?: StyleProp<ViewStyle>,
    formGroupLabelStyle?: StyleProp<TextStyle>,
    val?: string | undefined,
    setVal?: any,
    required?: boolean

}

export type FormGropDateProps = BaseFormGroupDateProps & MyDateTimePickerPropsV2;

export default function FormGroupDate(props: FormGropDateProps) {
    const { required, val, setVal, label, formGroupContainerStyle, formGroupLabelStyle, onDateChange, format, maxDate, minDate } = props;
    //  console.log(`val-FormGroupDate(${label}) :`, (!val ? new Date().toDateString() : val));
    return (
        <View style={[GlobalStyles.formGroupContainer, formGroupContainerStyle]}>
            <Text style={[GlobalStyles.formGroupLabel, formGroupLabelStyle]}>{label}
                {required && <Text style={GlobalStyles.requiredAsterisk}>*</Text>}
            </Text>
            <MyDateTimePickerV2 mode='date'
                val={val}
                setVal={setVal}
                minDate={minDate}
                maxDate={maxDate}
                onDateChange={onDateChange} format={format}
                {...props} />
        </View>
    )
}
