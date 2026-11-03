import {
  FaUserCircle,
  FaTicketAlt,
  FaCheckCircle,
  FaClock,
  FaChevronDown,
} from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import styles from './Dashboard.module.css';

const subscriptions = [
  {
    id: 1,
    name: 'نظام ماتركس',
    startDate: '6-5-2026',
    endDate: '12-12-2026',
    status: 'active',
  },
  {
    id: 2,
    name: 'نظام أطلس',
    startDate: '14-6-2026',
    endDate: '15-2-2027',
    status: 'active',
  },
  {
    id: 3,
    name: 'نظام تِلكس',
    startDate: '29-12-2025',
    endDate: '14-5-2026',
    status: 'expired',
  },
];

function Dashboard() {
  const navigate = useNavigate();

  const [selectedSubscription, setSelectedSubscription] = useState(
    subscriptions[0]
  );

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const tickets = [
    {
      id: 128,
      title: 'تعديل بيانات الحساب',
      description: 'تم تحديث التذكرة من قبل فريق الدعم الفني',
      status: 'قيد المعالجة',
      time: 'منذ 30 دقيقة',
      type: 'processing',
    },
    {
      id: 125,
      title: 'الدخول للنظام لا يعمل',
      description: 'تم حل التذكرة بنجاح',
      status: 'تمت المعالجة',
      time: 'منذ 4 أيام',
      type: 'completed',
    },
    {
      id: 100,
      title: 'مشكلة في رفع الملفات',
      description: 'تم حل التذكرة بنجاح',
      status: 'تمت المعالجة',
      time: 'منذ أسبوع',
      type: 'completed',
    },
  ];

  return (
    <div className={styles.dashboard} dir="rtl">
      <div className={styles.welcome}>
        <FaUserCircle className={styles.welcomeIcon} />
        <h2>مرحباً بك شوق</h2>
      </div>

      {/* بطاقة الاشتراك */}
      <section className={styles.subscriptionCard}>
        <div className={styles.subscriptionInfo}>
          <div className={styles.subscriptionDropdown} ref={dropdownRef}>
            <button
              type="button"
              className={styles.dropdownButton}
              onClick={() => setDropdownOpen((prev) => !prev)}
              aria-expanded={dropdownOpen}
            >
              <span>اشتراكي</span>
              <FaChevronDown
                className={`${styles.dropdownArrow} ${
                  dropdownOpen ? styles.arrowOpen : ''
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className={styles.dropdownMenu}>
                {subscriptions.map((subscription) => (
                  <button
                    type="button"
                    key={subscription.id}
                    className={`${styles.dropdownItem} ${
                      selectedSubscription.id === subscription.id
                        ? styles.selectedItem
                        : ''
                    }`}
                    onClick={() => {
                      setSelectedSubscription(subscription);
                      setDropdownOpen(false);
                    }}
                  >
                    {subscription.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <h3>{selectedSubscription.name}</h3>

          <p>
            تاريخ انتهاء الاشتراك: {selectedSubscription.endDate}
          </p>
        </div>

        <span
          className={
            selectedSubscription.status === 'active'
              ? styles.activeBadge
              : styles.expiredBadge
          }
        >
          {selectedSubscription.status === 'active' ? 'ساري' : 'منتهي'}
        </span>
      </section>

      {/* الإحصائيات */}
      <section className={styles.stats}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FaClock />
          </div>

          <div>
            <p>تذاكر مفتوحة</p>
            <h3>1</h3>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FaCheckCircle />
          </div>

          <div>
            <p>تذاكر مغلقة</p>
            <h3>2</h3>
          </div>
        </div>
      </section>

      {/* آخر التحديثات */}
      <section className={styles.updates}>
        <div className={styles.sectionHeader}>
          <h3>آخر التحديثات</h3>

          <button onClick={() => navigate('/tickets')}>
            عرض جميع التذاكر
          </button>
        </div>

        <div className={styles.ticketList}>
          {tickets.map((ticket) => (
            <article key={ticket.id} className={styles.ticketCard}>
              <div className={styles.ticketIcon}>
                <FaTicketAlt />
              </div>

              <div className={styles.ticketInfo}>
                <h4>{ticket.title}</h4>
                <p>رقم التذكرة: #{ticket.id}</p>
                <span>{ticket.description}</span>
              </div>

              <div className={styles.ticketMeta}>
                <span className={styles[ticket.type]}>
                  {ticket.status}
                </span>

                <small>{ticket.time}</small>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
