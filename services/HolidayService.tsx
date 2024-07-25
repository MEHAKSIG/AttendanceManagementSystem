import axiosInstance from "./axios-interceptor/axios-interceptor";
import { getUserDetail } from "./DataStorageService";

export const SaveHoliday = async (
  holidayId: number | undefined,
  holidayDate: string,
  holidayName: string,
  branchId: number | undefined,
  active?: boolean
) => {
  //const userDetail = await getUserDetail();

  const param = {
    HolidayId: holidayId,
    HolidayDate: holidayDate,
    HolidayName: holidayName,
    BranchId: branchId,
    Active: active,
    //UserId: userDetail.userId,
  };

  const url = `/Holiday/SaveHoliday`;
  console.log({ url, param }, "url-SaveHoliday");

  return await axiosInstance.post(url, param);
};

export const GetHolidays = async () => {
  //const userDetail = await getUserDetail();
  //const url = `/Holiday/GetHoliday?UserId=${userDetail.userId}`;
  const url = `/Holiday/GetHoliday`;
  console.log({ url }, "url-GetHolidays");

  return await axiosInstance.get(url);
};

export const DeleteHolidays = async (HolidayId: number) => {
  //const userDetail = await getUserDetail();
  const url = `/Holiday/Delete?holidayId=${HolidayId}`;
  console.log({ url }, "url-DeleteHolidays");

  return await axiosInstance.get(url);
};