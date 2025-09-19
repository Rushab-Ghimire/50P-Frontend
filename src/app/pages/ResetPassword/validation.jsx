import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required.")
    .min(5, "Password must be 5 characters at minimum"),
  // confirm_password: Yup.string()
  //   .oneOf([Yup.ref("password")])
});
