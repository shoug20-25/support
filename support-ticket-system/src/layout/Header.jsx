import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import styles from './Header.module.css';

const initialNotifications = [
  {
    id: 1,
    title: 'تم إنشاء تذكرة جديدة',
    message: 'تم استلام طلب الدعم الفني بنجاح.',
    time: 'قبل 5 دقائق',
    read: false,
  },
  {
    id: 2,
    title: 'تحديث حالة التذكرة',
    message: 'تم تحديث حالة إحدى تذاكرك.',
    time: 'قبل ساعة',
    read: false,
  },
  {
    id: 3,
    title: 'مرحباً بك',
    message: 'نرحب بك في نظام الدعم الفني.',
    time: 'اليوم',
    read: false,
  },
];

function getNotifications() {
  try {
    const saved = localStorage.getItem('notifications');

    if (saved !== null) {
      return JSON.parse(saved);
    }

    localStorage.setItem(
      'notifications',
      JSON.stringify(initialNotifications)
    );

    return initialNotifications;
  } catch (error) {
    console.error('Error loading notifications:', error);
    return initialNotifications;
  }
}

function Header() {
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(getNotifications);

  const username = localStorage.getItem('username') || 'المستخدم';

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const handleMarkAsRead = (id) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id
        ? { ...notification, read: true }
        : notification
    );

    setNotifications(updatedNotifications);

    localStorage.setItem(
      'notifications',
      JSON.stringify(updatedNotifications)
    );
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

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

            {unreadCount > 0 && (
              <span className={styles.notificationBadge}>
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className={styles.notificationPanel}>
              <div className={styles.notificationHeader}>
                <h3>الإشعارات</h3>
                <span>{notifications.length} إشعارات</span>
              </div>

              <div className={styles.notificationList}>
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`${styles.notificationItem} ${
                        notification.read
                          ? styles.readNotification
                          : styles.unreadNotification
                      }`}
                    >
                      <div className={styles.notificationDot}></div>

                      <div className={styles.notificationContent}>
                        <h4>{notification.title}</h4>
                        <p>{notification.message}</p>
                        <small>{notification.time}</small>

                        {!notification.read && (
                          <button
                            type="button"
                            className={styles.markReadButton}
                            onClick={() =>
                              handleMarkAsRead(notification.id)
                            }
                          >
                            تحديد كمقروء
                          </button>
                        )}

                        {notification.read && (
                          <span className={styles.readLabel}>
                            تمت القراءة
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={styles.emptyNotifications}>
                    لا توجد إشعارات
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          className={styles.userInfo}
          onClick={handleProfileClick}
          aria-label="الانتقال إلى الملف الشخصي"
        >
          <FaUserCircle />
          <span>{username}</span>
        </button>
      </div>
    </header>
  );
}

export default Header;