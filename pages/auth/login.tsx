import Layout from "@/components/Layout";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema, FormData } from '@/utils/yupSchema'
import { labelStyle, inputStyle, errorStyle} from './styles'

const RegisterPage = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "all",
  });
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <Layout
      title="Login Page"
      pageDescription="Pagina de login de usuario"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex align-center flex-col w-[800px] p-8 pb-8 rounded bg-gray-900 relative"
      >
        <h1 className="text-2xl text-green-500 mb-4">Login Form</h1>

        <label className={labelStyle}>Email</label>
        <input {...register("email", {})} className={inputStyle} />
        {!errors.email && <p className="h-6"></p>}
        <p className={errorStyle}>{errors.email?.message}</p>

        <label className={labelStyle}>Password</label>
        <input {...register("password", {})} className={inputStyle} />
        {!errors.password && <p className="h-6"></p>}
        <p className={errorStyle}>{errors.password?.message}</p>

        <button
          type="submit"
          className="mt-12 mb-4 w-[100%] py-1 rounded bg-green-500 text-gray-100 hover:text-blue-500 font-medium"
          onClick={() => onSubmit}
        >
          Log In
        </button>
      </form>
    </Layout>
  );
};

export default RegisterPage;
