import classnames from "classnames";
import styles from "./AppTextarea.module.scss";

export default function AppTextarea({
  name,
  label,
  placeholder,
  value,
  onChange,
  helperText,
  error,
}) {
  return (
    <div className={styles.AppTextarea}>
      <label className={styles.AppTextarea__Label}>{label}</label>
      <div
        className={classnames(styles.AppTextarea__Wrapper, {
          [styles["AppTextarea__Wrapper--Error"]]: error,
        })}
      >
        <textarea
          className={styles.AppTextarea__Textarea}
          name={name}
          value={value}
          rows={6}
          onChange={onChange}
          placeholder={placeholder}
          aria-label={name}
        />
      </div>
      {(helperText || error) && (
        <span
          className={classnames(styles.AppTextarea__HelperText, {
            [styles["AppTextarea__HelperText--Error"]]: error,
          })}
        >
          {helperText || error}
        </span>
      )}
    </div>
  );
}
