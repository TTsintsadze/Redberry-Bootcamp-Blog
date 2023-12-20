import React from "react";

const InputGroup = ({
  label,
  type,
  placeholder,
  name,
  value,
  hint,
  changeHandler,
  isValid,
  focusHandler,
}) => {
  return (
    <div className="flex flex-col gap-3 w-full ">
      <label
        className={`font-bold text-[14px] text-[#1A1A1F] ${
          isValid == "invalid" ? "text-red-500" : ""
        } md:text-[16px]`}
      >
        {label}
      </label>
      <div className="w-full relative">
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onFocus={focusHandler}
          className={`w-full border-[2px] ${
            isValid == "invalid"
              ? "border-red-500"
              : isValid == "valid"
              ? "border-green-500"
              : "#c3c2c8"
          } border-[#c3c2c8] rounded-2xl px-[15px] py-[16px] outline-none`}
          onChange={changeHandler}
        />
        { }
      </div>

      <p
        className={`font-small text-[13px] text-[#85858D] ${
          isValid == "invalid" ? "text-red-500" : ""
        } md:text-15px`}
      >
        {hint}
      </p>
    </div>
  );
};

export default InputGroup;