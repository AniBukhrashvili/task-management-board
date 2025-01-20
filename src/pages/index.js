import { useEffect, useState } from "react";
import AppBreadcrumbs from "../components/AppBreadcrumbs";
import AppContainer from "../components/AppContainer";
import AppHeaderTitle from "../components/AppHeaderTitle";
import AppTaskCard from "../components/AppTaskCard";
import AppTaskColumn from "../components/AppTaskColumn";
import AppLayout from "../layout/AppLayout";
import { getTasksRequest } from "../api/getTasks";
import UpdateTaskModal from "../components/UpdateTaskModal";
import styles from "./HomePage.module.scss";

export default function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchTask = async () => {
    const res = await getTasksRequest();
    setTasks(res);
  };

  useEffect(() => {
    fetchTask();
  }, [tasks]);

  const handleCardClick = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedTask(null);
  };

  const handleTaskCreate = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleTaskUpdate = (updatedTask) => {
    setTasks((prevTasks) => {
      if (updatedTask) {
        return prevTasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        );
      } else {
        return prevTasks.filter((task) => task._id !== selectedTask._id);
      }
    });
    handleModalClose();
  };

  const taskGroups = tasks.reduce((groups, task) => {
    if (!groups[task.status]) {
      groups[task.status] = [];
    }
    groups[task.status].push(task);
    return groups;
  }, {});

  return (
    <AppLayout>
      <AppBreadcrumbs />
      <AppHeaderTitle onTaskCreate={handleTaskCreate} />
      <main>
        <AppContainer>
          <div className={styles.HomePage__Tasks}>
            {["todo", "inprogress", "done"].map((status) => (
              <AppTaskColumn key={status} status={status}>
                {taskGroups[status]?.map((task) => (
                  <AppTaskCard
                    key={task._id}
                    task={task}
                    onClick={() => handleCardClick(task)}
                  />
                ))}
              </AppTaskColumn>
            ))}
          </div>
        </AppContainer>
      </main>

      {showModal && (
        <UpdateTaskModal
          task={selectedTask}
          onClose={handleModalClose}
          onTaskUpdate={handleTaskUpdate}
        />
      )}
    </AppLayout>
  );
}
