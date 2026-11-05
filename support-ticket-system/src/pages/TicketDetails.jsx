import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  FaArrowRight,
  FaPaperclip,
  FaUser,
  FaStar,
} from 'react-icons/fa';

import styles from './TicketDetails.module.css';

function TicketDetails() {
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  const ticket = {
    id: 100,
    title: 'مشكلة في رفع الملفات',
    system: 'نظام أطلس',
    department: 'التقنية',
    priority: 'متوسطة',
    status: 'تمت المعالجة',
    content: 'واجهت مشكلة أثناء محاولة رفع الملفات على النظام.',
    attachment: 'PNG',
    response: 'تم حل المشكلة من قبل فريق الدعم الفني.',
    responseTime: 'منذ أسبوع',
  };

  const handleRatingSubmit = () => {
    if (rating === 0) return;

    setRatingSubmitted(true);
  };

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
            <span className={styles.priority}>
              <span className={styles.priorityDot}></span>
              {ticket.priority}
            </span>

            <span className={styles.statusBadge}>
              {ticket.status}
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
      </div>

      {/* محتوى التذكرة */}
      <section className={styles.contentCard}>
        <h3>المحتوى</h3>

        <p>{ticket.content}</p>

        <div className={styles.attachment}>
          <FaPaperclip />
          المرفقات ({ticket.attachment})
        </div>
      </section>

      {/* رد الدعم الفني */}
      <section className={styles.responseCard}>
        <div className={styles.responseHeader}>
          <div>
            <FaUser />
            <strong>رد موظف الدعم الفني</strong>
          </div>

          <span>{ticket.responseTime}</span>
        </div>

        <p>{ticket.response}</p>
      </section>

      {/* تقييم الخدمة */}
      <section className={styles.ratingCard}>
        <h3>قيّم الخدمة</h3>

        <div className={styles.stars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={`${styles.starButton} ${
                star <= (hoverRating || rating) ? styles.starActive : ''
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

    </div>
  );
}

export default TicketDetails;