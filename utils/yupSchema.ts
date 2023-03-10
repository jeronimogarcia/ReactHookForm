import * as yup from "yup";

declare module 'yup' {
  interface StringSchema {
    numberString(msg?: string): this;
  }
}

yup.addMethod<yup.StringSchema>(
  yup.string,
  'numberString',
  function (msg: string = 'This field must be a number string.') {
    return this.matches(/^\d+$/, msg);
  },
);

export const schema = yup
.object({
  email: yup
    .string()
    .required("This field must be filled!")
    .email("Email format is invalid"),
  firstName: yup
    .string()
    .required("This field must be filled!")
    .min(3, "Min 3 characters!"),
  lastName: yup
    .string()
    .required("This field must be filled!")
    .min(3, "Min 3 characters!"),
  phone: yup
  .string()
  .required("This field must be filled!")
  .numberString(),
  password: yup
    .string()
    .required("This field must be filled!")
    .min(6, "Min 6 characters!"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match!"),
  area: yup.string().required(),
})
.required();

export type FormData = yup.InferType<typeof schema>;


