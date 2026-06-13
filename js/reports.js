/* reports.js - basic reports by date and staff */
document.addEventListener('DOMContentLoaded', ()=>{
  const user = window.Auth.requireAuth()
  const staffSelect = document.getElementById('reportStaff')
  const runBtn = document.getElementById('runReport')
  const results = document.getElementById('reportResults')

  function fillStaff(){ const staff = StorageAPI.getData('staff')||[]; staffSelect.innerHTML = '<option value="">All Staff</option>' + staff.map(s=>`<option value="${s.id}">${s.name}</option>`).join('') }

  function run(){
    const from = document.getElementById('reportFrom').value
    const to = document.getElementById('reportTo').value
    const staffId = staffSelect.value
    const jobs = StorageAPI.getData('jobs')||[]
    const payments = StorageAPI.getData('payments')||[]

    const filteredJobs = jobs.filter(j=>{
      const date = (j.createdAt||'').slice(0,10)
      if(from && date < from) return false
      if(to && date > to) return false
      if(staffId && String(j.staffId)!==String(staffId)) return false
      return true
    })

    const completed = filteredJobs.filter(j=>j.status==='Completed' || j.status==='Delivered').length
    const totalRevenue = payments.filter(p=>{ const d=(p.date||'').slice(0,10); if(from && d<from) return false; if(to && d>to) return false; if(staffId){ const job = (StorageAPI.getData('jobs')||[]).find(j=>String(j.id)===String(p.jobId)); if(job && String(job.staffId)!==String(staffId)) return false } return true }).reduce((s,p)=>s+Number(p.amount||0),0)

    results.innerHTML = `<div class="card small"><h4>Jobs completed</h4><div>${completed}</div></div><div class="card small"><h4>Revenue</h4><div>$${totalRevenue.toFixed(2)}</div></div>`
  }

  runBtn.addEventListener('click', run)
  fillStaff()
})
