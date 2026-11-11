import { useState } from 'react';
import { FaEye, FaEyeSlash, FaSave } from 'react-icons/fa';
import styles from './Profile.module.css';

function Profile() {
  const [formData, setFormData] = useState({
    userNumber: '',
    username: '',
    nationalId: '',
    phone: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    // الهوية: أرقام فقط وبحد أقصى 11 رقمًا
    if (name === 'nationalId') {
      const numericValue = value.replace(/\D/g, '').slice(0, 11);

      setFormData((previousData) => ({
        ...previousData,
        [name]: numericValue,
      }));

      return;
    }

    // الجوال: أرقام فقط وبحد أقصى 10 أرقام
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '').slice(0, 10);

      setFormData((previousData) => ({
        ...previousData,
        [name]: numericValue,
      }));

      return;
    }

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (fieldName) => {
    setShowPasswords((previousState) => ({
      ...previousState,
      [fieldName]: !previousState[fieldName],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setError('');
    setSuccessMessage('');

    if (formData.nationalId.length !== 11) {
      setError('رقم الهوية يجب أن يتكون من 11 رقمًا');
      return;
    }

    if (
      formData.phone.length !== 10 ||
      !formData.phone.startsWith('05')
    ) {
      setError('رقم الجوال يجب أن يبدأ بـ 05 ويتكون من 10 أرقام');
      return;
    }

    if (
      formData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      setError('يرجى إدخال بريد إلكتروني صحيح');
      return;
    }

    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
      setError('كلمة المرور الجديدة وإعادة كلمة المرور غير متطابقتين');
      return;
    }

    console.log('Profile data:', formData);

    setSuccessMessage('تم حفظ البيانات بنجاح');
  };

  const renderPasswordField = (name) => (
    <div className={styles.passwordInputWrapper}>
      <input
        id={name}
        name={name}
        type={showPasswords[name] ? 'text' : 'password'}
        value={formData[name]}
        onChange={handleChange}
        placeholder=" "
      />

      <button
        type="button"
        className={styles.passwordToggle}
        onClick={() => togglePasswordVisibility(name)}
        aria-label={showPasswords[name] ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
      >
        {showPasswords[name] ? <FaEye /> : <FaEyeSlash />}
      </button>
    </div>
  );

  return (
    <div className={styles.profile} dir="rtl">
      <h1 className={styles.pageTitle}>البيانات الشخصية</h1>

      <form className={styles.profileForm} onSubmit={handleSubmit}>
        {/* البيانات الشخصية */}
        <div className={styles.profileFields}>
          <div className={styles.formGroup}>
            <label htmlFor="userNumber">رقم المستخدم</label>

            <input
              id="userNumber"
              name="userNumber"
              type="number"
              value={formData.userNumber}
              onChange={handleChange}
              placeholder=" "
              
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="username">اسم المستخدم</label>

            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
  <label htmlFor="nationalId">رقم الهوية</label>

  <input
    id="nationalId"
    name="nationalId"
    type="text"
    inputMode="numeric"
    placeholder=" "
    value={formData.nationalId}
    onChange={handleChange}
    maxLength={11}
    pattern="[0-9]{11}"
    title="رقم الهوية يجب أن يتكون من 11 رقمًا"
    required
  />
</div>

          <div className={styles.formGroup}>
  <label htmlFor="phone">رقم الجوال</label>

  <input
    id="phone"
    name="phone"
    type="tel"
    inputMode="numeric"
    placeholder="05xxxxxxxx"
    value={formData.phone}
    onChange={handleChange}
    maxLength={10}
    pattern="05[0-9]{8}"
    title="رقم الجوال يجب أن يبدأ بـ 05 ويتكون من 10 أرقام"
    required
  />
</div>

          <div className={styles.formGroup}>
            <label htmlFor="email">الإيميل</label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@domain.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.passwordSection}>
          <div className={styles.formGroup}>
            <label htmlFor="currentPassword">كلمة المرور الحالية</label>

            {renderPasswordField('currentPassword', 'كلمة المرور الحالية')}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="newPassword">كلمة المرور الجديدة</label>

            {renderPasswordField('newPassword', 'كلمة المرور الجديدة')}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">إعادة كلمة المرور</label>

            {renderPasswordField('confirmPassword', 'إعادة كلمة المرور')}
          </div>
        </div>

        {error && (
          <p className={styles.errorMessage} role="alert">
            {error}
          </p>
        )}

        {successMessage && (
          <p className={styles.successMessage} role="status">
            {successMessage}
          </p>
        )}

        <div className={styles.formActions}>
          <button type="submit" className={styles.saveButton}>
            <FaSave />
            <span>حفظ</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;