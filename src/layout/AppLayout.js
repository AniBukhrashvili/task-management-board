import AppHeaderMobile from "../components/AppHeaderMobile";
import AppSidebar from "../components/AppSidebar";
import styles from "./AppLayout.module.scss";

export default function AppLayout({ children }) {
  return (
    <div className={styles.AppLayout}>
      <AppHeaderMobile />
      <AppSidebar />
      <div className={styles.AppLayout__Inner}>{children}</div>
    </div>
  );
}
