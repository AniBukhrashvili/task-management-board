import classNames from "classnames";
import AppContainer from "../AppContainer";
import styles from "./AppBreadcrumbs.module.scss";

export default function AppBreadcrumbs() {
  return (
    <div className={styles.AppBreadcrumbs}>
      <AppContainer>
        <div className={styles.AppBreadcrumbs__Inner}>
          <span className={styles.AppBreadcrumbs__Item}>Home</span>
          <span className={styles.AppBreadcrumbs__Item}>Dashboard</span>
          <span className={styles.AppBreadcrumbs__Item}>Project</span>
          <span
            className={classNames(styles.AppBreadcrumbs__Item, {
              [styles["AppBreadcrumbs__Item--Active"]]: true,
            })}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 1.5625C8.33122 1.5625 6.69992 2.05735 5.31238 2.98448C3.92484 3.9116 2.84338 5.22936 2.20477 6.77111C1.56616 8.31286 1.39907 10.0094 1.72463 11.6461C2.05019 13.2828 2.85379 14.7862 4.03379 15.9662C5.2138 17.1462 6.71721 17.9498 8.35393 18.2754C9.99064 18.6009 11.6871 18.4338 13.2289 17.7952C14.7706 17.1566 16.0884 16.0752 17.0155 14.6876C17.9427 13.3001 18.4375 11.6688 18.4375 10C18.435 7.763 17.5453 5.61833 15.9635 4.03653C14.3817 2.45473 12.237 1.56498 10 1.5625ZM16.5625 9.98906C16.5188 10.0992 16.1172 10.5445 14.775 10.9523C14.324 11.0866 13.8657 11.1949 13.4023 11.2766C13.4258 10.8516 13.4375 10.4242 13.4375 10C13.4375 7.82422 13.1289 5.56016 12.4805 3.92578C13.6846 4.41886 14.7154 5.25826 15.4421 6.33766C16.1688 7.41705 16.5587 8.68785 16.5625 9.98906ZM9.98907 3.4375C10.0992 3.48125 10.5445 3.88281 10.9523 5.225C11.343 6.52187 11.5625 8.21797 11.5625 10C11.5625 10.5125 11.5438 11.0156 11.5094 11.5094C11.018 11.5438 10.5125 11.5625 10 11.5625C8.21797 11.5625 6.52188 11.3453 5.225 10.9523C3.88282 10.5469 3.48125 10.0992 3.4375 9.98906C3.44245 8.253 4.13429 6.58946 5.36188 5.36187C6.58946 4.13429 8.25301 3.44245 9.98907 3.4375ZM3.92579 12.4805C5.56016 13.1289 7.82422 13.4375 10 13.4375C10.4242 13.4375 10.8516 13.4258 11.2766 13.4016C11.195 13.8652 11.0867 14.3238 10.9523 14.775C10.5469 16.1172 10.0992 16.5187 9.98907 16.5625C8.68785 16.5587 7.41705 16.1687 6.33766 15.4421C5.25827 14.7154 4.41886 13.6846 3.92579 12.4805ZM12.4805 16.0742C12.8078 15.2484 13.0492 14.2617 13.207 13.207C14.2617 13.0508 15.2484 12.8078 16.0742 12.4805C15.7427 13.2874 15.2543 14.0205 14.6374 14.6374C14.0205 15.2543 13.2874 15.7427 12.4805 16.0742Z"
                fill="#4F46E5"
              />
            </svg>
            Project PlanetX
          </span>
        </div>
      </AppContainer>
    </div>
  );
}
