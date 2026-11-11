import { useState } from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import styles from './Header.module.css';

function Header() {
  const [showNotifications, setShowNotifications] = useState(false);

  const username = localStorage.getItem('username') || 'المستخدم';

  const notifications = [
    {
      id: 1,
      title: 'تم إنشاء تذكرة جديدة',
      message: 'تم استلام طلب الدعم الفني بنجاح.',
      time: 'قبل 5 دقائق',
    },
    {
      id: 2,
      title: 'تحديث حالة التذكرة',
      message: 'تم تحديث حالة إحدى تذاكرك.',
      time: 'قبل ساعة',
    },
    {
      id: 3,
      title: 'مرحباً بك',
      message: 'نرحب بك في نظام الدعم الفني.',
      time: 'اليوم',
    },
  ];

  return (
    <header className={styles.header} dir="rtl">
      <div className={styles.welcome}>
        <h2>مرحباً بك في نظام الدعم الفني</h2>
        <p>نسعد بخدمتك ومساعدتك</p>
      </div>

      <div className={styles.actions}>
        <div className={styles.notificationWrapper}>
          <button
            type="button"
            className={styles.notificationButton}
            aria-label="الإشعارات"
            aria-expanded={showNotifications}
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <FaBell />
            <span className={styles.notificationBadge}>
              {notifications.length}
            </span>
          </button>

          {showNotifications && (
            <div className={styles.notificationPanel}>
              <div className={styles.notificationHeader}>
                <h3>الإشعارات</h3>
                <span>{notifications.length} إشعارات</span>
              </div>

              <div className={styles.notificationList}>
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={styles.notificationItem}
                  >
                    <div className={styles.notificationDot}></div>

                    <div>
                      <h4>{notification.title}</h4>
                      <p>{notification.message}</p>
                      <small>{notification.time}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={styles.userInfo}>
          <FaUserCircle />
          <span>{username}</span>
        </div>
      </div>
    </header>
  );
}

export default Header;