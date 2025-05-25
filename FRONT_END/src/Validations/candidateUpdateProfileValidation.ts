export const candidateUpdateProfileValidation = (formData: any, fieldName?: string) => {
    let errors: any = {};
    let valid: boolean = true;

    const validateField = (field: string) => {
        switch (field) {
            case "name":
                if (!formData.name.trim()) {
                    errors.name = "Name is required";
                    valid = false;
                } else if (!/^[a-zA-Z\s]*$/.test(formData.name.trim())) {
                    errors.name = "Please enter a valid name (letters only).";
                    valid = false;
                }
                break;
            case "email":
                if (!formData.email.trim()) {
                    errors.email = "Email is required";
                    valid = false;
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
                    errors.email = "Please enter a valid email address.";
                    valid = false;
                }
                break;
            case "mobile":
                if (!formData.mobile.trim()) {
                    errors.mobile = "Mobile number is required";
                    valid = false;
                } else if (!/^\d{10}$/.test(formData.mobile.trim())) {
                    errors.mobile = "Please enter a valid 10-digit Mobile number.";
                    valid = false;
                }
                break;
        }
    }

    if (fieldName) {
        // Validate only the specific field
        validateField(fieldName);
    } else {
        // Validate all fields
        Object.keys(formData).forEach((key) => validateField(key));
    }

    return { errors, valid };
}