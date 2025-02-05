export interface User {
  userId?: number;
  mobileNo: string;
  email: string;
  name: string;
  eCode?: string;
  pwd?: string;
  gender?: string;
  dob?: string;
  groupId?: number;
  userRole?: string;
  department?: string;
  designation?: string;
  departmentId?: number;
  groupName?: string;
  appType?: string;
  isWorkFromHome?: boolean;
  isFieldWork?: boolean;
  workType?: string;
  branchId: number;
  branchName?: string;
  branchLatitude?: number;
  branchLongitude?: number;
  isDemoAccount?: boolean;
  joiningDate?: string;
  leftDate?: string;
  active?: boolean;
  ReportingToId?: number;
  WeeklyOffDay1?: string;
  WeeklyOffDay2?: string;
}
