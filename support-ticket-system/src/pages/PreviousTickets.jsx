import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  FaSearch,
  FaTicketAlt,
  FaEye,
} from 'react-icons/fa';

import styles from './PreviousTickets.module.css';

const tickets = [
  {
    id: 128,
    title: 'تعديل بيانات الحساب',
    system: 'نظام ماتركس',
    department: 'الدعم الفني',
    date: '2026-11-02',
    status: 'processing',
  },
  {
    id: 125,
    title: 'الدخول للنظام لا يعمل',
    system: 'نظام أطلس',
    department: 'الدعم الفني',
    date: '2026-10-28',
    status: 'completed',
  },
  {
    id: 100,
    title: 'مشكلة في رفع الملفات',
    system: 'نظام ماتركس',
    department: 'الدعم الفني',
    date: '2026-10-20',
    status: 'completed',
  },
  {
    id: 96,
    title: 'طلب تحديث بيانات الاشتراك',
    system: 'نظام رزنامة',
    department: 'الحسابات',
    date: '2026-10-15',
    status: 'rejected',
  },
  {
    id: 82,
    title: 'استفسار عن صلاحيات المستخدم',
    system: 'نظام أطلس',
    department: 'الدعم الفني',
    date: '2026-10-10',
    status: 'new',
  },
];

const statusLabels = {
  new: 'جديدة',
  processing: 'قيد المعالجة',
  completed: 'تمت المعالجة',
  rejected: 'مرفوضة',
};

function Tickets() {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.includes(search) ||
      ticket.id.toString().includes(search) ||
      ticket.system.includes(search);

    const matchesStatus =
      selectedStatus === 'all' ||
      ticket.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className={styles.ticketsPage} dir="rtl">

      {/* عنوان الصفحة */}
      <div className={styles.pageHeader}>
        <div>
          <h1>التذاكر السابقة</h1>
          <p>استعرض وتابع جميع تذاكر الدعم الفني الخاصة بك</p>
        </div>

        <button
          type="button"
          className={styles.createButton}
          onClick={() => navigate('/tickets/create')}
        >
          <FaTicketAlt />
          إنشاء تذكرة
        </button>
      </div>

      {/* إحصائيات التذاكر */}
      <div className={styles.statsCards}>
        <div className={styles.statCard}>
          <span>إجمالي التذاكر</span>
          <h2>{tickets.length}</h2>
        </div>

        <div className={styles.statCard}>
          <span>قيد المعالجة</span>
          <h2>
            {tickets.filter((ticket) => ticket.status === 'processing').length}
          </h2>
        </div>

        <div className={styles.statCard}>
          <span>تمت المعالجة</span>
          <h2>
            {tickets.filter((ticket) => ticket.status === 'completed').length}
          </h2>
        </div>
      </div>

      {/* البحث والفلترة */}
      <section className={styles.ticketsContainer}>

        <div className={styles.filters}>
          <div className={styles.searchBox}>
            <FaSearch />

            <input
              type="text"
              placeholder="ابحث برقم التذكرة أو عنوانها أو النظام..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <select
            value={selectedStatus}
            onChange={(event) => setSelectedStatus(event.target.value)}
            aria-label="فلترة حسب حالة التذكرة"
          >
            <option value="all">جميع الحالات</option>
            <option value="new">جديدة</option>
            <option value="processing">قيد المعالجة</option>
            <option value="completed">تمت المعالجة</option>
            <option value="rejected">مرفوضة</option>
          </select>
        </div>

        {/* جدول التذاكر */}
        <div className={styles.tableContainer}>
          <table className={styles.ticketsTable}>
            <thead>
              <tr>
                <th>رقم التذكرة</th>
                <th>عنوان التذكرة</th>
                <th>النظام</th>
                <th>تاريخ الإنشاء</th>
                <th>الحالة</th>
                <th>التفاصيل</th>
              </tr>
            </thead>

            <tbody>
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td>#{ticket.id}</td>

                  <td>
                    <div className={styles.ticketTitle}>
                      <FaTicketAlt />
                      <span>{ticket.title}</span>
                    </div>
                  </td>

                  <td>{ticket.system}</td>

                  <td>{ticket.date}</td>

                  <td>
                    <span
                      className={`${styles.statusBadge} ${
                        styles[ticket.status]
                      }`}
                    >
                      {statusLabels[ticket.status]}
                    </span>
                  </td>

                  <td>
                    <button
  type="button"
  onClick={() => {
    if (ticket.id === 100) {
      navigate(`/tickets/${ticket.id}`);
    }
  }}
>
  معاينة
</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredTickets.length === 0 && (
            <div className={styles.emptyState}>
              لا توجد تذاكر مطابقة للبحث
            </div>
          )}
        </div>

      </section>
    </div>
  );
}

export default Tickets;