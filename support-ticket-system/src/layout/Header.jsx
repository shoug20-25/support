import { FaBell, FaUserCircle } from 'react-icons/fa';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header} dir="rtl">
      <div className={styles.welcome}>
        <h2>مرحباً بك في نظام الدعم الفني</h2>
        <p>نسعد بخدمتك ومساعدتك</p>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.notificationButton}
          aria-label="الإشعارات"
        >
          <FaBell />
        </button>

        <div className={styles.userInfo}>
          <FaUserCircle />
          <span>المستخدم</span>
        </div>
      </div>
    </header>
  );
}

export default Header;