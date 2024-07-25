import axios from "axios";
import Config from "../constants/Config";
// import Config from "../shared/Config";

const apiRootUrl = Config.apiRootUrl;

export const AuthenticateUser = async (username: string, pwd: string) => {
  const url = `${apiRootUrl}/Account/AuthenticateUser?username=${username}&pwd=${pwd}`;

  console.log(url, "url-AuthenticateUser");

  return await axios.post(url, { username: username, password: pwd });
};

export const RefreshToken = async (
  expiredToken: string,
  refreshToken: string
) => {
  const url = `${apiRootUrl}/Account/RefreshToken`;
  const param = {
    AccessToken: expiredToken,
    RefreshToken: refreshToken,
  };
  // console.log({ url, param }, "url-RefreshToken");

  return await axios.post(url, param);
};

export const SendOTPOnMail = async (email: string) => {
  const url = `${apiRootUrl}/Account/SendOTPOnMail?email=${email}`;
  console.log(url, "url-SendOTPOnMail");
  return await axios.get(url);
};

export const RegisterGroup = async (
  groupCode: string,
  compName: string,
  name: string,
  email: string,
  mobileNo: string,
  pwd: string
) => {
  const param = {
    GroupCode: groupCode,
    CompanyName: compName,
    Name: name,
    MobileNo: mobileNo,
    Email: email,
    Pwd: pwd,
    Gender: "",
    Designation: "",
    Department: "",
    DOB: "",
  };
  const url = `${apiRootUrl}/Account/RegisterGroup`;
  console.log({ url, param }, "url-RegisterGroup");
  return await axios.post(url, param);
};

export const SaveBranchesAfterRegisteration = async (
  accessToken: string,
  branchCode: string,
  branchId: number,
  userId: number,
  branchName: string,
  locationName?: string,
  branchLatitude?: number,
  branchLongitude?: number
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
  };
  const url = `${apiRootUrl}/Branches/BranchesSave`;
  console.log(
    { url, accessToken, param },
    "url-SaveBranchesAfterRegisteration"
  );
  return await axios.post(url, param, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
