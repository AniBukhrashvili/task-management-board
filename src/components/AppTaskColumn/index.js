import classNames from "classnames";
import styles from "./AppTaskColumn.module.scss";

export default function AppTaskColumn({ children, status }) {
  return (
    <div className={styles.AppTaskColumn}>
      <div
        className={classNames(styles.AppTaskColumn__Status, {
          [styles["AppTaskColumn__Status--ToDo"]]: status === "todo",
          [styles["AppTaskColumn__Status--InProgress"]]:
            status === "inprogress",
          [styles["AppTaskColumn__Status--Done"]]: status === "done",
        })}
      >
        {status === "todo"
          ? "To Do"
          : status === "inprogress"
          ? "In Progress"
          : "Done"}
      </div>
      {children}
    </div>
  );
}
