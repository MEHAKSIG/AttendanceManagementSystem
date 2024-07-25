import axiosInstance from "./axios-interceptor/axios-interceptor";

export type LeaveStatus = "Pending" | "Approved" | "Reject";

export const GetLeavesForApproval = async (
  fromDate: string | null,
  toDate: string | null,
  leaveStatus: LeaveStatus
) => {
  const url = `/LeaveRequest/GetLeavesForApproval?fromDT=${fromDate}&toDT=${toDate}&leaveStatusEnum=${leaveStatus}`;
  console.log({ url }, "url-GetLeavesForApproval");

  return await axiosInstance.get(url);
};

export const ApproveRejectLeave = async (
  leaveRequestId: number | undefined,
  leaveStatus: LeaveStatus,
  leaveRemarks?: string | undefined
) => {
  const param = {
    LeaveRequestId: leaveRequestId,
    Status: leaveStatus,
    LeaveActionRemarks: leaveRemarks,
  };
  const url = `/LeaveRequest/ActionOnLeave`;
  console.log({ url, param }, "url-ApproveRejectLeave");

  return await axiosInstance.post(url, param);
};
