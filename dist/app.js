import { sections, commands, principles, ticketSteps } from './content.js';
import { escapeHTML, number, section, rows, detailRows } from './components.js';
import { chatExamples, initChatExamples } from './conversations.js';

document.querySelector('#section-nav').innerHTML = sections.map(([id,label],i)=>`<a href="#${id}" ${i===0?'class="active" aria-current="location"':''}><span>${number(i)}</span>${label}</a>`).join('');
document.querySelector('#remaining-sections').innerHTML = [
  section('philosophy','Moderation Philosophy','03 / TFT MODERATOR ONBOARDING',rows(principles.map(([a,b])=>`<strong>${a}</strong><span> — ${b}</span>`),'philosophy')),
  section('priorities','Current Priorities','04 / MODERATOR OPERATIONS',`<div class="priorities-grid"><div>${rows(['Scam reports &amp; suspicious behaviour','Restore Trusted / Exalted roles fairly','Watch community temperature and step in when discussion becomes toxic'],'priorities')}</div>${chatExamples()}</div>`),
  section('escalation','When to Escalate','05 / MODERATOR OPERATIONS / JUDGMENT',`<ul class="escalation-grid">${['High-value scams','Trusted or high-rep users','Repeat offenders','Borderline cases'].map(s=>`<li><span aria-hidden="true">•</span>${s}</li>`).join('')}</ul><div class="callout"><strong>If it feels questionable, escalate.</strong></div>`),
  section('boundary','TFT vs GGG:<br>Know the Boundary','06 / MODERATION BOUNDARIES',rows([`<strong>GGG sets the game’s ToS.</strong> Encourage players to follow them.`,`<strong>TFT is independent.</strong> We are not affiliated with GGG.`,`<strong>Enforce only overlap.</strong> Act on violations that also break TFT rules, such as RMT; otherwise, direct users to GGG.`],'boundary-rows'),'Moderate the community you own. Respect the platform you do not.'),
  section('workflow','Ticket Workflow','07 / MODERATOR OPERATIONS',`<div class="workflow-layout">${rows(ticketSteps.map(t=>`<strong>${t}</strong>`),'workflow')}<div class="workflow-accent" aria-hidden="true"><span></span><div>READ. COLLECT.<br>RESOLVE.</div></div></div>`),
  section('special-cases','Special Cases in Tickets','08 / TICKET OPERATIONS',detailRows([
    ['Leeching','Usually close unless clear video evidence exists.'],
    ['Role Restoration','Screenshots preferred; old DMs often help. Ping <span class="rose">Brian / Fly</span> after approval.'],
    ['Outside TFT','Follow the path of least resistance.']
  ])),
  section('idle-tickets','Managing Idle Tickets','09 / RESPONSE STANDARDS',detailRows([
    ['Support Desk','Close after 30 minutes without a reply.'],
    ['Service Reports','Act when enough evidence exists.'],
    ['New blocked accounts','Move faster when immediate action is needed.'],
    ['Established users','Allow additional response time before closing.']
  ],'idle-rows')),
  section('relink','Account Relink: Step by Step','10 / MODERATOR OPERATIONS',`<div class="relink-grid"><article class="procedure-card"><p class="eyebrow">BEFORE UNLINKING</p><h3>Confirm the account is ready</h3>${rows(['Run <code>!blacklist</code>','Review <code>!note</code>','Ensure the user is not blocked','Run <code>!unlink</code>'],'preflight')}</article><article class="procedure-card"><p class="eyebrow">ACCOUNT TRANSFER</p><h3>Verify ownership before relinking</h3><ol class="transfer-steps"><li><span class="number">01</span><p>Verify ownership of the transfer.</p></li><li><span class="number">02</span><p>Unlink the old PoE account.</p></li><li><span class="number">03</span><p>Relink the new account, then verify with <code>!who</code></p></li></ol></article></div>`),
  section('commands','Commands','11 / MODERATOR OPERATIONS / QUICK REFERENCE',`<div class="command-controls"><div class="search-wrap"><span aria-hidden="true">⌕</span><label class="sr-only" for="command-search">Search commands and descriptions</label><input id="command-search" type="search" placeholder="Search commands or descriptions…" autocomplete="off"><span class="key-hint" aria-hidden="true">/</span></div><div class="category-filters" role="group" aria-label="Filter commands by category">${['All commands','LCM','Moderator+','Junior Moderator+','Public'].map((c,i)=>`<button data-category="${c}" aria-pressed="${i===0}">${c}</button>`).join('')}</div><div class="results-meta"><p id="result-count" role="status">24 commands</p><span>Click copy to copy command syntax</span></div></div><div id="command-results"></div><div class="empty-results" hidden><h3>No commands found</h3><p>Try a different command, description, or category.</p><button class="reset-search">Clear filters</button></div>`),
  `<section id="welcome" class="welcome panel" data-section="Welcome to the Team"><p class="eyebrow">12 / TFT MODERATOR ONBOARDING</p><h2>Welcome to the Team</h2><div class="welcome-grid"><ul class="welcome-checklist">${['Protect your time','Be fair','Be consistent','Document important actions','Ask when unsure'].map(t=>`<li><span aria-hidden="true">✓</span>${t}</li>`).join('')}</ul><img src="assets/tft-team.png" loading="lazy" width="470" height="385" alt="The Forbidden Trove Discord Team artwork: a purple treasure chest, gold lettering, and Discord banners in a dark vault."></div><p class="welcome-signoff">GLAD TO HAVE YOU WITH US.</p><a class="welcome-top" href="#introduction">Back to top ↑</a></section><footer class="site-footer"><span>THE FORBIDDEN TROVE</span><span>MODERATOR OPERATIONS</span></footer>`
].join('');
initChatExamples(document.querySelector('.chat-examples'));

