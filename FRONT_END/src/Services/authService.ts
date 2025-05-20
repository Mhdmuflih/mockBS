import { UnProtectedAPI } from "../Config/axiosConfig";
import { ICandidateForgotPasswordApiResponse, ICandidateLoginApiResponse, ICandidateSignupApiResponse, ISuccess } from "../Interface/candidateInterfaces/IApiResponce";
import { IFormData, IFormDataLogin } from "../Interface/Interface";


const handleError = (error: any): never => {
    // Log the error
    console.error("API Error:", error);

    // Check if the error has a response object from the server
    const errorMessage = error.response?.data?.message || "An unexpected error occurred.";

    // Throw a structured error with the message
    throw new Error(errorMessage);
};



// Candidate Routes

export const googleAuthenticationCandidate = async ({ email, name, profileImage }: { email: string, name: string, profileImage: string }) => {
    try {
        const response = await UnProtectedAPI.post('/candidate/google', { email, name, profileImage }, { headers: { 'Content-Type': 'application/json' } });
        return response.data;
    } catch (error: any) {
        handleError(error);
    }
}



export const signUpCandidate = async (formData: IFormData): Promise<ICandidateSignupApiResponse> => {
    try {
        const response = await UnProtectedAPI.post<ICandidateSignupApiResponse>('/candidate/sign-up', formData)
        return response.data;
    } catch (error: any) {
        return handleError(error);
    }
}

export const verifyCandidateOTP = async (otp: number, email: string): Promise<ISuccess> => {
    try {
        const response = await UnProtectedAPI.post<ISuccess>('/candidate/otp', { otp: Number(otp), email: email });
        return response.data;
    } catch (error: any) {
        return handleError(error);
    }
}

export const resendCandidateOTP = async (email: string, context: string): Promise<ISuccess> => {
    try {
        const response = await UnProtectedAPI.post<ISuccess>('/candidate/resend-otp', { email, context });
        return response.data;
    } catch (error: any) {
        return handleError(error);
    }
}

export const forgotPasswordCandidate = async ({ email }: { email: string }): Promise<ICandidateForgotPasswordApiResponse> => {
    try {
        const response = await UnProtectedAPI.post<ICandidateForgotPasswordApiResponse>('/candidate/forgot-password', { email });
        return response.data;
    } catch (error: any) {
        return handleError(error);
    }
}

export const verifyCandidateForgotPasswordOTP = async (otp: number, email: string): Promise<ISuccess> => {
    try {
        const response = await UnProtectedAPI.post<ISuccess>('/candidate/email-verify', { email, otp });
        return response.data;
    } catch (error: any) {
        return handleError(error);
    }
}

export const changeCandidatePassword = async ({ email, password, confirmPassword }: { email: string, password: string, confirmPassword: string }): Promise<ISuccess> => {
    try {
        const response = await UnProtectedAPI.patch<ISuccess>('/candidate/change-password', { email, password, confirmPassword });
        return response.data;
    } catch (error: any) {
        return handleError(error);
    }
}

export const loginCandidate = async (formData: IFormDataLogin): Promise<ICandidateLoginApiResponse> => {
    try {
        const response = await UnProtectedAPI.post<ICandidateLoginApiResponse>('/candidate/login', formData);
        return response.data;
    } catch (error: any) {
        return handleError(error);
    }
}



// Interviewer Routes

export const signUpInterviewer = async (formData: IFormData) => {
    try {
        const response = await UnProtectedAPI.post('/interviewer/sign-up', formData)
        return response.data;
    } catch (error: any) {
        handleError(error)
    }
}

export const verifyInterviewerOTP = async (otp: number, email: string) => {
    try {
        const response = await UnProtectedAPI.post('/interviewer/otp', { otp: Number(otp), email: email });
        return response.data;
    } catch (error: any) {
        handleError(error)

    }
}

export const resendInterviewerOTP = async (email: string, context: string) => {
    try {
        const response = await UnProtectedAPI.post('/interviewer/resend-otp', { email, context });
        return response.data;
    } catch (error: any) {
        handleError(error)
    }
}

export const forgotPasswordInterviewer = async ({ email }: { email: string }) => {
    try {
        const response = await UnProtectedAPI.post('/interviewer/forgot-password', { email });
        return response.data;
    } catch (error: any) {
        handleError(error);
    }
}

export const verifyInterviewerForgotPasswordOTP = async (otp: number, email: string) => {
    try {
        const response = await UnProtectedAPI.post('/interviewer/email-verify', { email, otp });
        return response.data;
    } catch (error: any) {
        handleError(error);
    }
}

export const changeInterviewerPassword = async ({ email, password, confirmPassword }: { email: string, password: string, confirmPassword: string }) => {
    try {
        const response = await UnProtectedAPI.patch('/interviewer/change-password', { email, password, confirmPassword });
        return response.data;
    } catch (error: any) {
        handleError(error);
    }
}

export const loginInterviewer = async (formData: IFormDataLogin) => {
    try {
        const response = await UnProtectedAPI.post('/interviewer/login', formData);
        return response.data;
    } catch (error: any) {
        handleError(error);
    }
}


// Admin Routes

export const signUpAdmin = async (formData: IFormData) => {
    try {
        const response = await UnProtectedAPI.post('/admin/sign-up', formData)
        return response.data;
    } catch (error: any) {
        handleError(error)
    }
}

export const verifyAdminOTP = async (otp: number, email: string) => {
    try {
        const response = await UnProtectedAPI.post('/admin/otp', { otp: Number(otp), email: email });
        return response.data;
    } catch (error: any) {
        handleError(error)

    }
}

export const resendAdminOTP = async (email: string) => {
    try {
        const response = await UnProtectedAPI.post('/admin/resend-otp', { email });
        return response.data;
    } catch (error: any) {
        handleError(error)
    }
}

export const loginAdmin = async (formData: IFormDataLogin) => {
    try {
        const response = await UnProtectedAPI.post('/admin/login', formData);
        return response.data;
    } catch (error: any) {
        handleError(error);
    }
}