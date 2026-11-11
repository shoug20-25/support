import { useState } from 'react';
import { FaSyncAlt } from 'react-icons/fa';
import styles from './Captcha.module.css';

const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function createCaptcha() {
  const code = Array.from({ length: 5 }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join('');

  const lines = Array.from({ length: 6 }, () => ({
    x1: Math.random() * 220,
    y1: Math.random() * 75,
    x2: Math.random() * 220,
    y2: Math.random() * 75,
  }));

  const dots = Array.from({ length: 20 }, () => ({
    cx: Math.random() * 220,
    cy: Math.random() * 75,
    r: Math.random() * 2 + 1,
  }));

  const letters = code.split('').map((char, index) => ({
    char,
    x: 30 + index * 40,
    y: 48 + Math.random() * 8,
    rotation: Math.random() * 30 - 15,
  }));

  return { code, lines, dots, letters };
}

function Captcha({ onVerify }) {
  const [captcha, setCaptcha] = useState(createCaptcha);
  const [userInput, setUserInput] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');

  const refreshCaptcha = () => {
    setCaptcha(createCaptcha());
    setUserInput('');
    setVerified(false);
    setError('');
    onVerify(false);
  };

  const handleVerify = () => {
    const normalizedInput = userInput.trim().toUpperCase();

    if (!normalizedInput) {
      setError('يرجى إدخال رمز التحقق');
      setVerified(false);
      onVerify(false);
      return;
    }

    if (normalizedInput === captcha.code) {
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
      <label className={styles.label}>رمز التحقق</label>

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

            {captcha.lines.map((line, index) => (
              <line
                key={`line-${index}`}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="#6c99b2"
                strokeWidth="1.2"
                opacity="0.45"
              />
            ))}

            {captcha.dots.map((dot, index) => (
              <circle
                key={`dot-${index}`}
                cx={dot.cx}
                cy={dot.cy}
                r={dot.r}
                fill="#12618a"
                opacity="0.25"
              />
            ))}

            {captcha.letters.map((letter, index) => (
              <text
                key={`${letter.char}-${index}`}
                x={letter.x}
                y={letter.y}
                fontSize="30"
                fontWeight="bold"
                fill="#12618a"
                transform={`rotate(${letter.rotation}, ${letter.x}, 40)`}
              >
                {letter.char}
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
        <p className={styles.errorMessage}>{error}</p>
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