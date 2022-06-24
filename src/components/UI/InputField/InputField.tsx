import React from "react";

import styles from "InputField.module.scss";

interface InputFieldProps {
  onChangeHanlder: (value: string) => void;
}

export const InputField: React.FC<InputFieldProps> = ({ onChangeHanlder }) => {
  return (
    <div>
      <input></input>
    </div>
  );
};
