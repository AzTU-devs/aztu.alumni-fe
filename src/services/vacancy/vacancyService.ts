import apiClient from "../../util/apiClient";

export interface VacancyInterface {
    vacancy_code: string;
    category: string;
    job_title: string;
    company: string;
    working_hours: string;
    job_location_type: string;
    employment_type: string;
    country: string;
    city: string;
    salary_min: number;
    salary_max: number;
    currency: string;
    is_salary_public: string;
    deadline: string;
    status: number;
    created_at: string;
}

export const getVacancies = async (start: number, end: number) => {
    try {
        const response = await apiClient.get(`/api/vacancy/all?start=${start}&end=${end}`);

        if (response.data.status_code === 200) {
            return response.data.vacancy;
        } else if (response.data.status_code === 204) {
            return "NO CONTENT";
        } else {
            return "ERROR";
        }
    } catch (err: any) {
        return "ERROR";
    }
}