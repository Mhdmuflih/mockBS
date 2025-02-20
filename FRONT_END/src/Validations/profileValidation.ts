export const interviewerFormValidation = (formData: any, fieldName?: string) => {
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
            case "currentDesignation":
                if (!formData.currentDesignation.trim()) {
                    errors.currentDesignation = "current Designation name is required";
                    valid = false;
                } else if (!/^[a-zA-Z\s]*$/.test(formData.currentDesignation.trim())) {
                    errors.currentDesignation = "Please enter a valid current Designation (letters only).";
                    valid = false;
                }
                break;
            case "introduction":
                if (!formData.introduction.trim()) {
                    errors.introduction = "introduction is required";
                    valid = false;
                } else if (!/^[a-zA-Z\s]*$/.test(formData.introduction.trim())) {
                    errors.introduction = "Please enter a valid introduction (letters only).";
                    valid = false;
                }
                break;
            case "yearOfExperience":
                const yearOfExperienceStr = String(formData.yearOfExperience).trim();  // Convert to string and trim
                if (!yearOfExperienceStr) {
                    errors.yearOfExperience = "Year of Experience is required";
                    valid = false;
                } else if (!/^\d+$/.test(yearOfExperienceStr)) {
                    errors.yearOfExperience = "Please enter a valid number for Year of Experience.";
                    valid = false;
                } else if (parseInt(yearOfExperienceStr) < 0 || parseInt(yearOfExperienceStr) > 100) {
                    errors.yearOfExperience = "Year of Experience must be between 0 and 100.";
                    valid = false;
                }
                break;


            case "university":
                if (!formData.university.trim()) {
                    errors.university = "university is required";
                    valid = false;
                } else if (!/^[a-zA-Z\s]*$/.test(formData.university.trim())) {
                    errors.position = "Please enter a valid university (letters only).";
                    valid = false;
                }
                break;
            case "organization":
                if (!formData.organization.trim()) {
                    errors.organization = "organization is required";
                    valid = false;
                } else if (!/^[a-zA-Z\s]*$/.test(formData.organization.trim())) {
                    errors.organization = "Please enter a valid organization (letters only).";
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
