import { useState, useEffect } from 'react';
import styles from './Captcha.module.css';

function generateCaptcha() {
return Math.floor(10000 + Math.random() * 90000).toString();
}

function Captcha({ onVerify, resetKey }) {
    
const [captchaCode, setCaptchaCode] = useState(generateCaptcha());
const [userInput, setUserInput] = useState('');

useEffect(() => {
  onVerify(false);
}, [captchaCode, onVerify]);

useEffect(() => {
  if (resetKey > 0) {
    setCaptchaCode(generateCaptcha());
    setUserInput('');
    onVerify(false);
  }
}, [resetKey, onVerify]);

const refreshCaptcha = () => {
setCaptchaCode(generateCaptcha());
setUserInput('');
};

const handleChange = (event) => {
const value = event.target.value.replace(/\D/g, '').slice(0, 5);
setUserInput(value);

onVerify(value === captchaCode);

};

return ( <div className={styles.captcha}> <label className={styles.label}>رمز التحقق</label>


  <div className={styles.captchaRow}>
    <div className={styles.captchaImage} aria-label="رمز التحقق">
      <svg viewBox="0 0 180 60" role="img">
        <rect width="180" height="60" rx="8" fill="#f1f5f9" />

        {Array.from({ length: 5 }).map((_, index) => (
          <line
            key={index}
            x1={Math.random() * 180}
            y1={Math.random() * 60}
            x2={Math.random() * 180}
            y2={Math.random() * 60}
            stroke="#8da4b5"
            strokeWidth="1"
          />
        ))}

        {captchaCode.split('').map((character, index) => {
  const x = 30 + index * 30;
  const y = 38 + (index % 2 === 0 ? 2 : -3);
  const rotation = Math.random() * 35 - 17;

  return (
    <text
      key={`${character}-${index}`}
      x={x}
      y={y}
      textAnchor="middle"
      fontSize={29 + (index % 2) * 3}
      fontWeight="bold"
      fill="#12618a"
      transform={`rotate(${rotation} ${x} ${y})`}
    >
      {character}
    </text>
  );
})}
      </svg>
    </div>

    <button
      type="button"
      className={styles.refreshButton}
      onClick={refreshCaptcha}
      aria-label="تحديث رمز التحقق"
    >
      ↻
    </button>
  </div>

  <input
    type="text"
    inputMode="numeric"
    value={userInput}
    onChange={handleChange}
    placeholder="أدخل الأرقام الظاهرة"
    maxLength={5}
    className={styles.input}
  />
</div>


);
}

export default Captcha;
