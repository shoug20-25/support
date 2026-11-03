import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './Login.module.css';
import supportLogo from '../assets/support-logo.png';

function Login() {
const navigate = useNavigate();

const [formData, setFormData] = useState({
username: '',
password: '',
});

const [showPassword, setShowPassword] = useState(false);
const [error, setError] = useState('');

const handleChange = (event) => {
const { name, value } = event.target;


setFormData((previousData) => ({
  ...previousData,
  [name]: value,
}));

setError('');


};

const handleSubmit = (event) => {
event.preventDefault();


if (!formData.username.trim() || !formData.password.trim()) {
  setError('يرجى إدخال اسم المستخدم وكلمة المرور');
  return;
}

setError('');

navigate('/dashboard');


};

return ( <main className={styles.loginPage} dir="rtl"> <section className={styles.loginCard}> <div className={styles.logo}> <img src={supportLogo} alt="شعار نظام الدعم الفني" /> </div>


    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <div className={styles.formGroup}>
        <label htmlFor="username" className={styles.label}>
          <FaUser />
          <span>اسم المستخدم</span>
        </label>

        <input
          id="username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          className={styles.input}
          autoComplete="username"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.label}>
          <FaLock />
          <span>كلمة المرور</span>
        </label>

        <div className={styles.passwordWrapper}>
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
            autoComplete="current-password"
            required
          />

          <button
            type="button"
            className={styles.passwordToggle}
            onClick={() => setShowPassword((previous) => !previous)}
            aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
          >
            {showPassword ? <FaEye/> : <FaEyeSlash/>}
          </button>
        </div>
      </div>

      {error && (
        <p className={styles.errorMessage} role="alert">
          {error}
        </p>
      )}

      <button type="submit" className={styles.submitButton}>
        <span>تسجيل الدخول</span>
        <span className={styles.arrow}>←</span>
      </button>
    </form>
  </section>
</main>


);
}

export default Login;
