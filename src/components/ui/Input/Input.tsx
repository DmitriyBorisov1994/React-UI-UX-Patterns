import React, { useRef } from "react";
import cn from "classnames";
import styles from "./Input.module.scss";

interface InputProps {
  value?: string;
  onChange?: (value: string) => void;
  id?: string;
  placeholder?: string;
  labelText?: string;
  inputClassName?: string;
  labelClassName?: string;
  wrapperClassName?: string;
  ref?: React.RefObject<HTMLInputElement | null>;
  type?: "text" | "search" | "number";
}

export const Input = ({
  value,
  onChange,
  inputClassName,
  wrapperClassName,
  labelClassName,
  labelText,
  type = "text",
  ref,
  ...rest
}: InputProps) => {
  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange?.(event.target.value);
  };

  const innerRef = useRef<HTMLInputElement>(null);

  const onClear = () => {
    onChange?.("");
    if (ref) {
      ref?.current?.focus();
      return;
    }
    if (innerRef) {
      innerRef?.current?.focus();
      return;
    }
  };

  return (
    <div className={cn(wrapperClassName, styles.form)}>
      <input
        type={type}
        id="input_id"
        className={cn(inputClassName, styles.form_input)}
        autoComplete="off"
        placeholder="Type something...."
        {...rest}
        value={value}
        onChange={onInputChange}
        ref={ref || innerRef}
        onKeyDown={(e) => {
          if (e.code === "Escape" && type !== "search") {
            onClear();
          }
        }}
      />
      <label
        htmlFor={rest.id || "input_id"}
        className={cn(labelClassName, styles.form_label)}
      >
        {labelText}
      </label>
      {type === "text" && (
        <div className={styles.clear}>
          <div className={styles.clearIcon} onClick={onClear}>
            <span></span>
            <span></span>
          </div>
        </div>
      )}
    </div>
  );
};
