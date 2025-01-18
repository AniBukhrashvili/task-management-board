import classnames from "classnames";
import { useRef } from "react";
import AppPortal from "../AppPortal";
import { useOutsideClick } from "../../services/outsideClick";
import styles from "./AppModal.module.scss";

export default function AppModal({ isVisible, onChange, children, className }) {
  const modalContainer = useRef();

  useOutsideClick(modalContainer, () => onChange(false));

  if (!isVisible) return null;

  return (
    <AppPortal>
      <div className={classnames(styles.AppModal, className)}>
        <div ref={modalContainer} className={styles.AppModal__Container}>
          {children}
        </div>
      </div>
    </AppPortal>
  );
}
