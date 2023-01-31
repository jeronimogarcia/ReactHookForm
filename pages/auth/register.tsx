import Layout from "@/components/Layout";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState, useEffect } from 'react';

enum GenderEnum {
  frontend = "frontend",
  backend = "backend",
  fullstack = "fullstack",
}

interface IFormInput {
  email: String;
  firstName: String;
  lastName: String;
  password: String;
  repeatPassword: String;
  area: GenderEnum;
}

const inputStyle =
  "border border-gray-500 px-1 rounded outline-none bg-gray-200";
const labelStyle = "text-lg mt-1 mb-2 text-green-500";
const errorStyle = "mt-2 text-red-500";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    reset,
    getValues,
    setError,
    clearErrors,
    watch
  } = useForm<IFormInput>({
    mode: "all",
    criteriaMode: "all"
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    reset();
  };

  const [watchPass, watchRepeat] = watch(["password", "repeatPassword"])
  const [errorState, setErrorState] = useState('false')
 
  useEffect(() => {
    if(watchPass === watchRepeat){
      console.log("effect true")
      clearErrors('repeatPassword')
      clearErrors('password')
    }else {
      console.log("effect false")
      console.log(errors.repeatPassword?.message)
      setError('repeatPassword', { type: 'passError', message: '' });
      setError('password', { type: 'passError', message: '' });
    }
  }, [watchPass, watchRepeat])
  

  // const [checkPass, setCheckPass] = useState(false);

  // useEffect(() => {
  //   console.log(checkPass)
  //   if(checkPass) {
  //     clearErrors('repeatPassword')
  //   } else {
  //     setError('repeatPassword', { type: 'passError', message: 'Password error' });
  //   }
  // }, [checkPass])
  

  // const checkPassword = (e: any, type: string) => {

  //   switch (type) {
  //     case "pass":
  //       const passwordRepeatValue = getValues("repeatPassword")
  //       if (e.target.value === passwordRepeatValue) {
  //         setCheckPass(true);
  //         break;
  //       } else {
  //         setCheckPass(false);
  //         break;
  //       }
  //     case "repeat":
  //       const passwordValue = getValues("password");
  //       console.log(e.target.value)
  //       console.log(passwordValue)
  //       if (dirtyFields.password && !errors.password?.message) {
  //         console.log(errors.password)
  //         if (e.target.value === passwordValue) {
  //           setCheckPass(true)
  //           break;
  //         } else {
  //           setCheckPass(false);
  //           break;
  //         }
  //       }
  //   }

  // };

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
          {...register("password", { required: true, minLength: 6 })}
          className={inputStyle}
          // onKeyUp={(e) => checkPassword(e, "pass")}
        />


        {!errors.password &&  <p className="h-8"></p>}
        {errors.password?.type === "required" && (
          <p className={errorStyle}>Password required!</p>
        )}
        {errors.password?.type === "minLength" && (
          <p className={errorStyle}>Too short, 6 characters minimum.</p>
        )}
        {errors.password?.type === "passError" && (
          <p className="h-8">{errors.password?.message} </p>
        )}

        <label className={labelStyle}>Repeat Password</label>
        <input
          {...register("repeatPassword")}
          className={inputStyle}
          // onKeyUp={(e) => checkPassword(e, "repeat")}
        />
        <div className="mt-2 h-8">
        {/* {!checkPass && dirtyFields.password ? <span className={errorStyle}>Password dont match. </span> : <span className="h-8"></span>} */}
        {errors.repeatPassword?.type === "required" && (
          <span className={errorStyle}>Confirm password required!</span>
        )}
          {errors.repeatPassword?.type === "passError" && (
          <span className={errorStyle}>{errors.repeatPassword?.message} Passwords must match!</span>
        )}
         {errors.password?.type === "passError" && (
          <span className={errorStyle}>{errors.password?.message} Passwords must match!</span>
        )}

  
        </div>
      
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
