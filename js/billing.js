/* billing.js - invoices and payments */
document.addEventListener('DOMContentLoaded', ()=>{
  const user = window.Auth.requireAuth()
  const table = document.querySelector('#paymentsTable tbody')
  const modal = document.getElementById('invoiceModal')
  const form = document.getElementById('invoiceForm')
  const newBtn = document.getElementById('newInvoiceBtn')
  const cancel = document.getElementById('cancelInvoice')

  function render(){
    const payments = StorageAPI.getData('payments')||[]
    const q = document.getElementById('billingSearch').value || ''
    const date = document.getElementById('billingDate').value || ''
    const out = payments.filter(p=>(!q || JSON.stringify(p).toLowerCase().includes(q.toLowerCase())) && (!date || (p.date||'').slice(0,10)===date)).map(p=>`<tr><td>${p.id}</td><td>${p.jobId||''}</td><td>${p.customer||''}</td><td>$${Number(p.amount).toFixed(2)}</td><td>${p.method}</td><td>${(p.date||'').slice(0,10)}</td></tr>`).join('')
    table.innerHTML = out
  }

  newBtn.addEventListener('click', ()=>{ form.reset(); modal.hidden=false })
  cancel.addEventListener('click', ()=>modal.hidden=true)

  form.addEventListener('submit', e=>{
    e.preventDefault(); const id=StorageAPI.getNextId('payment'); const jobId=document.getElementById('invoiceJobId').value; const amt=Number(document.getElementById('invoiceAmount').value);
    const payments = StorageAPI.getData('payments')||[]; const obj={id:id,jobId:jobId,amount:amt,method:document.getElementById('invoiceMethod').value,date:new Date().toISOString(),customer: (jobId? (StorageAPI.getData('jobs')||[]).find(j=>String(j.id)===String(jobId))?.customer : '') }
    payments.push(obj); StorageAPI.saveData('payments',payments); modal.hidden=true; render()
  })

  document.getElementById('billingSearch').addEventListener('input',render)
  document.getElementById('billingDate').addEventListener('change',render)
  render()
})
