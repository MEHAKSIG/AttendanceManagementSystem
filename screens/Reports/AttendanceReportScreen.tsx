import React from 'react';
import { BaseProps } from '../../App';

import AttendanceReportTemplate from '../../components/templates/AttendanceReport/AttendanceReportTemplate';
import { Text, View } from '../../components/Themed';
import { GetAttendanceByMultiparam, GetAttendanceOfCurrentUser } from '../../services/AttendanceService';
import DateService from '../../services/DateService';
import { getUserDetail } from '../../services/DataStorageService';
import FilterPanelWithDates from '../../components/organisms/FilterPanelWithDates';

export default function AttendanceReportScreen(props: BaseProps) {
    const { navigation, route } = props;

    const defaultFromDate = new Date();
    const defaultToDate = new Date();
    const monthsDay = DateService.getFirstAndLastDateByDate(new Date());

    const [isLoading, setIsLoading] = React.useState(false);
    const [listReport, setListReport] = React.useState();

    const [fromDate, setFromDate] = React.useState<string>(monthsDay.firstDayStr);
    const [toDate, setToDate] = React.useState<string>(defaultToDate.toDateString());

    const getAttendance = async () => {

        try {

            const userDetail = await getUserDetail();
            setIsLoading(true);
            const res = await GetAttendanceByMultiparam(userDetail.userId ?? 0, fromDate, toDate);
            setIsLoading(false);

            const data = res.data;
            // console.log(data, "data")
            if (data?.IsSuccess) {
                // const list = data?.Result.filter((x: any) => x.listAttendances.length > 0);
                const list = data.Result?.listAttendances;
                console.log(list, "listAttendances");
                setListReport(list);
            } else {
                alert(data.msg);
            }

        } catch (e) {
            alert('Error  : ' + e);
        }
    }
    React.useEffect(() => {
        getAttendance();
    }, []);
    // React.useEffect(() => {
    //     // navigation.setOptions({
    //     //     title: 'Report',
    //     // })
    //     // getAttendance();
    // }, [])

    // if (isLoading) {
    //     return <Loader />
    // }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff', paddingBottom: 40 }}>
            <FilterPanelWithDates
                fromDate={fromDate}
                setFromDate={setFromDate}
                toDate={toDate}
                setToDate={setToDate}
                onSubmit={getAttendance}
                loading={isLoading}
            />
            <AttendanceReportTemplate listData={listReport} />
        </View>
    )
}