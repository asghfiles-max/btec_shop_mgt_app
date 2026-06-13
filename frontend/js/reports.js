document.addEventListener('DOMContentLoaded', async () => {
  window.Api.requireAuth();
  const reportCards = document.getElementById('reportCards');

  try {
    window.UI.setLoading(true);
    const daily = await window.Api.fetchReports('daily-sales');
    const monthly = await window.Api.fetchReports('monthly-sales');
    const profit = await window.Api.fetchReports('profit-analysis');
    const inventory = await window.Api.fetchReports('inventory-status');

    reportCards.innerHTML = `
      <div class="report-card">
        <h3>Daily Sales</h3>
        <p>${daily?.[0]?.total_sales || '$0.00'}</p>
      </div>
      <div class="report-card">
        <h3>Monthly Sales</h3>
        <p>${monthly?.[0]?.total_sales || '$0.00'}</p>
      </div>
      <div class="report-card">
        <h3>Profit Analysis</h3>
        <p>${profit?.[0]?.profit || '$0.00'}</p>
      </div>
      <div class="report-card">
        <h3>Inventory Status</h3>
        <p>${inventory?.length || 0} items tracked</p>
      </div>
    `;
  } catch (error) {
    reportCards.innerHTML = '<p class="muted">Unable to load report analytics.</p>';
    window.UI.showToast(error.message || 'Error loading reports', 'danger');
  } finally {
    window.UI.setLoading(false);
  }
});
