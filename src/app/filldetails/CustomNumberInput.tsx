import React, { Dispatch, SetStateAction } from "react";
import styles from "./CustomInput.module.css";

interface CustomInputProps {
  label: string;
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
}

const CustomNumberInput = ({ label, value, setValue }: CustomInputProps) => {
  return (
    <div className="flex justify-center w-full">
      <div className={`h-full ${styles.inputField}`}>
        <input
          type="number"
          id="name"
          className={`w-full h-full rounded-xl border-0 outline-0 text-gray-900 ${styles.input} p-3 pt-6 pb-2 bg-zinc-50`}
          value={value}
          onChange={(e) => {
            if (parseInt(e.target.value) >= 0) {
              setValue(parseInt(e.target.value));
            }
          }}
        />
        <label htmlFor="name" className={`pl-3 text-gray-600 ${styles.label}`}>
          {label}
        </label>
      </div>
    </div>
  );
};

export default CustomNumberInput;
