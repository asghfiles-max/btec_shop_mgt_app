function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

function setLoading(isLoading, selector = '.page-loader') {
  const loader = document.querySelector(selector);
  if (!loader) return;
  loader.style.display = isLoading ? 'block' : 'none';
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value || 0);
}

window.UI = { showToast, setLoading, formatCurrency };
