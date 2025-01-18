import Logo from "../../assets/images/logo.png";
import HomeSvg from "../../assets/images/home.svg";
import StatisticsSvg from "../../assets/images/statistics.svg";
import PersonSvg from "../../assets/images/person.svg";
import CalendarSvg from "../../assets/images/calendar.svg";
import LightSvg from "../../assets/images/light.svg";
import NotificationsSvg from "../../assets/images/notifications.svg";
import styles from "./AppSidebar.module.scss";

export default function AppSidebar() {
  return (
    <aside className={styles.AppSidebar}>
      <ul className={styles.AppSidebar__Menu}>
        <li className={styles.AppSidebar__MenuItem}>
          <img src={Logo} alt="Logo" />
        </li>
        <li className={styles.AppSidebar__MenuItem}>
          <img src={HomeSvg} alt="Home" />
        </li>
        <li className={styles.AppSidebar__MenuItem}>
          <img src={StatisticsSvg} alt="Statistics" />
        </li>
        <li className={styles.AppSidebar__MenuItem}>
          <img src={CalendarSvg} alt="Calendar" />
        </li>
        <li className={styles.AppSidebar__MenuItem}>
          <img src={LightSvg} alt="Light" />
        </li>
        <li className={styles.AppSidebar__MenuItem}>
          <img src={NotificationsSvg} alt="Notifications" />
        </li>
      </ul>
      <div className={styles.AppSidebar__Bottom}>
        <img src={PersonSvg} alt="Person" />
      </div>
    </aside>
  );
}
