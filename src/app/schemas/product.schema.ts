import * as yup from "yup";

export const createProductSchema = yup.object().shape({
  name: yup.string().required("name is required"),
  description: yup.string(),
  price: yup.number().required("price is required"),
  image: yup.string(),
});
