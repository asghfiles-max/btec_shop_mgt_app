document.addEventListener('DOMContentLoaded', () => {
  window.Api.requireAuth();
  const ordersContainer = document.getElementById('ordersContainer');
  const refreshButton = document.getElementById('refreshOrders');

  async function loadOrders() {
    try {
      window.UI.setLoading(true);
      const orders = await window.Api.fetchOrders();
      if (!orders.length) {
        ordersContainer.innerHTML = '<p>No orders found.</p>';
        return;
      }

      ordersContainer.innerHTML = `
        <table>
          <thead>
            <tr><th>Reference</th><th>Status</th><th>Customer</th><th>Total</th><th>Created</th></tr>
          </thead>
          <tbody>
            ${orders.map(order => `
              <tr>
                <td>${order.reference}</td>
                <td>${order.status}</td>
                <td>${order.customers?.name || 'Unknown'}</td>
                <td>${window.UI.formatCurrency(order.total_amount)}</td>
                <td>${new Date(order.created_at).toLocaleDateString()}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    } catch (error) {
      ordersContainer.innerHTML = '<p class="muted">Unable to load orders.</p>';
      window.UI.showToast(error.message || 'Error loading orders', 'danger');
    } finally {
      window.UI.setLoading(false);
    }
  }

  refreshButton.addEventListener('click', loadOrders);
  loadOrders();
});
