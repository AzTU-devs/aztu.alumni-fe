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
    description: string;
    html_content: string;
    created_at: string;
    is_saved: boolean;
}

export interface VacancyPayload {
    category_code: string;
    job_title: string;
    company: string;
    working_hours: string;
    job_location_type: number;
    employment_type: number;
    country: string;
    city: string;
    salary_min: number;
    salary_max: number;
    currency: number;
    is_salary_public: boolean;
    deadline: string;
    status: number;
    description: string;
    html_content: string;
}

export const getVacancies = async (
    start: number,
    end: number,
    uuid?: string | null,
    search?: string,
    employment_type?: number,
    job_location_type?: number,
    vacancy_category?: string
) => {
    try {
        const params = new URLSearchParams();

        params.append("start", start.toString());
        params.append("end", end.toString());

        if (uuid) params.append("uuid", uuid);
        if (search) params.append("search", search);
        if (employment_type !== undefined) params.append("employment_type", employment_type.toString());
        if (job_location_type !== undefined) params.append("job_location_type", job_location_type.toString());
        if (vacancy_category) params.append("vacancy_category", vacancy_category);

        const response = await apiClient.get(`/api/vacancy/all?${params.toString()}`);

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
};

export const createVacancy = async (payload?: any) => {
    try {
        const response = await apiClient.post("/api/vacancy/create", payload);

        if (response.data.status_code === 201) {
            return "SUCCESS";
        }
    } catch (err: any) {
        if (err.response?.status === 404) {
            return "NOT FOUND";
        }
        return "ERROR";
    }
};

// categories

export interface VacancyCategoriesInterface {
    category_code: string;
    title: string;
    created_at: string;
}

export interface UpdateVacancyCategoryPayload {
    category_code: string;
    title: string;
}

export interface CreateVacancyCategory {
    title: string;
}

export const createVacancyCategory = async (payload: CreateVacancyCategory) => {
    try {
        const response = await apiClient.post("/api/vacancy/category/create", payload);

        if (response.data.status_code === 201) {
            return "SUCCESS";
        }
    } catch (err: any) {
        if (err.response?.status === 409) {
            return "CONFLICT";
        }
        return "ERROR";
    }
}

export const getVacancyCategories = async () => {
    try {
        const response = await apiClient.get("/api/vacancy/category/all");

        if (response.data.status_code === 200) {
            return response.data.categories;
        } else if (response.data.status_code === 204) {
            return "NO CONTENT";
        }
    } catch (err: any) {
        return "ERROR";
    }
};

export const updateVacancyCategory = async (payload: UpdateVacancyCategoryPayload) => {
    try {
        const response = await apiClient.put("/api/vacancy/category/update", payload);

        if (response.data.status_code === 200) {
            return "SUCCESS";
        }
    } catch (err: any) {
        if (err.response?.status === 404) {
            return "NOT FOUND";
        }

        return "ERROR";
    }
}

export const deleteCategory = async (categoryCode: string) => {
    try {
        const response = await apiClient.delete(
            `/api/vacancy/category/${categoryCode.toString()}/delete`
        );

        if (response.data?.status_code === 200) {
            return "SUCCESS";
        }

        return `ERROR_${response.status}`;
    } catch (error: any) {

        const status = error?.response?.status;

        if (status === 404) {
            return "NOT_FOUND";
        }

        if (status === 500) {
            return "SERVER_ERROR";
        }

        if (status) {
            return `ERROR_${status}`;
        }

        return "UNKNOWN_ERROR";
    }
};

// saved vacancies

export interface SaveVacancyPaload {
    uuid: string;
    vacancy_code: string;
}

export const saveVacancy = async (payload: SaveVacancyPaload) => {
    try {
        const response = await apiClient.post("/api/vacancy/save", payload);

        if (response.data.status_code === 201) {
            return "SUCCESS";
        }

        return "ERROR";
    } catch (error: any) {

        const status = error?.response?.status;

        if (status === 404) {
            return "NOT_FOUND";
        }

        if (status) {
            return `ERROR_${status}`;
        }

        return "UNKNOWN_ERROR";
    }
}

export const getSavedVacancies = async (uuid: string) => {
    try {
        const response = await apiClient.get(`/api/vacancy/${uuid}/saved`);

        if (response.data.status_code) {
            return response.data.vacancies;
        } else if (response.data.status_code === 204) {
            return "NO_CONTENT";
        }
    } catch (err: any) {
        return "ERROR";
    }
}