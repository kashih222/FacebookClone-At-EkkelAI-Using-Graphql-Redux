import { useState } from "react";
import Logo from "../../assets/4lCu2zih0ca.svg";
import LoginSignUpFooter from "../Login&Signup Footer/LoginSignUpFooter";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_MUTATION } from "../../GraphqlOprations/mutations";
import { useAppDispatch } from "../../Redux Toolkit/hooks";
import { setUser, fetchMe } from "../../Redux Toolkit/slices/userSlice";
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(import.meta.env.VITE_GRAPHQL_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          query: LOGIN_MUTATION,
          variables: { email: formData.email, password: formData.password },
        }),
      });
      const json = await res.json();
      if (json.errors && json.errors.length) {
        toast.error(json.errors[0].message || "Login failed");
        return;
      }
      if (json.data?.login?.user) {
        dispatch(setUser(json.data.login.user));
      }
      dispatch(fetchMe());
      navigate("/");
    } catch {
      toast.error("Network error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 min-h-[calc(100vh-240px)] w-full bg-[#F2F4F7] flex items-center justify-center gap-6 sm:gap-10 py-6 sm:py-8 px-3 sm:px-4">
        <div className="container max-w-6xl flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-10 lg:gap-20 w-full">
          
          <div className="flex flex-col items-center md:items-start gap-2 max-w-md w-full">
            <div className="w-full max-w-[280px] sm:max-w-[320px] h-auto mb-3 sm:mb-4">
              <img 
                src={Logo} 
                alt="Facebook Logo" 
                className="w-full h-auto -ml-2 sm:-ml-3"
              />
            </div>
            <p className="text-lg sm:text-xl md:text-2xl font-medium pl-0 md:pl-8 text-gray-800 leading-snug text-center md:text-left">
              Facebook helps you connect and share with the people in your life.
            </p>
          </div>

          <div className="flex flex-col w-full max-w-md">
            <div className="flex flex-col justify-center items-center gap-3 sm:gap-4 w-full bg-white shadow-[0_2px_4px_rgba(0,0,0,0.1),0_8px_16px_rgba(0,0,0,0.1)] p-4 sm:p-6 md:p-8 rounded-lg">
              <form onSubmit={handleSubmit} className="flex flex-col w-full gap-3 sm:gap-4">
                <input
                  type="text"
                  name="email"
                  placeholder="Email address or phone number"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 border border-[#CCD0D5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent text-sm sm:text-base"
                />
                
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 border border-[#CCD0D5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent text-sm sm:text-base"
                />
                
                <button
                  type="submit"
                  className="w-full bg-[#1877F2] text-white font-bold px-4 py-2.5 sm:py-3.5 rounded-md hover:bg-[#166FE5] transition-colors text-base sm:text-lg"
                >
                  Log In
                </button>
              </form>

              <a
                href="#"
                className="text-[#1877F2] hover:underline text-xs sm:text-sm text-center py-1 sm:py-2"
              >
                Forgotten password?
              </a>

              <div className="w-full border-t border-[#CCD0D5] my-1 sm:my-2"></div>

             
             <Link to={"/signup"}> <button className="w-full sm:w-auto bg-[#36A420] hover:bg-[#2B9217] text-white font-bold px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-md transition-colors text-sm sm:text-base">
                Create new account
              </button></Link>
            </div>

            <div className="mt-4 sm:mt-6 text-center md:text-left md:ml-20">
              <span className="font-bold text-xs sm:text-sm">
                <a href="#" className="hover:underline text-gray-800">
                  Create a Page
                </a>
              </span>
              <span className="text-xs sm:text-sm text-gray-600 ml-1">
                for a celebrity, brand or business.
              </span>
            </div>
          </div>
        </div>
      </div>

      <LoginSignUpFooter />
    </div>
  );
};

export default Login;
