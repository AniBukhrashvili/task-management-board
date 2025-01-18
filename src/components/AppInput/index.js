import classnames from "classnames";
import styles from "./AppInput.module.scss";

export default function AppInput({
  type = "text",
  name,
  label,
  value,
  onChange,
  placeholder,
  helperText,
  error,
}) {
  return (
    <div className={styles.AppInput}>
      <label className={styles.AppInput__Label}>{label}</label>
      <div
        className={classnames(styles.AppInput__Wrapper, {
          [styles["AppInput__Wrapper--Error"]]: error,
        })}
      >
        <input
          className={styles.AppInput__Input}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-label={name}
        />
      </div>
      {(helperText || error) && (
        <span
          className={classnames(styles.AppInput__HelperText, {
            [styles["AppInput__HelperText--Error"]]: error,
          })}
        >
          {helperText || error}
        </span>
      )}
    </div>
  );
}
