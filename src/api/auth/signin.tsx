import axios, { AxiosResponse, AxiosError } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface LoginPayload {
  email: string,
  password: string
}

interface UserDetails {
  email: string
}


export const getLoginDetails = async (
  payload: LoginPayload
): Promise<any | AxiosResponse<any>> => {
  try {
    const response = await axios.post(`${API_URL}login`, payload);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    if (isAxiosError(error)) {
      return (error as AxiosError).response;
    } else {
      return error;
    }
  }
};

export const getUserDetails = async (
  headers: Record<string, string>
): Promise<UserDetails | null> => {
  try {
    const response = await axios.get(`${API_URL}details`, {
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

// Helper function to check if the error is an AxiosError
function isAxiosError(error: any): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}