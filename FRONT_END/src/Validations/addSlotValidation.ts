export const AddSlotValidation = (formData: any) => {
    let errors: { [key: string]: string } = {};
    let valid = true;

    if (!formData.date) {
        errors.date = "Date is required.";
        valid = false;
    }

    if (!formData.fromTime) {
        errors.fromTime = "From time is required.";
        valid = false;
    }

    if (!formData.toTime) {
        errors.toTime = "To time is required.";
        valid = false;
    } else if (formData.toTime <= formData.fromTime) {
        errors.toTime = "To time must be later than from time.";
        valid = false;
    }

    // Title validation (only letters and spaces)
    const titleRegex = /^[A-Za-z\s]+$/;
    if (typeof formData.title !== "string" || !formData.title.trim()) {
        errors.title = "Title is required and must be a string.";
        valid = false;
    } else if (!titleRegex.test(formData.title)) {
        errors.title = "Title must contain only letters and spaces.";
        valid = false;
    } else if (formData.title.length < 3) {
        errors.title = "Title must be at least 3 characters.";
        valid = false;
    }

    // Price validation (only positive numbers)
    const priceRegex = /^\d+(\.\d{1,2})?$/; // Allows numbers with up to 2 decimal places
    if (formData.price <= 0) {
        errors.price = "Price is required and must be a positive number.";
        valid = false;
    } else if (!priceRegex.test(formData.price.toString())) {
        errors.price = "Price must be a valid number with up to two decimal places.";
        valid = false;
    }

    if (typeof formData.description !== "string" || !formData.description.trim()) {
        errors.description = "Description is required and must be a string.";
        valid = false;
    } else if (formData.description.length < 10) {
        errors.description = "Description must be at least 10 characters.";
        valid = false;
    }

    return { errors, valid };
};
