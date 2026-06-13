/* customers.js - manage customers */
document.addEventListener('DOMContentLoaded', ()=>{
  const user = window.Auth.requireAuth()
  const table = document.querySelector('#customersTable tbody')
  const modal = document.getElementById('customerModal')
  const form = document.getElementById('customerForm')
  const newBtn = document.getElementById('newCustomerBtn')
  const cancel = document.getElementById('cancelCustomer')
  const jobsModal = document.getElementById('customerJobsModal')

  function render(){
    const customers = StorageAPI.getData('customers')||[]
    const q = document.getElementById('customerSearch').value || ''
    const out = customers.filter(c=>!q || JSON.stringify(c).toLowerCase().includes(q.toLowerCase())).map(c=>`<tr><td>${c.id}</td><td>${c.name}</td><td>${c.phone||''}</td><td>${c.email||''}</td><td><button class="btn small viewJobs" data-id="${c.id}">Jobs</button></td><td><button class="btn small editCust" data-id="${c.id}">Edit</button></td></tr>`).join('')
    table.innerHTML = out
    document.querySelectorAll('.editCust').forEach(b=>b.addEventListener('click', e=>editCust(Number(e.target.dataset.id))))
    document.querySelectorAll('.viewJobs').forEach(b=>b.addEventListener('click', e=>viewJobs(Number(e.target.dataset.id))))
  }

  function editCust(id){
    const arr = StorageAPI.getData('customers')||[]; const c = arr.find(x=>x.id==id); if(!c) return
    document.getElementById('custName').value = c.name; document.getElementById('custPhone').value=c.phone; document.getElementById('custEmail').value=c.email; modal.hidden=false
    form.onsubmit = e=>{ e.preventDefault(); c.name=document.getElementById('custName').value; c.phone=document.getElementById('custPhone').value; c.email=document.getElementById('custEmail').value; StorageAPI.saveData('customers',arr); modal.hidden=true; render() }
  }

  function viewJobs(id){
    const jobs = StorageAPI.getData('jobs')||[]; const custJobs = jobs.filter(j=>String(j.customer).includes(String(id)) || j.customer== (StorageAPI.getData('customers')||[]).find(c=>c.id==id)?.name)
    const list = custJobs.map(j=>`<div><strong>#${j.id}</strong> ${j.type} - ${j.qty} - ${j.status}</div>`).join('<hr/>') || '<p class="muted">No jobs</p>'
    document.getElementById('customerJobsList').innerHTML = list
    jobsModal.hidden=false
    document.getElementById('closeCustJobs').addEventListener('click', ()=>jobsModal.hidden=true)
  }

  newBtn.addEventListener('click', ()=>{ form.reset(); modal.hidden=false; form.onsubmit=createNew })
  cancel.addEventListener('click', ()=>modal.hidden=true)

  function createNew(e){ e.preventDefault(); const id=StorageAPI.getNextId('customer'); const obj={id:id,name:document.getElementById('custName').value,phone:document.getElementById('custPhone').value,email:document.getElementById('custEmail').value}; StorageAPI.add('customers',obj); modal.hidden=true; render() }

  document.getElementById('customerSearch').addEventListener('input',render)
  render()
})
