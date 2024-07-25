import axios from "axios";
import Config from "../../constants/Config";
import { getTokens } from "../DataStorageService";

// const { onAuthenticationSuccess } = React.useContext(AuthContext);

const axiosInstance = axios.create({
  baseURL: Config.apiRootUrl,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async (config: any) => {
    const tokens = await getTokens();
    if (tokens && config.headers) {
      config.headers["Authorization"] = "Bearer " + tokens.accessToken;
    }
    // config.headers['Content-Type'] = 'application/json';
    // console.log(axiosInstance.getUri(), "axiosInstance.getUri()");
    return config;
  },
  (error: any) => {
    Promise.reject(error);
  }
);

// axiosInstance.interceptors.response.use(
//   (response: any) => {
//     return response;
//   },

//   async (error: any) => {
//     const originalRequest = error.config;

//     // if (
//     //   error.response.status === 401 &&
//     //   originalRequest.url === "http://127.0.0.1:3000/v1/auth/token"
//     // ) {
//     // //   router.push("/login");
//     //   return Promise.reject(error);
//     // }

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const tokens = await getTokens();

//       //   const refreshToken = localStorageService.getRefreshToken();
//       return RefreshToken(tokens.accessToken, tokens.refreshToken).then(
//         (res) => {
//           const resData = res.data;
//           console.log(resData, "refreshToken-interceptors.response");
//           // if (res.status === 200 && resData?.IsSuccess) {
//           if (resData?.IsSuccess) {
//             setTokens(
//               resData.Result?.accessToken,
//               resData.Result?.refreshToken
//             );
//             // localStorageService.setToken(res.data);
//             axios.defaults.headers.common["Authorization"] =
//               "Bearer " + resData.Result?.accessToken;
//             return axios(originalRequest);
//           } else {
//             alert("Session Expired !. Please login again");
//             //logout user
//             // onAuthenticationSuccess && onAuthenticationSuccess(false);
//           }
//         }
//       );
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
