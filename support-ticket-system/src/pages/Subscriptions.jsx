import { FaCheck, FaBan, FaDesktop } from 'react-icons/fa';
import styles from './Subscriptions.module.css';

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

function Subscriptions() {
  const activeCount = subscriptions.filter(
    (subscription) => subscription.status === 'active'
  ).length;

  const expiredCount = subscriptions.filter(
    (subscription) => subscription.status === 'expired'
  ).length;

  return (
    <div className={styles.subscriptions} dir="rtl">

      <h1 className={styles.pageTitle}>اشتراكاتي</h1>

      {/* ملخص الاشتراكات */}
      <div className={styles.summaryCards}>

        <div className={styles.summaryCard}>
          <div>
            <p>الاشتراكات السارية</p>
            <h2>{activeCount}</h2>
          </div>

          <div className={`${styles.summaryIcon} ${styles.activeIcon}`}>
            <FaCheck />
          </div>
        </div>

        <div className={styles.summaryCard}>
          <div>
            <p>الاشتراكات المنتهية</p>
            <h2>{expiredCount}</h2>
          </div>

          <div className={`${styles.summaryIcon} ${styles.expiredIcon}`}>
            <FaBan />
          </div>
        </div>

      </div>

      {/* جدول الاشتراكات */}
      <div className={styles.tableContainer}>
        <table className={styles.subscriptionTable}>
          <thead>
            <tr>
              <th>اسم النظام</th>
              <th>تاريخ البداية</th>
              <th>تاريخ النهاية</th>
              <th>الحالة</th>
            </tr>
          </thead>

          <tbody>
            {subscriptions.map((subscription) => (
              <tr key={subscription.id}>
                <td>
                  <div className={styles.systemName}>
                    <FaDesktop className={styles.systemIcon} />
                    <span>{subscription.name}</span>
                  </div>
                </td>

                <td>{subscription.startDate}</td>

                <td>{subscription.endDate}</td>

                <td>
                  <span
                    className={
                      subscription.status === 'active'
                        ? styles.activeBadge
                        : styles.expiredBadge
                    }
                  >
                    {subscription.status === 'active'
                      ? 'ساري'
                      : 'منتهي'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Subscriptions;