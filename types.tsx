/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Branch } from './models/Branch';
import { AttendanceType } from './types/CommonTypes';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  AddBranch: {
    navigateFrom: string, branch?: Branch, title?: string
  };
  AddUser: { userId?: number, navigateFrom?: string, };
  ChangePwd: { navigateFrom?: string };
  Users: { navigateFrom?: string }
  Branches: { navigateFrom?: string }
  AdminAttendanceReport: { navigateFrom?: string }
  AttendanceReport: { navigateFrom?: string }
  Leave: { navigateFrom?: string }
  AddLeave: {
    navigateFrom?: string,
    leaveRequestId?: number,
    defaultFromDate: string,
    defaulToDate: string,
    defaultLeaveReason?: string | undefined,
    leaveObject: any
  }
  LeaveApproval: { navigateFrom?: string }
  ViewMeeting: { navigateFrom?: string }

  Holiday: { navigateFrom?: string }
  AddHoliday: {
    navigateFrom?: string,
    defaultHolidayId?: number,
    defaultHolidayDate: string,
    defaultHolidayName?: string,
    defaultBranchId?: number,
    active?: boolean,
  }
  AdminDashboard: { navigateFrom?: string }
  AttendanceCountDetail: { navigateFrom?: string, date?: string, attendanceType?: AttendanceType }
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  TabOne: undefined;
  TabHomeCalander: undefined;
  TabTwo: undefined;
  TabUsers: undefined;
  TabMeeting: undefined;
  TabBranches: undefined;
  TabExplore: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
