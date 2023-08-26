import { ConnectWallet } from "@thirdweb-dev/react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

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

      <ConnectWallet
        accentColor="#f213a4"
        colorMode="dark"
        width={{ base: "150px", md: "unset" }}
        style={{ background: "#3FDD78", color: "white" }}
      />
    </div>
    </div>
  );
};

export default Header;
