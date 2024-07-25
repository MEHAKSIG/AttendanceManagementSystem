// import React from "react";
// import {
//     View,
//     Text,
//     Platform,
//     Modal,
//     StyleSheet,
//     Dimensions,
//     Button,
// } from "react-native";
// // import DatePicker from "react-native-datepicker";
// import Colors from "../../constants/Colors";

// const { width } = Dimensions.get("window");

// export interface BaseDateTimePickerProps {
//     containerStyle?: any,
//     leftIcon?: React.ReactElement,
//     setDate?: any
// }
// export type MyDateTimePickerProps = BaseDateTimePickerProps & DatePicker['props'];

// export default function MyDateTimePicker(props: MyDateTimePickerProps) {
//     const { date, setDate, mode, placeholder, onDateChange, containerStyle, leftIcon, minDate, maxDate, format } = props;

//     const LeftIcon = () => {
//         return leftIcon ? leftIcon : null;
//     };

//     return (
//         <View style={[styles.inputContainer, containerStyle]}>
//             <LeftIcon />
//             <DatePicker
//                 showIcon={false}
//                 style={[{ width: width * 1 }]}
//                 date={date}
//                 mode={mode ?? "date"}
//                 placeholder={placeholder ?? "Date"}
//                 // format={format ?? "YYYY-MM-DD"}
//                 format={format ?? "DD-MMM-YYYY"}
//                 minDate={minDate}
//                 maxDate={maxDate}
//                 confirmBtnText="Confirm"
//                 cancelBtnText="Cancel"
//                 // useNativeDriver={false}
//                 customStyles={{
//                     // dateIcon: {
//                     //   position: "absolute",
//                     //   left: 0,
//                     //   top: 4,
//                     //   marginLeft: 0,
//                     // },
//                     dateInput: {
//                         // marginLeft: 36,
//                         borderWidth: 0,
//                         marginLeft: 10,
//                         alignItems: "flex-start",

//                         // borderBottomWidth: 1,
//                     },
//                     // ... You can check the source to find the other keys.
//                 }}
//                 onDateChange={(dateStr: string, date: Date) => {
//                     setDate && setDate(dateStr);
//                     onDateChange && onDateChange(dateStr, date);
//                 }}
//             />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     inputContainer: {
//         textAlign: "left",
//         flexDirection: "row",
//         // backgroundColor: '#e8e8e8',
//         borderColor: Colors.appSecondaryColor,
//         // height: 60,
//         borderWidth: 1,
//         width: "100%",
//         // padding: 15,
//         paddingLeft: 0,
//         // marginLeft: 15,
//         // marginRight: 35,
//         borderRadius: 5,
//         color: "black",
//     },
// });
