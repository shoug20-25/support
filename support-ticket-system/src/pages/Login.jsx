import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import styles from './Login.module.css';
import supportLogo from '../assets/support-logo.png';

// شروط التحقق من البيانات
const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, 'يرجى إدخال اسم المستخدم')
    .superRefine((value, ctx) => {
      if (!value) return;

      const letters = value.match(/\p{L}/gu) || [];
      const numbers = value.match(/\p{N}/gu) || [];

      if (letters.length < 3 || numbers.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'اسم المستخدم يجب أن يحتوي على 3 أحرف على الأقل ورقمين على الأقل',
        });
      }
    }),

  password: z
    .string()
    .min(1, 'يرجى إدخال كلمة المرور')
    .min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
});

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  // تسجيل الدخول
  const onSubmit = (data) => {
    const username = data.username.trim();

    localStorage.setItem('username', username);

    navigate('/dashboard');
  };

  return (
    <main className={styles.loginPage} dir="rtl">
      <section className={styles.loginCard}>
        <div className={styles.logo}>
          <img src={supportLogo} alt="شعار نظام الدعم الفني" />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.loginForm}
          noValidate
        >
          {/* اسم المستخدم */}
          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.label}>
              <FaUser />
              <span>اسم المستخدم</span>
            </label>

            <input
              id="username"
              type="text"
              className={styles.input}
              autoComplete="username"
              {...register('username')}
            />

            {errors.username && (
              <p className={styles.errorMessage} role="alert">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* كلمة المرور */}
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              <FaLock />
              <span>كلمة المرور</span>
            </label>

            <div className={styles.passwordWrapper}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className={styles.input}
                autoComplete="current-password"
                {...register('password')}
              />

              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword((previous) => !previous)}
                aria-label={
                  showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'
                }
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            {errors.password && (
              <p className={styles.errorMessage} role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* تسجيل الدخول */}
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
