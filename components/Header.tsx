
import { FaReact } from "react-icons/fa";
// import { BsCircleFill } from "react-icons/bs";
// import { getAuth, signOut } from "firebase/auth";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex items-center justify-between h-20 w-full bg-gray-900 shadow-lg px-40 fixed top-0 text-2xl text-green-500">
      <Link href="/" className="w-60">
        <div className="flex flex-row gap-2">
          <span className="flex items-center text-5xl">
            <FaReact></FaReact>
          </span>
          <span className="flex items-center text-2xl">React-hook-form</span>
        </div>
      </Link>
      <ol className="flex flex-row gap-6">
        <li>
          <Link href="/auth/login" className="hover:text-red-500">
            Login
          </Link>
        </li>
        <li>
          <Link href="/auth/register" className="hover:text-red-500">
            Register
          </Link>
        </li>
        {/* {usuario && (
          <li>
            <button onClick={handleLogOut}>Logout</button>
          </li>
        )} */}
      </ol>

      {/* <div className="flex items-center justify-center w-52 gap-4">
        {usuario ? (
          <div className="flex flex-row gap-4">
            <span>User logged</span>
            <span className="flex items-center blur-[1px]">
              <BsCircleFill />
            </span>
          </div>
        ) : (
          <div className="text-red-600 flex flex-row gap-4">
            <span>Desconectado</span>
            <span className="flex items-center blur-[1px]">
              <BsCircleFill />
            </span>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default Header;