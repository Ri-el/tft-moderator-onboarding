export const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const number = i => String(i+1).padStart(2,'0');
export function heading(label,title,subtitle='') { return `<div class="section-heading"><p class="eyebrow">${label}</p><h2>${title}</h2>${subtitle?`<p class="subtitle">${subtitle}</p>`:''}<span class="accent-line"></span></div>`; }
export function section(id,title,label,body,subtitle='') {return `<section id="${id}" class="training-section" data-section="${title}">${heading(label,title,subtitle)}${body}</section>`;}
export function rows(items,cls='') {return `<ol class="numbered-rows ${cls}">${items.map((item,i)=>`<li><span class="number">${number(i)}</span><div>${item}</div></li>`).join('')}</ol>`;}
export function detailRows(items,cls=''){return `<dl class="detail-rows ${cls}">${items.map(([title,text])=>`<div><dt>${title}</dt><dd>${text}</dd></div>`).join('')}</dl>`;}
