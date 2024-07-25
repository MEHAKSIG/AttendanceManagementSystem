import { getDeviceInfo, getDeviceUniqueId } from "../helpers/CommonFunctions";
import { getUserDetail } from "./DataStorageService";
import axiosInstance from "./axios-interceptor/axios-interceptor";

export const SaveMeeting = async (
  status: string,
  latitude?: string | null,
  longitude?: string | null,
  locationName?: string | null | undefined,
  otherLocationDetail?: string | null,
  distanceFromOffice?: number,
  locationProvider?: string | null
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
    Type: "meeting",
    Status: status,
    LocationProvider: locationProvider,
  };

  // const url = `${apiRootUrl}/Attendance/SaveAttendance`;
  const url = `/Meeting/SaveMeetingShortLeave`;
  console.log({ url, param }, "url-SaveMeetingShortLeave");

  return await axiosInstance.post(url, param);
};

export const GetMeetingShortLeave = async (
  userId: number,
  fromDate: string,
  toDate: string
) => {
  const userDetail = await getUserDetail();
  const url = `/Meeting/GetMeetingShortLeave?UserId=${userId}&fromDT=${fromDate}&toDT=${toDate}`;
  console.log({ url }, "url-GetMeetingShortLeave");

  return await axiosInstance.get(url);
};

export const CheckIsMeetingShortLeaveStarted = async (
  type: "meeting" | "shortLeave"
) => {
  const userDetail = await getUserDetail();
  const url = `/Meeting/CheckIsMeetingShortLeaveStarted?type=${type}`;
  console.log({ url }, "url-CheckIsMeetingShortLeaveStarted");

  return await axiosInstance.get(url);
};
