import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import GlobalStyles from '../../shared/GlobalStyles'
import { UsersImgIcon, UsersImgManIcon } from '../../shared/Icons';
import MyText from '../../components/atom/MyText';
import DashboardUserCard from '../../components/organisms/DashboardUserCard';
import AttendanceCountBox from '../../components/organisms/AttendanceCountBox';
import { GetAttendanceCounts } from '../../services/DashboardService';
import { AttendanceType } from '../../types/CommonTypes';
import { BaseProps } from '../../App';
import { navigateToAttendanceCountDetailScreen } from '../../shared/Routes';
import { PageNames } from '../../constants/Config';
import Loader from '../../components/atom/Loader';

export default function AdminDashboardScreen(props: BaseProps) {
    const { navigation } = props;
    const [isLoading, setIsLoading] = React.useState(false);
    const [attendanceCounts, setAttendanceCounts] = React.useState<any>({
        TotalUsersCount: 0,
        PresentCount: 0,
        AbsentCount: 0,
        MissPunchCount: 0,
        LeaveCount: 0
    });

    const date = new Date().toDateString();

    const getAttendanceCount = async () => {
        try {
            setIsLoading(true);
            const res = await GetAttendanceCounts(date);
            const data = res.data;
            setIsLoading(false);

            console.log(data, "data");
            if (data.IsSuccess) {
                setAttendanceCounts(data.Result.attenanceCounts);
            } else {
                alert(data.Msg);
            }

        } catch (e) {
            setIsLoading(false);
            alert('Error : ' + e);
        }
    }

    React.useEffect(() => {
        getAttendanceCount();
    }, [])

    const onAttCountsClick = (attType: AttendanceType) => {
        // alert(attType);
        navigateToAttendanceCountDetailScreen(navigation, PageNames.DASHBOARD, date, attType);
    }

    if (isLoading) return <Loader />

    return (
        <View style={styles.container}>
            {/* <UserDetailsCard name="John Doe" designation="Software Engineer" email="john@example.com" /> */}
            <View style={GlobalStyles.mb10}>
                <DashboardUserCard />
            </View>
            <View style={GlobalStyles.rowSpaceBetween}>
                <AttendanceCountBox count={attendanceCounts.TotalUsersCount} label="Total"
                    onPress={() => {
                        onAttCountsClick("All")
                    }}
                />
                <AttendanceCountBox count={attendanceCounts.PresentCount} label="Present"
                    onPress={() => {
                        onAttCountsClick("Present")
                    }}
                />
            </View>
            <View style={GlobalStyles.rowSpaceBetween}>
                <AttendanceCountBox count={attendanceCounts.AbsentCount} label="Absent"
                    onPress={() => {
                        onAttCountsClick("Absent")
                    }}
                />
                <AttendanceCountBox count={attendanceCounts.MissPunchCount} label="Miss Punch"
                    onPress={() => {
                        onAttCountsClick("MissPunch")
                    }}
                />
            </View>
            <View style={GlobalStyles.rowSpaceBetween}>
                <AttendanceCountBox count={attendanceCounts.LeaveCount} label="Leave"
                    onPress={() => {
                        onAttCountsClick("Leave")
                    }}
                />
                {/* <AttendanceCountBox count={attendanceCounts.MissPunchCount} label="Miss Punch" /> */}
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

});