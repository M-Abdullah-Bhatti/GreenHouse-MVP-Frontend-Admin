import { useStepsContext } from "../../Context/StateContext";
import { useFormik } from "formik";
import { loginModalScehma } from "../../validation-schema";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { openLoginModal, setOpenLoginModal } = useStepsContext();

  const initialValues = {
    email: "",
    password: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: loginModalScehma,

      onSubmit: async (values) => {
        try {
          const { data } = await axios.post(
            "http://localhost:5000/api/regulator/login",
            values
          );

          toast.success("Logged in Successfully");
          setOpenLoginModal(!openLoginModal);
        } catch (err) {
          toast.error(err?.response?.data?.message);
          // console.error(err);
        }
      },
    });

  return (
    <div className="fixed z-20 left-0 top-0 right-0 w-full px-4 overflow-x-hidden overflow-y-auto  h-full bg-[rgb(0,0,0,0.75)]">
      <div className="relative w-full ">
        <div className="flex items-start justify-between mt-4">
          <button
            onClick={() => setOpenLoginModal(!openLoginModal)}
            type="button"
            className="text-gray-400 bg-transparent hover:outline-none  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
          >
            <svg
              aria-hidden="true"
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
      </div>
      <div className="flex justify-center py-1 w-full">
        <div
          //   onSubmit={handleSubmit}
          className="bg-[#fff] w-[98%] lg:w-[40%] rounded-3xl py-4 px-3  sm:p-6 sm:px-7 md:py-10 md:px-16 "
        >
          <div>
            <div className="flex justify-center items-center ">
              <img src="./assets/__logo.png" alt="logo" className="w-[80px]" />
              <div>
                <h1 className="text-lg font-bold leading-5">
                  Greenwashing <br /> Identifier
                </h1>
                <p className="text-sm text-[#626262] ">By ImpactScope</p>
              </div>
            </div>
            <h3 className="uppercase text-darkblue mt-5 text-2xl sm:text-3xl md:text-4xl font-[600] text-center">
              Welcome to GWI
            </h3>

            <p className="font-BalsamiqSans text-center text-[#626262] text-lg mt-3 ">
              Sign in to get started
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full mt-5 space-y-3">
            <input
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Email"
              className="p-4 bg-[#f5f4f4] rounded-lg border-none focus:outline-none w-full"
            />

            {errors.email && touched.email ? (
              <p className="text-sm text-[#ff0000]">{errors.email}</p>
            ) : null}

            <input
              type="password"
              name="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Password"
              className="p-4 bg-[#f5f4f4] border-none rounded-lg focus:outline-none w-full"
            />
            {errors.password && touched.password ? (
              <p className="text-sm  text-[#ff0000]">{errors.password}</p>
            ) : null}

            <div className="!mt-10">
              <button
                type="submit"
                //   onClick={openToggle === false ? onClick : null}
                //   disabled={loading}
                // disabled={loading}
                className="bg-[#3FDD78] cursor-pointer w-full relative h-[64px]  text-white text-center  rounded-md  py-3 text-lg font-medium"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
