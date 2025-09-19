import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email/phone is required"),
  password: Yup.string().required("Enter your password"),
});
