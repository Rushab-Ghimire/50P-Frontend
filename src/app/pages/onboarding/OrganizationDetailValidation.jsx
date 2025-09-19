import * as Yup from "yup";

export const organizationDetailValidationSchema = Yup.object().shape({
  business_name: Yup.string().required("This field is required"),
  business: Yup.string().required("This field is required")
});
