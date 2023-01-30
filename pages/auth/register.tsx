import Layout from "@/components/Layout";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
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
    password: yup
      .string()
      .required("This field must be filled!")
      .min(6, "Min 6 characters!"),
    repeatPassword: yup
      .string()
      .required("This field must be filled!")
      .oneOf([yup.ref("password"), null], "Passwords must match!"),
    area: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const inputStyle =
  "border border-gray-500 px-1 rounded outline-none bg-gray-200";
const labelStyle = "text-lg mt-1 mb-2 text-green-500";
const errorStyle = "mt-2 text-red-500";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<FormData>({
    mode: "all",
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: FormData) => {
    console.log(data);
    reset();
  };

  const validatePasswords = (value1: string, value2: string) => {
      if(value1 !== value2){
        console.log("diferentes")
        console.log(errors.repeatPassword?.message)
        console.log(errors.repeatPassword)
      } else {
        console.log("iguales")
      
      }
    
  };

  return (
    <Layout
      title="Register Page"
      pageDescription="Pagina de registro de usuario"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex align-center flex-col w-[800px] p-8 pb-8 rounded bg-gray-900 relative"
      >
        <h1 className="text-2xl text-green-500 mb-4">Register Form</h1>
        <label className={labelStyle}>Email</label>
        <input {...register("email", {})} className={inputStyle} />
        {!errors.email && <p className="h-6"></p>}
        <p className={errorStyle}>{errors.email?.message}</p>
        <label className={labelStyle}>First Name</label>
        <input {...register("firstName", {})} className={inputStyle} />
        {!errors.firstName && <p className="h-6"></p>}
        <p className={errorStyle}>{errors.firstName?.message}</p>
        <label className={labelStyle}>Last Name</label>
        <input {...register("lastName", {})} className={inputStyle} />
        {!errors.lastName && <p className="h-6"></p>}
        <p className={errorStyle}>{errors.lastName?.message}</p>

        <label className={labelStyle}>Password</label>
        <input
          {...register("password", {})}
          className={inputStyle}
          onChange={(e) => validatePasswords(e.target.value, getValues("repeatPassword"))}
        />
        {!errors.password && <p className="h-6"></p>}
        <p className={errorStyle}>{errors.password?.message}</p>

        <label className={labelStyle}>Repeat Password</label>
        <input {...register("repeatPassword", {})} className={inputStyle} />
        {!errors.repeatPassword && <p className="h-6"></p>}
        <p className={errorStyle}>{errors.repeatPassword?.message}</p>

        <label className={labelStyle}>Programming Area</label>
        <select {...register("area")} className={inputStyle}>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="fullstack">Fullstack</option>
        </select>
        <button
          type="submit"
          className="mt-12 mb-4 w-[100%] py-1 rounded bg-green-500 text-gray-100 hover:text-blue-500 font-medium"
          onClick={() => onSubmit}
        >
          Registrar Usuario
        </button>
      </form>
    </Layout>
  );
};

export default RegisterPage;
