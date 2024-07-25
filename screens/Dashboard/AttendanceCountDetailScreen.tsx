import { View, Text } from 'react-native'
import React from 'react'
import GlobalStyles from '../../shared/GlobalStyles'
import { RootStackScreenProps } from '../../types'
import Loader from '../../components/atom/Loader';
import { GetAttendanceCounts, GetAttendanceCountsDetail } from '../../services/DashboardService';
import AttendanceCountDetailsTemplate from '../../components/templates/Dashboard/AttendanceCountDetail/AttendanceCountDetailTemplate';
import { AttendanceType } from '../../types/CommonTypes';

export default function AttendanceCountDetailScreen(props: RootStackScreenProps<"AttendanceCountDetail">) {
    const { navigation, route } = props;
    const { date, attendanceType } = route.params;

    const [isLoading, setIsLoading] = React.useState(false);
    const [listUsers, setListUsers] = React.useState<any>({});

    console.log(route.params, "route.params");

    const setScreenTitle = () => {
        let title = "";
        if (attendanceType == "Leave") {
            title = "Users on Leave";
        } else if (attendanceType == "MissPunch") {
            title = "Miss Punch Users";
        } else {
            title = `${attendanceType} Users`;
        }

        navigation.setOptions({
            headerTitle: title
        });
    }

    const getAttendanceDetail = async () => {

        try {
            if (date && attendanceType) {
                setIsLoading(true);
                const res = await GetAttendanceCountsDetail(date, attendanceType);
                const data = res.data;
                setIsLoading(false);

                console.log(data, "data-getAttendanceDetail");
                if (data.IsSuccess) {
                    setListUsers(data.Result.listUser);
                } else {
                    alert(data.Msg);
                }
            }

        } catch (e) {
            setIsLoading(false);
            alert('Error : ' + e);
        }
    }

    React.useEffect(() => {
        setScreenTitle();
        getAttendanceDetail();
    }, [])

    if (isLoading) return <Loader />

    return (
        <View style={GlobalStyles.screenContainer}>
            {/* <Text>{JSON.stringify(listUsers)}</Text> */}
            <AttendanceCountDetailsTemplate listData={listUsers} />
        </View>
    )
}