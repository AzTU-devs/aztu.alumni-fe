import apiClient from "../../util/apiClient";

export interface Requirements {
    vacancy_code: string;
    title: string;
}

export const getRequirements = async (vacancyCode: string) => {
    try {
        const response = await apiClient.get(`/api/vacancy/requirement/${vacancyCode}`);

        if (response.data.status_code === 200) {
            return response.data.requirements;
        } else if (response.data.status_code === 204) {
            return "NO CONTENT";
        }
    } catch (err: any) {
        return "ERROR";
    }
}