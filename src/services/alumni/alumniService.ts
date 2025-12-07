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
  military_obligation: number;
  married: string;
  photo: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface CompleteProfilePayload {
  uuid: string;
  name: string;
  surname: string;
  father_name: string;
  birth_date: string;
  phone_number: string;
  phone_is_public: boolean;
  fin_code: string;
  job_title: string;
  registered_city: string;
  registered_address: string;
  address: string;
  address_is_public: boolean;
  military_obligation: number;
  married: boolean;
}

export const getAlumnis = async (start: number, end: number, search?: string) => {
    try {
        const params = new URLSearchParams();
        params.append("start", start.toString());
        params.append("end", end.toString());
        if (search) params.append("search", search);

        const response = await apiClient.get(`/api/alumni/all?${params.toString()}`);

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

export const completeProfile = async (payload: CompleteProfilePayload) => {
  try {
    const response = await apiClient.post("/api/alumni/complete", payload);

    if (response.data.status_code === 200) {
      return "SUCCESS";
    }
  } catch (error: any) {
    if (error?.response?.status === 404) {
      return "NOT FOUND";
    }

    if (error?.response?.status === 409) {
      const message = error.response.data.message as string;
      if (message.toLowerCase().includes("phone")) {
        return "PHONE_CONFLICT";
      } else if (message.toLowerCase().includes("fin")) {
        return "FIN_CONFLICT";
      }
      return "CONFLICT";
    }

    return "ERROR";
  }
};

export const uploadUserProfilePhoto = async (uuid: string, file: File) => {
  try {
    const formData = new FormData();
    formData.append("uuid", uuid);
    formData.append("file", file);

    const response = await apiClient.post("/api/profile-photo/upload", formData);

    if (response.data?.status_code === 201) {
      return { status: "SUCCESS", data: response.data };
    }

    return { status: "ERROR", data: null };

  } catch (error: any) {
    const status = error?.response?.status;

    if (status === 404) return { status: "NOT_FOUND", data: null };
    if (status === 400) return { status: "INVALID_FILE", data: null };

    return { status: "ERROR", data: null };
  }
};