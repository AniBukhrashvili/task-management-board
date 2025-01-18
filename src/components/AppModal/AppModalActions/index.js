import classnames from "classnames";
import styles from "./AppModalActions.module.scss";

export default function AppModalActions({ children, center }) {
  return (
    <div
      className={classnames(styles.AppModalActions, {
        [styles["AppModalActions--Center"]]: center,
      })}
    >
      {children}
    </div>
  );
}
