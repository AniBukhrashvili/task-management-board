import { useState } from "react";
import * as yup from "yup";
import AppModal from "../AppModal";
import AppModalHeader from "../AppModal/AppModalHeader";
import AppModalContent from "../AppModal/AppModalContent";
import AppModalActions from "../AppModal/AppModalActions";
import AppButton from "../AppButton";
import AppInput from "../AppInput";
import AppTextarea from "../AppTextarea";
import AppSelect from "../AppSelect";
import { createTaskRequest } from "../../api/createTask";
import styles from "./CreateTaskModal.module.scss";

const statuses = [
  { id: 1, value: "todo", name: "To Do" },
  { id: 2, value: "inprogress", name: "In Progress" },
  { id: 3, value: "done", name: "Done" },
];

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  status: yup.string().required("Status is required"),
  dueDate: yup.string().required("Due date is required"),
});

export default function CreateTaskModal({
  showCreateTaskModal,
  setShowCreateTaskModal,
}) {
  const [taskData, setTaskData] = useState({
    status: "",
    title: "",
    description: "",
    dueDate: "",
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

    const formattedDueDate = new Date(taskData.dueDate).toISOString();
    const formattedData = {
      ...taskData,
      dueDate: formattedDueDate,
    };

    try {
      await createTaskRequest(formattedData);
      setShowCreateTaskModal(false);
    } catch (error) {
      console.error("Error creating task:", error.message);
    }
  };

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
