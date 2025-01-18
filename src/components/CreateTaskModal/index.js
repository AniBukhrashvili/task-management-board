import AppModal from "../AppModal";
import AppModalHeader from "../AppModal/AppModalHeader";
import AppModalContent from "../AppModal/AppModalContent";
import AppModalActions from "../AppModal/AppModalActions";
import AppButton from "../AppButton";
import AppInput from "../AppInput";
import AppTextarea from "../AppTextarea";
import styles from "./CreateTaskModal.module.scss";
import AppSelect from "../AppSelect";

const statuses = [
  { value: "todo", name: "To Do" },
  { value: "inprogress", name: "In Progress" },
  { value: "completed", name: "Completed" },
];

export default function CreateTaskModal({
  showCreateTaskModal,
  setShowCreateTaskModal,
}) {
  return (
    <AppModal
      isVisible={true}
      onChange={() => setShowCreateTaskModal(!showCreateTaskModal)}
    >
      <AppModalHeader onClose={() => setShowCreateTaskModal(false)}>
        Create
      </AppModalHeader>
      <AppModalContent>
        <form className={styles.CreateTaskModal__Form}>
          <AppSelect name="status" label="Status" options={statuses} />
          <AppInput name="title" label="Title" />
          <AppTextarea name="description" label="Description" />
          <AppInput name="date" label="Due Date" type="date" />
        </form>
      </AppModalContent>
      <AppModalActions>
        <AppButton
          variant="secondary"
          onClick={() => setShowCreateTaskModal(false)}
        >
          Cancel
        </AppButton>
        <AppButton variant="primary">Create</AppButton>
      </AppModalActions>
    </AppModal>
  );
}
