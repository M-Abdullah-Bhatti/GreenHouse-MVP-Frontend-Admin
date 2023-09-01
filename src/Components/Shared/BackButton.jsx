import React from "react";

const BackButton = ({ setStep }) => {
  return (
    <div className="w-[90%] mx-auto mt-7">
      <img
        src="/assets/back_button.svg"
        alt="logo"
        className="cursor-pointer"
        onClick={setStep}
      />
    </div>
  );
};

export default BackButton;
