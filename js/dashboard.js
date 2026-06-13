/* dashboard.js - populate overview cards */
document.addEventListener('DOMContentLoaded', ()=>{
  const user = window.Auth.requireAuth()
  const cardsRoot = document.getElementById('overviewCards')
  function render(){
    const jobs = StorageAPI.getData('jobs') || []
    const payments = StorageAPI.getData('payments') || []
    const today = new Date().toISOString().slice(0,10)
    const totalJobsToday = jobs.filter(j=> (j.createdAt||'').slice(0,10)===today).length
    const totalRevenue = payments.reduce((s,p)=>s+Number(p.amount||0),0).toFixed(2)
    const pending = jobs.filter(j=>j.status==='Pending').length

    cardsRoot.innerHTML = `
      <div class="card small"><h4>Total jobs today</h4><div class="large">${totalJobsToday}</div></div>
      <div class="card small"><h4>Total revenue</h4><div class="large">$${totalRevenue}</div></div>
      <div class="card small"><h4>Pending jobs</h4><div class="large">${pending}</div></div>
    `
  }
  render()
})
