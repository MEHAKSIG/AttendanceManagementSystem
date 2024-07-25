// import axios from "axios";
import Config from "../constants/Config";
import { User } from "../models/User";
import { getUserDetail } from "./DataStorageService";
// import Config from "../shared/Config";
import axiosInstance from "./axios-interceptor/axios-interceptor";

const apiRootUrl = Config.apiRootUrl;

export const SaveUser = async (user: User) => {
  const userDetail = await getUserDetail();

  const param = {
    UserId: user.userId,
    GroupId: userDetail.groupId,
    BranchId: user.branchId,
    Name: user.name,
    ECode: user.eCode,
    MobileNo: user.mobileNo,
    Email: user.email,
    Pwd: user.pwd,
    Gender: user.gender,
    Designation: user.designation,
    Department: user.department,
    DOB: user.dob,
    IsWorkFromHome: user.isWorkFromHome,
    IsFieldWork: user.isFieldWork,
    Active: user.active,
    UserRole: "user",
    JoiningDate: user.joiningDate,
    LeftDate: user.leftDate,
    CrtUserId: userDetail.userId,
    ReportingToId: user.ReportingToId,
    WeeklyOffDay1: user.WeeklyOffDay1,
    WeeklyOffDay2: user.WeeklyOffDay2,
    WorkType: user.workType,
  };
  const url = `${apiRootUrl}/User/SaveUser`;
  console.log({ url, param }, "url-SaveUser");
  return await axiosInstance.post(url, param);
};

export const GetAllUsers = async () => {
  // const url = `${apiRootUrl}/User/GetUserByGroupId?groupId=${user.groupId}`;
  const url = `/User/GetUserByGroupId`;

  console.log(url, "url-GetAllUsers-userService.ts");

  return await axiosInstance.get(url);
};

export const GetWorkTypeAsync = async () => {
  // const url = `${apiRootUrl}/User/GetUserByGroupId?groupId=${user.groupId}`;
  const url = `/User/GetWorkTypes`;

  console.log(url, "url-GetWorkTypeAsync.ts");

  return await axiosInstance.get(url);
};

export const GetUsersByUserId = async (userId: number) => {
  // const url = `/User/GetUserByUserId?userId=${userId}`;
  const url = `User/GetUserByUserId?userId=${userId}`;

  console.log(url, "url-GetUsersByUserId");
  return await axiosInstance.get(url);
};

export const ChangePwd = async (currentPwd: string, newPwd: string) => {
  const url = `/Account/ChangePwd?currentPwd=${currentPwd}&newPwd=${newPwd}`;
  console.log(url, "url-ChangePwd");
  return await axiosInstance.get(url);
};
