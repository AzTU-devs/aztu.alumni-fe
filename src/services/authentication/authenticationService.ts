import apiClient from "../../util/apiClient";

export interface SignupPayload {
    name: string;
    surname: string;
    father_name: string;
    gender: string;
    birth_date: string;
    major_code: string;
    email: string;
    password: string;
    education_degree: string;
    start_date: string;
    end_date: string;
}

export interface VerifySignupPayload {
    name: string;
    surname: string;
    father_name: string;
    gender: string;
    birth_date: string;
    major_code: string;
    email: string;
    password: string;
    education_degree: string;
    start_date: string;
    end_date: string;
    otp: number;
}

export interface SigninPayload {
    email: string;
    password: string;
}

export const signup = async (data: SignupPayload) => {
    try {
        const response = await apiClient.post("/api/auth/signup", data);

        if (response.data.status_code === 200) {
            return "SUCCESS";
        }

        return "UNKNOWN_ERROR";

    } catch (error: any) {

        if (error.response && error.response.status === 409) {
            return "EMAIL_EXISTS";
        }

        if (!error.response) {
            return "NETWORK_ERROR";
        }

        return "SERVER_ERROR";
    }
};

export const verifySignup = async (data: VerifySignupPayload) => {
    try {
        const response = await apiClient.post("/api/auth/signup/verify", data);

        if (response.data.status_code === 201) {
            return "SUCCESS";
        }

        return "UNKNOWN_ERROR";

    } catch (error: any) {

        if (error.response) {
            const status = error.response.status;

            if (status === 400) return "BAD_REQUEST";
            if (status === 401) return "INVALID_OTP";
            if (status === 409) return "EMAIL_EXISTS";
            if (status === 410) return "OTP_EXPIRED";
            if (status === 500) return "SERVER_ERROR";

            return "UNKNOWN_ERROR";
        }

        return "NETWORK_ERROR";
    }
};

export const signin = async (data: SigninPayload) => {
    try {
        const response = await apiClient.post("/api/auth/signin", data);

        if (response.data.status_code === 200) {
            return {
                token: response.data.token,
                alumni: response.data.alumni
            };
        }
    } catch (err: any) {
        if (err.response) {
            const status = err.response.status;
            if (status === 401) return "UNAUTHORIZED";
            if (status === 404) return "NOT_FOUND";
            if (status === 500) return "SERVER_ERROR"
            return "UNKNOWN_ERROR";
        }
        return "NETWORK_ERROR";
    }
};