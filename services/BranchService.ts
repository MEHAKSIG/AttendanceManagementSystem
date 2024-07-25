import Config from "../constants/Config";
import { getUserDetail } from "./DataStorageService";
// import Config from "../shared/Config";
import axiosInstance from "./axios-interceptor/axios-interceptor";

const apiRootUrl = Config.apiRootUrl;

export const GetAllBranches = async () => {
  // const url = `${apiRootUrl}/Branches/GetBranchByGroup?groupId=${user.groupId}`;
  const url = `/Branches/GetBranchByGroup`;

  console.log(url, "url-GetBranchesByGroupId");
  return await axiosInstance.get(url);
};

export const SaveBranches = async (
  branchCode: string,
  branchId: number,
  userId: number,
  branchName: string,
  locationName?: string,
  branchLatitude?: number,
  branchLongitude?: number,
  weeklyOffDayVal1?: string,
  weeklyOffDayVal2?:string
) => {
  // const user = await getUserDetail();
  const param = {
    BranchCode: branchCode,
    BranchId: branchId,
    UserId: userId,
    BranchName: branchName,
    BranchLatitude: branchLatitude,
    BranchLongitude: branchLongitude,
    LocationName: locationName,
    WeeklyOffDay1: weeklyOffDayVal1,
  WeeklyOffDay2:weeklyOffDayVal2
  };
  const url = `/Branches/BranchesSave`;
  console.log(url, "url-SaveBranches");
  return await axiosInstance.post(url, param);
};
