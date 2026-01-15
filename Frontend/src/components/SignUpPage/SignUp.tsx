import React, { useState } from "react";
import Logo from "../../assets/4lCu2zih0ca.svg";
import { IoInformationCircleOutline } from "react-icons/io5";
import LoginSignUpFooter from "../Login&Signup Footer/LoginSignUpFooter";
import { Link, useNavigate } from "react-router-dom";
import { SIGNUP_MUTATION } from "../../GraphqlOprations/mutations";
import toast from "react-hot-toast";

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    email: "",
    password: "",
    day: "",
    month: "",
    year: "",
    gender: "",
  });

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 120 }, (_, i) => currentYear - i);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenderSelect = (gender: string) => {
    setFormData((prev) => ({
      ...prev,
      gender,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const input = {
      firstName: formData.firstName,
      surname: formData.surname,
      email: formData.email,
      password: formData.password,
      day: Number(formData.day),
      month: formData.month,
      year: Number(formData.year),
      gender: formData.gender,
    };
    try {
      const res = await fetch(import.meta.env.VITE_GRAPHQL_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: SIGNUP_MUTATION, variables: { input } }),
      });
      const json = await res.json();
      if (json.errors && json.errors.length) {
        toast.error(json.errors[0].message || "Signup failed");
        return;
      }
      navigate("/login");
    } catch (err) {
      console.log(err)
      toast.error("Network error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center pt-12 sm:pt-16 md:pt-20 px-3 sm:px-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8">
        <div className="w-full md:w-1/2 lg:w-2/4">
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <img src={Logo} alt=""  className="w-48 sm:w-60 md:w-75 h-auto" />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full">
            <div className="text-center mb-4 sm:mb-6">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">
                Create a new account
              </h1>
              <p className="text-gray-600 text-xs sm:text-sm">It's quick and easy.</p>
              <div className="w-full h-0.5 bg-gray-300 mx-auto mt-2 rounded-full"></div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-3 sm:mb-4">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="surname"
                    placeholder="Surname"
                    value={formData.surname}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>
              </div>

             

              <div className="mb-4 sm:mb-6">
                <label className="block text-xs sm:text-sm text-gray-600 mb-2">
                  Date of birth
                  <IoInformationCircleOutline className="inline ml-1 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                </label>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  <select
                    name="day"
                    value={formData.day}
                    onChange={handleChange}
                    className="px-2 sm:px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  >
                    <option value="">Day</option>
                    {days.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                  <select
                    name="month"
                    value={formData.month}
                    onChange={handleChange}
                    className="px-2 sm:px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  >
                    <option value="">Month</option>
                    {months.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="px-2 sm:px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  >
                    <option value="">Year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-4 sm:mb-6">
                <label className="block text-xs sm:text-sm text-gray-600 mb-2">
                  Gender
                  <IoInformationCircleOutline className="inline ml-1 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                </label>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => handleGenderSelect("female")}
                    className={`px-2 sm:px-4 py-2 sm:py-3 border rounded-md flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm ${
                      formData.gender === "female"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                    }`}
                  >
                    <div
                      className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border shrink-0 ${
                        formData.gender === "female"
                          ? "border-blue-500"
                          : "border-gray-400"
                      }`}
                    >
                      {formData.gender === "female" && (
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full m-auto mt-0.5 sm:mt-1"></div>
                      )}
                    </div>
                    <span className="truncate">Female</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleGenderSelect("male")}
                    className={`px-2 sm:px-4 py-2 sm:py-3 border rounded-md flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm ${
                      formData.gender === "male"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                    }`}
                  >
                    <div
                      className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border shrink-0 ${
                        formData.gender === "male"
                          ? "border-blue-500"
                          : "border-gray-400"
                      }`}
                    >
                      {formData.gender === "male" && (
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full m-auto mt-0.5 sm:mt-1"></div>
                      )}
                    </div>
                    <span className="truncate">Male</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleGenderSelect("custom")}
                    className={`px-2 sm:px-4 py-2 sm:py-3 border rounded-md flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm ${
                      formData.gender === "custom"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                    }`}
                  >
                    <div
                      className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border shrink-0 ${
                        formData.gender === "custom"
                          ? "border-blue-500"
                          : "border-gray-400"
                      }`}
                    >
                      {formData.gender === "custom" && (
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full m-auto mt-0.5 sm:mt-1"></div>
                      )}
                    </div>
                    <span className="truncate">Custom</span>
                  </button>
                </div>
              </div>
               <div className="mb-3 sm:mb-4">
                <input
                  type="text"
                  name="email"
                  placeholder="Mobile number or email address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>

              <div className="mb-3 sm:mb-4">
                <input
                  type="password"
                  name="password"
                  placeholder="New password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>

              <div className="mb-4 sm:mb-6">
                <p className="text-xs text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                  People who use our service may have uploaded your contact
                  information to Facebook.&nbsp;
                  <a href="#" className="text-blue-600 hover:underline">
                    Learn more
                  </a>
                  .
                </p>
                <p className="text-xs text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                  By clicking Sign up, you agree to our&nbsp;
                  <a href="#" className="text-blue-600 hover:underline">
                    Terms
                  </a>
                  ,&nbsp;
                  <a href="#" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </a>
                  &nbsp;and&nbsp;
                  <a href="#" className="text-blue-600 hover:underline">
                    Cookies Policy
                  </a>
                  . You may receive SMS notifications from us and can opt out at
                  any time.
                </p>
              </div>

            <div className="flex items-center justify-center w-full">
                <button
                type="submit"
                className="w-full sm:w-auto bg-[#00A400] hover:bg-green-600 text-white font-bold py-2.5 sm:py-2 px-6 sm:px-4 rounded-md text-base sm:text-lg transition duration-200 mb-3 sm:mb-4"
              >
                Sign Up
              </button>
            </div>

              <div className="text-center">
                <Link to={"/login"} className="text-blue-600 hover:underline text-xs sm:text-sm">
                  Already have an account?
                </Link>
              </div>
            </form>
          </div>

          <div className="text-center mt-4 sm:mt-6">
            <p className="text-xs sm:text-sm text-gray-700">
              <a href="#" className="font-bold hover:underline text-gray-800">
                Create a Page
              </a>
              &nbsp;for a celebrity, brand or business.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-6 sm:pt-10">
        <LoginSignUpFooter />
      </div>
    </div>
  );
}

export default SignUp;
