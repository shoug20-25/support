import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import styles from './DashboardLayout.module.css';

function DashboardLayout() {
  return (
    <div className={styles.layout} dir="rtl">
      <Sidebar />

      <div className={styles.mainContent}>
        <Header />

        <main className={styles.pageContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;