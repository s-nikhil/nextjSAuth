import axios from "axios";

const APP_URL = process.env.NEXT_PUBLIC_API_URL;

export const getLoginDetails = async (payload) => {
  try {
    const response = await axios.post(`${APP_URL}login`, payload);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    return error?.response;
  }
};

export const getUserDetails = async (headers) => {
  try {
    const response = await axios.get(`${APP_URL}details`, {
      headers: {
        ...headers,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    return null;
  }
};