import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import ExploreBox from '../../components/molecules/ExploreBox';
import { BaseProps } from '../../App';
import { BranchesImgIcon, CalenderImgIcon, HolidayImgIcon, LeaveApproveImgIcon, LeaveImgIcon, LeaveImgIcon2, LocationIcon, MissedPuchImgIcon, PaySlipImgIcon, PolicyImgIcon, UserIcon, UsersImgIcon, ViewMeetingsIcon } from '../../shared/Icons';
import { getUserRoleLocalStorage, isUserAdmin } from '../../services/DataStorageService';
import {
    navigateToAdminAttendanceReport, navigateToAttendanceReport, navigateToBranchScreen, navigateToLeave,
    navigateToUsersScreen, navigateToViewMeetingScreen, navigateToHolidaysScreen, navigateToLeaveApproval
} from '../../shared/Routes';
import { PageNames } from '../../constants/Config';
import GlobalStyles from '../../shared/GlobalStyles';


type ExploreBoxTypes =
    "ATTENDANCE" |
    "USERS" |
    "BRANCHES" |
    "LEAVES" |
    "VIEWMEETING" |
    "HOLIDAYS" |
    "LEAVE_APPROVAL"

export default function ExploreScreen(props: BaseProps) {
    const { navigation, route } = props;

    const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
    const [isBranchHead, setIsBranchHead] = React.useState<boolean>(false);

    React.useEffect(() => {
        (async function () {

            const userRole = await getUserRoleLocalStorage();
            setIsAdmin(userRole.IsAdmin);
            setIsBranchHead(userRole.IsBranchHead);
        }
        )();
    }, [])

    const onBoxPress = async (boxType: ExploreBoxTypes) => {
        if (boxType == 'ATTENDANCE') {
            if (isAdmin)
                navigateToAdminAttendanceReport(navigation, PageNames.EXPLORE);
            else
                navigateToAttendanceReport(navigation, PageNames.EXPLORE);
        } else if (boxType == 'USERS') {
            // navigateToReportsTab(navigation, PageNames.EXPLORE);
            navigateToUsersScreen(navigation, PageNames.EXPLORE)
        } else if (boxType == 'BRANCHES') {
            navigateToBranchScreen(navigation, PageNames.EXPLORE);
        } else if (boxType == 'LEAVES') {
            navigateToLeave(navigation, PageNames.EXPLORE);
        } else if (boxType == 'LEAVE_APPROVAL') {
            navigateToLeaveApproval(navigation, PageNames.EXPLORE);
        } else if (boxType == 'VIEWMEETING') {
            navigateToViewMeetingScreen(navigation, PageNames.EXPLORE);
        } else if (boxType == 'HOLIDAYS') {
            navigateToHolidaysScreen(navigation, PageNames.EXPLORE);
        }
    }

    return (
        <ScrollView
            style={GlobalStyles.screenContainer}
        >
            <View style={{ flex: 1, margin: 10 }}>

                <ExploreBox title='Attendance'
                    description='Manage your attendance'
                    color='#dce3ff'
                    icon={<CalenderImgIcon width={50} height={50} />}
                    onPress={() => {
                        onBoxPress('ATTENDANCE');
                    }}
                />

                {
                    (isAdmin || isBranchHead) && (
                        <>
                            <ExploreBox title='Users' description='Manage Users' color='#d3f1d5'
                                icon={<UsersImgIcon width={60} height={60} />}
                                onPress={() => {
                                    onBoxPress('USERS');
                                }}
                            />

                            <ExploreBox title='Branches' description='Manage Branches' color='#fff0dd' icon={<BranchesImgIcon width={60} height={60} />}
                                onPress={() => {
                                    onBoxPress('BRANCHES');
                                }}
                            />

                            <ExploreBox title='Leave Approval' description='Approve/Reject Pending Leaves' color='#F6F644'
                                icon={<LeaveApproveImgIcon width={60} height={60} />}
                                onPress={() => {
                                    onBoxPress('LEAVE_APPROVAL');
                                }}
                            />

                        </>
                    )
                }

                <ExploreBox title='Leaves' description='Manage your leaves' color='#a0b3ff'
                    icon={<LeaveImgIcon2 width={60} height={60} />}
                    onPress={() => {
                        onBoxPress('LEAVES');
                    }}
                />

                <ExploreBox title='Meetings' description='View Your Meetings' color='#ffa0a0'
                    icon={<ViewMeetingsIcon width={60} height={60} />}
                    onPress={() => {
                        onBoxPress('VIEWMEETING');
                    }}
                />
                <ExploreBox title='Holidays' description='Manage Holidays' color='#F88DA6'
                    icon={<HolidayImgIcon width={60} height={60} />}
                    onPress={() => {
                        onBoxPress('HOLIDAYS');
                    }}
                />


                {/* 
            <ExploreBox title='Leaves' description='Check and apply for leaves' color='#e6fbfc' icon={<LeaveImgIcon width={50} height={50} />}
                onPress={() => {
                    onBoxPress('LEAVES;');
                }}
            />
            <ExploreBox title='Policy Details' description='Get your policy details' color='#dce3ff' icon={<PolicyImgIcon width={50} height={50} />}
                onPress={() => {
                    onBoxPress('POLICY_DETAIL');
                }}
            /> */}
            </View>
        </ScrollView>
    )
}