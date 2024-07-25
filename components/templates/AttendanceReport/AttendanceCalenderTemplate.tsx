import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Calendar } from 'react-native-calendars';
// import { GetAttendanceByDates } from '../../../services/AttendanceService';
import DateService from '../../../services/DateService';
// import AppColors, { getColorByAttendanceStatus } from '../../../shared/constants/AppColors';
import GlobalStyles from '../../../shared/GlobalStyles';
// import { SolidCircleIcon } from '../../../shared/Icons';
// import { SourceSansText } from '../../atom/StyledText';
// import { GetEmployeeJuniors } from '../../../services/EmployeeService';
import FormGroupDDL from '../../molecules/FormGroupDDL';
import { DropDownModel } from '../../atom/DropDownModalSelector';
import { GetAttendanceByMultiparam, GetAttendanceWithStatusByMultiparam, GetLegendsColor } from '../../../services/AttendanceService';
import { SolidCircleIcon } from '../../../shared/Icons';
import { SourceSansText } from '../../StyledText';
import Colors, { getColorByAttendanceStatus } from '../../../constants/Colors';
import { getUserDetail } from '../../../services/DataStorageService';
import AttendanceCalenderLegend from '../../atom/AttendanceCalenderLegend';
import AttendanceCalendarLegendsTemplate from './AttendanceCalendarLegendsTemplate';

export default function AttendanceCalenderTemplate(props: { refresh: boolean }) {
    const { refresh } = props;
    const [attMarkedDates, setAttMarkedDates] = React.useState<any>({});

    const monthsDay = DateService.getFirstAndLastDateByDate(new Date());

    const [fromDateStr, setFromDateStr] = React.useState<string>(monthsDay.firstDayStr);
    const [toDateStr, setToDateStr] = React.useState<string>(monthsDay.lastDayStr);
    const [legendsColor, setLegendsColor] = React.useState<any>({});
    const [listLegends, setListLegends] = React.useState<any[]>([]);

    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        getLegendsColor();
        getAttendanceReport(fromDateStr, toDateStr, 0);
    }, [])
    React.useEffect(() => {

        getAttendanceReport(fromDateStr, toDateStr, 0);

    }, [refresh])

    const getLegendsColor = async () => {
        const res = await GetLegendsColor();
        const data = res.data;
        // console.log(data, "getLegendsColor");
        setLegendsColor(data.Result.legends);
        setListLegends(data.Result.listLegand);
    }

    const getAttendanceReport = async (fromDateStr: string, toDateStr: string, userId: number) => {

        try {
            const userDetail = await getUserDetail();
            setIsLoading(true);
            const res = await GetAttendanceWithStatusByMultiparam(userDetail.userId ?? 0, fromDateStr, toDateStr);
            const data = await res.data;
            setIsLoading(false);

            // console.log(data, "data-getAtt");
            if (data.IsSuccess) {
                let listAtt = data.Result.listAttendances;
                // console.log(listAtt, "listAtt");

                let finalAtt: any = {};
                listAtt.forEach((x: any) => {
                    const date = DateService.dateObjToYYYYMMDD(new Date(x.AttendanceDate));
                    finalAtt[date] = {
                        selected: true, marked: false, selectedColor: x.Color
                    };
                });
                // selected: true, marked: false, selectedColor: getColorByAttendanceStatus('Present')

                setAttMarkedDates(finalAtt);
                // console.log(finalAtt, "finalAtt");

            }
        } catch (e) {
            setIsLoading(false);
        }
    }

    return (
        <View style={{ backgroundColor: '#fff', paddingTop: 5 }}>

            <Calendar
                displayLoadingIndicator={isLoading}

                // markedDates={{
                //     '2023-01-16': { selected: true, marked: true, selectedColor: 'blue' },
                //     '2023-01-17': { marked: true },
                //     '2023-01-18': { marked: true, dotColor: 'red', activeOpacity: 0 },
                //     '2023-01-19': { disabled: true, disableTouchEvent: true }
                // }}
                markedDates={attMarkedDates}
                // Initially visible month. Default = now
                initialDate={new Date().toDateString()}
                // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                minDate={'2012-05-10'}
                // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                // maxDate={'2012-05-30'}
                // Handler which gets executed on day press. Default = undefined
                onDayPress={day => {
                    console.log('selected day', day);
                }}
                // Handler which gets executed on day long press. Default = undefined
                onDayLongPress={day => {
                    console.log('selected day', day);
                }}
                // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                monthFormat={'MMM yyyy'}
                // Handler which gets executed when visible month changes in calendar. Default = undefined
                onMonthChange={month => {

                    // console.log('month changed', month);
                    const monthsDay = DateService.getFirstAndLastDateByDate(new Date(month.dateString));

                    setFromDateStr(monthsDay.firstDayStr);
                    setToDateStr(monthsDay.lastDayStr);

                    getAttendanceReport(monthsDay.firstDayStr, monthsDay.lastDayStr, 0);
                }}
                // Hide month navigation arrows. Default = false
                // hideArrows={true}
                // Replace default arrows with custom ones (direction can be 'left' or 'right')
                // renderArrow={direction => <EyeIcon />}
                // Do not show days of other months in month page. Default = false
                hideExtraDays={true}
                // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
                // day from another month that is visible in calendar page. Default = false
                disableMonthChange={true}
                // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
                firstDay={1}
                // Hide day names. Default = false
                // hideDayNames={true}
                // Show week numbers to the left. Default = false
                // showWeekNumbers={true}
                // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                onPressArrowLeft={subtractMonth => subtractMonth()}
                // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                onPressArrowRight={addMonth => addMonth()}
                // Disable left arrow. Default = false
                // disableArrowLeft={true}
                // Disable right arrow. Default = false
                // disableArrowRight={true}
                // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                disableAllTouchEventsForDisabledDays={true}
                // Replace default month and year title with custom one. the function receive a date as parameter

                // renderHeader={date => {
                //     /*Return JSX*/
                //     return <View>
                //         <Text>This is custome header</Text>
                //         <Text>This is custome header</Text>
                //         <Text>This is custome header</Text>
                //     </View>
                // }}

                // Enable the option to swipe between months. Default = false
                enableSwipeMonths={true}
            />

            <View style={style.legendParentContainer}>
                <AttendanceCalendarLegendsTemplate listData={listLegends} />
                {/* <View style={GlobalStyles.rowSpaceBetween}>
                    <AttendanceCalenderLegend color={legendsColor.presentColor} name="Present" />
                    <AttendanceCalenderLegend color={legendsColor.absentColor} name="Absent" />
                    <AttendanceCalenderLegend color={legendsColor.holidayColor} name="Holiday" />
                </View>
                <View style={[GlobalStyles.rowSpaceBetween, { marginTop: 15 }]}>
                    <AttendanceCalenderLegend color={legendsColor.missedOutColor} name="Miss Out" />
                    <AttendanceCalenderLegend color={legendsColor.leaveColor} name="Leave" />
                    <AttendanceCalenderLegend color={legendsColor.weekOffColor} name="Week Off" />

                </View> */}
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    legendParentContainer: {
        backgroundColor: '#fff'
        , padding: 10
        // , paddingLeft: 15
        // , paddingRight: 15
        , paddingTop: 30,
        // marginTop: 20
    },
    legendContainer: {
        flex: .33
    },
    legendLabel: {
        marginLeft: 15
    }
})