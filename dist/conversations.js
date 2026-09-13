import { escapeHTML } from './components.js';

const people = {
  ash: { name: 'Ash', initials: 'AS', color: 'rose', moderator: true },
  ember: { name: 'EmberFox', initials: 'EF', color: 'amber' },
  rune: { name: 'RuneRook', initials: 'RR', color: 'purple' },
  moss: { name: 'MossByte', initials: 'MB', color: 'sage' },
  cinder: { name: 'CinderJay', initials: 'CJ', color: 'amber' },
  nova: { name: 'NovaFinch', initials: 'NF', color: 'blue' },
  dusk: { name: 'DuskWren', initials: 'DW', color: 'purple' }
};

export const conversations = [
  { id: 'scam', title: 'Scam report', channel: 'ticket-scam-report', date: '12 September 2026', messages: [
    { user: 'ember', time: '14:31', text: 'I paid 12 div for a craft and RuneRook logged off with my item.' },
    { user: 'ash', time: '14:32', text: '@EmberFox Please share the agreed service, trade screenshots, and the messages before they left.' },
    { user: 'ember', time: '14:33', text: 'Added the screenshots. The fee was 12 div, and they said it would take two minutes.', reply: 1 },
    { user: 'rune', time: '14:34', text: 'My game crashed. I still have the item.' },
    { user: 'ember', time: '14:34', text: 'Then why did you stop answering my DMs? It’s been 40 minutes.', reply: 3 },
    { user: 'ash', time: '14:35', text: '@RuneRook Can you confirm you received the 12 div and still have the item?' },
    { user: 'rune', time: '14:36', text: 'Yes, both. I can log back in now.', reply: 5 },
    { user: 'ash', time: '14:37', text: 'Keep the updates here. I’m documenting the report and escalating for review.' }
  ]},
  { id: 'toxic', title: 'Toxic argument', channel: 'general-chat', date: '12 September 2026', messages: [
    { user: 'moss', time: '16:08', text: 'That price is ridiculous. Nobody should buy this.' },
    { user: 'cinder', time: '16:09', text: '@MossByte Then don’t buy it. You’ve posted the same thing three times.' },
    { user: 'moss', time: '16:09', text: 'Maybe stop ripping people off?', reply: 1 },
    { user: 'cinder', time: '16:10', text: 'You have no idea what you’re talking about.' },
    { user: 'ash', time: '16:10', text: '@MossByte @CinderJay Pause the personal comments. Keep the discussion about the listing.' },
    { user: 'moss', time: '16:11', text: 'So I can’t say a price is too high now?', reply: 4 },
    { user: 'ash', time: '16:11', text: 'You can disagree about a price. Calling each other names or making accusations doesn’t help resolve it.' },
    { user: 'cinder', time: '16:12', text: 'Fair enough. I’ll leave it there.' }
  ]},
  { id: 'evidence', title: 'Missing evidence', channel: 'ticket-service-report', date: '12 September 2026', messages: [
    { user: 'nova', time: '18:02', text: 'Reporting DuskWren for leeching in our run. They barely moved.' },
    { user: 'ash', time: '18:03', text: '@NovaFinch Do you have a video showing what happened during the run?' },
    { user: 'nova', time: '18:04', text: 'Only a screenshot from the end. You can see where they’re standing.', reply: 1 },
    { user: 'dusk', time: '18:05', text: 'I was lagging for part of it. I told the group in chat.' },
    { user: 'nova', time: '18:05', text: 'I didn’t see that. They were still at the entrance when I looked.', reply: 3 },
    { user: 'ash', time: '18:06', text: 'A single screenshot doesn’t show the full run. Is there a recording from anyone in the group?' },
    { user: 'nova', time: '18:07', text: 'I asked. Nobody recorded it.' },
    { user: 'ash', time: '18:08', text: 'Without clear video evidence, we usually close leeching reports. I’ll close this one with the evidence available.' }
  ]},
  { id: 'borderline', title: 'Borderline case', channel: 'ticket-service-report', date: '12 September 2026', messages: [
    { user: 'ember', time: '20:14', text: 'MossByte left before the last map. We agreed on five, but only ran four.' },
    { user: 'moss', time: '20:15', text: 'The fifth map was lost to a disconnect. I offered to rerun it tomorrow.' },
    { user: 'ember', time: '20:16', text: 'I paid to finish tonight. Tomorrow doesn’t work for me.', reply: 1 },
    { user: 'ash', time: '20:17', text: 'Please share the original agreement and the messages about the rerun.' },
    { user: 'moss', time: '20:18', text: 'Posted them. I have Trusted here and I’m trying to sort this out.' },
    { user: 'ember', time: '20:19', text: 'The agreement says five maps, but we never discussed disconnects.' },
    { user: 'ash', time: '20:20', text: 'I can see why you read the agreement differently. I’m escalating this for another moderator to review.' },
    { user: 'moss', time: '20:21', text: 'Okay, I’ll wait for the review.', reply: 6 }
  ]}
];

