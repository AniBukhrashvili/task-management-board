import { useEffect, useState } from "react";
import AppBreadcrumbs from "../components/AppBreadcrumbs";
import AppContainer from "../components/AppContainer";
import AppHeaderTitle from "../components/AppHeaderTitle";
import AppTaskCard from "../components/AppTaskCard";
import AppTaskColumn from "../components/AppTaskColumn";
import AppLayout from "../layout/AppLayout";
import { getTasksRequest } from "../api/getTasks";
import styles from "./HomePage.module.scss";

export default function HomePage() {
  const [tasks, setTasks] = useState();

  const fetchTask = async () => {
    const res = await getTasksRequest();
    setTasks(res);
  };

  useEffect(() => {
    fetchTask();
  }, []);

  console.log(tasks);
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
            <AppTaskColumn status="done">
              <AppTaskCard />
              <AppTaskCard />
            </AppTaskColumn>
          </div>
        </AppContainer>
      </main>
    </AppLayout>
  );
}
