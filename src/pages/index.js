import AppBreadcrumbs from "../components/AppBreadcrumbs";
import AppContainer from "../components/AppContainer";
import AppHeaderTitle from "../components/AppHeaderTitle";
import AppTaskCard from "../components/AppTaskCard";
import AppTaskColumn from "../components/AppTaskColumn";
import AppLayout from "../layout/AppLayout";
import AppModal from "../components/AppModal";
import AppModalHeader from "../components/AppModal/AppModalHeader";
import AppModalContent from "../components/AppModal/AppModalContent";
import AppModalActions from "../components/AppModal/AppModalActions";
import AppButton from "../components/AppButton";
import styles from "./HomePage.module.scss";

export default function HomePage() {
  return (
    <AppLayout>
      <AppBreadcrumbs />
      <AppHeaderTitle />
      <main>
        <AppContainer>
          <div className={styles.HomePage__Tasks}>
            <AppTaskColumn status="todo">
              <AppTaskCard />
              <AppTaskCard />
              <AppTaskCard />
              <AppTaskCard />
            </AppTaskColumn>
            <AppTaskColumn status="inprogress">
              <AppTaskCard />
            </AppTaskColumn>
            <AppTaskColumn status="completed">
              <AppTaskCard />
              <AppTaskCard />
            </AppTaskColumn>
          </div>
        </AppContainer>
      </main>

      {/* <AppModal isVisible={true}>
        <AppModalHeader onClose>Create</AppModalHeader>
        <AppModalContent>content</AppModalContent>
        <AppModalActions>
          <AppButton variant="secondary">Cancel</AppButton>
          <AppButton variant="primary">Create</AppButton>
        </AppModalActions>
      </AppModal> */}
    </AppLayout>
  );
}
