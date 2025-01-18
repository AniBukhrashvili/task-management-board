import styles from "./AppContainer.module.scss";

export default function AppContainer({ children }) {
  return <div className={styles.AppContainer}>{children}</div>;
}