import React from "react";
import { useStepsContext } from "../../Context/StateContext";

const BackButton = () => {
  const { handlePrevious } = useStepsContext();
  return (
    <div className="w-[90%] mx-auto mt-7">
      <img
        src="/assets/back_button.svg"
        alt="logo"
        className="cursor-pointer"
        onClick={handlePrevious}
      />
    </div>
  );
};

export default BackButton;
