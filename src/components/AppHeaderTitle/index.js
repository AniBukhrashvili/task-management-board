import { useState } from "react";
import ProjectImage from "../../assets/images/project.png";
import AppButton from "../AppButton";
import AppModal from "../AppModal";
import AppModalHeader from "../AppModal/AppModalHeader";
import AppModalContent from "../AppModal/AppModalContent";
import AppModalActions from "../AppModal/AppModalActions";
import AppContainer from "../AppContainer";
import styles from "./AppHeaderTitle.module.scss";

export default function AppHeaderTitle() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={styles.AppHeaderTitle}>
      <AppContainer>
        <div className={styles.AppHeaderTitle__Inner}>
          <div className={styles.AppHeaderTitle__Left}>
            <figure className={styles.AppHeaderTitle__Figure}>
              <img src={ProjectImage} alt="Project" />
            </figure>
            <h1>Project PlanetX</h1>
          </div>
          <AppButton variant="primary" onClick={() => setIsVisible(!isVisible)}>
            Create Task
          </AppButton>
        </div>
      </AppContainer>

      {isVisible && (
        <AppModal isVisible={true} onChange={() => setIsVisible(!isVisible)}>
          <AppModalHeader onClose={() => setIsVisible(false)}>
            Create
          </AppModalHeader>
          <AppModalContent>content</AppModalContent>
          <AppModalActions>
            <AppButton variant="secondary" onClick={() => setIsVisible(false)}>
              Cancel
            </AppButton>
            <AppButton variant="primary">Create</AppButton>
          </AppModalActions>
        </AppModal>
      )}
    </div>
  );
}
