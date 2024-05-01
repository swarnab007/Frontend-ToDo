import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    },
    });

export const apiConnector = (method, url, bodydata, headers, params) => {
    return axiosInstance({
      method: `${method}`,
      url: `${url}`,
      data: bodydata ? bodydata : null,
      headers: headers ? headers : null,
      params: params ? params : null,
      withCredentials: true,
    });
  };