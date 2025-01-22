import classnames from "classnames";
import styles from "./AppButton.module.scss";

export default function AppButton({
  children,
  variant,
  prefix,
  suffix,
  disabled = false,
  type = "button",
  ariaLabel,
  onClick = () => null,
}) {
  return (
    <button
      className={classnames(styles.AppButton, {
        [styles["AppButton--Primary"]]: variant === "primary",
        [styles["AppButton--Secondary"]]: variant === "secondary",
        [styles["AppButton--Light"]]: variant === "light",
      })}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {prefix}
      {children && <span className={styles.AppButton__Body}>{children}</span>}
      {suffix}
    </button>
  );
}
