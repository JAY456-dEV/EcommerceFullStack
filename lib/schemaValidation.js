import * as yup from "yup";

export const schemaValidation = yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    phoneNumber: yup
        .string()
        .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
        .required("Phone number is required"),
    email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
    address: yup.string().required("Address is required"),
    country: yup.string().required("Country is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    zipCode: yup
        .string()
        .matches(/^[0-9]{5}$/, "Zip Code must be exactly 5 digits")
        .required("Zip Code is required"),
});
