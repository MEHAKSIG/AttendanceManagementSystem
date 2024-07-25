import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import GlobalStyles from "../../shared/GlobalStyles";
import { SearchIcon } from "../../shared/Icons";
import LoadingIcon from "../atom/LoadingIcon";
// import MyDateTimePicker from "../atom/MyDateTimePicker";
import MyDateTimePickerV2 from "../atom/MyDateTimePickerV2";

export interface FilterPanelWithDatesProps {
    fromDate?: string,
    setFromDate: any,
    toDate?: string,
    setToDate: any,
    fromDatePlaceholder?: string,
    toDatePlaceholder?: string,
    onSubmit?: (fromDate?: Date, toDate?: Date) => void
    loading?: boolean,
}

export default function FilterPanelWithDates(props: FilterPanelWithDatesProps) {
    const {
        fromDate,
        setFromDate,
        toDate,
        setToDate,
        fromDatePlaceholder = "From Date",
        toDatePlaceholder = "To Date",
        onSubmit,
        loading
    } = props;

    // console.log({ fromDate, toDate }, "FilterPanelWithDates");

    // const [fromDate, setFromDate] = React.useState<any>(defaultFromDate);
    // const [toDate, setToDate] = React.useState<any>(defaultToDate);

    return (
        <View style={styles.container}>
            <View style={GlobalStyles.leftRightParentContainer}>
                <View style={GlobalStyles.leftContainer}>

                    <MyDateTimePickerV2 mode='date' val={fromDate ?? undefined}
                        setVal={setFromDate}
                        placeholder={fromDatePlaceholder ?? "From Date"}
                        containerStyle={styles.datePicker}
                    />

                    {/* <MyDateTimePicker
                        placeholder={fromDatePlaceholder ?? "From Date"}
                        containerStyle={styles.datePicker}
                        date={fromDate ? new Date(fromDate) : undefined}
                        onDateChange={(date) => {
                            setFromDate(date);
                        }}
                    /> */}
                </View>
                <View style={GlobalStyles.leftContainer}>
                    <MyDateTimePickerV2 mode='date' val={toDate ?? undefined}
                        setVal={setToDate}
                        placeholder={toDatePlaceholder ?? "To Date"}
                        containerStyle={styles.datePicker}
                    />
                    {/* <MyDateTimePicker
                        placeholder={toDatePlaceholder ?? "To Date"}
                        containerStyle={styles.datePicker}
                        date={toDate ? new Date(toDate) : undefined}
                        onDateChange={(date) => {
                            setToDate(date);
                        }}
                    /> */}
                </View>
                <View style={[GlobalStyles.leftContainer, { flex: 0.3 }]}>
                    <TouchableOpacity
                        disabled={loading}
                        style={styles.searchButton}
                        onPress={() => {
                            if (onSubmit) {
                                // console.log({ fromDate, toDate }, "onSubmit-Panel")
                                onSubmit(
                                    fromDate ? new Date(fromDate) : undefined,
                                    toDate ? new Date(toDate) : undefined
                                );
                            }
                        }}
                    >
                        {
                            loading ? <LoadingIcon size="small" style={{ padding: 6 }} /> : <SearchIcon size={30} />
                        }

                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        padding: 5,
    },
    datePicker: {
        padding: 0,
        paddingLeft: 3,
        width: "98%",
    },
    searchButton: {
        borderWidth: 1,
        borderColor: Colors.appSecondaryColor,
        padding: 4,
        borderRadius: 5,
        textAlign: "center",
    },
});