const menu = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');
function setMenu(open, restoreFocus = false) {
  menu.setAttribute('aria-expanded', String(open));
  sidebar.classList.toggle('open', open);
  if(restoreFocus) menu.focus({preventScroll:true});
}
menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
document.querySelector('#section-nav').addEventListener('click', e => {
  const link=e.target.closest('a');
  if(link && sidebar.classList.contains('open')) {
    setMenu(false);
    document.getElementById(link.hash.slice(1))?.focus({preventScroll:true});
  }
});
document.addEventListener('keydown', e => {
  if(e.key === 'Escape' && sidebar.classList.contains('open')) {e.preventDefault();setMenu(false,true);}
});
document.addEventListener('click', e => {
  if(sidebar.classList.contains('open') && !sidebar.contains(e.target) && !menu.contains(e.target)) setMenu(false);
});
sidebar.addEventListener('focusout', e => {
  if(e.relatedTarget && !sidebar.contains(e.relatedTarget) && e.relatedTarget !== menu) setMenu(false);
});
window.matchMedia('(min-width: 901px)').addEventListener('change', () => setMenu(false));

const search = document.querySelector('#command-search');
let category = 'All commands';
function renderCommands(){
  const query=search.value.trim().toLowerCase();
  const filtered=commands.filter(([group,command,description])=>(category==='All commands'||group===category||group.startsWith(category+' ·'))&&`${command} ${description}`.toLowerCase().includes(query));
  const groups=[...new Set(filtered.map(c=>c[0]))];
  document.querySelector('#command-results').innerHTML=groups.map(group=>`<section class="command-group" aria-label="${group}"><h3>${group}</h3><div>${filtered.filter(c=>c[0]===group).map(([,command,description])=>`<div class="command-row"><code>${escapeHTML(command)}</code><p>${escapeHTML(description)}</p><button class="copy-command" data-command="${escapeHTML(command)}" aria-label="Copy ${escapeHTML(command)}"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V4H4v12h4"/></svg><span>Copy</span></button></div>`).join('')}</div></section>`).join('');
  document.querySelector('#result-count').textContent=`${filtered.length} command${filtered.length===1?'':'s'}`;
  document.querySelector('.empty-results').hidden=filtered.length>0;
}
search.addEventListener('input',renderCommands);
document.querySelector('.category-filters').addEventListener('click',e=>{const button=e.target.closest('button');if(!button)return;category=button.dataset.category;document.querySelectorAll('[data-category]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));renderCommands();});
document.querySelector('.reset-search').addEventListener('click',()=>{search.value='';document.querySelector('[data-category="All commands"]').click();search.focus();});
let toastTimer;
function toast(message){const box=document.querySelector('#toast');box.textContent=message;box.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>box.classList.remove('visible'),2400);}
document.querySelector('#command-results').addEventListener('click',async e=>{const button=e.target.closest('.copy-command');if(!button)return;try{await navigator.clipboard.writeText(button.dataset.command);button.querySelector('span').textContent='Copied';toast('Command copied');setTimeout(()=>{if(button.isConnected)button.querySelector('span').textContent='Copy';},1800);}catch{toast('Copy unavailable. Select the command text to copy it.');}});
search.setAttribute('aria-keyshortcuts','/');
document.addEventListener('keydown',e=>{if(e.key==='/'&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)&&!document.activeElement.isContentEditable){e.preventDefault();setMenu(false);document.querySelector('#commands').scrollIntoView();search.focus({preventScroll:true});}});
renderCommands();

const sectionNodes=sections.map(([id])=>document.getElementById(id));
sectionNodes.forEach(node=>node.tabIndex=-1);
let ticking=false;
function updateProgress(){
  const top=window.scrollY;const available=document.documentElement.scrollHeight-window.innerHeight;
  const percent=Math.min(100,Math.max(0,Math.round(top/Math.max(1,available)*100)));
  document.querySelector('#reading-progress').value=percent;document.querySelector('#progress-label').textContent=`${percent}%`;
  let index=0;sectionNodes.forEach((node,i)=>{if(node.getBoundingClientRect().top<=window.innerHeight*.35)index=i;});if(percent===100)index=11;
  document.querySelectorAll('#section-nav a').forEach((a,i)=>{a.classList.toggle('active',i===index);if(i===index)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
  document.querySelector('#section-count').textContent=`${number(index)} / 12 sections`;ticking=false;
}
function scheduleProgress(){if(!ticking){requestAnimationFrame(updateProgress);ticking=true;}}
window.addEventListener('scroll',scheduleProgress,{passive:true});
window.addEventListener('resize',scheduleProgress);
new ResizeObserver(scheduleProgress).observe(document.querySelector('main'));
updateProgress();
const initialHash=location.hash;
if(initialHash){document.fonts.ready.then(()=>{
  if(location.hash===initialHash) document.getElementById(initialHash.slice(1))?.scrollIntoView({behavior:'instant'});
  scheduleProgress();
});}
