import { ConnectWallet } from "@thirdweb-dev/react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useStepsContext } from "../../Context/StateContext";

const Header = () => {
  const location = useLocation();
  const { openLoginModal, setOpenLoginModal } = useStepsContext();

  return (
    <div className="bg-black">
      <div className="flex justify-between items-center  py-5 w-[90%] mx-auto ">
        {/* Left */}
        <div className="flex justify-between gap-20 items-center">
          <img src="/assets/logo.png" alt="logo" />

          <div className="space-x-5 ">
            <Link
              to={"/"}
              className={` ${
                location.pathname === "/" ? "text-[#fff]" : "text-[#fefefe7f]"
              } `}
            >
              Reports
            </Link>
            <Link
              to={"/settings"}
              className={` ${
                location.pathname === "/settings"
                  ? "text-[#fff]"
                  : "text-[#fefefe7f]"
              } `}
            >
              Settings
            </Link>
          </div>
        </div>

        <div className="flex justify-center items-center gap-10">
          <ConnectWallet
            accentColor="#f213a4"
            colorMode="dark"
            width={{ base: "150px", md: "unset" }}
            style={{ background: "#3FDD78", color: "white" }}
          />

          <img
            src="./assets/profile.png"
            alt="logo"
            className="cursor-pointer"
            onClick={() => setOpenLoginModal(!openLoginModal)}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
