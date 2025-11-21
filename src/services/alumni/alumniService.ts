import { AxiosError } from "axios";
import apiClient from "../../util/apiClient";

export interface AlumnisInterface {
    uuid: string;
    name: string;
    surname: string;
    father_name: string;
    fin_code: string;
    email: string;
    is_active: string;
    military_obligation: string;
    job_title: string;
    photo: string;
    created_at: string;
    last_login: string;
}

export interface Alumni {
    name: string;
    surname: string;
    father_name: string;
    fin_code: string;
    email: string;
    gender: string;
    birth_date: string;
    job_title: string;
    phone_number: string;
    registered_city: string;
    registered_address: string;
    address: string;
    address_is_public: string;
    military_obligation: string;
    married: string;
    photo: string;
    created_at: string;
    updated_at: string;
    is_active: boolean;
}

export const getAlumnis = async (start: number, end: number) => {
    try {
        const response = await apiClient.get(`/api/alumni/all?start=${start}&end=${end}`);

        if (response.data.status_code === 200) {
            return {
                "total": response.data.total,
                "alumnis": response.data.alumnis
            }
        } else if (response.data.status_code === 204) {
            return "NO CONTENT";
        }
    } catch (err: any) {
        return "ERROR";
    }
}

export const getAlumniDetails = async (uuid: string) => {
  try {
    const response = await apiClient.get(`/api/alumni/${uuid}/details`);

    if (response.data.status_code === 200) {
      return response.data.alumni;
    }
  } catch (error: any) {
    if (error.isAxiosError) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === 404) {
        return "NOT FOUND";
      }

      return "ERROR";
    }

    return "ERROR";
  }
};