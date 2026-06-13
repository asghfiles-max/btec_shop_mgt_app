/* jobs.js - Add and manage jobs */
document.addEventListener('DOMContentLoaded', ()=>{
  const user = window.Auth.requireAuth()

  const jobsTable = document.querySelector('#jobsTable tbody')
  const jobModal = document.getElementById('jobModal')
  const jobForm = document.getElementById('jobForm')
  const newJobBtn = document.getElementById('newJobBtn')
  const cancelJob = document.getElementById('cancelJob')
  const jobStaff = document.getElementById('jobStaff')

  function loadStaffOptions(){
    const staff = StorageAPI.getData('staff')
    jobStaff.innerHTML = staff.map(s=>`<option value="${s.id}">${s.name} (${s.role})</option>`).join('')
  }

  function renderTable(filterText='', statusFilter=''){
    const rows = StorageAPI.getData('jobs')||[]
    const out = rows.filter(j=>{
      const matches = !filterText || JSON.stringify(j).toLowerCase().includes(filterText.toLowerCase())
      const statusOK = !statusFilter || j.status===statusFilter
      return matches && statusOK
    }).map(j=>{
      const staff = (StorageAPI.getData('staff')||[]).find(s=>s.id==j.staffId)
      return `<tr>
        <td>${j.id}</td>
        <td>${j.customer}</td>
        <td>${j.type}</td>
        <td>${j.qty}</td>
        <td><span class="status-pill status-${j.status.replace(/ /g,'\\ ')}">${j.status}</span></td>
        <td>${staff?staff.name:'-'}</td>
        <td>
          <button data-id="${j.id}" class="btn small changeStatus">Next</button>
          <button data-id="${j.id}" class="btn small invoice">Invoice</button>
        </td>
      </tr>`
    }).join('')
    jobsTable.innerHTML = out
    document.querySelectorAll('.changeStatus').forEach(b=>b.addEventListener('click', e=>{
      const id = e.target.dataset.id; advanceStatus(Number(id)); renderTable(document.getElementById('jobSearch').value, document.getElementById('statusFilter').value)
    }))
    document.querySelectorAll('.invoice').forEach(b=>b.addEventListener('click', e=>{
      const id = e.target.dataset.id; window.location.href='billing.html?job='+id
    }))
  }

  function advanceStatus(id){
    const jobs = StorageAPI.getData('jobs')||[]
    const job = jobs.find(j=>j.id==id); if(!job) return
    const order = ['Pending','In Progress','Completed','Delivered']
    const idx = order.indexOf(job.status)
    job.status = order[Math.min(order.length-1, idx+1)]
    StorageAPI.saveData('jobs', jobs)
    // update staff completed count if completed
    if(job.status==='Completed'){
      const staff = StorageAPI.getData('staff')||[]
      const s = staff.find(x=>x.id==job.staffId)
      if(s){ s.completed = (s.completed||0)+1; StorageAPI.saveData('staff', staff) }
    }
  }

  function openNewJob(){ jobForm.reset(); jobModal.hidden=false }
  function closeJob(){ jobModal.hidden=true }

  jobForm.addEventListener('submit', e=>{
    e.preventDefault()
    const id = StorageAPI.getNextId('job')
    const job = {
      id, customer:document.getElementById('jobCustomer').value.trim(), type:document.getElementById('jobType').value,
      qty:document.getElementById('jobQty').value, size:document.getElementById('jobSize').value, color:document.getElementById('jobColor').value,
      notes:document.getElementById('jobNotes').value, staffId: Number(document.getElementById('jobStaff').value), status:'Pending', createdAt:new Date().toISOString()
    }
    StorageAPI.add('jobs', job)
    closeJob(); renderTable()
  })

  newJobBtn.addEventListener('click', ()=>{ openNewJob(); loadStaffOptions() })
  cancelJob.addEventListener('click', closeJob)

  document.getElementById('jobSearch').addEventListener('input', e=>renderTable(e.target.value, document.getElementById('statusFilter').value))
  document.getElementById('statusFilter').addEventListener('change', e=>renderTable(document.getElementById('jobSearch').value, e.target.value))

  renderTable()
})
