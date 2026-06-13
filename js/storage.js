/* storage.js
   Simple LocalStorage wrapper and seed data for collections:
   jobs, customers, inventory, staff, payments, session
*/
(function(){
  const STORE_KEY = 'printshop_data_v1'

  function _load(){
    try{
      const raw = localStorage.getItem(STORE_KEY)
      if(!raw){
        const seed = {
          jobs:[], customers:[], inventory:[], staff:[], payments:[], nextIds:{job:1,customer:1,item:1,staff:1000,payment:1}
        }
        // create default admin staff
        seed.staff.push({id:1000,name:'Admin',role:'Admin',pin:'1234',active:true,completed:0})
        localStorage.setItem(STORE_KEY,JSON.stringify(seed))
        return seed
      }
      return JSON.parse(raw)
    }catch(e){console.error('load error',e);return null}
  }

  function _save(data){localStorage.setItem(STORE_KEY,JSON.stringify(data))}

  window.StorageAPI = {
    getData(collection){const s=_load();return s? (s[collection]||[]) : []},
    saveData(collection, arr){const s=_load();s[collection]=arr;_save(s)},
    getNextId(kind){const s=_load();const id = s.nextIds[kind] || 1; s.nextIds[kind]=id+1; _save(s); return id},
    add(collection, item){const s=_load();s[collection]=s[collection]||[];s[collection].push(item);_save(s);return item},
    update(collection, id, patch){const s=_load();const arr=s[collection]||[];const idx=arr.findIndex(x=>x.id==id);if(idx!==-1){arr[idx]=Object.assign({},arr[idx],patch);_save(s);return arr[idx]}return null},
    remove(collection,id){const s=_load();s[collection]= (s[collection]||[]).filter(x=>x.id!=id);_save(s)},
    clear(){localStorage.removeItem(STORE_KEY)}
  }
})();
