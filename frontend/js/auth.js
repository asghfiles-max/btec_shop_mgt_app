document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const logoutButtons = document.querySelectorAll('#logoutBtn');

  logoutButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      window.Api.clearSession();
      window.location.href = '/pages/login.html';
    });
  });

  if (!loginForm) return;

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    try {
      window.UI.setLoading(true);
      const result = await window.Api.login(email, password);
      window.Api.setSession(result.user, result.token);
      window.location.href = '/pages/dashboard.html';
    } catch (error) {
      window.UI.showToast(error.message || 'Login failed', 'danger');
    } finally {
      window.UI.setLoading(false);
    }
  });
});
