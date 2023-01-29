import Layout from "@/components/Layout";
import { useForm, SubmitHandler } from "react-hook-form";

enum GenderEnum {
  frontend = "frontend",
  backend = "backend",
  fullstack = "fullstack",
}

interface IFormInput {
  firstName: String;
  lastName: String;
  area: GenderEnum;
}

const inputStyle = "border border-gray-500 px-1 rounded outline-none bg-gray-200"
const labelStyle = "text-lg mt-4 mb-2 text-green-500"
const errorStyle = "mt-2 text-red-500"

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data)
    reset() 
  };


  return (
    <Layout
      title="Register Page"
      pageDescription="Pagina de registro de usuario"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex align-center flex-col w-[600px] p-8 pb-8 rounded bg-gray-900 relative"
      >
        <h1 className="text-2xl text-green-500">Register Form</h1>
        <label className={labelStyle}>First Name</label>
        <input
          {...register("firstName", {required: true, minLength: 3})}
          className={inputStyle}
        />
        {!errors.firstName && <p className="h-8"></p>}
        {errors.firstName?.type === 'required' && <p className={errorStyle}>First name required!</p>}
        {errors.firstName?.type === 'minLength' && <p className={errorStyle}>Too short, 3 characters minimum.</p>}
        <label className={labelStyle}>Last Name</label>
        <input
          {...register("lastName", {required: true})}
          className={inputStyle}
        />
        <label  className={labelStyle}>Programming Area</label>
        <select
          {...register("area")}
          className={inputStyle}
        >
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
