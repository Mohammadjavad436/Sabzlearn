import React, { Attributes, useEffect, useReducer } from "react";
import validator from "../../validators/validator";

import "./Input.css";
interface InputProp {
  element: string;
  type: string;
  placeholder?: string;
  className?: string;
  validations: FcType[];
  id: string;
  onInputHandler: (id: string, value: string, isValid: string) => {};
}

interface actionProp {
  validations: FcType[];
  type: string;
  value: string;
  isValid: boolean;
}

interface FcType {
  requiredValidator?: () => string;
  minValidator?: (min: number) => { value: string; min: number };
  maxValidator?: (max: number) => { value: string; max: number };
  emailValidator?: () => string;
}

const inputReducer = (state: any, action: actionProp) => {
  switch (action.type) {
    case "CHANGE": {
      return {
        ...state,
        value: action.value,
        isValid: validator(action.value, action.validations),
      };
    }
    default: {
      return state;
    }
  }
};

export default function Input(props: InputProp) {
  const [mainInput, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
  });

  const { value, isValid } = mainInput;
  const { id, onInputHandler } = props;

  useEffect(() => {
    onInputHandler(id, value, isValid);
  }, [value]);

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch({
      type: "CHANGE",
      value: event.target.value,
      validations: props.validations,
      isValid: true,
    });
  };

  const element =
    props.element === "input" ? (
      <input
        type={props.type}
        placeholder={props.placeholder}
        className={`${props.className} ${
          mainInput.isValid ? "success" : "error"
        }`}
        onChange={onChangeHandler}
        value={mainInput.value}
      />
    ) : (
      <textarea
        placeholder={props.placeholder}
        className={`${props.className} ${
          mainInput.isValid ? "success" : "error"
        }`}
        onChange={onChangeHandler}
        value={mainInput.value}
      />
    );

  return <div>{element}</div>;
}
