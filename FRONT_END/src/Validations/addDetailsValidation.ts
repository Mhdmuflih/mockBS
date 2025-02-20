export const addDetailsFormValidation = (formData: any, fieldName?: string) => {
    let errors: any = {};
    let valid: boolean = true;

    const validateField = (field: string) => {
        switch (field) {
            case "experience":
                if (!formData.experience.trim()) {
                    errors.experience = "Year of Experience is required";
                    valid = false;
                } else if (!/^\d+$/.test(formData.experience.trim())) {
                    errors.experience = "Please enter a valid number for experience.";
                    valid = false;
                }
                break;
            case "designation":
                if (!formData.designation.trim()) {
                    errors.designation = "Designation is required";
                    valid = false;
                } else if (!/^[a-zA-Z\s]*$/.test(formData.designation.trim())) {
                    errors.designation = "Please enter a valid designation (letters only).";
                    valid = false;
                }
                break;
            case "organization":
                if (!formData.organization.trim()) {
                    errors.organization = "Organization is required";
                    valid = false;
                } else if (!/^[a-zA-Z\s]*$/.test(formData.organization.trim())) {
                    errors.organization = "Please enter a valid organization name (letters only).";
                    valid = false;
                }
                break;
            case "university":
                if (!formData.university.trim()) {
                    errors.university = "University is required";
                    valid = false;
                } else if (!/^[a-zA-Z\s]*$/.test(formData.university.trim())) {
                    errors.university = "Please enter a valid university name (letters only).";
                    valid = false;
                }
                break;
            case "introduction":
                if (!formData.introduction.trim()) {
                    errors.introduction = "Introduction is required";
                    valid = false;
                } else if (formData.introduction.trim().length < 10) {
                    errors.introduction = "Introduction must be at least 10 characters.";
                    valid = false;
                }
                break;
            default:
                break;
        }
    };

    if (fieldName) {
        // Validate only the specific field
        validateField(fieldName);
    } else {
        // Validate all fields
        Object.keys(formData).forEach((key) => validateField(key));
    }

    return { errors, valid };
};
