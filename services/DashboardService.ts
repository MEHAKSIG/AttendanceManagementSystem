import { AttendanceType } from "../types/CommonTypes";
import { getUserDetail } from "./DataStorageService";
import axiosInstance from "./axios-interceptor/axios-interceptor";

export const GetAttendanceCounts = async (date: string) => {
  const url = `/Dashboard/GetAttendanceCountAndDetail?date=${date}&countDetailEnum=count&dashboardRptAttendanceTypeEnum=all`;
  console.log({ url }, "url-GetAttendanceCounts");
  return await axiosInstance.get(url);
};

export const GetAttendanceCountsDetail = async (
  date: string,
  attendanceType: AttendanceType
) => {
  const url = `/Dashboard/GetAttendanceCountAndDetail?date=${date}&countDetailEnum=detail&dashboardRptAttendanceTypeEnum=${attendanceType}`;
  console.log({ url }, "url-GetAttendanceCountsDetail");
  return await axiosInstance.get(url);
};
