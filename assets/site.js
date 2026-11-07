(function(){
  "use strict";
  var still=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // mobile menu
  var b=document.querySelector(".menu-btn"),n=document.getElementById("nav");
  if(b&&n){
    var setMenu=function(o){n.classList.toggle("open",o);b.setAttribute("aria-expanded",o?"true":"false");b.textContent=o?"Close":"Menu";};
    b.addEventListener("click",function(){setMenu(!n.classList.contains("open"));});
    n.addEventListener("click",function(e){if(e.target.closest("a"))setMenu(false);});
    document.addEventListener("keydown",function(e){if(e.key==="Escape"&&n.classList.contains("open")){setMenu(false);b.focus();}});
  }

  // for-rent sign rotator
  var s=document.querySelector("[data-rotate]");
  if(s){
    var items=[];try{items=JSON.parse(s.getAttribute("data-rotate"));}catch(e){}
    var a=s.querySelector(".addr"),k=s.querySelector("[data-k]"),i=0;
    if(items.length>1&&!still){setInterval(function(){
      i=(i+1)%items.length;a.style.opacity=0;
      setTimeout(function(){a.textContent=items[i][0];if(k)k.textContent=items[i][1];a.style.opacity=1;},500);
    },3800);}
  }

  // listing filters
  var f=document.querySelector(".filters");
  if(f){f.addEventListener("click",function(e){
    var t=e.target.closest("button");if(!t)return;
    f.querySelectorAll("button").forEach(function(x){x.setAttribute("aria-pressed",x===t?"true":"false");});
    var v=t.getAttribute("data-f");
    document.querySelectorAll("[data-dig] .lot").forEach(function(l){l.hidden=!(v==="all"||l.getAttribute("data-v")===v);});
  });}

  // gopher dig: reveal open sites when the grid scrolls into view
  document.querySelectorAll("[data-dig]").forEach(function(grid){
    var bar=grid.parentNode.querySelector(".digbar"),msg=bar&&bar.querySelector("[data-dig-msg]");
    var lots=grid.querySelectorAll(".lot"),done=false;
    var reveal=function(){
      if(done)return;done=true;
      if(bar)bar.classList.add("dug-bar");
      lots.forEach(function(l,ix){l.style.transitionDelay=(still?0:Math.min(ix,10)*70)+"ms";});
      grid.classList.add("dug");
      if(msg)msg.textContent="Gus dug up "+lots.length+" open site"+(lots.length===1?"":"s")+" for you.";
    };
    if(still||!("IntersectionObserver" in window)){reveal();return;}
    grid.classList.add("dig-ready");
    var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){reveal();io.disconnect();}});},{threshold:.08});
    io.observe(grid);
    setTimeout(reveal,4000); // never leave listings hidden
  });

  // reserve and plan buttons prefill the form
  var fill=function(name,val){var fld=document.querySelector("form [name="+name+"]");if(fld)fld.value=val;};
  document.querySelectorAll("[data-reserve]").forEach(function(btn){
    btn.addEventListener("click",function(){fill("site",btn.getAttribute("data-reserve"));});
  });
  document.querySelectorAll("[data-plan]").forEach(function(btn){
    btn.addEventListener("click",function(){var fld=document.querySelector("form [name=site]");if(fld&&!fld.value)fld.value=btn.getAttribute("data-plan")+" plan";});
  });

  // calculator
  var c=document.getElementById("calc");
  if(c){
    var money=function(x){return "$"+Math.round(x).toLocaleString("en-US");};
    var $=function(id){return document.getElementById(id);};
    var num=function(id,lo,hi){var v=parseFloat($(id).value);if(!isFinite(v))v=0;return Math.min(hi,Math.max(lo,v));};
    var presets=c.querySelectorAll("[data-rent]");
    var run=function(){
      var leads=num("c-leads",0,60),close=num("c-close",0,100)/100,job=num("c-job",0,1000000),margin=num("c-margin",0,100)/100,rent=num("c-rent",0,100000);
      $("o-leads").textContent=leads;
      $("o-close").textContent=Math.round(close*100)+"%";
      var jobs=leads*close,rev=jobs*job,profit=rev*margin,net=profit-rent,per=close*job*margin;
      $("r-jobs").textContent=(Math.round(jobs*10)/10).toString();
      $("r-rev").textContent=money(rev);
      $("r-profit").textContent=money(profit);
      $("r-net").textContent=(net<-0.5?"-":"")+money(Math.abs(net));
      var box=$("net-box");box.classList.toggle("neg",net<-0.5);box.classList.toggle("pos",net>0.5);
      $("r-cpl").textContent=leads>0?money(rent/leads):"n/a";
      $("r-roi").textContent=rent>0?(Math.round(profit/rent*10)/10)+"x":"n/a";
      $("r-be").textContent=rent<=0?"0":(per>0?(Math.ceil(rent/per*10)/10).toString():"n/a");
      presets.forEach(function(p){p.setAttribute("aria-pressed",String(parseFloat(p.getAttribute("data-rent"))===rent));});
    };
    presets.forEach(function(p){p.addEventListener("click",function(){$("c-rent").value=p.getAttribute("data-rent");run();});});
    c.addEventListener("input",run);c.addEventListener("change",run);run();
  }

  // forms: hardened FormSubmit (ajax). Address is assembled only at submit time.
  var human=false,t0=Date.now();
  var mark=function(e){if(e.isTrusted)human=true;};
  document.addEventListener("keydown",mark,{passive:true});
  document.addEventListener("pointerdown",mark,{passive:true});
  var endpoint=function(){
    var p=["aW5m","bw=="],q=["ZXlldG9h","ZC5jb20="];
    return "https://formsubmit.co/ajax/"+atob(p.join(""))+String.fromCharCode(64)+atob(q.join(""));
  };
  document.querySelectorAll("form[data-form]").forEach(function(form){
    var st=form.querySelector(".status");
    var say=function(msg,cls){st.textContent=msg;st.className="status "+(cls||"");};
    form.addEventListener("input",function(e){if(e.target.getAttribute("aria-invalid")==="true"&&e.target.checkValidity())e.target.removeAttribute("aria-invalid");});
    form.addEventListener("submit",function(e){
      e.preventDefault();
      var hp=form.querySelector("[name=_honey]");
      if(hp&&hp.value){say("This request could not be sent. Please call 1-800-481-8638.","err");return;}
      var bad=null;
      form.querySelectorAll("input,textarea").forEach(function(el){
        if(el.name==="_honey")return;
        var ok=el.checkValidity()&&!(el.required&&!el.value.trim());
        if(!ok){el.setAttribute("aria-invalid","true");if(!bad)bad=el;}else el.removeAttribute("aria-invalid");
      });
      if(bad){say("Please fill in the highlighted fields.","err");bad.focus();return;}
      if(!human){say("Please use your keyboard, mouse or touch to fill out the form, then send again.","err");return;}
      if(Date.now()-t0<3000){say("That was quick. Please check your details, then press send again.","err");return;}
      var data={};new FormData(form).forEach(function(v,k){if(k!=="_honey")data[k]=v;});
      data._subject=form.getAttribute("data-subject")||"New SaleGopher request";
      data._captcha="false";data._template="table";data.page=location.pathname;
      var btn=form.querySelector("button[type=submit]");btn.disabled=true;say("Sending...");
      fetch(endpoint(),{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(data)})
        .then(function(r){return r.json().then(function(j){return {ok:r.ok,j:j};},function(){return {ok:false,j:null};});})
        .then(function(res){
          if(res.ok&&res.j&&(res.j.success===true||res.j.success==="true")){say("Sent. We will reach out within one business day.","ok");form.reset();}
          else{say("We could not confirm delivery. Please call 1-800-481-8638 so nothing gets lost.","err");}
        })
        .catch(function(){say("Your message did not send. Please call 1-800-481-8638.","err");})
        .finally(function(){btn.disabled=false;});
    });
  });
})();
