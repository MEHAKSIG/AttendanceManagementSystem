import axios from "axios";
import Config from "../constants/Config";
import { getUserDetail } from "./DataStorageService";

const apiRootUrl = Config.apiVersionUpdateUrl;

export const CheckAppVersionUpdate = async (
  packageName: string,
  installedAppVersion: string,
  platformOS: string
) => {
  // const url = `${apiRootUrl}/User/GetUserByGroupId?groupId=${user.groupId}`;
  const userDetail = await getUserDetail();

  const url = `${apiRootUrl}/AppDetail/CheckAppVersionUpdate`;

  const param = {
    packageName: packageName,
    installedAppVersion: installedAppVersion,
    platformOS: platformOS,
    userId: userDetail?.userId ?? 0,
    groupId: userDetail?.groupId ?? 0,
    groupCode: userDetail?.groupName ?? "",
    otherDetail: userDetail ? JSON.stringify(userDetail) : "",
  };

  console.log({ url, param }, "url-CheckAppVersionUpdate");

  return await axios.post(url, param);
};
