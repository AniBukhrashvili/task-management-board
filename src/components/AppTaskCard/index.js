import { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import classNames from "classnames";
import { getUserByIdRequest } from "../../api/getUserById";
import styles from "./AppTaskCard.module.scss";

export default function AppTaskCard({ task, onClick }) {
  const [userName, setUserName] = useState("");

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const month = formattedDate.getMonth() + 1;
    const day = formattedDate.getDate();
    const year = formattedDate.getFullYear();
    return `${month}/${day}/${year}`;
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserByIdRequest(task.assignedTo);
        setUserName(user && user.name);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (task.assignedTo) {
      fetchUser();
    }
  }, [task.assignedTo]);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task._id, status: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={classNames(styles.AppTaskCard, {
        [styles["AppTaskCard--Dragging"]]: isDragging,
      })}
      onClick={onClick}
    >
      <div className={styles.AppTaskCard__Title}>{task.title}</div>
      {task.description && (
        <div className={styles.AppTaskCard__Desc}>{task.description}</div>
      )}
      <div className={styles.AppTaskCard__Bottom}>
        <div className={styles.AppTaskCard__Date}>
          <span>
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </span>
          <p>{formatDate(task.dueDate)}</p>
        </div>
        {userName && (
          <div className={styles.AppTaskCard__AssignedTo}>{userName}</div>
        )}
      </div>
    </div>
  );
}
