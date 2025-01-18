import AppBreadcrumbs from "../components/AppBreadcrumbs";
import AppHeaderTitle from "../components/AppHeaderTitle";
import AppLayout from "../layout/AppLayout";

export default function HomePage() {
  return (
    <AppLayout>
      <AppBreadcrumbs />
      <AppHeaderTitle />
    </AppLayout>
  );
}
