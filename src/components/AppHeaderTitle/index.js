import ProjectImage from "../../assets/images/project.png";
import AppButton from "../AppButton";
import AppContainer from "../AppContainer";
import styles from "./AppHeaderTitle.module.scss";

export default function AppHeaderTitle() {
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
          <AppButton variant="primary">Create Task</AppButton>
        </div>
      </AppContainer>
    </div>
  );
}
