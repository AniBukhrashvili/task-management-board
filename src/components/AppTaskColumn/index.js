import { useDrop } from "react-dnd";
import classNames from "classnames";
import styles from "./AppTaskColumn.module.scss";

export default function AppTaskColumn({ children, status, moveTask }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item) => {
      if (item.status !== status) {
        moveTask(item.id, status);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className={styles.AppTaskColumn}>
      <div
        className={classNames(styles.AppTaskColumn__Status, {
          [styles["AppTaskColumn__Status--ToDo"]]: status === "todo",
          [styles["AppTaskColumn__Status--InProgress"]]:
            status === "inprogress",
          [styles["AppTaskColumn__Status--Done"]]: status === "done",
          [styles["AppTaskColumn__Status--Over"]]: isOver,
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
