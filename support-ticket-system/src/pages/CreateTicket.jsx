import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt, FaTimes } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Captcha from '../components/Captcha';
import styles from './CreateTicket.module.css';

// شروط التحقق من صحة البيانات
const ticketSchema = z.object({
  system: z.string().min(1, 'يرجى اختيار النظام'),

  department: z.string().min(1, 'يرجى اختيار القسم المختص'),

  title: z
    .string()
    .trim()
    .min(3, 'عنوان المشكلة يجب أن يكون 3 أحرف على الأقل'),

  content: z
    .string()
    .trim()
    .min(10, 'محتوى المشكلة يجب أن يكون 10 أحرف على الأقل'),
});

function CreateTicket() {
  const navigate = useNavigate();

  // إدارة النموذج والتحقق من الحقول
  const {
    register,
    handleSubmit: handleFormSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      system: '',
      department: '',
      title: '',
      content: '',
    },
  });

  const [attachments, setAttachments] = useState([]);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaResetKey, setCaptchaResetKey] = useState(0);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // إخفاء إشعار النجاح بعد 4 ثوانٍ
  useEffect(() => {
    if (!successMessage) return;

    const timer = setTimeout(() => {
      setSuccessMessage('');
    }, 4000);

    return () => clearTimeout(timer);
  }, [successMessage]);

  // إعادة تعيين النموذج
  const resetForm = () => {
    reset();

    setAttachments([]);
    setCaptchaVerified(false);
    setCaptchaResetKey((previousKey) => previousKey + 1);
    setError('');
  };

  // التحقق من CAPTCHA
  const handleCaptchaVerify = useCallback((isVerified) => {
    setCaptchaVerified(isVerified);
    setError('');
  }, []);

  // إضافة المرفقات
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files || []);

    setAttachments((previousFiles) => [
      ...previousFiles,
      ...selectedFiles,
    ]);

    event.target.value = '';
  };

  // حذف مرفق
  const handleRemoveFile = (indexToRemove) => {
    setAttachments((previousFiles) =>
      previousFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  // إرسال التذكرة
  const onSubmit = (data) => {
    if (!captchaVerified) {
      setError('يرجى إدخال رمز التحقق بشكل صحيح');
      return;
    }

    setError('');

    // الإرسال تجريبي حاليًا لعدم وجود Backend
    console.log({
      ...data,
      attachments,
    });

    setSuccessMessage('تم إرسال التذكرة بنجاح');

    resetForm();

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.createTicket} dir="rtl">

      {/* إشعار نجاح الإرسال */}
      {successMessage && (
        <div className={styles.successToast} role="status">
          <span className={styles.successIcon}>✓</span>
          <span>{successMessage}</span>
        </div>
      )}

      <div className={styles.pageHeader}>
        <h1>إنشاء تذكرة</h1>
        <p>تُحدد أولوية التذكرة تلقائيًا من قبل النظام</p>
      </div>

      <form
        className={styles.ticketForm}
        onSubmit={handleFormSubmit(onSubmit)}
        noValidate
      >

        {/* النظام والقسم */}
        <div className={styles.selectRow}>

          <div className={styles.formGroup}>
            <label htmlFor="system">النظام</label>

            <select
              id="system"
              {...register('system')}
            >
              <option value="">اختيار النظام</option>
              <option value="matrix">نظام ماتركس</option>
              <option value="atlas">نظام أطلس</option>
              <option value="resanmah">نظام رزنامة</option>
            </select>

            {errors.system && (
              <p className={styles.errorMessage}>
                {errors.system.message}
              </p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="department">القسم المختص</label>

            <select
              id="department"
              {...register('department')}
            >
              <option value="">القسم المختص</option>
              <option value="technical">الدعم الفني</option>
              <option value="accounts">الحسابات</option>
              <option value="management">الإدارة</option>
            </select>

            {errors.department && (
              <p className={styles.errorMessage}>
                {errors.department.message}
              </p>
            )}
          </div>

        </div>

        {/* عنوان المشكلة */}
        <div className={styles.formGroup}>
          <label htmlFor="title">عنوان المشكلة</label>

          <input
            id="title"
            type="text"
            placeholder="اكتب العنوان بشكل مختصر"
            {...register('title')}
          />

          {errors.title && (
            <p className={styles.errorMessage}>
              {errors.title.message}
            </p>
          )}
        </div>

        {/* محتوى المشكلة */}
        <div className={styles.formGroup}>
          <label htmlFor="content">محتوى المشكلة</label>

          <textarea
            id="content"
            placeholder="اكتب محتوى المشكلة بشكل مختصر"
            rows={4}
            {...register('content')}
          />

          {errors.content && (
            <p className={styles.errorMessage}>
              {errors.content.message}
            </p>
          )}
        </div>

        {/* المرفقات */}
        <div className={styles.formGroup}>
          <label>المرفقات</label>

          <label htmlFor="attachments" className={styles.uploadArea}>
            <FaCloudUploadAlt />
            <span>اسحب الصور هنا أو اضغط للرفع</span>

            <input
              id="attachments"
              type="file"
              accept="image/*,.pdf,.doc,.docx"
              multiple
              onChange={handleFileChange}
            />
          </label>

          {attachments.length > 0 && (
            <div className={styles.fileList}>
              {attachments.map((file, index) => (
                <div
                  className={styles.fileItem}
                  key={`${file.name}-${index}`}
                >
                  <span>{file.name}</span>

                  <button
                    type="button"
                    onClick={() => handleRemoveFile(index)}
                    aria-label={`حذف ${file.name}`}
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CAPTCHA */}
        <Captcha key={captchaResetKey} onVerify={handleCaptchaVerify} />

        {/* رسالة خطأ CAPTCHA */}
        {error && (
          <p className={styles.errorMessage} role="alert">
            {error}
          </p>
        )}

        {/* الأزرار */}
        <div className={styles.formActions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() => navigate('/dashboard')}
          >
            إلغاء
          </button>

          <button
            type="submit"
            className={styles.submitButton}
          >
            إرسال
          </button>
        </div>

      </form>
    </div>
  );
}

export default CreateTicket;