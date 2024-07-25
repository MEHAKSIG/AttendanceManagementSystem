import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../models/User";

export const clearAsyncStorage = async () => {
  AsyncStorage.clear();
};

export const setTokens = async (accessToken: string, refreshToken: string) => {
  // console.log({ accessToken, refreshToken }, "settokens");
  await AsyncStorage.setItem(
    "tokens",
    JSON.stringify({
      accessToken: accessToken,
      refreshToken: refreshToken,
    })
  );
};

export const getTokens = async () => {
  const tokens = await AsyncStorage.getItem("tokens");
  if (tokens) {
    const token = JSON.parse(tokens);
    // console.log(token, "getTokens-DataStorageService");
    return {
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
    };
  }
  return {
    accessToken: "",
    refreshToken: "",
  };
};

export const setGoogleApiKeyForLocation = async (googleApiKey: string) => {
  console.log({ googleApiKey }, "googleapikey");
  await AsyncStorage.setItem(
    "googleapikey",
    JSON.stringify({
      googleApiKey: googleApiKey,
    })
  );
};
export const getGoogleApiKeyForLocation = async () => {
  const googleapikey = await AsyncStorage.getItem("googleapikey");
  if (googleapikey) {
    const apikey = JSON.parse(googleapikey);
    // console.log(apikey, "getGoogleApiKeyForLocation-DataStorageService");
    return apikey.googleApiKey; // Return the API key
  }
  return ""; // Return an empty string if the API key is not found
};

export const setUserDetail = async (userObj: any) => {
  // console.log(userObj, "userObj-setUserDetail");
  await AsyncStorage.setItem("userDetail", JSON.stringify(userObj));
};
export const getUserDetail = async (): Promise<User> => {
  let userDetail: User = {
    userId: 0,
    name: "",
    email: "",
    groupId: 0,
    mobileNo: "",
    department: "",
    designation: "",
    groupName: "",
    appType: "",
    userRole: "",
    isWorkFromHome: false,
    branchId: 0,
    branchLatitude: 0,
    branchLongitude: 0,
    isDemoAccount: true,
  };

  const user = await AsyncStorage.getItem("userDetail");
  const data = user && JSON.parse(user);
  if (data) {
    userDetail = {
      userId: data.UserId,
      groupId: data?.GroupId,
      name: data?.Name,
      email: data?.Email,
      mobileNo: data?.MobileNo,
      department: data?.Department,
      // groupName: data?.GroupName,
      userRole: data?.UserRole,
      isWorkFromHome: data?.IsWorkFromHome,
      branchId: data?.BranchId,
      branchLatitude: data?.BranchLatitude,
      branchLongitude: data?.BranchLongitude,
      isDemoAccount: data?.IsDemoAccount,
    };
  }
  return userDetail;
};

export const isUserAdmin = async () => {
  const userDetail = await getUserDetail();
  return userDetail.userRole?.toLowerCase() == "admin";
};

export const getUserRoleLocalStorage = async () => {
  const userDetail = await getUserDetail();
  // const userDetail = this.getUserDetail();
  let isAdmin = false;
  let isUser = false;
  let isBranchHead = false;
  let isSuperAdmin = false;
  if (userDetail?.userRole == "admin") isAdmin = true;
  if (userDetail?.userRole == "user") isUser = true;
  if (userDetail?.userRole == "branchHead") isBranchHead = true;
  if (userDetail?.userRole == "superAdmin") isSuperAdmin = true;

  return {
    IsAdmin: isAdmin,
    IsUser: isUser,
    IsBranchHead: isBranchHead,
    IsSuperAdmin: isSuperAdmin,
  };
};

export const setSettingsLocalStorage = async (settingsObj: string) => {
  // console.log({ settingsObj }, "settings");
  await AsyncStorage.setItem("settings", JSON.stringify(settingsObj));
};
export const getSettingsLocalStorage = async () => {
  const settings = await AsyncStorage.getItem("settings");
  if (settings) {
    const settingsObj = JSON.parse(settings);
    // console.log(settingsObj, "getGoogleApiKeyForLocation-DataStorageService");
    return {
      LocationProvider: settingsObj.LocationProvider,
    };
  }
  return {}; // Return an empty string if the API key is not found
};
