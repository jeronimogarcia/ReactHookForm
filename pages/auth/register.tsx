import Layout from "@/components/Layout";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema, FormData } from '@/utils/yupSchema'
import { labelStyle, inputStyle, errorStyle} from './styles'

const RegisterPage = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    trigger,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      password: '',
      repeatPassword: '',
      area: 'fullstack'
    }
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
        className="flex align-center flex-col w-[800px] p-8 pb-8 mb-10 rounded bg-gray-900 relative"
      >
        <h1 className="text-2xl text-green-500 mb-4">Register Form</h1>

        <label className={labelStyle}>Email</label>
        <input {...register("email", {})} className={inputStyle} />
        {!errors.email && <p className="h-6"></p>}
        <p className={errorStyle}>{errors.email?.message}</p>

        <label className={labelStyle}>First Name</label>
        <input
          {...register("firstName", { required: true, minLength: 3 })}
          className={inputStyle}
        />
        {!errors.firstName && <p className="h-6"></p>}
        <p className={errorStyle}>{errors.firstName?.message}</p>

        <label className={labelStyle}>Last Name</label>
        <input
          {...register("lastName", { required: true })}
          className={inputStyle}
        />
        {!errors.lastName && <p className="h-6"></p>}
        <p className={errorStyle}>{errors.lastName?.message}</p>

        <label className={labelStyle}>Phone Number</label>
        <input
          {...register("phone", { required: true })}
          className={inputStyle}
        />
        {!errors.phone && <p className="h-6"></p>}
        <p className={errorStyle}>{errors.phone?.message}</p>

        <label className={labelStyle}>Password</label>
        <input {...register("password", {})} className={inputStyle} />
        {!errors.password && <p className="h-6"></p>}
        <p className={errorStyle}>{errors.password?.message}</p>

        <label className={labelStyle}>Repeat Password</label>
        <input {...register("repeatPassword")}
        disabled={password.length < 6}
        className={inputStyle}
        />
        {password.length < 6 || !errors.repeatPassword 
        ? <p className="h-8"></p> 
        : <p className={errorStyle}>{errors.repeatPassword?.message}</p>}

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
