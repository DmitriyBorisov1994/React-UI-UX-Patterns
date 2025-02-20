import { useId } from "react";
import styles from "./CheckBox.module.scss";

interface CheckboxProps {
  checked?: boolean;
  onToggle?: (value: boolean) => void;
  label?: string;
  id?: string;
}
export const CheckBox = ({
  checked,
  label = "",
  id,
  onToggle,
}: CheckboxProps) => {
  const defaultId = useId();
  return (
    <label htmlFor={id || defaultId} className={styles.checkbox}>
      {label}
      <input
        className={styles.checkboxInput}
        type="checkbox"
        id={id || defaultId}
        checked={checked}
        onChange={(e) => onToggle?.(e.target.checked)}
      />
      <span className={styles.checkmark}></span>
    </label>
  );
};
