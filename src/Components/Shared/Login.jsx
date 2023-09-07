import { useStepsContext } from "../../Context/StateContext";

const Login = () => {
  const { openLoginModal, setOpenLoginModal } = useStepsContext();

  return (
    <div
      style={{ zIndex: 1000, top: "80px" }}
      className="fixed left-0 right-0 w-full px-4 overflow-x-hidden overflow-y-auto  h-full bg-[rgb(0,0,0,0.75)]"
    >
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
        <form
          //   onSubmit={handleSubmit}
          className="bg-[#FCF5F3] w-[98%] md:w-[60%] rounded-3xl py-4 px-3 sm:p-6 sm:px-7 hide_scrollbar"
        >
          <h3 className="text-darkblue mb-10 mt-5 text-2xl sm:text-3xl md:text-4xl font-[600] text-center font-BalsamiqSans">
            Green Washing
          </h3>

          <p
            className="font-BalsamiqSans text-center text-[#626262] relative"
            style={{ bottom: "20px" }}
          >
            Identifier
          </p>

          {/* Button */}
          {/* <div className="bg-[#fff] mt-10 flex mb-10"> */}

          <div className="bg-[#fcf5f3] mt-10 flex mb-10">
            <button
              type="submit"
              //   onClick={openToggle === false ? onClick : null}
              //   disabled={loading}
              // disabled={loading}
              className="bg-orange cursor-pointer w-full relative h-[64px]  text-white border-2 text-center border-orange font-BalsamiqSans rounded-full  py-3 text-lg font-medium"
            ></button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
