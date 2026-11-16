import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt, FaTimes } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Captcha from '../components/Captcha';
import styles from './CreateTicket.module.css';

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

const systemLabels = {
  matrix: 'نظام ماتركس',
  atlas: 'نظام أطلس',
  resanmah: 'نظام رزنامة',
};

const departmentLabels = {
  technical: 'الدعم الفني',
  accounts: 'الحسابات',
  management: 'الإدارة',
};

function CreateTicket() {
  const navigate = useNavigate();

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

  useEffect(() => {
    if (!successMessage) return;

    const timer = setTimeout(() => {
      setSuccessMessage('');
    }, 4000);

    return () => clearTimeout(timer);
  }, [successMessage]);

  const resetForm = () => {
    reset();
    setAttachments([]);
    setCaptchaVerified(false);
    setCaptchaResetKey((previousKey) => previousKey + 1);
    setError('');
  };

  const handleCaptchaVerify = useCallback((isVerified) => {
    setCaptchaVerified(isVerified);
    setError('');
  }, []);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files || []);

    setAttachments((previousFiles) => [
      ...previousFiles,
      ...selectedFiles,
    ]);

    event.target.value = '';
  };

  const handleRemoveFile = (indexToRemove) => {
    setAttachments((previousFiles) =>
      previousFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  // حفظ التذكرة في المتصفح
  const onSubmit = (data) => {
    if (!captchaVerified) {
      setError('يرجى إدخال رمز التحقق بشكل صحيح');
      return;
    }

    try {
      const existingTickets = JSON.parse(
        localStorage.getItem('tickets') || '[]'
      );
let ticketId;

do {
  ticketId = Math.floor(100000 + Math.random() * 900000);
} while (existingTickets.some((ticket) => ticket.id === ticketId));

const newTicket = {
  id: ticketId,
  title: data.title,
  content: data.content,
  system: systemLabels[data.system],
  department: departmentLabels[data.department],
  date: new Date().toLocaleDateString('en-CA'),
  createdAt: new Date().toISOString(),
  status: 'new',

  attachments: attachments.map((file) => ({
    name: file.name,
    size: file.size,
    type: file.type,
  })),
};

      const updatedTickets = [newTicket, ...existingTickets];

      localStorage.setItem('tickets', JSON.stringify(updatedTickets));

      setError('');
      setSuccessMessage('تم إرسال التذكرة بنجاح');

      resetForm();

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } catch (storageError) {
      console.error('Ticket storage error:', storageError);
      setError('تعذر حفظ التذكرة، يرجى المحاولة مرة أخرى');
    }
  };

  return (
    <div className={styles.createTicket} dir="rtl">

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
        <div className={styles.selectRow}>

          <div className={styles.formGroup}>
            <label htmlFor="system">النظام</label>

            <select id="system" {...register('system')}>
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

            <select id="department" {...register('department')}>
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

        <Captcha
          key={captchaResetKey}
          onVerify={handleCaptchaVerify}
        />

        {error && (
          <p className={styles.errorMessage} role="alert">
            {error}
          </p>
        )}

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