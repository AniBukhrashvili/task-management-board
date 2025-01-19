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
  const [tasks, setTasks] = useState([]);

  const fetchTask = async () => {
    const res = await getTasksRequest();
    setTasks(res);
  };

  useEffect(() => {
    fetchTask();
  }, []);

  const taskGroups = tasks.reduce((groups, task) => {
    if (!groups[task.status]) {
      groups[task.status] = [];
    }
    groups[task.status].push(task);
    return groups;
  }, {});

  return (
    <AppLayout>
      <AppBreadcrumbs />
      <AppHeaderTitle />
      <main>
        <AppContainer>
          <div className={styles.HomePage__Tasks}>
            {["todo", "inprogress", "done"].map((status) => (
              <AppTaskColumn key={status} status={status}>
                {taskGroups[status]?.map((task) => (
                  <AppTaskCard key={task._id} task={task} />
                ))}
              </AppTaskColumn>
            ))}
          </div>
        </AppContainer>
      </main>
    </AppLayout>
  );
}
