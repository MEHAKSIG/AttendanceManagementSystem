import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MyText from '../atom/MyText';
import GlobalStyles from '../../shared/GlobalStyles';
import { getUserDetail } from '../../services/DataStorageService';
import { UsersImgManIcon } from '../../shared/Icons';

interface DashboardUserCardProps {
}

export default function DashboardUserCard(props: DashboardUserCardProps) {

    const [userDetail, setUserDetail] = React.useState<any>();

    const getUserInfo = async () => {
        const user = await getUserDetail();
        setUserDetail(user);
    }

    React.useEffect(() => {
        getUserInfo();
    }, [])

    return (
        <View style={styles.userDetailsCard}>
            <View style={GlobalStyles.rowSpaceBetween}>
                <View>
                    <MyText textFont='space-mono' text={userDetail?.name} bold fontSize={20} />
                    <MyText text={userDetail?.email} color='grey' fontSize={12} />
                    {
                        userDetail?.designation &&
                        <MyText text={userDetail?.designation} color='grey' fontSize={12} />
                    }
                    <MyText text={userDetail?.userRole} color='grey' fontSize={12} />

                </View>
                <UsersImgManIcon height={60} width={60} />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    userDetailsCard: {
        backgroundColor: '#D2D7D7',
        padding: 16,
        // marginTop: 16,
        borderRadius: 10,
        borderWidth: 1,
        margin: 5,
        borderColor: '#D2D7D7',

    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    designation: {
        fontSize: 18,
    },
    email: {
        fontSize: 16,
    },
    greeting: {
        fontSize: 16,
    },
})