import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  phone: Yup.string().required("Phone Number is required"),
  email: Yup.string().email("Enter a valid email"),
  password: Yup.string()
    .min(5, "Must be at least 6 characters")
    .required("Enter your password"),
  //role_identifier: Yup.string().required("Role is required"),
  fname: Yup.string().required("First Name required"),
});
