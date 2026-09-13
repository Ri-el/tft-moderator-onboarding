export const sections = [
  ['introduction','Introduction'],['mindset','Moderator Mindset'],['philosophy','Moderation Philosophy'],['priorities','Current Priorities'],['escalation','When to Escalate'],['boundary','TFT vs GGG'],['workflow','Ticket Workflow'],['special-cases','Special Cases in Tickets'],['idle-tickets','Managing Idle Tickets'],['relink','Account Relink'],['commands','Commands'],['welcome','Welcome to the Team']
];
export const commands = [
  ['LCM','!backup','backup server'],
  ['Moderator+','!v update @user','refresh DB/vouches'],
  ['Junior Moderator+ · Part 1','!blacklist add @user <reason>','apply blacklist + block'],
  ['Junior Moderator+ · Part 1','!blacklist remove @user','remove blacklist + block'],
  ['Junior Moderator+ · Part 1','!block @user [reason]','add blocked role'],
  ['Junior Moderator+ · Part 1','!bonk @user','24h temp ban'],
  ['Junior Moderator+ · Part 1','!check @user','show BL, vouches, notes, PoE link'],
  ['Junior Moderator+ · Part 1','!logrequest @user','request Client.txt'],
  ['Junior Moderator+ · Part 1','!note @user','view notes'],
  ['Junior Moderator+ · Part 1','!note add @user <text>','add note'],
  ['Junior Moderator+ · Part 1','!note remove <id>','remove note'],
  ['Junior Moderator+ · Part 1','!notify @user [message]','DM default/custom notice'],
  ['Junior Moderator+ · Part 2','!purge <num>','delete messages'],
  ['Junior Moderator+ · Part 2','!stats recent @user','last 3 messages'],
  ['Junior Moderator+ · Part 2','!stats term <term>','search users & post count'],
  ['Junior Moderator+ · Part 2','!stats user @user','top 10 message channels'],
  ['Junior Moderator+ · Part 2','!unblock @user','remove blocked role'],
  ['Junior Moderator+ · Part 2','!unlink @user','unlink PoE account'],
  ['Junior Moderator+ · Part 2','!who @user','show linked PoE account'],
  ['Junior Moderator+ · Part 2','!whor <account>','reverse PoE→Discord lookup'],
  ['Public','!blacklist @user','BL status/date'],
  ['Public','!log','show PoE 1/2 Client.txt location'],
  ['Public','!time','show major time zones'],
  ['Public','!v @user','check rank']
];
export const principles = [
  ['Stay calm and neutral',"even when the conversation isn't."],
  ['Explain actions whenever possible','clarity builds trust.'],
  ['De-escalate before punishing','resolve the temperature first.'],
  ['Choose consistency over speed','ask another moderator when unsure.']
];
export const ticketSteps = ['Read everything.','Collect evidence.','Stay professional.','Resolve or close.','Close idle tickets aggressively.'];
