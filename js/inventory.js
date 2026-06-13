/* inventory.js - manage stock */
document.addEventListener('DOMContentLoaded', ()=>{
  const user = window.Auth.requireAuth()
  const table = document.querySelector('#inventoryTable tbody')
  const modal = document.getElementById('itemModal')
  const form = document.getElementById('itemForm')
  const newBtn = document.getElementById('newItemBtn')
  const cancel = document.getElementById('cancelItem')

  function render(){
    const items = StorageAPI.getData('inventory')||[]
    const q = document.getElementById('inventorySearch').value || ''
    const filter = document.getElementById('inventoryFilter').value || ''
    const out = items.filter(it=>{
      return (!q || JSON.stringify(it).toLowerCase().includes(q.toLowerCase())) && (!filter || it.category===filter)
    }).map(it=>`<tr class="${it.qty<=it.min? 'low-stock':''}"><td>${it.id}</td><td>${it.name}</td><td>${it.category}</td><td>${it.qty}</td><td>${it.min}</td><td><button class="btn small editItem" data-id="${it.id}">Edit</button></td></tr>`).join('')
    table.innerHTML = out
    document.querySelectorAll('.editItem').forEach(b=>b.addEventListener('click', e=>editItem(Number(e.target.dataset.id))))
  }

  function editItem(id){
    const items = StorageAPI.getData('inventory')||[]; const it = items.find(x=>x.id==id); if(!it) return
    document.getElementById('itemName').value = it.name
    document.getElementById('itemCategory').value = it.category
    document.getElementById('itemQty').value = it.qty
    document.getElementById('itemMin').value = it.min
    modal.hidden=false
    form.onsubmit = e=>{
      e.preventDefault(); it.name=document.getElementById('itemName').value; it.category=document.getElementById('itemCategory').value; it.qty=Number(document.getElementById('itemQty').value); it.min=Number(document.getElementById('itemMin').value)
      StorageAPI.saveData('inventory', items); modal.hidden=true; render()
    }
  }

  newBtn.addEventListener('click', ()=>{ form.reset(); modal.hidden=false; form.onsubmit = createNew })
  cancel.addEventListener('click', ()=>modal.hidden=true)

  function createNew(e){ e.preventDefault(); const id=StorageAPI.getNextId('item'); const item={id:id,name:document.getElementById('itemName').value,category:document.getElementById('itemCategory').value,qty:Number(document.getElementById('itemQty').value),min:Number(document.getElementById('itemMin').value)}; StorageAPI.add('inventory',item); modal.hidden=true; render() }

  document.getElementById('inventorySearch').addEventListener('input',render)
  document.getElementById('inventoryFilter').addEventListener('change',render)

  render()
})
