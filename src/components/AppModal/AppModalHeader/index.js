import styles from "./AppModalHeader.module.scss";

export default function AppModalHeader({ children, onClose }) {
  return (
    <div className={styles.AppModalHeader}>
      <div className={styles.AppModalHeader__Title}>{children}</div>
      {onClose && (
        <button
          aria-label="close"
          className={styles.AppModalHeader__Close}
          onClick={onClose}
        >
          <svg
            width="47"
            height="47"
            viewBox="0 0 47 47"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.5011 23.4999L29.0401 29.0389M17.9622 29.0389L23.5011 23.4999L17.9622 29.0389ZM29.0401 17.9609L23.5011 23.4999L29.0401 17.9609ZM23.5011 23.4999L17.9622 17.9609L23.5011 23.4999Z"
              stroke="#2D3648"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
