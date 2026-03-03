/**
 * Register page
 */

import { i18n } from '../services/i18n.js';
import { authService } from '../services/auth.js';
import { router } from '../router.js';
import { render } from '../utils/dom.js';
import { toast } from '../components/ui/Toast.js';
import { loading } from '../components/ui/Loading.js';

/**
 * Render register page
 */
export async function renderRegister() {
  const registerHTML = `
    <div>
      <!-- Hero Section -->
      <section class="about-hero text-white py-5">
        <div class="container text-center py-5">
          <h1 class="display-3 fw-bold text-accent mb-3">
            ${i18n.t('auth.register') || 'Register'}
          </h1>
        </div>
      </section>

      <!-- Register Form Section -->
      <section class="bg-dark py-5">
        <div class="container py-4">
          <div class="row justify-content-center">
            <div class="col-md-6 col-lg-5">
              <div class="auth-card">
                <form id="register-form" class="needs-validation" novalidate>
                  <!-- Full Name -->
                  <div class="mb-4">
                    <label for="fullName" class="form-label text-white">${i18n.t('auth.fullName') || 'Full Name'}</label>
                    <input
                      type="text"
                      class="form-control form-control-lg bg-secondary text-white border-0"
                      id="fullName"
                      name="fullName"
                      required
                      minlength="2"
                    >
                    <div class="invalid-feedback">
                      ${i18n.t('validation.nameRequired') || 'Please enter your name'}
                    </div>
                  </div>

                  <!-- Email -->
                  <div class="mb-4">
                    <label for="email" class="form-label text-white">${i18n.t('auth.email') || 'Email'}</label>
                    <input
                      type="email"
                      class="form-control form-control-lg bg-secondary text-white border-0"
                      id="email"
                      name="email"
                      required
                    >
                    <div class="invalid-feedback">
                      ${i18n.t('validation.emailRequired') || 'Please enter your email'}
                    </div>
                  </div>

                  <!-- Password -->
                  <div class="mb-4">
                    <label for="password" class="form-label text-white">${i18n.t('auth.password') || 'Password'}</label>
                    <input
                      type="password"
                      class="form-control form-control-lg bg-secondary text-white border-0"
                      id="password"
                      name="password"
                      required
                      minlength="6"
                    >
                    <div class="invalid-feedback">
                      ${i18n.t('auth.passwordTooShort') || 'Password must be at least 6 characters'}
                    </div>
                  </div>

                  <!-- Confirm Password -->
                  <div class="mb-4">
                    <label for="confirmPassword" class="form-label text-white">${i18n.t('auth.confirmPassword') || 'Confirm Password'}</label>
                    <input
                      type="password"
                      class="form-control form-control-lg bg-secondary text-white border-0"
                      id="confirmPassword"
                      name="confirmPassword"
                      required
                      minlength="6"
                    >
                    <div class="invalid-feedback">
                      ${i18n.t('auth.passwordMismatch') || 'Passwords do not match'}
                    </div>
                  </div>

                  <!-- Submit Button -->
                  <button type="submit" class="btn btn-warning btn-lg w-100" id="register-btn">
                    ${i18n.t('auth.register') || 'Register'}
                  </button>
                </form>

                <!-- Login Link -->
                <div class="text-center mt-4">
                  <p class="text-muted mb-0">
                    ${i18n.t('auth.hasAccount') || 'Already have an account?'}
                    <a href="/login" data-link class="text-accent text-decoration-none">
                      ${i18n.t('auth.login') || 'Login'}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;

  render('#app', registerHTML);
  attachRegisterEvents();
}

/**
 * Attach event listeners
 */
function attachRegisterEvents() {
  const form = document.getElementById('register-form');
  const registerBtn = document.getElementById('register-btn');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');

  // Custom password validation
  if (confirmPasswordInput) {
    confirmPasswordInput.addEventListener('input', () => {
      if (passwordInput.value !== confirmPasswordInput.value) {
        confirmPasswordInput.setCustomValidity(i18n.t('auth.passwordMismatch') || 'Passwords do not match');
      } else {
        confirmPasswordInput.setCustomValidity('');
      }
    });
  }

  // Email/Password Registration
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      e.stopPropagation();

      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;

      if (password !== confirmPassword) {
        confirmPasswordInput.setCustomValidity(i18n.t('auth.passwordMismatch') || 'Passwords do not match');
        form.classList.add('was-validated');
        return;
      }

      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }

      const fullName = document.getElementById('fullName').value;
      const email = document.getElementById('email').value;

      registerBtn.disabled = true;
      registerBtn.textContent = i18n.t('auth.registering') || 'Registering...';
      loading.show();

      try {
        const { error } = await authService.signUp(email, password, fullName);

        if (error) {
          throw error;
        }

        toast.success(i18n.t('auth.registrationSuccess') || 'Registration successful! Please check your email.');
        setTimeout(() => {
          router.navigate('/login');
        }, 2000);
      } catch (error) {
        console.error('Registration error:', error);
        toast.error(error.message || i18n.t('auth.registrationError') || 'Registration error');
        registerBtn.disabled = false;
        registerBtn.textContent = i18n.t('auth.register') || 'Register';
      } finally {
        loading.hide();
      }
    });
  }
}
