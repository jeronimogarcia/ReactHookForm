import Layout from "@/components/Layout";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  password: yup.string().required("This field must be filled!").min(6, "Min 6 characters!"),
  repeatPassword: yup.string()
  .oneOf([yup.ref('password'), null], 'Passwords must match!'),
}).required();

type FormData = yup.InferType<typeof schema>;


const inputStyle = "border border-gray-500 px-1 rounded outline-none bg-gray-200";
const labelStyle = "text-lg mt-1 mb-2 text-green-500";
const errorStyle = "mt-2 text-red-500";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    trigger
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "all",
  });
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    reset();
  };

  const password = watch("password");

  useEffect(() => {
    trigger("repeatPassword");
  }, [password, trigger]);
  
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
        
        <label className={labelStyle}>Password</label>
        <input
          {...register("password", {})}
          className={inputStyle}
        />
        {!errors.password && <p className="h-6"></p>}
        <p className={errorStyle} >{errors.password?.message}</p>

        <label className={labelStyle}>Repeat Password</label>
        <input
          {...register("repeatPassword")}
          className={inputStyle}
          
        />
        {!errors.repeatPassword && <p className="h-6"></p>}
        <p className={errorStyle} >{errors.repeatPassword?.message}</p>

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
