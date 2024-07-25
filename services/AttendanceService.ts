import axios from "axios";
import Config from "../constants/Config";
import { getDeviceInfo, getDeviceUniqueId } from "../helpers/CommonFunctions";
import { getUserDetail } from "./DataStorageService";
// import Config from "../shared/Config";
import axiosInstance from "./axios-interceptor/axios-interceptor";

const apiRootUrl = Config.apiRootUrl;

export const SaveAttendance = async (
  latitude?: string | null,
  longitude?: string | null,
  locationName?: string | null | undefined,
  otherLocationDetail?: string | null,
  distanceFromOffice?: number,
  locationProvider?: string
) => {
  const userDetail = await getUserDetail();

  const deviceId = await getDeviceUniqueId();

  const deviceInfo = await getDeviceInfo();
  // console.log({ deviceId, deviceInfo }, "deviceId");

  const param = {
    UserId: userDetail.userId,
    // GroupId: userDetail.groupId,
    Latitude: latitude,
    Longitude: longitude,
    LocationName: locationName,
    OtherLocationDetail: otherLocationDetail,
    DistanceFromOffice: distanceFromOffice,
    DeviceId: deviceId,
    DeviceInfo: JSON.stringify(deviceInfo),
    LocationProvider: locationProvider,
  };

  // const url = `${apiRootUrl}/Attendance/SaveAttendance`;
  const url = `/Attendance/SaveAttendance`;
  console.log({ url, param }, "url-SaveAttendance");

  return await axiosInstance.post(url, param);
};

export const GetAttendanceOfCurrentUser = async () => {
  const userDetail = await getUserDetail();

  // const url = `${apiRootUrl}/Attendance/GetAttendanceByUserId?groupId=${userDetail.groupId}&userId=${userDetail.userId}`;
  const url = `/Attendance/GetAttendanceByUserId?groupId=${userDetail.groupId}&userId=${userDetail.userId}`;
  console.log({ url }, "url-GetAttendanceOfCurrentUser");

  return await axiosInstance.get(url);
};

export const GetAttendanceByMultiparam = async (
  userId: number,
  fromDate: string,
  toDate: string
) => {
  const url = `/Attendance/GetAttendanceByMultiparam?userId=${userId}&fromDT=${fromDate}&toDT=${toDate}`;
  console.log({ url }, "url-GetAttendanceByMultiparam");

  return await axiosInstance.get(url);
};

export const GetAttendanceWithStatusByMultiparam = async (
  userId: number,
  fromDate: string,
  toDate: string
) => {
  const url = `/Attendance/GetAttendanceWithStatusByMultiparam?userId=${userId}&fromDT=${fromDate}&toDT=${toDate}`;
  console.log({ url }, "url-GetAttendanceWithStatusByMultiparam");

  return await axiosInstance.get(url);
};

export const GetLegendsColor = async () => {
  const url = `/Attendance/GetAttendanceLegends`;
  console.log({ url }, "url-GetAttendanceLegends");

  return await axiosInstance.get(url);
};

export const GetIsInAttendanceMarked = async () => {
  const url = `/Attendance/IsInAttendanceMarked`;
  console.log({ url }, "url-GetIsInAttendanceMarked");

  return await axiosInstance.get(url);
};
