import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import {
  FaHome,
  FaUser,
  FaHeadset,
  FaChevronDown,
  FaChevronUp,
  FaPlusSquare,
  FaFolderOpen,
  FaCreditCard,
  FaSignOutAlt,
} from 'react-icons/fa';

import styles from './Sidebar.module.css';
import logo from '../assets/support-logo.png';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [supportOpen, setSupportOpen] = useState(
    location.pathname.startsWith('/tickets')
  );

  const getNavClass = ({ isActive }) =>
    `${styles.navItem} ${isActive ? styles.active : ''}`;

  const getSubMenuClass = ({ isActive }) =>
    `${styles.subMenuItem} ${isActive ? styles.active : ''}`;

  const handleLogout = () => {
    setShowLogoutModal(false);
    navigate('/login');
  };

  return (
    <aside className={styles.sidebar} dir="rtl">

      {/* الشعار */}
      <div className={styles.sidebarLogo}>
        <img src={logo} alt="شعار الدعم الفني" />
      </div>

      <div className={styles.logo}>
        <h2>نظام الدعم الفني</h2>
      </div>

      {/* القائمة */}
      <nav className={styles.navigation}>

        <NavLink to="/dashboard" className={getNavClass}>
          <FaHome />
          <span>الرئيسية</span>
        </NavLink>

        <NavLink to="/profile" className={getNavClass}>
          <FaUser />
          <span>الملف الشخصي</span>
        </NavLink>

        <NavLink to="/subscriptions" className={getNavClass}>
          <FaCreditCard />
          <span>اشتراكاتي</span>
        </NavLink>

        {/* الدعم الفني */}
        <button
          type="button"
          className={styles.navItem}
          onClick={() => setSupportOpen((previous) => !previous)}
          aria-expanded={supportOpen}
        >
          <FaHeadset />
          <span>الدعم الفني</span>

          <span className={styles.chevron}>
            {supportOpen ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        </button>

        {supportOpen && (
          <div className={styles.subMenu}>

            <NavLink
              to="/tickets/create"
              className={getSubMenuClass}
            >
              <span>إنشاء تذكرة</span>
              <FaPlusSquare />
            </NavLink>

            <NavLink
              to="/tickets"
              className={getSubMenuClass}
            >
              <span>التذاكر السابقة</span>
              <FaFolderOpen />
            </NavLink>

          </div>
        )}

      </nav>

      {/* تسجيل الخروج */}
      <button
        type="button"
        className={styles.logoutButton}
        onClick={() => setShowLogoutModal(true)}
      >
        <FaSignOutAlt />
        <span>تسجيل الخروج</span>
      </button>

      {/* نافذة تأكيد تسجيل الخروج */}
      {showLogoutModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.logoutModal} dir="rtl">

            <h3>تسجيل الخروج</h3>

            <p>هل أنت متأكد من تسجيل الخروج؟</p>

            <div className={styles.modalActions}>

              <button
                type="button"
                className={styles.confirmLogout}
                onClick={handleLogout}
              >
                نعم، تسجيل الخروج
              </button>

              <button
                type="button"
                className={styles.cancelLogout}
                onClick={() => setShowLogoutModal(false)}
              >
                لا، إلغاء
              </button>

            </div>
          </div>
        </div>
      )}

    </aside>
  );
}

export default Sidebar;