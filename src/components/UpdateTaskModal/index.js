import { useEffect, useReducer, useState } from "react";
import AppButton from "../AppButton";
import AppInput from "../AppInput";
import AppModal from "../AppModal";
import AppModalActions from "../AppModal/AppModalActions";
import AppModalContent from "../AppModal/AppModalContent";
import AppModalHeader from "../AppModal/AppModalHeader";
import AppSelect from "../AppSelect";
import AppTextarea from "../AppTextarea";
import { updateTaskRequest } from "../../api/updateTask";
import { deleteTaskRequest } from "../../api/deleteTask";
import { getUsersRequest } from "../../api/getUsers";
import {
  taskValidationSchema,
  validateField,
  validateFormData,
} from "../../services/validation";
import { formReducer } from "../../services/reducer";
import styles from "./UpdateTaskModal.module.scss";

const defaultStatuses = [
  { value: "todo", name: "To Do" },
  { value: "inprogress", name: "In Progress" },
  { value: "done", name: "Done" },
];

export default function UpdateTaskModal({ task, onClose, onTaskUpdate }) {
  const [taskData, dispatch] = useReducer(formReducer, {
    id: task._id,
    status: task.status,
    title: task.title,
    description: task.description,
    dueDate: task.dueDate,
    assignedTo: task.assignedTo,
  });

  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [statuses, setStatuses] = useState(defaultStatuses);

  const fetchUsers = async () => {
    const res = await getUsersRequest();
    const structuredUsers = res.map((user) => ({
      value: user._id,
      name: user.name,
    }));
    setUsers(structuredUsers);
  };

  useEffect(() => {
    fetchUsers();

    const createdStatuses =
      JSON.parse(localStorage.getItem("customTaskColumns")) || [];
    const structuredStatuses = createdStatuses.map((status) => ({
      value: status.value || status,
      name: status.name || status,
    }));

    const mergedStatuses = [
      ...defaultStatuses,
      ...structuredStatuses.filter(
        (customStatus) =>
          !defaultStatuses.some((status) => status.value === customStatus.value)
      ),
    ];

    setStatuses(mergedStatuses);
  }, []);

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    dispatch({
      type: "UPDATE_FIELD",
      payload: { name, value },
    });

    const error = await validateField(
      taskValidationSchema,
      name,
      value,
      taskData
    );
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSelectChange = async (name, value) => {
    dispatch({
      type: "UPDATE_FIELD",
      payload: { name, value },
    });

    const error = await validateField(
      taskValidationSchema,
      name,
      value,
      taskData
    );
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const validateForm = async () => {
    const validationErrors = await validateFormData(
      taskValidationSchema,
      taskData
    );
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = await validateForm();
    if (!isValid) return;

    try {
      const response = await updateTaskRequest(taskData);
      dispatch({
        type: "UPDATE_TASK",
        payload: { response },
      });
      onTaskUpdate(response);
      onClose();
    } catch (error) {
      console.error("Error updating task:", error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTaskRequest({ id: taskData.id });
      onTaskUpdate(taskData.id, "delete");
      onClose();
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  return (
    <AppModal isVisible={true} onChange={onClose}>
      <AppModalHeader onClose={onClose} onDelete={handleDelete}>
        Update Task
      </AppModalHeader>
      <AppModalContent>
        <form className={styles.UpdateTaskModal__Form} onSubmit={handleSubmit}>
          <AppSelect
            name="assignedTo"
            label="Assigned To"
            options={users}
            value={taskData.assignedTo}
            onSelect={(value) => handleSelectChange("assignedTo", value)}
            error={errors.assignedTo}
          />
          <AppSelect
            name="status"
            label="Status"
            options={statuses}
            value={taskData.status}
            onSelect={(value) => handleSelectChange("status", value)}
            error={errors.status}
          />
          <AppInput
            name="title"
            label="Title"
            value={taskData.title}
            onChange={handleInputChange}
            error={errors.title}
          />
          <AppTextarea
            name="description"
            label="Description"
            value={taskData.description}
            onChange={handleInputChange}
            error={errors.description}
          />
          <AppInput
            name="dueDate"
            label="Due Date"
            type="date"
            value={taskData.dueDate.split("T")[0]}
            onChange={handleInputChange}
            error={errors.dueDate}
          />
        </form>
      </AppModalContent>
      <AppModalActions>
        <AppButton variant="secondary" onClick={onClose}>
          Cancel
        </AppButton>
        <AppButton variant="primary" onClick={handleSubmit}>
          Update
        </AppButton>
      </AppModalActions>
    </AppModal>
  );
}
