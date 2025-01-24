import { useEffect, useReducer, useState } from "react";
import AppModal from "../AppModal";
import AppModalHeader from "../AppModal/AppModalHeader";
import AppModalContent from "../AppModal/AppModalContent";
import AppModalActions from "../AppModal/AppModalActions";
import AppButton from "../AppButton";
import AppInput from "../AppInput";
import AppTextarea from "../AppTextarea";
import AppSelect from "../AppSelect";
import { createTaskRequest } from "../../api/createTask";
import { getUsersRequest } from "../../api/getUsers";
import {
  taskValidationSchema,
  validateField,
  validateFormData,
} from "../../services/validation";
import { formReducer, INITIAL_STATE } from "../../services/reducer";
import styles from "./CreateTaskModal.module.scss";

const statuses = [
  { value: "todo", name: "To Do" },
  { value: "inprogress", name: "In Progress" },
  { value: "done", name: "Done" },
];

export default function CreateTaskModal({
  showCreateTaskModal,
  setShowCreateTaskModal,
  onTaskCreate,
}) {
  const [taskData, dispatch] = useReducer(formReducer, INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);

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
      const response = await createTaskRequest(taskData);
      dispatch({ type: "CREATE_TASK", payload: response });
      onTaskCreate(response);
      setShowCreateTaskModal(false);
    } catch (error) {
      console.error("Error creating task:", error.message);
    }
  };

  useEffect(() => {
    const createdStatuses =
      JSON.parse(localStorage.getItem("customTaskColumns")) || [];
    const structuredStatuses = createdStatuses.map((status) => ({
      value: status.value || status,
      name: status.name || status,
    }));
    statuses.push(...structuredStatuses);
  }, []);

  return (
    <AppModal
      isVisible={showCreateTaskModal}
      onChange={() => setShowCreateTaskModal(!showCreateTaskModal)}
    >
      <AppModalHeader onClose={() => setShowCreateTaskModal(false)}>
        Create
      </AppModalHeader>
      <AppModalContent>
        <form className={styles.CreateTaskModal__Form} onSubmit={handleSubmit}>
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
            value={taskData.dueDate}
            onChange={handleInputChange}
            error={errors.dueDate}
          />
        </form>
      </AppModalContent>
      <AppModalActions>
        <AppButton
          variant="secondary"
          onClick={() => setShowCreateTaskModal(false)}
        >
          Cancel
        </AppButton>
        <AppButton variant="primary" onClick={handleSubmit}>
          Create
        </AppButton>
      </AppModalActions>
    </AppModal>
  );
}
