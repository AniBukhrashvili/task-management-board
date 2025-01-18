import styles from './AppModalContent.module.scss';

export default function AppModalContent({ children }) {
  return <div className={styles.AppModalContent}>{children}</div>;
}
