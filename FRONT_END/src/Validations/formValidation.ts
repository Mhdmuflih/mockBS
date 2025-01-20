export const formValidation = (formData: any, mode: "login" | "signup" = "signup", fieldName?: string) => {
    let errors: any = {};
    let valid = true;

    const validateField = (field: string) => {
        switch (field) {
            case "name":
                if (!formData.name.trim()) {
                    errors.name = "Username is required";
                    valid = false;
                } else if (!/^[a-zA-Z\s]*$/.test(formData.name.trim())) {
                    errors.name = "Please enter a valid name.";
                    valid = false;
                }
                break;

            case "email":
                if (!formData.email.trim()) {
                    errors.email = "Email is required";
                    valid = false;
                } else if (!/^[^!#$%&'*+/=?^_`{|}~]+@gmail\.com$/i.test(formData.email.trim())) {
                    errors.email = "Please enter a valid email ID.";
                    valid = false;
                }
                break;

            case "mobile":
                if (!formData.mobile.trim()) {
                    errors.mobile = "Mobile number is required";
                    valid = false;
                } else if (!/^(?!([0-9])\1{9})[1-9]\d{9}$/.test(formData.mobile.trim())) {
                    errors.mobile = "Please enter a valid mobile number.";
                    valid = false;
                }
                break;

            case "password":
                if (!formData.password.trim()) {
                    errors.password = "Password is required";
                    valid = false;
                } else {
                    const passwordRegex = [
                        { regex: /.{8,}/, message: "At least 8 characters" },
                        { regex: /\d/, message: "At least 1 digit" },
                        { regex: /[a-z]/, message: "At least 1 lowercase letter" },
                        { regex: /[!@#$%^&*]/, message: "At least 1 special character" },
                        { regex: /[A-Z]/, message: "At least 1 uppercase letter" },
                    ];

                    const passwordErrors = passwordRegex
                        .filter((rule) => !rule.regex.test(formData.password.trim()))
                        .map((rule) => rule.message);

                    if (passwordErrors.length > 0) {
                        errors.password = passwordErrors.join(", ");
                        valid = false;
                    }
                }
                break;

            default:
                break;
        }
    };

    if (fieldName) {
        // Validate only the specified field
        validateField(fieldName);
    } else {
        // Validate all fields based on mode
        if (mode === "signup") {
            validateField("name");
            validateField("email");
            validateField("mobile");
            validateField("password");
        } else if (mode === "login") {
            validateField("email");
            validateField("password");
        }
    }

    return { valid, errors };
};
