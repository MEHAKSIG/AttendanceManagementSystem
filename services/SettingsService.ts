import axiosInstance from "./axios-interceptor/axios-interceptor";

export const GetSettingsAsync = async () => {
  const url = `/Settings/Get`;
  console.log({ url }, "url-GetSettings");

  return await axiosInstance.get(url);
};
