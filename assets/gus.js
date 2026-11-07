/* Gus the Gopher: scripted SaleGopher helper (no API, no tracking). Injects its own markup and styles. */
(function(){
  "use strict";
  if(window.__gus)return;window.__gus=1;
  var TEL="tel:+18004818638",PHONE="1-800-481-8638";
  var formHref=document.getElementById("reserve")?"#reserve":"/contact/#reserve";

  var KB=[
    {k:["price","cost","how much","pricing","plan","plans","tier","fee","monthly","rent cost","expensive","cheap","budget"],
     a:"Three plans, all on a 12-month agreement with $0 setup: Spark is $297/mo for lower-ticket trades, Pro is $497/mo for standard trades, and Prime starts at $997/mo for high-ticket work like roofing, remodeling and accounting. Pay the year up front and you get 2 months free.",l:["/rent-a-website/#plans","Compare plans"]},
    {k:["spark","pro","prime","difference","compare","included","include","what do i get","features"],
     a:"Spark: your exclusive ranked site, your name and phone, call and form leads, hosting and a monthly lead report. Pro adds more service and city pages, fresh content monthly, a Google Business Profile tune-up and an AI-agent-ready booking link. Prime adds weekly AI-agent work, priority pages and a quarterly strategy call.",l:["/rent-a-website/#plans","See the plans"]},
    {k:["contract","term","terms","agreement","months","month to month","cancel","commitment","long","year"],
     a:"Every rental is a 12-month agreement. That gives the site time to build momentum and gives you a full year of leads that belong only to you.",l:["/faq/","Read the FAQ"]},
    {k:["setup","set up","start fee","upfront","up front","prepay","pay the year","free months","discount"],
     a:"Setup is $0 on a 12-month agreement. Pay the year up front and you get 2 months free."},
    {k:["guarantee","guaranteed","promise","rank first","number one","page one","#1","top of google"],
     a:"No one can guarantee rankings, and we won't pretend to. We build each site to earn them, then show you the calls and forms it actually produces every month."},
    {k:["shared","exclusive","competitor","competitors","other companies","only me","sell my leads"],
     a:"Exclusive means one business per trade and city. Your name, your phone and your reviews are on the site, and nobody else gets those leads."},
    {k:["own","buy","purchase","keep the site","subscribe to own","subscribe-to-own","forever"],
     a:"Yes, you may be able to buy your site later through subscribe-to-own, once it is ranking and working for you. Ask about buying your site and we'll walk you through it."},
    {k:["open","available","which sites","list","domains","cpa","accountant","accounting","pilot","my city","my trade"],
     a:"Available now: our first pilot sites bestcpacolorado.com and bestdenveraccountant.com for accounting firms, plus open Denver metro sites for fencing, decks, roofing, moving and home services. Don't see your trade or city? We own hundreds of keyword domains and will check.",l:["/available-websites/","See open sites"]},
    {k:["ai","chatgpt","ai mode","agent","agents","back door","booking","book","assistant","llms"],
     a:"Sites are set up for how AI assistants pick local pros: Google Business Profile, a booking path agents can read, structured data on every page and an llms.txt file. Pro includes the AI-agent-ready booking link, and Prime adds weekly AI-agent work.",l:["/agent-ready/","How AI-ready works"]},
    {k:["roi","worth it","pay for itself","pay off","calculator","break even","return","numbers"],
     a:"Try the ROI calculator: enter your leads, close rate, job value and margin, and it shows your profit after rent and how many leads it takes to break even. It's a planning tool, not a promise.",l:["/roi-calculator/","Open the calculator"]},
    {k:["how it works","how does","process","steps","get started","start","sign up","move in"],
     a:"Three steps: pick an open site in your trade and city, we move you in with your name, phone, reviews and booking, and every call and form goes straight to you with a monthly report.",l:["/rent-a-website/","How renting works"]},
    {k:["real estate","realtor","agent license","brokerage","broker"],
     a:"Real estate sites are flat monthly advertising only, with your brokerage name on every page as Colorado rules require. No referral or closing fees."},
    {k:["domain owner","my domains","i own domains","list my domain","waitlist","parked","parking"],
     a:"Domain owners can join our waitlist. We'll only take names with real local search demand, build them out properly and share the monthly rent with you.",l:["/domain-owners/","Join the owner waitlist"]},
    {k:["where","located","location","address","office","denver","headquarters","local"],
     a:"SaleGopher is headquartered in Denver at 1001 Bannock St #660, Denver, CO 80204, and grows local businesses anywhere."},
    {k:["phone","call","talk","human","person","speak","contact","email","reach"],
     a:"You can call us at "+PHONE+" or send the request form and we'll reply within one business day."},
    {k:["who are you","gus","gopher","name","bot","robot","are you real"],
     a:"I'm Gus, the SaleGopher. A go-fer fetches things, and I fetch answers. I'm a scripted helper, not a live person, so for anything specific, call or send the form."},
    {k:["hi","hello","hey","yo","sup","good morning"],a:"Hi! Ask me about prices, terms, open sites, AI booking or buying your site later."}
  ];
  var QUICK=["What does it cost?","How long is the agreement?","Which sites are open?","Do you guarantee rankings?","Can I buy my site later?"];

  var head='<svg viewBox="0 0 100 92" aria-hidden="true" class="gus-face">'+
    '<circle cx="15" cy="52" r="10" fill="#a8693a" stroke="#14213d" stroke-width="3"/><circle cx="85" cy="52" r="10" fill="#a8693a" stroke="#14213d" stroke-width="3"/>'+
    '<ellipse cx="50" cy="56" rx="36" ry="33" fill="#c4834a" stroke="#14213d" stroke-width="3"/>'+
    '<path d="M16 44C17 8 83 8 84 44Z" fill="#ffd23f" stroke="#14213d" stroke-width="3"/><path d="M50 13v28" stroke="#e6b000" stroke-width="5" stroke-linecap="round"/>'+
    '<rect x="7" y="40" width="86" height="10" rx="5" fill="#ffb703" stroke="#14213d" stroke-width="3"/>'+
    '<circle cx="38" cy="60" r="5.5" fill="#14213d"/><circle cx="62" cy="60" r="5.5" fill="#14213d"/><circle cx="40" cy="58" r="2" fill="#fff"/><circle cx="64" cy="58" r="2" fill="#fff"/>'+
    '<ellipse cx="50" cy="74" rx="15" ry="10" fill="#f6dcb6"/><ellipse cx="50" cy="69" rx="5.5" ry="3.8" fill="#5a2e1a"/>'+
    '<rect x="46" y="77" width="8" height="7" rx="1.5" fill="#fff" stroke="#14213d" stroke-width="1.5"/></svg>';

  var css=
  '.gus-tab{position:fixed;right:14px;bottom:14px;z-index:60;background:none;border:0;padding:0;cursor:pointer;width:76px;display:flex;flex-direction:column;align-items:center;filter:drop-shadow(0 6px 10px rgba(20,33,61,.28))}'+
  '.gus-tab .gus-face{width:76px;height:70px;transition:transform .25s ease}'+
  '.gus-tab:hover .gus-face{transform:translateY(-3px) rotate(-4deg)}'+
  '.gus-tab .gus-plate{margin-top:-4px;background:#5cffb0;color:#14213d;border:2px solid #14213d;border-radius:5px;font:800 12px/1 Inter,system-ui,sans-serif;padding:4px 7px;white-space:nowrap}'+
  '.gus-tab:focus-visible{outline:3px solid #2952ff;outline-offset:3px;border-radius:8px}'+
  '.gus-tab[aria-expanded=true]{display:none}'+
  '.gus-panel{position:fixed;right:12px;bottom:12px;z-index:61;width:min(370px,calc(100vw - 24px));max-height:min(600px,calc(100vh - 24px));display:none;flex-direction:column;background:#fff;color:#14213d;border:2px solid #14213d;border-radius:10px;box-shadow:6px 6px 0 #5cffb0,0 18px 40px rgba(20,33,61,.25);font:400 15px/1.5 Inter,system-ui,sans-serif;overflow:hidden}'+
  '.gus-panel.open{display:flex;animation:gusIn .22s ease-out}'+
  '@keyframes gusIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}'+
  '.gus-hd{display:flex;align-items:center;gap:10px;padding:10px 12px;background:#eef4ff;border-bottom:2px solid #14213d}'+
  '.gus-hd .gus-face{width:42px;height:39px;flex:none}'+
  '.gus-hd b{display:block;font:800 16px/1.2 "Bricolage Grotesque",Poppins,Inter,system-ui,sans-serif}'+
  '.gus-hd small{color:#3d4a66;font-size:12px}'+
  '.gus-x{margin-left:auto;background:#fff;border:2px solid #14213d;border-radius:6px;width:40px;height:40px;font:700 20px/1 Inter,sans-serif;color:#14213d;cursor:pointer}'+
  '.gus-log{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;min-height:150px}'+
  '.gus-m{max-width:88%;padding:9px 12px;border-radius:8px;border:2px solid #14213d}'+
  '.gus-m.bot{background:#f6f8fc;align-self:flex-start;border-color:#d3dcea}'+
  '.gus-m.me{background:#2952ff;color:#fff;align-self:flex-end;border-color:#2952ff}'+
  '.gus-m a{color:#1a3ad6;font-weight:700}'+
  '.gus-q{display:flex;flex-wrap:nowrap;gap:6px;padding:2px 12px 8px;overflow-x:auto;scrollbar-width:thin}'+
  '.gus-q button{background:#fff;border:2px solid #14213d;border-radius:6px;padding:6px 9px;font:600 13px Inter,system-ui,sans-serif;color:#14213d;cursor:pointer;min-height:36px;white-space:nowrap;flex:none}'+
  '.gus-q button:hover{background:#e8fff3}'+
  '.gus-act{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:8px 12px;border-top:1px solid #d3dcea}'+
  '.gus-act a{display:flex;align-items:center;justify-content:center;min-height:44px;border:2px solid #14213d;border-radius:6px;font:700 14px Inter,system-ui,sans-serif;text-decoration:none;color:#14213d;background:#5cffb0}'+
  '.gus-act a.f{background:#2952ff;color:#fff}'+
  '.gus-in{display:flex;gap:8px;padding:8px 12px 12px}'+
  '.gus-in input{flex:1;min-width:0;border:2px solid #b9c5d8;border-radius:6px;padding:10px;font:400 15px Inter,system-ui,sans-serif;color:#14213d;background:#fff}'+
  '.gus-in input:focus{border-color:#2952ff;outline:none}'+
  '.gus-in button{background:#14213d;color:#fff;border:2px solid #14213d;border-radius:6px;padding:0 14px;font:700 14px Inter,system-ui,sans-serif;cursor:pointer;min-height:44px}'+
  '@media (max-width:480px){.gus-tab{right:10px;bottom:10px;width:62px}.gus-tab .gus-face{width:62px;height:57px}.gus-tab .gus-plate{font-size:11px;padding:3px 6px}.gus-panel{right:8px;left:8px;bottom:8px;width:auto;max-height:calc(100vh - 16px)}}'+
  '@media (prefers-reduced-motion:reduce){.gus-panel.open{animation:none}.gus-tab .gus-face{transition:none}}';

  var st=document.createElement("style");st.textContent=css;document.head.appendChild(st);

  var tab=document.createElement("button");
  tab.type="button";tab.className="gus-tab";tab.setAttribute("aria-expanded","false");tab.setAttribute("aria-controls","gus-panel");
  tab.setAttribute("aria-label","Ask Gus the Gopher a question");
  tab.innerHTML=head+'<span class="gus-plate">Ask Gus</span>';

  var panel=document.createElement("div");
  panel.className="gus-panel";panel.id="gus-panel";panel.setAttribute("role","dialog");panel.setAttribute("aria-label","Gus the Gopher helper");
  panel.innerHTML='<div class="gus-hd">'+head+'<div><b>Gus the Gopher</b><small>Scripted helper. For specifics, call or send the form.</small></div><button type="button" class="gus-x" aria-label="Close Gus">&times;</button></div>'+
    '<div class="gus-log" aria-live="polite"></div><div class="gus-q"></div>'+
    '<div class="gus-act"><a href="'+TEL+'">Call '+PHONE+'</a><a class="f" href="'+formHref+'">Request my site</a></div>'+
    '<form class="gus-in" autocomplete="off"><label for="gus-text" style="position:absolute;left:-9999px">Ask Gus a question</label><input id="gus-text" type="text" maxlength="200" placeholder="Ask about price, terms, sites..."><button type="submit">Ask</button></form>';

  document.body.appendChild(tab);document.body.appendChild(panel);
  var log=panel.querySelector(".gus-log"),qbox=panel.querySelector(".gus-q"),input=panel.querySelector("#gus-text");

  function esc(t){var d=document.createElement("div");d.textContent=t;return d.innerHTML;}
  function add(html,who){var m=document.createElement("div");m.className="gus-m "+who;m.innerHTML=html;log.appendChild(m);log.scrollTop=log.scrollHeight;}
  function norm(t){return (" "+t.toLowerCase().replace(/[^a-z0-9#$\- ]+/g," ").replace(/\s+/g," ")+" ");}
  function answer(q){
    var t=norm(q),best=null,score=0;
    KB.forEach(function(e){var s=0;e.k.forEach(function(w){var ww=" "+w+" ";if(t.indexOf(ww)>-1)s+=w.split(" ").length*2;else if(w.length>4&&t.indexOf(w)>-1)s+=1;});if(s>score){score=s;best=e;}});
    if(!best)return "Good question. I'm a simple scripted helper, so I don't have that one. Call "+PHONE+" or send the request form and a real person will answer within one business day.";
    var out=esc(best.a);
    if(best.l)out+=' <a href="'+best.l[0]+'">'+esc(best.l[1])+'</a>';
    return out;
  }
  window.__gusAnswer=answer;
  function ask(q){q=(q||"").trim();if(!q)return;add(esc(q),"me");setTimeout(function(){add(answer(q),"bot");},220);}
  QUICK.forEach(function(q){var bt=document.createElement("button");bt.type="button";bt.textContent=q;bt.addEventListener("click",function(){ask(q);});qbox.appendChild(bt);});

  var greeted=false;
  function open(){panel.classList.add("open");tab.setAttribute("aria-expanded","true");
    if(!greeted){greeted=true;add("Hi, I'm Gus. I fetch answers about renting a site that ranks. What can I dig up for you?","bot");}
    setTimeout(function(){input.focus();},30);}
  function close(){panel.classList.remove("open");tab.setAttribute("aria-expanded","false");tab.focus();}
  tab.addEventListener("click",open);
  panel.querySelector(".gus-x").addEventListener("click",close);
  panel.addEventListener("keydown",function(e){if(e.key==="Escape")close();});
  panel.querySelector(".gus-in").addEventListener("submit",function(e){e.preventDefault();ask(input.value);input.value="";});
  panel.querySelector(".gus-act a.f").addEventListener("click",function(){if(formHref.charAt(0)==="#")close();});
})();
