export const addDetailsFormValidation = (formData: any, fieldName?: string) => {
    let errors: any = {};
    let valid: boolean = true;

    const validateField = (field: string) => {
        switch (field) {
            case "yearOfExperience":
                if (!formData.yearOfExperience.trim()) {
                    errors.yearOfExperience = "Year of Experience is required";
                    valid = false;
                } else if (!/^\d+$/.test(formData.yearOfExperience)) {
                    errors.yearOfExperience = "Year of Experience must be a number";
                    valid = false;
                }
                break;

            case "currentDesignation":
                if (!formData.currentDesignation.trim()) {
                    errors.currentDesignation = "Current Designation is required";
                    valid = false;
                }
                break;

            case "organization":
                if (!formData.organization.trim()) {
                    errors.organization = "Organization is required";
                    valid = false;
                }
                break;

            case "university":
                if (!formData.university.trim()) {
                    errors.university = "University is required";
                    valid = false;
                }
                break;

            case "introduction":
                if (!formData.introduction.trim()) {
                    errors.introduction = "Introduction is required";
                    valid = false;
                }
                break;
        }
    };

    if (fieldName) {
        validateField(fieldName);
    } else {
        Object.keys(formData).forEach((field) => validateField(field));
    }

    return { errors, valid };
};
