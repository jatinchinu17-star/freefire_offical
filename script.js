const modal = document.getElementById("collectModal");
const modalBody = document.getElementById("modalBody");
const stepNum = document.getElementById("stepNum");
let selectedItem = "Selected Weapon";
let step = 1;
let = {uid:"", player:""};

function openCollect(button){
  const card = button.closest(".gun-card");
  selectedItem = card?.dataset.name || "Selected Weapon";
  step = 1;
  renderStep();
  modal.classList.remove("hidden");
}
function openBundleCollect(button){
  const card = button.closest(".bundle-card");
  selectedItem = card?.querySelector("span")?.textContent?.trim() || "Selected Bundle";
  step = 1;
  renderStep();
  modal.classList.remove("hidden");
}
function closeCollect(){ modal.classList.add("hidden"); }
function renderStep(){
  stepNum.textContent = step;
  const title = `<h2>${selectedItem}</h2>`;
  if(step===1){
    modalBody.innerHTML = `${title}<p>Enter your <b>Free Fire UID</b> for this fan-page . It stays local and is never sent anywhere.</p><input id="mUid" inputmode="numeric" autocomplete="off" placeholder="UID (e.g. 1234567890)" value="${.uid}"><p>Server: <b>India</b></p>`;
  } else if(step===2){
    modalBody.innerHTML = `${title}<p>Enter a <b>Player ID</b>. Do not enter your real account ID or password.</p><input id="mPlayer" autocomplete="off" placeholder="Player ID" value="${.player}">`;
  } else {
    modalBody.innerHTML = `<div class="success"><div class="check">✓</div><h2>Collection Successful</h2><p><b>${selectedItem}</b> was added to this fan-page .</p><p>No account was accessed and no password was requested, saved, or transmitted.</p></div>`;
  }
  document.querySelector(".back").style.visibility = step===1 ? "hidden" : "visible";
  const next=document.querySelector(".next");
  next.textContent = step===3 ? "OKAY" : "NEXT";
  next.onclick = step===3 ? closeCollect : nextStep;
}
function saveCurrent(){
  const uid=document.getElementById("mUid");
  const player=document.getElementById("mPlayer");
  if(uid) .uid=uid.value.trim();
  if(player) .player=player.value.trim();
}
function nextStep(){
  saveCurrent();
  if(step===1 && !/^\d{5,15}$/.test(.uid)){ alert("UID me 5–15 digits enter karein."); return; }
  if(step===2 && !.player){ alert("Player ID enter karein."); return; }
  step++;
  renderStep();
}
function prevStep(){ if(step>1){ saveCurrent(); step--; renderStep(); } }

function demoUid(){
  const uid=document.getElementById("uid").value.trim();
  if(!/^\d{5,15}$/.test(uid)){ alert("UID me 5–15 digits enter karein."); return; }
  alert("UID accepted locally. No data was sent.");
}

document.querySelectorAll(".server").forEach(btn=>{
  btn.addEventListener("click",()=>{document.querySelectorAll(".server").forEach(x=>x.classList.remove("active"));btn.classList.add("active")});
});
document.querySelectorAll(".filter").forEach(btn=>{
  btn.addEventListener("click",()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));btn.classList.add("active")});
});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeCollect()});


// Header search
const searchPanel=document.getElementById("searchPanel"), searchInput=document.getElementById("searchInput"), searchBtn=document.getElementById("searchBtn"), closeSearch=document.getElementById("closeSearch");
searchBtn?.addEventListener("click",()=>{searchPanel.classList.toggle("hidden");if(!searchPanel.classList.contains("hidden"))searchInput.focus()});
closeSearch?.addEventListener("click",()=>searchPanel.classList.add("hidden"));
searchInput?.addEventListener("input",()=>{const q=searchInput.value.trim().toLowerCase();document.querySelectorAll(".gun-card").forEach(card=>card.classList.toggle("search-hidden",q&&!card.innerText.toLowerCase().includes(q)))});

// login
const loginModal=document.getElementById("loginModal"), loginBtn=document.getElementById("loginBtn"), closeLogin=document.getElementById("closeLogin"), demoLoginSubmit=document.getElementById("demoLoginSubmit");
loginBtn?.addEventListener("click",()=>loginModal.classList.remove("hidden"));
closeLogin?.addEventListener("click",()=>loginModal.classList.add("hidden"));
loginModal?.addEventListener("click",e=>{if(e.target===loginModal)loginModal.classList.add("hidden")});
demoLoginSubmit?.addEventListener("click",()=>{const id=document.getElementById("demoLoginId").value.trim(), code=document.getElementById("demoLoginCode").value;if(!id||!code){alert("Player ID aur Access Code enter karein.");return}document.getElementById("demoLoginId").value="";document.getElementById("demoLoginCode").value="";loginModal.classList.add("hidden");alert("login successful. No real account was accessed.")});

// View all bundles
const viewAllBundles = document.getElementById("viewAllBundles");
viewAllBundles?.addEventListener("click", () => {
  const panel = document.getElementById("bundles");
  const expanded = panel.classList.toggle("show-all");
  viewAllBundles.textContent = expanded ? "SHOW LESS" : "VIEW ALL BUNDLES";
  if(expanded) document.getElementById("bundleGrid")?.scrollIntoView({behavior:"smooth", block:"center"});
});
