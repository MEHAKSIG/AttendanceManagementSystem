import axios from 'axios';
import React, { useContext, useMemo } from 'react';
import AuthContext from '../../context/AuthContext';
import { RefreshToken } from '../AccountService';
import { getTokens, setTokens } from "../DataStorageService";
import axiosInstance from './axios-interceptor';

interface WithAxiosProps {
    children: React.ReactElement
}
const WithAxios = (props: WithAxiosProps) => {
    const { children } = props;
    const { onAuthenticationSuccess } = React.useContext(AuthContext);

    // useMemo(() => {
    axiosInstance.interceptors.response.use(
        (response: any) => {
            return response;
        },
        async (error: any) => {
            const originalRequest = error.config;

            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                const tokens = await getTokens();

                const res = await RefreshToken(tokens.accessToken, tokens.refreshToken);
                const resData = res.data;
                // console.log(resData, "refreshToken-interceptors.response");
                // if (res.status === 200 && resData?.IsSuccess) {
                if (resData?.IsSuccess) {
                    setTokens(
                        resData.Result?.accessToken,
                        resData.Result?.refreshToken
                    );
                    axios.defaults.headers.common["Authorization"] =
                        "Bearer " + resData.Result?.accessToken;
                    return axiosInstance(originalRequest);
                } else {
                    onAuthenticationSuccess && onAuthenticationSuccess(false);
                    // alert("Session Expired !. Please login again");
                }

            }
            return Promise.reject(error);
        }
    );
    // }, [setUser])

    return children
}

export default WithAxios
