import { AttendanceType } from "../types/CommonTypes";

export const navigateToRegistration = async (
    navigation: any,
    navigateFrom: string
) => {
    const param = {
        navigateFrom,
    };
    navigation.navigate("Register", param);
};

export const navigateToLogin = async (
    navigation: any,
    navigateFrom: string
) => {
    const param = {
        navigateFrom,
    };
    navigation.navigate("Login", param);
};

export const navigateToRegisterSuccess = async (
    navigation: any,
    navigateFrom: string
) => {
    const param = {
        navigateFrom,
    };
    navigation.navigate("RegisterSuccess", param);
};
export const navigateToBranchScreen = async (
    navigation: any,
    navigateFrom: string,
) => {
    const param = {
        navigateFrom,
    };
    navigation.navigate("Branches", param);
};
export const navigateToAddBranches = async (
    navigation: any,
    navigateFrom: string,
    branch?: any
) => {
    const param = {
        navigateFrom,
        branch
    };
    navigation.navigate("AddBranch", param);
};

export const navigateToAddBranchAfterRegister = async (
    navigation: any,
    navigateFrom: string,
    userId: number,
    accessToken: string
) => {
    const param = {
        navigateFrom,
        userId,
        accessToken
    };
    navigation.navigate("AddBranchAfterRegister", param);
};


export const navigateToAddUser = async (
    navigation: any,
    navigateFrom: string,
    userId?: number
) => {
    const param = {
        navigateFrom,
        userId
    };
    navigation.navigate("AddUser", param);
};

export const navigateToUsersScreen = async (
    navigation: any,
    navigateFrom: string,
) => {
    const param = {
        navigateFrom,
    };
    navigation.navigate("Users", param);
};
export const navigateToChangePwdScreen = async (
    navigation: any,
    navigateFrom: string,
) => {
    const param = {
        navigateFrom,
    };
    navigation.navigate("ChangePwd", param);
};

export const navigateToAdminAttendanceReport = async (
    navigation: any,
    navigateFrom: string,
) => {
    const param = {
        navigateFrom,
    };
    navigation.navigate("AdminAttendanceReport", param);
};


export const navigateToAttendanceReport = async (
    navigation: any,
    navigateFrom: string,
) => {
    const param = {
        navigateFrom,
    };
    navigation.navigate("AttendanceReport", param);
};

export const navigateToLeave = async (
    navigation: any,
    navigateFrom: string,
) => {
    const param = {
        navigateFrom,
    };
    navigation.navigate("Leave", param);
};

export const navigateToLeaveApproval = async (
    navigation: any,
    navigateFrom: string,
) => {
    const param = {
        navigateFrom,
    };
    navigation.navigate("LeaveApproval", param);
};

export const navigateToAddLeave = async (
    navigation: any,
    navigateFrom: string,
    leaveObject: any,
    leaveRequestId?: number,
    defaultFromDate?: string,
    defaulToDate?: string,
    defaultLeaveReason?: string,

) => {
    const param = {
        navigateFrom,
        leaveRequestId,
        defaultFromDate,
        defaulToDate,
        defaultLeaveReason,
        leaveObject
    };
    navigation.navigate("AddLeave", param);
};

export const navigateToAddHoliday = async (
    navigation: any,
    navigateFrom: string,
    defaultHolidayId?: number,
    defaultHolidayDate?: string,
    defaultHolidayName?: string,
    defaultBranchId?: number,
    active?: boolean,

) => {
    const param = {
        navigateFrom,
        defaultHolidayId,
        defaultHolidayDate,
        defaultHolidayName,
        defaultBranchId,
        active
    };
    navigation.navigate("AddHoliday", param);
};

export const navigateToViewMeetingScreen = async (
    navigation: any,
    navigateFrom: string,
) => {
    const param = {
        navigateFrom,
    };
    navigation.navigate("ViewMeeting", param);
};

export const navigateToMeetingScreen = async (
    navigation: any,
    navigateFrom: string,
) => {
    const param = {
        navigateFrom,
    };
    navigation.navigate("TabMeeting", param);
};

export const navigateToHolidaysScreen = async (
    navigation: any,
    navigateFrom: string,
) => {
    const param = {
        navigateFrom,
    };
    navigation.navigate("Holiday", param);
};

export const navigateToAttendanceCountDetailScreen = async (
    navigation: any,
    navigateFrom: string,
    date: string,
    attendanceType: AttendanceType,
) => {
    const param = {
        navigateFrom,
        date,
        attendanceType
    };
    navigation.navigate("AttendanceCountDetail", param);
};