function messageText(text) {
  return escapeHTML(text).replace(/@(EmberFox|RuneRook|MossByte|CinderJay|NovaFinch|DuskWren)\b/g, '<span class="chat-mention">@$1</span>');
}

export function renderConversation(conversation) {
  return `<div class="chat-channel"><span aria-hidden="true">#</span><strong>${escapeHTML(conversation.channel)}</strong><span class="chat-readonly">READ ONLY</span></div><div class="chat-date"><span>${conversation.date}</span></div><ol class="chat-messages" aria-label="${escapeHTML(conversation.title)} conversation">${conversation.messages.map((message, i) => {
    const person = people[message.user];
    const original = message.reply === undefined ? null : conversation.messages[message.reply];
    const reply = original ? `<div class="chat-reply"><span class="reply-line" aria-hidden="true"></span><span class="sr-only">Replying to </span><span class="reply-name">${escapeHTML(people[original.user].name)}</span><span class="reply-excerpt" title="${escapeHTML(original.text)}">${escapeHTML(original.text)}</span></div>` : '';
    return `<li class="chat-message" id="chat-${conversation.id}-${i}">${reply}<span class="chat-avatar avatar-${person.color}" aria-hidden="true">${person.initials}</span><div class="chat-message-body"><div class="chat-message-meta"><span class="chat-name name-${person.color}">${person.name}</span>${person.moderator ? '<span class="chat-mod-badge">MOD</span>' : ''}<time datetime="2026-09-12T${message.time}">${message.time}</time></div><p>${messageText(message.text)}</p></div></li>`;
  }).join('')}</ol>`;
}

export function chatExamples() {
  return `<div class="chat-examples"><div class="chat-example-heading"><h3>Conversation examples</h3><span>FICTIONAL SCENARIOS</span></div><div class="chat-tabs" role="tablist" aria-label="Example conversations">${conversations.map((conversation,i)=>`<button type="button" role="tab" id="chat-tab-${conversation.id}" aria-controls="chat-panel" aria-selected="${i===0}" tabindex="${i===0?0:-1}" data-conversation="${conversation.id}">${conversation.title}</button>`).join('')}</div><div class="discord-panel" id="chat-panel" role="tabpanel" aria-labelledby="chat-tab-scam" tabindex="0">${renderConversation(conversations[0])}</div><p class="chat-caption">Fictional conversations for training and reference.</p></div>`;
}

export function initChatExamples(root) {
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  const panel = root.querySelector('[role="tabpanel"]');
  function select(tab) {
    const conversation = conversations.find(item => item.id === tab.dataset.conversation);
    tabs.forEach(item => {item.setAttribute('aria-selected', String(item === tab));item.tabIndex = item === tab ? 0 : -1;});
    panel.setAttribute('aria-labelledby', tab.id);
    panel.innerHTML = renderConversation(conversation);
  }
  tabs.forEach((tab,index)=>{
    tab.addEventListener('click',()=>select(tab));
    tab.addEventListener('keydown',event=>{
      let next;
      if(event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if(event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      else if(event.key === 'Home') next = 0;
      else if(event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();select(tabs[next]);tabs[next].focus();
    });
  });
}
