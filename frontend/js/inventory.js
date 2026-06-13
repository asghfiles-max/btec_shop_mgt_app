document.addEventListener('DOMContentLoaded', () => {
  window.Api.requireAuth();
  const inventoryContainer = document.getElementById('inventoryContainer');
  const refreshButton = document.getElementById('refreshInventory');

  async function loadInventory() {
    try {
      window.UI.setLoading(true);
      const items = await window.Api.fetchInventory();
      if (!items.length) {
        inventoryContainer.innerHTML = '<p>No inventory items found.</p>';
        return;
      }

      inventoryContainer.innerHTML = `
        <table>
          <thead>
            <tr><th>Item</th><th>Category</th><th>Stock</th><th>Reorder</th><th>Updated</th></tr>
          </thead>
          <tbody>
            ${items.map(item => `
              <tr>
                <td>${item.name}</td>
                <td>${item.category || '-'}</td>
                <td>${item.stock_level}</td>
                <td>${item.reorder_threshold}</td>
                <td>${new Date(item.updated_at).toLocaleDateString()}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    } catch (error) {
      inventoryContainer.innerHTML = '<p class="muted">Unable to load inventory.</p>';
      window.UI.showToast(error.message || 'Error loading inventory', 'danger');
    } finally {
      window.UI.setLoading(false);
    }
  }

  refreshButton.addEventListener('click', loadInventory);
  loadInventory();
});
