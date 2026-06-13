document.addEventListener('DOMContentLoaded', () => {
  window.Api.requireAuth();
  const customersContainer = document.getElementById('customersContainer');
  const refreshButton = document.getElementById('refreshCustomers');

  async function loadCustomers() {
    try {
      window.UI.setLoading(true);
      const customers = await window.Api.fetchCustomers();
      if (!customers.length) {
        customersContainer.innerHTML = '<p>No customers found.</p>';
        return;
      }

      customersContainer.innerHTML = `
        <table>
          <thead>
            <tr><th>Name</th><th>Email</th><th>Phone</th><th>Company</th><th>Created</th></tr>
          </thead>
          <tbody>
            ${customers.map(customer => `
              <tr>
                <td>${customer.name}</td>
                <td>${customer.email || '-'}</td>
                <td>${customer.phone || '-'}</td>
                <td>${customer.company || '-'}</td>
                <td>${new Date(customer.created_at).toLocaleDateString()}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    } catch (error) {
      customersContainer.innerHTML = '<p class="muted">Unable to load customers.</p>';
      window.UI.showToast(error.message || 'Error loading customers', 'danger');
    } finally {
      window.UI.setLoading(false);
    }
  }

  refreshButton.addEventListener('click', loadCustomers);
  loadCustomers();
});
