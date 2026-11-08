import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import styles from './DashboardLayout.module.css';

function DashboardLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((previous) => !previous);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className={styles.layout} dir="rtl">
      {menuOpen && (
        <div
          className={styles.menuOverlay}
          onClick={closeMenu}
        />
      )}

      <Sidebar
        isOpen={menuOpen}
        onClose={closeMenu}
      />

      <div className={styles.mainContent}>
        <button
          type="button"
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <Header />

        <main className={styles.pageContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
