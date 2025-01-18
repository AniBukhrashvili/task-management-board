import AppContainer from "../components/AppContainer";
import AppSidebar from "../components/AppSidebar";

import styles from "./AppLayout.module.scss";

export default function AppLayout({ children }) {
  return (
    <div className={styles.AppLayout}>  
      <AppSidebar/>
      <AppContainer>{children}</AppContainer>
    </div>
  );
}
