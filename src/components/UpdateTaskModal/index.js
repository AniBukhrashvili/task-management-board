import { useState } from "react";
import * as yup from "yup";
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
import styles from "./UpdateTaskModal.module.scss";

const statuses = [
  { value: "todo", name: "To Do" },
  { value: "inprogress", name: "In Progress" },
  { value: "done", name: "Done" },
];

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string(),
  status: yup.string().required("Status is required"),
  dueDate: yup.string().required("Due date is required"),
});

export default function UpdateTaskModal({ task, onClose }) {
  const [taskData, setTaskData] = useState({
    id: task._id,
    status: task.status,
    title: task.title,
    description: task.description,
    dueDate: task.dueDate,
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = async (e) => {
    const { name, value } = e.target;

    setTaskData({
      ...taskData,
      [name]: value,
    });

    try {
      await validationSchema.validateAt(name, { ...taskData, [name]: value });
      setErrors((prevErrors) => {
        const { [name]: removedError, ...rest } = prevErrors;
        return rest;
      });
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error.message,
      }));
    }
  };

  const handleSelectChange = async (name, value) => {
    setTaskData({
      ...taskData,
      [name]: value,
    });

    try {
      await validationSchema.validateAt(name, { ...taskData, [name]: value });
      setErrors((prevErrors) => {
        const { [name]: removedError, ...rest } = prevErrors;
        return rest;
      });
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error.message,
      }));
    }
  };

  const validateForm = async () => {
    try {
      await validationSchema.validate(taskData, { abortEarly: false });
      return true;
    } catch (validationErrors) {
      const newErrors = validationErrors.inner.reduce((acc, error) => {
        acc[error.path] = error.message;
        return acc;
      }, {});
      setErrors(newErrors);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = await validateForm();
    if (!isValid) return;

    try {
      await updateTaskRequest(taskData);
      onClose();
    } catch (error) {
      console.error("Error updating task:", error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTaskRequest({ id: taskData.id });
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
