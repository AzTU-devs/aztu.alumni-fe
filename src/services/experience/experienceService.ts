import apiClient from "../../util/apiClient";

export interface Experience {
    job_title: string;
    company: string;
    start_date: string;
    end_date: string;
    employment_type: number;
    job_location_type: number;
    description: string;
}

export interface ExperiencePayload {
    uuid: string;
    company: string;
    job_title: string;
    start_date: string;
    end_date?: string;
    employment_type: number;
    job_location_type: number;
    description?: string;
}

export const createExperience = async (payload: ExperiencePayload) => {
    try {
        const response = await apiClient.post("/api/experience/create", payload);

        if (response.data.status_code === 201) {
            return "SUCCESS";
        }
        return `ERROR: ${response.status}`;
    } catch (error: any) {
        if (error.response?.status === 404) {
            return "NOT_FOUND";
        }

        return "UNKNOWN_ERROR";
    }
};
export const getExperiences = async (uuid: string) => {
    try {
        const response = await apiClient.get(`/api/experience/${uuid}`);

        if (response.data.status_code === 200) {
            return response.data.experiences;
        } else if (response.data.status_code === 204) {
            return "NO CONTENT";
        }
    } catch (err: any) {
        if (err.response?.status === 404) {
            return "NOT_FOUND";
        }

        return "UNKNOWN_ERROR";
    }
}