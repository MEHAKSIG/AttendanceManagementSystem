import React from "react";
import {
    View,
    Text,
    Platform,
    StyleSheet,
    Dimensions,
    ViewStyle,
    TouchableOpacity
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import GlobalStyles from "../../shared/GlobalStyles";
import DateService from "../../services/DateService";
import MyText from "./MyText";

const { width } = Dimensions.get("window");

export interface BaseDateTimePickerPropsV2 {
    containerStyle?: ViewStyle,
    leftIcon?: React.ReactElement,
    val?: string,
    setVal?: any,
    mode?: 'date' | 'time',
    placeholder?: string,
    minDate?: Date,
    maxDate?: Date,
    onDateChange?: (selectedDate?: Date | null, selectedDateStr?: string | null) => void,
    format?: "day month year" | "dayofweek day month" | "longdate" | "shortdate" | undefined
    disabled?: boolean
}
export type MyDateTimePickerPropsV2 = BaseDateTimePickerPropsV2;

export default function MyDateTimePickerV2(props: MyDateTimePickerPropsV2) {

    const { val, setVal, mode, placeholder, containerStyle, leftIcon, minDate, maxDate, onDateChange, format, disabled } = props;

    const [showDatePicker, setShowDatePicker] = React.useState(false);

    const LeftIcon = () => {
        return leftIcon ? leftIcon : null;
    };

    const hideDatePicker = () => {
        setShowDatePicker(false);
    }

    const handleConfirm = (selectedDate: Date) => {
        console.log("handleConfirm : ", selectedDate);

        // const seletedDateStr = DateService.toShortFormat(selectedDate);
        const seletedDateStr = selectedDate.toDateString();
        setVal && setVal(seletedDateStr);

        onDateChange && onDateChange(selectedDate, seletedDateStr);

        hideDatePicker();
    };

    const handleCancel = (selectedDate: Date) => {
        console.log("handleCancel : ", selectedDate);

        setVal && setVal(null);

        onDateChange && onDateChange(selectedDate, null);

        hideDatePicker();
    };

    const handleOnChange = (newDate: Date) => {
        console.log("handleOnChange : ", newDate);
    };

    // console.log({ val, date: new Date(val ?? new Date()), showDatePicker }, "MyDateTimePickerPropsV2-onLoad");

    return (
        <View style={[styles.inputContainer, containerStyle]}>
            <LeftIcon />

            <TouchableOpacity disabled={disabled} style={GlobalStyles.textInputContainer}
                onPress={() => {
                    // console.log("setShowDatePicker", showDatePicker)
                    setShowDatePicker(true);
                }}>
                {mode == 'date' && val && <MyText text={val} />}
                {(mode == 'date' && !val) && <MyText text={placeholder ?? "Select Date"} color="grey" />}
            </TouchableOpacity>

            <DateTimePickerModal
                // date={new Date()}
                date={val ? new Date(val) : new Date()}
                isVisible={showDatePicker}
                mode={mode ?? 'date'}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                onChange={handleOnChange}
                minimumDate={minDate}
                maximumDate={maxDate}
            // onHide={hideDatePicker}
            />


            {/* {show && (
                <DateTimePicker
                    // testID="dateTimePicker"
                    value={date ?? new Date()}
                    mode={mode ?? 'date'}
                    is24Hour={false}
                    display="default"
                    onChange={onChange}
                    disabled={disabled}
                    minimumDate={minDate}
                    maximumDate={maxDate}
                // onTouchCancel={() => {
                //     console.log("cancel clicked")
                // }}
                // dateFormat={format ?? "day month year"}
                />
            )} */}
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        textAlign: "left",
        flexDirection: "row",
        // backgroundColor: '#e8e8e8',
        // borderColor: Colors.appSecondaryColor,
        // height: 60,
        borderWidth: 0,
        width: "100%",
        // padding: 15,
        paddingLeft: 0,
        // marginLeft: 15,
        // marginRight: 35,
        borderRadius: 5,
        color: "black",
    },
});
