import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AxiosInterceptor = ({ children }) => {
    const navigate = useNavigate();

    const resInterceptorRes = (response) => {
        return response;
    }
    const errInterceptorRes = (error) => {
        if(error.response.status === 401) {
            navigate('/connexion');
        }
        return Promise.reject(error);
    };
    const interceptorRes = axios.interceptors.response.use(resInterceptorRes, errInterceptorRes);

    const reqInterceptorReq = (request) => {
        request.headers = {
            authorization: `Bearer ${localStorage.getItem('token')}`,
        };
        return request;
    };

    const errInterceptorReq = (error) => {
        return Promise.reject(error);
    };

    const interceptorReq = axios.interceptors.request.use(reqInterceptorReq, errInterceptorReq)

    return children;


    
};

export default AxiosInterceptor;
