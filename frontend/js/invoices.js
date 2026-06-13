document.addEventListener('DOMContentLoaded', () => {
  window.Api.requireAuth();
  const container = document.getElementById('invoicesContainer');

  async function loadInvoices() {
    try {
      window.UI.setLoading(true);
      const invoices = await window.Api.fetchInvoices();
      if (!invoices.length) {
        container.innerHTML = '<p>No invoices found.</p>';
        return;
      }

      container.innerHTML = `
        <table>
          <thead>
            <tr><th>Invoice</th><th>Status</th><th>Customer</th><th>Total</th><th>Date</th></tr>
          </thead>
          <tbody>
            ${invoices.map(invoice => `
              <tr>
                <td>${invoice.invoice_number}</td>
                <td>${invoice.status}</td>
                <td>${invoice.customers?.name || 'Unknown'}</td>
                <td>${window.UI.formatCurrency(invoice.total_amount)}</td>
                <td>${new Date(invoice.created_at).toLocaleDateString()}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    } catch (error) {
      container.innerHTML = '<p class="muted">Unable to load invoices.</p>';
      window.UI.showToast(error.message || 'Error loading invoices', 'danger');
    } finally {
      window.UI.setLoading(false);
    }
  }

  loadInvoices();
});
