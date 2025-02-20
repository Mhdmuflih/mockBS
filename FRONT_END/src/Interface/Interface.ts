import { ReactNode } from "react";

export interface SignupProps {
    icon: ReactNode;
    chaild?: ReactNode;
    heading: string;
    onNavigate: () => void;
    formData: {
        name: string;
        mobile: string;
        email: string;
        password: string;
    }
    handleTakeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleToSubmit: (event: React.FormEvent) => void;
    errors: any;
}

export interface IFormData {
    name: string;
    mobile: string;
    email: string;
    password: string;
}


export interface OtpProps {
    otp: string[];
    timer: number;
    canResend: boolean;
    inputs: React.RefObject<HTMLInputElement[]>;
    handleResendOTP: () => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void;
    handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
}

export interface IFormDataLogin {
    email: string;
    password: string;
}

export interface LoginProps {
    icon: ReactNode;
    chaild?: ReactNode;
    heading: string;
    formDataLogin: {
        email: string;
        password: string;
    }
    onNavigate: () => void;
    forgotPassword: () => void;
    handleTakeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleToSubmit: (event: React.FormEvent) => void;
    errors: any
}

export interface forgotProps {
    formData: {
        email: string;
    }
    onNavigate: () => void;
    handleTakeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleToSubmit: (event: React.FormEvent) => void;
    errors: any
}

export interface changePassword {
    formData: {
        password: string;
        confirmPassword: string;
    }
    handleTakeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleToSubmit: (event: React.FormEvent) => void;
    errors: any
}

export interface IPassword {
    formData: {
        currentPassword: string;
        password: string;
        confirmPassword: string;
    }
    handleTakeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleToSubmit: (event: React.FormEvent) => void;
    errors: any
}