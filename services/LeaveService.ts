import { getUserDetail } from "./DataStorageService";
import axiosInstance from "./axios-interceptor/axios-interceptor";

export const SaveLeave = async (
  leaveRequestId: number | undefined,
  leaveFromDate: string,
  leaveToDate: string,
  leaveReason?: string | undefined,
  leaveType?: string
) => {
  const userDetail = await getUserDetail();

  const param = {
    LeaveRequestId: leaveRequestId,
    UserId: userDetail.userId,
    LeaveFromDate: leaveFromDate,
    LeaveToDate: leaveToDate,
    LeaveReason: leaveReason,
    // Status: "approved",
    LeaveType: leaveType,
  };

  // const url = `${apiRootUrl}/Attendance/SaveAttendance`;
  const url = `/LeaveRequest/Save`;
  console.log({ url, param }, "url-SaveLeave");

  return await axiosInstance.post(url, param);
};

export const GetLeaves = async (
  userId: number,
  fromDate: string,
  toDate: string
) => {
  const userDetail = await getUserDetail();
  const url = `/LeaveRequest/Get?UserId=${userId}&fromDT=${fromDate}&toDT=${toDate}`;
  console.log({ url }, "url-GetLeaves");

  return await axiosInstance.get(url);
};

export const GetLeaveTypesAsync = async () => {
  const url = `/LeaveRequest/GetLeaveTypes`;
  console.log({ url }, "url-GetLeaveTypes");

  return await axiosInstance.get(url);
};

export const DeleteLeaves = async (leaveRequestId: number) => {
  const userDetail = await getUserDetail();
  const url = `/LeaveRequest/Delete?leaveRequestId=${leaveRequestId}`;
  console.log({ url }, "url-DeleteLeaves");

  return await axiosInstance.get(url);
};
