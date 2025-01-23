import { useState } from "react";
import AppButton from "../AppButton";
import AppInput from "../AppInput";
import AppModal from "../AppModal";
import AppModalActions from "../AppModal/AppModalActions";
import AppModalContent from "../AppModal/AppModalContent";
import AppModalHeader from "../AppModal/AppModalHeader";
import styles from "./CreateColumnModal.module.scss";

export default function CreateColumnModal({
  showCreateColumnModal,
  setShowCreateColumnModal,
  onAddColumn,
}) {
  const [columnTitle, setColumnTitle] = useState("");
  const [errors, setErrors] = useState({});

  const handleCreate = () => {
    if (columnTitle.trim()) {
      onAddColumn(columnTitle.trim());
      setColumnTitle("");
    } else {
      setErrors({ status: "Column title is required" });
    }
  };

  return (
    <AppModal
      isVisible={showCreateColumnModal}
      onChange={() => setShowCreateColumnModal(!showCreateColumnModal)}
    >
      <AppModalHeader onClose={() => setShowCreateColumnModal(false)}>
        Create Another Column
      </AppModalHeader>
      <AppModalContent>
        <form
          className={styles.CreateColumnModal__Form}
          onSubmit={(e) => e.preventDefault()}
        >
          <AppInput
            name="title"
            label="Column Title"
            value={columnTitle}
            onChange={(e) => setColumnTitle(e.target.value)}
            error={errors.status}
          />
        </form>
      </AppModalContent>
      <AppModalActions>
        <AppButton
          variant="secondary"
          onClick={() => setShowCreateColumnModal(false)}
        >
          Cancel
        </AppButton>
        <AppButton variant="primary" onClick={handleCreate}>
          Create
        </AppButton>
      </AppModalActions>
    </AppModal>
  );
}
