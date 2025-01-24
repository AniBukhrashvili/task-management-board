import { useEffect, useReducer, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppBreadcrumbs from "../components/AppBreadcrumbs";
import AppHeaderTitle from "../components/AppHeaderTitle";
import AppTaskCard from "../components/AppTaskCard";
import AppTaskColumn from "../components/AppTaskColumn";
import UpdateTaskModal from "../components/UpdateTaskModal";
import AppButton from "../components/AppButton";
import CreateColumnModal from "../components/CreateColumnModal";
import AppLayout from "../layout/AppLayout";
import { getTasksRequest } from "../api/getTasks";
import { updateTaskRequest } from "../api/updateTask";
import { formReducer } from "../services/reducer";
import styles from "./HomePage.module.scss";

export default function HomePage() {
  const [tasks, dispatch] = useReducer(formReducer, []);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddingColumnModal, setShowAddingColumnModal] = useState(false);
  const [customTaskColumns, setCustomTaskColumns] = useState([]);

  useEffect(() => {
    const addedColumns =
      JSON.parse(localStorage.getItem("customTaskColumns")) || [];
    setCustomTaskColumns(addedColumns);

    const fetchTask = async () => {
      const res = await getTasksRequest();
      dispatch({ type: "INITIALIZE_TASKS", payload: res });
    };
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
    dispatch({ type: "CREATE_TASK", payload: newTask });
  };

  const handleTaskUpdate = (taskData, action = "update") => {
    if (action === "delete") {
      dispatch({ type: "DELETE_TASK", payload: taskData });
    } else {
      dispatch({ type: "UPDATE_TASK", payload: taskData });
    }
    handleModalClose();
  };

  const handleAddColumn = (newColumn) => {
    setCustomTaskColumns((prevColumns) => {
      const updatedColumns = [...prevColumns, newColumn];
      localStorage.setItem("customTaskColumns", JSON.stringify(updatedColumns));
      return updatedColumns;
    });
    setShowAddingColumnModal(false);
  };

  const moveTask = async (taskId, newStatus) => {
    dispatch({
      type: "MOVE_TASK",
      payload: { taskId, newStatus },
    });

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
          <div className={styles.HomePage__Tasks}>
            <div className={styles.HomePage__TasksWrapper}>
              {["todo", "inprogress", "done", ...customTaskColumns].map(
                (status) => (
                  <AppTaskColumn
                    key={status}
                    status={status}
                    moveTask={moveTask}
                  >
                    {taskGroups[status]?.map((task) => (
                      <AppTaskCard
                        key={task._id}
                        task={task}
                        onClick={() => handleCardClick(task)}
                      />
                    ))}
                  </AppTaskColumn>
                )
              )}
              <AppButton
                variant="light"
                onClick={() => setShowAddingColumnModal(true)}
                prefix={
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
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                }
              >
                Add another list
              </AppButton>
            </div>
          </div>
        </DndProvider>
      </main>

      {showModal && (
        <UpdateTaskModal
          task={selectedTask}
          onClose={handleModalClose}
          onTaskUpdate={handleTaskUpdate}
        />
      )}

      {showAddingColumnModal && (
        <CreateColumnModal
          showCreateColumnModal={showAddingColumnModal}
          setShowCreateColumnModal={setShowAddingColumnModal}
          onAddColumn={handleAddColumn}
        />
      )}
    </AppLayout>
  );
}
