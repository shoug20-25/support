import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  FaArrowRight,
  FaPaperclip,
  FaUser,
  FaStar,
} from 'react-icons/fa';

import styles from './TicketDetails.module.css';

const statusLabels = {
  new: 'جديدة',
  processing: 'قيد المعالجة',
  completed: 'تمت المعالجة',
  rejected: 'مرفوضة',
};

function TicketDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  // قراءة التذكرة من localStorage
  let ticket = null;

  try {
    const savedTickets = JSON.parse(
      localStorage.getItem('tickets') || '[]'
    );

    ticket = savedTickets.find(
      (item) => String(item.id) === String(id)
    );
  } catch (error) {
    console.error('Error loading ticket:', error);
  }

  // بيانات التذكرة التجريبية القديمة
  if (!ticket && String(id) === '100') {
    ticket = {
      id: 100,
      title: 'مشكلة في رفع الملفات',
      system: 'نظام أطلس',
      department: 'التقنية',
      priority: 'متوسطة',
      status: 'completed',
      content: 'واجهت مشكلة أثناء محاولة رفع الملفات على النظام.',
      attachments: [],
      response: 'تم حل المشكلة من قبل فريق الدعم الفني.',
      responseTime: 'منذ أسبوع',
    };
  }

  const handleRatingSubmit = () => {
    if (rating === 0) return;

    setRatingSubmitted(true);
  };

  // في حال عدم العثور على التذكرة
  if (!ticket) {
    return (
      <div className={styles.ticketDetails} dir="rtl">
        <button
          type="button"
          className={styles.backButton}
          onClick={() => navigate('/tickets')}
        >
          <FaArrowRight />
          العودة إلى التذاكر السابقة
        </button>

        <section className={styles.contentCard}>
          <h3>التذكرة غير موجودة</h3>
          <p>لم يتم العثور على بيانات هذه التذكرة.</p>
        </section>
      </div>
    );
  }

  const attachments = ticket.attachments || [];

  return (
    <div className={styles.ticketDetails} dir="rtl">

      {/* العودة إلى التذاكر السابقة */}
      <button
        type="button"
        className={styles.backButton}
        onClick={() => navigate('/tickets')}
      >
        <FaArrowRight />
        العودة إلى التذاكر السابقة
      </button>

      {/* عنوان التذكرة */}
      <div className={styles.ticketHeader}>
        <div className={styles.titleSection}>
          <h1>
            #{ticket.id} {ticket.title}
          </h1>

          <div className={styles.ticketMeta}>
            {ticket.priority && (
              <span className={styles.priority}>
                <span className={styles.priorityDot}></span>
                {ticket.priority}
              </span>
            )}

            <span className={styles.statusBadge}>
              {statusLabels[ticket.status] || ticket.status}
            </span>
          </div>
        </div>
      </div>

      {/* معلومات النظام والقسم */}
      <div className={styles.infoCards}>
        <div className={styles.infoCard}>
          <span>النظام</span>
          <h3>{ticket.system}</h3>
        </div>

        <div className={styles.infoCard}>
          <span>القسم المختص</span>
          <h3>{ticket.department}</h3>
        </div>

        <div className={styles.infoCard}>
          <span>تاريخ الإنشاء</span>
          <h3>{ticket.date}</h3>
        </div>
      </div>

      {/* محتوى التذكرة */}
      <section className={styles.contentCard}>
        <h3>عنوان المشكلة</h3>
        <p>{ticket.title}</p>

        <h3>تفاصيل المشكلة</h3>
        <p>{ticket.content}</p>

        {/* المرفقات */}
        {attachments.length > 0 && (
          <div className={styles.attachment}>
            <FaPaperclip />
            <div>
              <strong>المرفقات:</strong>

              {attachments.map((file, index) => (
                <p key={`${file.name}-${index}`}>
                  {file.name}
                </p>
              ))}
            </div>
          </div>
        )}

        {attachments.length === 0 && (
          <div className={styles.attachment}>
            <FaPaperclip />
            لا توجد مرفقات
          </div>
        )}
      </section>

      {/* رد الدعم الفني */}
      {ticket.response && (
        <section className={styles.responseCard}>
          <div className={styles.responseHeader}>
            <div>
              <FaUser />
              <strong>رد موظف الدعم الفني</strong>
            </div>

            <span>{ticket.responseTime || ''}</span>
          </div>

          <p>{ticket.response}</p>
        </section>
      )}

      {/* تقييم الخدمة */}
      {ticket.status === 'completed' && (
        <section className={styles.ratingCard}>
          <h3>قيّم الخدمة</h3>

          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`${styles.starButton} ${
                  star <= (hoverRating || rating)
                    ? styles.starActive
                    : ''
                }`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                aria-label={`تقييم ${star} من 5`}
              >
                <FaStar />
              </button>
            ))}
          </div>

          <button
            type="button"
            className={styles.submitRating}
            onClick={handleRatingSubmit}
            disabled={rating === 0 || ratingSubmitted}
          >
            {ratingSubmitted ? 'تم إرسال التقييم' : 'إرسال'}
          </button>
        </section>
      )}

    </div>
  );
}

export default TicketDetails;