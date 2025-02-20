export const validateStackForm = (stackName: string, technologies: string[]) => {
    let errors: Record<string, string> = {};
    let isValid = true;

    if (!stackName.trim()) {
        errors.stackName = "Stack name is required";
        isValid = false;
    }

    if (technologies.length === 0) {
        errors.technologies = "At least one technology must be added";
        isValid = false;
    }

    return { errors, isValid };
};
