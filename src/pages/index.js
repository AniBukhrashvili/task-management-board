import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppBreadcrumbs from "../components/AppBreadcrumbs";
import AppContainer from "../components/AppContainer";
import AppHeaderTitle from "../components/AppHeaderTitle";
import AppTaskCard from "../components/AppTaskCard";
import AppTaskColumn from "../components/AppTaskColumn";
import UpdateTaskModal from "../components/UpdateTaskModal";
import AppLayout from "../layout/AppLayout";
import { getTasksRequest } from "../api/getTasks";
import { updateTaskRequest } from "../api/updateTask";
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
  }, []);

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
    setTasks((prevTasks) =>
      updatedTask
        ? prevTasks.map((task) =>
            task._id === updatedTask._id ? updatedTask : task
          )
        : prevTasks.filter((task) => task._id !== selectedTask._id)
    );
    handleModalClose();
  };

  const moveTask = async (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, status: newStatus } : task
      )
    );

    try {
      await updateTaskRequest({
        id: taskId,          
        status: newStatus,   
      });    
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
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
        <DndProvider backend={HTML5Backend}>
          <AppContainer>
            <div className={styles.HomePage__Tasks}>
              {["todo", "inprogress", "done"].map((status) => (
                <AppTaskColumn key={status} status={status} moveTask={moveTask}>
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
        </DndProvider>
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
