import { useState, useEffect } from 'react';
import { FaSyncAlt } from 'react-icons/fa';

import styles from './Captcha.module.css';

// استبعاد الأحرف المتشابهة مثل O و0 وI و1
const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function generateCaptcha() {
  let code = '';

  for (let i = 0; i < 5; i++) {
    code += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return code;
}

function Captcha({ onVerify, resetKey }) {
  const [captchaCode, setCaptchaCode] = useState(generateCaptcha());
  const [userInput, setUserInput] = useState('');

  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');

  // إعادة تعيين التحقق عند تغيير الرمز
  useEffect(() => {
    setVerified(false);
    setError('');
    onVerify(false);
  }, [captchaCode, onVerify]);

  // إعادة توليد CAPTCHA بعد إرسال النموذج
  useEffect(() => {
    if (resetKey > 0) {
      setCaptchaCode(generateCaptcha());
      setUserInput('');
      setVerified(false);
      setError('');
      onVerify(false);
    }
  }, [resetKey, onVerify]);

  const refreshCaptcha = () => {
    setCaptchaCode(generateCaptcha());
    setUserInput('');
    setVerified(false);
    setError('');
  };

  const handleVerify = () => {
    const normalizedInput = userInput
      .trim()
      .toUpperCase();

    if (!normalizedInput) {
      setError('يرجى إدخال رمز التحقق');
      setVerified(false);
      onVerify(false);
      return;
    }

    if (normalizedInput === captchaCode) {
      setVerified(true);
      setError('');
      onVerify(true);
    } else {
      setVerified(false);
      setError('رمز التحقق غير صحيح، حاول مرة أخرى');
      onVerify(false);
    }
  };

  return (
    <div className={styles.captchaContainer} dir="rtl">

      <label className={styles.label}>
        رمز التحقق
      </label>

      {/* CAPTCHA */}
      <div className={styles.captchaBox}>

        <div className={styles.captchaVisual}>
          <svg
            viewBox="0 0 220 75"
            className={styles.captchaSvg}
            role="img"
            aria-label="رمز التحقق"
          >
            <defs>
              <linearGradient
                id="captchaGradient"
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop offset="0%" stopColor="#eaf4fc" />
                <stop offset="100%" stopColor="#d5e8f5" />
              </linearGradient>
            </defs>

            <rect
              width="220"
              height="75"
              rx="10"
              fill="url(#captchaGradient)"
            />

            {/* خطوط التشويش */}
            {Array.from({ length: 6 }).map((_, index) => (
              <line
                key={`line-${index}`}
                x1={Math.random() * 220}
                y1={Math.random() * 75}
                x2={Math.random() * 220}
                y2={Math.random() * 75}
                stroke="#6c99b2"
                strokeWidth="1.2"
                opacity="0.45"
              />
            ))}

            {/* نقاط التشويش */}
            {Array.from({ length: 20 }).map((_, index) => (
              <circle
                key={`dot-${index}`}
                cx={Math.random() * 220}
                cy={Math.random() * 75}
                r={Math.random() * 2 + 1}
                fill="#12618a"
                opacity="0.25"
              />
            ))}

            {/* رمز CAPTCHA */}
            {captchaCode.split('').map((char, index) => (
              <text
                key={`${char}-${index}`}
                x={30 + index * 40}
                y={48 + Math.random() * 8}
                fontSize="30"
                fontWeight="bold"
                fill="#12618a"
                transform={`rotate(${Math.random() * 30 - 15}, ${
                  30 + index * 40
                }, 40)`}
              >
                {char}
              </text>
            ))}
          </svg>
        </div>

        <button
          type="button"
          className={styles.refreshButton}
          onClick={refreshCaptcha}
          title="تحديث رمز التحقق"
          aria-label="تحديث رمز التحقق"
        >
          <FaSyncAlt />
        </button>

      </div>

      {/* إدخال الرمز */}
      <input
        type="text"
        className={styles.captchaInput}
        placeholder="أدخل الرمز الظاهر أعلاه"
        value={userInput}
        onChange={(event) => {
          setUserInput(event.target.value);
          setError('');
          setVerified(false);
          onVerify(false);
        }}
        maxLength={5}
        autoComplete="off"
      />

      <button
        type="button"
        className={styles.verifyButton}
        onClick={handleVerify}
      >
        تحقق
      </button>

      {error && (
        <p className={styles.errorMessage}>
          {error}
        </p>
      )}

      {verified && (
        <p className={styles.successMessage}>
          تم التحقق بنجاح
        </p>
      )}

    </div>
  );
}

export default Captcha;