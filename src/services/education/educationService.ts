import apiClient from "../../util/apiClient";

export interface Education {
    university: string;
    degree: string;
    major: string;
    start_date: string;
    end_date: string;
    gpa: number
}

export interface EducationPayload {
    uuid: string;
    university: string;
    start_date: string;
    end_date?: string;
    degree: string;
    major: string;
    gpa?: number;
}

export const getEducations = async (uuid: string) => {
    try {
        const response = await apiClient.get(`/api/education/${uuid}`);

        if (response.data.status_code === 200) {
            return response.data.education;
        } else if (response.data.status_code === 204) {
            return "NO CONTENT";
        }
    } catch (err: any) {
        if (err.response) {
            if (err.response.status === 404) {
                return "NOT FOUND";
            }
            return "ERROR";
        }
        return "NETWORK ERROR";
    }
}

export const createEducation = async (data: EducationPayload) => {
    try {
        const response = await apiClient.post("/api/education/create", data);

        if (response.data.status_code === 201) {
            return "SUCCESS";
        } else {
            return "ERROR";
        }
    } catch (err: any) {
        if (err.response) {
            if (err.response.status === 404) {
                return "NOT FOUND";
            }
            return "ERROR";
        }
        return "NETWORK ERROR";
    }
}