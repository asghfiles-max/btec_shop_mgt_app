document.addEventListener('DOMContentLoaded', async () => {
  const session = window.Api.requireAuth();
  const dashboardMessage = document.getElementById('dashboardMessage');
  const cards = document.getElementById('dashboardCards');

  if (!session) return;

  dashboardMessage.textContent = `Welcome, ${session.name}. Access your orders, customers, and inventory.`;

  try {
    window.UI.setLoading(true);
    const daily = await window.Api.fetchReports('daily-sales');
    const monthly = await window.Api.fetchReports('monthly-sales');
    const profit = await window.Api.fetchReports('profit-analysis');
    cards.innerHTML = `
      <div class="card">
        <h3>Daily Sales</h3>
        <p>${daily?.[0]?.total_sales || '$0.00'}</p>
      </div>
      <div class="card">
        <h3>Monthly Sales</h3>
        <p>${monthly?.[0]?.total_sales || '$0.00'}</p>
      </div>
      <div class="card">
        <h3>Profit</h3>
        <p>${profit?.[0]?.profit || '$0.00'}</p>
      </div>
    `;
  } catch (error) {
    window.UI.showToast(error.message || 'Unable to load dashboard', 'danger');
  } finally {
    window.UI.setLoading(false);
  }
});
