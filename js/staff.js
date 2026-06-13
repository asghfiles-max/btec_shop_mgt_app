/* staff.js - manage staff accounts and tasks */
document.addEventListener('DOMContentLoaded', ()=>{
  const user = window.Auth.requireAuth()
  const table = document.querySelector('#staffTable tbody')
  const modal = document.getElementById('staffModal')
  const form = document.getElementById('staffForm')
  const newBtn = document.getElementById('newStaffBtn')
  const cancel = document.getElementById('cancelStaff')

  function render(){
    const staff = StorageAPI.getData('staff')||[]
    const q = document.getElementById('staffSearch').value || ''
    const out = staff.filter(s=>!q || JSON.stringify(s).toLowerCase().includes(q.toLowerCase())).map(s=>`<tr><td>${s.id}</td><td>${s.name}</td><td>${s.role}</td><td>${s.active? 'Active':'Inactive'}</td><td>${s.completed||0}</td><td><button class="btn small toggle" data-id="${s.id}">${s.active? 'Deactivate':'Activate'}</button></td></tr>`).join('')
    table.innerHTML = out
    document.querySelectorAll('.toggle').forEach(b=>b.addEventListener('click', e=>toggle(Number(e.target.dataset.id))))
  }

  function toggle(id){ const staff = StorageAPI.getData('staff')||[]; const s = staff.find(x=>x.id==id); if(!s) return; s.active = !s.active; StorageAPI.saveData('staff',staff); render() }

  newBtn.addEventListener('click', ()=>{ form.reset(); modal.hidden=false })
  cancel.addEventListener('click', ()=>modal.hidden=true)

  form.addEventListener('submit', e=>{
    e.preventDefault(); const id = StorageAPI.getNextId('staff'); const obj={id:id,name:document.getElementById('staffName').value,role:document.getElementById('staffRole').value,pin:document.getElementById('staffPin').value,active:true,completed:0}; StorageAPI.add('staff',obj); modal.hidden=true; render()
  })

  document.getElementById('staffSearch').addEventListener('input',render)
  render()
})
