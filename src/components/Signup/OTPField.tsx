// OTPField.tsx
import React, { FC, useState } from "react";

interface Props {}

const OTPField: FC<Props> = (props): JSX.Element => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));

  const handleInputChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  return (
    <div className="h-screen flex justify-center items-center space-x-2">
      {otp.map((digit, index) => (
        <input
          key={index}
          type="number"
          className="w-12 h-12 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl spin-button-none border-gray-400 focus:border-gray-700 focus:text-gray-700 text-gray-400 transition"
          value={digit}
          onChange={(e) => handleInputChange(index, e.target.value)}
        />
      ))}
    </div>
  );
};

export default OTPField;
