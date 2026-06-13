/* auth.js - simple staff login and session management */
(function(){
  function getStaff(){return StorageAPI.getData('staff')}
  function setSession(obj){localStorage.setItem('printshop_session', JSON.stringify(obj))}
  function getSession(){try{return JSON.parse(localStorage.getItem('printshop_session'))}catch(e){return null}}
  function clearSession(){localStorage.removeItem('printshop_session')}

  function login(id,pin){
    const staff = getStaff().find(s=>String(s.id)===String(id) && s.pin===String(pin))
    if(staff && staff.active!==false){ setSession({id:staff.id,name:staff.name,role:staff.role}); return staff }
    return null
  }

  function requireAuth(redirect='index.html'){
    const s = getSession();
    if(!s){ window.location.href = redirect }
    return s
  }

  // Expose
  window.Auth = {login, getSession, clearSession, requireAuth}

  // Bind login form on index.html
  document.addEventListener('DOMContentLoaded', ()=>{
    const loginForm = document.getElementById('loginForm')
    if(loginForm){
      loginForm.addEventListener('submit', e=>{
        e.preventDefault();
        const id = document.getElementById('staffId').value.trim();
        const pin = document.getElementById('pin').value.trim();
        const staff = login(id,pin)
        if(staff){ window.location.href='dashboard.html' } else { alert('Invalid credentials') }
      })
    }

    // Attach logout buttons
    document.querySelectorAll('#logoutBtn').forEach(btn=>btn.addEventListener('click', ()=>{ clearSession(); window.location.href='index.html' }))
  })
})();
