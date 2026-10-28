/* =====================================================================
   Interactividad de la página. El HTML ya llega completo desde la
   construcción; este script solo agrega navegación, filtros, la ficha
   deslizante, el verificador, el recomendador, el simulador y el quiz.
   ===================================================================== */
(function(){
  var $=function(s,r){ return (r||document).querySelector(s); };
  var $$=function(s,r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); };
  function store(k,v){ try{ if(v===undefined) return JSON.parse(localStorage.getItem(k)||"null"); localStorage.setItem(k,JSON.stringify(v)); }catch(e){ return null; } }
  var REDUCE=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- tema ---------- */
  var saved=store("cibo-theme"); if(saved) document.documentElement.setAttribute("data-theme",saved);
  $("#theme").addEventListener("click",function(){
    var r=document.documentElement, cur=r.getAttribute("data-theme");
    var dark=cur==="dark"||(!cur&&window.matchMedia("(prefers-color-scheme: dark)").matches);
    r.setAttribute("data-theme",dark?"light":"dark"); store("cibo-theme",dark?"light":"dark");
  });

  /* ---------- navegación por vistas ---------- */
  var VIEWS=$$(".view").map(function(v){ return v.id; });
  var actual="";
  function mostrar(id){
    if(id===actual) return;
    actual=id;
    $$(".view").forEach(function(v){ v.classList.toggle("on",v.id===id); });
    $$(".nav a").forEach(function(a){ if(a.dataset.v===id) a.setAttribute("aria-current","page"); else a.removeAttribute("aria-current"); });
  }
  function irA(hash,suave){
    var h=(hash||"").replace(/^#/,"");
    if(sheet.classList.contains("on")) cerrarFicha(true);
    if(!h || VIEWS.indexOf(h)>-1){ mostrar(h||"inicio"); window.scrollTo(0,0); return; }
    var el=document.getElementById(h);
    if(!el){ mostrar("inicio"); return; }
    var v=el.closest(".view"); if(v) mostrar(v.id);
    if(/^g-/.test(h)||/^f-/.test(h)){ var p=el.closest(".gpanel"); if(p) tab(p.id.slice(3)); }
    if(el.classList.contains("mx-panel")) mxTab(el.dataset.l);
    if(/^p-/.test(h) && el.dataset.i){ mostrar("catalogo"); requestAnimationFrame(function(){ el.scrollIntoView({block:"center"}); abrirFicha(D.P[+el.dataset.i],null); }); return; }
    requestAnimationFrame(function(){
      el.scrollIntoView({behavior:suave&&!REDUCE?"smooth":"auto",block:"start"});
      if(el.classList.contains("gc")){ el.focus({preventScroll:true}); el.classList.add("flash"); setTimeout(function(){ el.classList.remove("flash"); },1800); }
    });
  }
  window.addEventListener("hashchange",function(){ irA(location.hash,true); });
  function navegar(id){ if(location.hash==="#"+id) irA("#"+id,true); else location.hash=id; }

  /* ---------- ficha deslizante ---------- */
  var sheet=$("#sheet"), scrim=$("#scrim"), shB=$("#shB"), origen=null;
  function abrirFicha(p,src){
    if(!p) return;
    if(src && !sheet.contains(src)) origen=src;
    var card=document.getElementById(p.id);
    $("#shT").textContent=p.m;
    $("#shS").textContent=p.f+" · "+LIN[p.l]+(p.k.length?" · "+p.k.map(code).join(" + "):"");
    $("#shH").style.setProperty("--mc","var("+MOV[p.mov].v+")");
    shB.innerHTML=card?$(".ficha",card).innerHTML:"";
    shB.scrollTop=0;
    sheet.hidden=false; scrim.classList.add("on");
    requestAnimationFrame(function(){ sheet.classList.add("on"); });
    document.body.style.overflow="hidden";
    $("#shX").focus();
  }
  function cerrarFicha(sinFoco){
    sheet.classList.remove("on"); scrim.classList.remove("on"); document.body.style.overflow="";
    setTimeout(function(){ if(!sheet.classList.contains("on")) sheet.hidden=true; },240);
    if(origen && sinFoco!==true) origen.focus();
  }
  $("#shX").addEventListener("click",function(){ cerrarFicha(); });
  scrim.addEventListener("click",function(){ cerrarFicha(); });
  document.addEventListener("keydown",function(e){ if(e.key==="Escape" && sheet.classList.contains("on")) cerrarFicha(); });

  /* clics delegados: productos, objetivos, acciones de la ficha */
  document.addEventListener("click",function(e){
    var s=e.target.closest(".pc > summary");
    if(s){ e.preventDefault(); abrirFicha(D.P[+s.parentNode.dataset.i],s); return; }
    var a=e.target.closest("[data-p]");
    if(a && !a.closest(".sim")){ e.preventDefault(); abrirFicha(D.P[+a.dataset.p],a); return; }
    var o=e.target.closest(".ochip[data-o]");
    if(o){ e.preventDefault(); rec.o=o.dataset.o; rec.e=""; recPintar(true); navegar("recomendar"); return; }
    var act=e.target.closest("[data-act=cruce]");
    if(act){ ck.h=["p"+act.dataset.p]; ck.c=""; ckPintar(true); navegar("cruces"); }
  });

  /* ---------- tooltip ---------- */
  var tt=$("#tt");
  function tip(txt,x,y){ if(!txt){ tt.hidden=true; return; } tt.textContent=txt; tt.hidden=false; var w=tt.offsetWidth, h=tt.offsetHeight; tt.style.left=Math.max(8,Math.min(window.innerWidth-w-8,x+12))+"px"; tt.style.top=Math.max(8,(y-h-12<8?y+18:y-h-12))+"px"; }
  document.addEventListener("pointermove",function(e){
    var t=e.target.closest("[data-tip]"); if(t){ tip(t.dataset.tip,e.clientX,e.clientY); return; }
    var c=e.target.closest(".mx td[data-a]");
    if(c){ var a=D.P[+c.dataset.a], b=D.P[+c.dataset.b], r=relacion(a.k,b.k);
      tip("Después de "+a.nm+" ("+a.k.map(code).join(" + ")+"), "+b.nm+" ("+b.k.map(code).join(" + ")+"): "+({no:"no rota",parte:"rota solo en parte",si:"sí rota",ms:"sí rota (multisitio)"}[r]),e.clientX,e.clientY); return; }
    if(!e.target.closest(".sim-svg")) tip("");
  });
  document.addEventListener("focusin",function(e){ var t=e.target.closest&&e.target.closest("[data-tip]"); if(t){ var r=t.getBoundingClientRect(); tip(t.dataset.tip,r.left,r.top); } });
  document.addEventListener("focusout",function(){ tip(""); });

  /* ---------- inicio: consejo de campo ---------- */
  var tipI=Math.floor(Date.now()/864e5)%D.TIPS.length;
  function pintarTip(){ $("#tipTema").textContent=D.TIPS[tipI].t; $("#tipTxt").textContent=D.TIPS[tipI].x; }
  pintarTip();
  $("#tipOtro").addEventListener("click",function(){ var n; do{ n=Math.floor(Math.random()*D.TIPS.length); }while(n===tipI && D.TIPS.length>1); tipI=n; pintarTip(); });

  /* ---------- catálogo ---------- */
  var cards=$$(".pc"), filtro={l:"",g:"",mov:"",nuevo:false,q:""};
  function textoDe(c){ return c.dataset.s; }
  function catPintar(){
    var q=filtro.q.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,""), n=0;
    cards.forEach(function(c){
      var ok=(!filtro.l||c.dataset.l===filtro.l||(filtro.l==="BIO"&&c.dataset.l==="REG"))
        &&(!filtro.mov||c.dataset.mov===filtro.mov)
        &&(!filtro.nuevo||c.dataset.e)
        &&(!filtro.g||(filtro.g.indexOf("BIO:")===0?c.dataset.fg===filtro.g.slice(4):(" "+c.dataset.k+" ").indexOf(" "+filtro.g+" ")>-1))
        &&(!q||q.split(/\s+/).every(function(w){ return textoDe(c).indexOf(w)>-1; }));
      c.hidden=!ok; if(ok) n++;
    });
    $("#catN").textContent=n===cards.length?n+" referencias":n+" de "+cards.length+" referencias";
    $("#catEmpty").hidden=n>0;
    $$("#catLin .fchip").forEach(function(b){ b.setAttribute("aria-pressed",String(b.dataset.l===filtro.l)); });
  }
  $("#catLin").addEventListener("click",function(e){ var b=e.target.closest(".fchip"); if(!b) return; filtro.l=b.dataset.l; catPintar(); });
  $("#catGrp").addEventListener("change",function(){ filtro.g=this.value; catPintar(); });
  $("#catMov").addEventListener("change",function(){ filtro.mov=this.value; catPintar(); });
  $("#catNew").addEventListener("change",function(){ filtro.nuevo=this.checked; catPintar(); });
  $("#catClear").addEventListener("click",function(){ filtro={l:"",g:"",mov:"",nuevo:false,q:""}; $("#q").value=""; $("#catGrp").value=""; $("#catMov").value=""; $("#catNew").checked=false; catPintar(); });
  $("#q").addEventListener("input",function(){ filtro.q=this.value.trim(); if(actual!=="catalogo") navegar("catalogo"); catPintar(); });
  $("#q").addEventListener("keydown",function(e){ if(e.key==="Enter"){ var v=cards.filter(function(c){ return !c.hidden; }); if(v.length===1) abrirFicha(D.P[+v[0].dataset.i],v[0].firstElementChild); } });
  catPintar();

  /* ---------- recomendador ---------- */
  var rec={o:"mosca-blanca",u:$("#recU").value||"",e:""};
  function recPintar(usuario){
    var o=objOf(rec.o);
    $$("#recObj .obj").forEach(function(b){ b.setAttribute("aria-pressed",String(b.dataset.o===rec.o)); });
    $$("#recE .fchip").forEach(function(b){ b.setAttribute("aria-pressed",String(b.dataset.e===rec.e)); });
    $("#recU").value=rec.u;
    var ins=o&&o.l==="INS"; $("#recEstStep").hidden=!ins; $("#recE").hidden=!ins;
    $("#recOut").innerHTML=rRecomendar(rec);
    if(usuario) $("#recEj").hidden=true;
  }
  $("#recObj").addEventListener("click",function(e){ var b=e.target.closest(".obj"); if(!b) return; rec.o=b.dataset.o; if(objOf(rec.o).l!=="INS") rec.e=""; recPintar(true); if(window.innerWidth<900) $("#recOut").scrollIntoView({behavior:REDUCE?"auto":"smooth",block:"start"}); });
  $("#recU").addEventListener("change",function(){ rec.u=this.value; recPintar(true); });
  $("#recE").addEventListener("click",function(e){ var b=e.target.closest(".fchip"); if(!b) return; rec.e=b.dataset.e; recPintar(true); });
  recPintar(false);

  /* ---------- verificador ---------- */
  var ck={h:$$("#ckH .hchip").map(function(x){ return x.dataset.r; }),c:$("#ckC").value||""};
  function ckPintar(usuario){
    $("#ckH").innerHTML=ck.h.length?ck.h.map(function(r,i){ var x=resolve(r); return '<span class="hchip" data-r="'+r+'"><small>'+(i===0?"Última":"Antes")+"</small>"+esc(x.name)+' <button type="button" aria-label="Quitar '+esc(x.name)+'" data-q="'+i+'">×</button></span>'; }).join(""):'<span class="empty">Todavía no hay nada en el historial.</span>';
    $("#ckC").value=ck.c;
    $("#ckOut").innerHTML=rCruces(ck);
    $("#ckAddBtn").disabled=ck.h.length>=4;
    if(usuario) $("#ckEj").hidden=true;
  }
  function agregar(){ var v=$("#ckAdd").value; if(!v||ck.h.length>=4) return; ck.h.unshift(v); $("#ckAdd").value=""; ckPintar(true); }
  $("#ckAddBtn").addEventListener("click",agregar);
  $("#ckAdd").addEventListener("change",agregar);
  $("#ckC").addEventListener("change",function(){ ck.c=this.value; ckPintar(true); });
  $("#ckH").addEventListener("click",function(e){ var b=e.target.closest("button[data-q]"); if(!b) return; ck.h.splice(+b.dataset.q,1); ckPintar(true); });
  function pidx(m,f){ for(var i=0;i<D.P.length;i++) if(D.P[i].m===m && (!f||D.P[i].f.indexOf(f)===0)) return "p"+i; return ""; }
  function oidx(n){ for(var i=0;i<D.OUT.length;i++) if(D.OUT[i][0]===n) return "o"+i; return ""; }
  var PRUEBAS=[
    [["TIOXAM"],"RIDDER","TIOXAM → RIDDER"],[["o:Clorpirifos"],"METOMIL","Clorpirifos → METOMIL"],[["LAMBDOX"],"ESE O ESE","LAMBDOX → ESE O ESE"],
    [["TENAZ"],"BLINDAX","TENAZ → BLINDAX"],[["BENEVOLO","DURABO"],"TENAZ","BENEVOLO, DURABO → TENAZ"],[["o:Fosfito de potasio"],"PROTECSOL","Fosfito → PROTECSOL"],
    [["TRIASOL"],"ELMACHO","TRIASOL → ELMACHO"],[["o:Diurón"],"KANERO","Diurón → KANERO"]
  ];
  function ref(x){ return x.indexOf("o:")===0?oidx(x.slice(2)):pidx(x); }
  $("#ckTry").insertAdjacentHTML("beforeend",PRUEBAS.map(function(t,i){ return '<button type="button" data-t="'+i+'">'+esc(t[2])+"</button>"; }).join(""));
  $("#ckTry").addEventListener("click",function(e){ var b=e.target.closest("button"); if(!b) return; var t=PRUEBAS[+b.dataset.t]; ck.h=t[0].slice().reverse().map(ref); ck.c=ref(t[1]); ckPintar(true); });

  /* ---------- matriz ---------- */
  function mxTab(l){ $$(".mx-panel").forEach(function(p){ p.classList.toggle("on",p.dataset.l===l); }); $$("#mxTabs .fchip").forEach(function(b){ b.setAttribute("aria-selected",String(b.dataset.l===l)); }); }
  $("#mxTabs").addEventListener("click",function(e){ var b=e.target.closest(".fchip"); if(b) mxTab(b.dataset.l); });
  mxTab("INS");
  document.addEventListener("click",function(e){ var c=e.target.closest(".mx td[data-a]"); if(!c) return; ck.h=["p"+c.dataset.a]; ck.c="p"+c.dataset.b; ckPintar(true); $("#ckOut").scrollIntoView({behavior:REDUCE?"auto":"smooth",block:"start"}); });

  /* ---------- grupos: pestañas ---------- */
  var gtabs=$(".gtabs");
  function tab(s){
    $$(".gtab").forEach(function(b){ var on=b.dataset.t===s; b.setAttribute("aria-selected",String(on)); b.tabIndex=on?0:-1; });
    $$(".gpanel").forEach(function(p){ p.hidden=p.id!=="gp-"+s; });
  }
  gtabs.addEventListener("click",function(e){ var b=e.target.closest(".gtab"); if(b) tab(b.dataset.t); });
  gtabs.addEventListener("keydown",function(e){
    var ts=$$(".gtab"), i=ts.indexOf(document.activeElement); if(i<0) return;
    var j=e.key==="ArrowRight"?(i+1)%ts.length:e.key==="ArrowLeft"?(i-1+ts.length)%ts.length:e.key==="Home"?0:e.key==="End"?ts.length-1:-1;
    if(j<0) return; e.preventDefault(); tab(ts[j].dataset.t); ts[j].focus();
  });
  tab("IRAC");

  /* ---------- videos ---------- */
  $$(".vid").forEach(function(v){
    var b=$("[data-v=pausa]",v);
    if(b && REDUCE){ b.textContent="Reproducir"; b.setAttribute("aria-pressed","true"); }
  });
  document.addEventListener("click",function(e){
    var b=e.target.closest(".vid [data-v]"); if(!b) return;
    var v=b.closest(".vid");
    if(b.dataset.v==="pausa"){
      var parado=REDUCE?!v.classList.contains("playing"):v.classList.contains("paused");
      if(REDUCE) v.classList.toggle("playing",parado); else v.classList.toggle("paused",!parado);
      b.textContent=parado?"Pausar":"Reproducir"; b.setAttribute("aria-pressed",String(!parado));
    } else { var st=$(".vid-stage",v); st.innerHTML=st.innerHTML; }
  });
  if("IntersectionObserver" in window){
    var io=new IntersectionObserver(function(es){ es.forEach(function(en){ en.target.classList.toggle("lejos",!en.isIntersecting); }); });
    $$(".vid").forEach(function(v){ io.observe(v); });
  }

  /* ---------- simulador ---------- */
  var sim={seq:SIM_PRE.rep.slice()};
  function simPintar(){
    var gs=SIM_G.map(function(g){ return g.k; });
    $("#simSeq").innerHTML=rSimSeq(sim.seq);
    $("#simChart").innerHTML=rSimChart(sim.seq.map(function(i){ return SIM_P[i].g; }),gs,SIM_G.map(function(g){ return code(g.k); }));
    $("#simNote").innerHTML=rSimNota(sim.seq);
  }
  $("#simBtns").addEventListener("click",function(e){ var b=e.target.closest("button[data-s]"); if(!b) return; if(sim.seq.length>=10) sim.seq.shift(); sim.seq.push(+b.dataset.s); simPintar(); });
  $(".sim-pre").addEventListener("click",function(e){ var b=e.target.closest("button"); if(!b) return; sim.seq=b.dataset.pre?SIM_PRE[b.dataset.pre].slice():[]; simPintar(); });
  $("#simChart").addEventListener("pointermove",function(e){
    var h=e.target.closest(".hit"); var g=$(".sim-svg .hover",this);
    if(!h){ if(g) g.classList.remove("on"); tip(""); return; }
    var i=+h.dataset.i, svg=h.ownerSVGElement, x=+h.getAttribute("x")+ +h.getAttribute("width")/2;
    var ln=$(".cross",svg); ln.setAttribute("x1",x); ln.setAttribute("x2",x); g.classList.add("on");
    var serie=simular(sim.seq.map(function(j){ return SIM_P[j].g; }),SIM_G.map(function(q){ return q.k; }));
    if(i>sim.seq.length){ tip("Aplicación "+i+": sin aplicar todavía",e.clientX,e.clientY); return; }
    tip((i===0?"Antes de aplicar":"Aplicación "+i+" · "+SIM_P[sim.seq[i-1]].n)+" — "+SIM_G.map(function(q){ return code(q.k)+": "+(serie[q.k][i]*100).toFixed(1)+" %"; }).join(" · "),e.clientX,e.clientY);
  });
  $("#simChart").addEventListener("pointerleave",function(){ tip(""); var g=$(".sim-svg .hover",this); if(g) g.classList.remove("on"); });
  simPintar();

  /* ---------- tarjetas ---------- */
  var sabidas=store("cibo-tarjetas")||[], tema="";
  function flashPintar(){
    var vis=0, ok=0;
    $$(".flash").forEach(function(f){
      var n=+f.dataset.n, s=sabidas.indexOf(n)>-1, show=!tema||f.dataset.t===tema;
      f.hidden=!show; f.classList.toggle("sabida",s); var cb=$("input",f); if(cb) cb.checked=s;
      if(show){ vis++; if(s) ok++; }
    });
    $("#flashN").textContent=ok+" de "+vis+" marcadas como sabidas";
    $$("#flashF .fchip").forEach(function(b){ b.setAttribute("aria-pressed",String(b.dataset.t===tema)); });
  }
  $("#flashF").addEventListener("click",function(e){ var b=e.target.closest(".fchip"); if(!b) return; tema=b.dataset.t; flashPintar(); });
  document.addEventListener("change",function(e){
    var cb=e.target.closest(".fl-ok input"); if(!cb) return;
    var n=+cb.dataset.n, i=sabidas.indexOf(n); if(cb.checked&&i<0) sabidas.push(n); if(!cb.checked&&i>-1) sabidas.splice(i,1);
    store("cibo-tarjetas",sabidas); flashPintar();
  });
  flashPintar();

  /* ---------- quiz ---------- */
  var qz={m:"clave",qs:[],i:0,ok:0,resp:false};
  function barajar(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)), t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
  function protec(){ return D.P.filter(function(p){ return p.k.length; }); }
  function etiquetaGrupos(ks){ return ks.map(function(k){ return code(k)+" · "+D.GR[k].c; }).join(" + "); }
  function genGrupo(){
    var p=barajar(protec())[0], sys=sysOf(p.k[0]), ok=etiquetaGrupos(p.k);
    var otros=barajar(Object.keys(D.GR).filter(function(k){ return sysOf(k)===sys && p.k.indexOf(k)<0; })).slice(0,3).map(function(k){ return etiquetaGrupos([k]); });
    var o=barajar([ok].concat(otros));
    return {q:"¿A qué grupo pertenece "+p.nm+" ("+p.ia+")?",o:o,a:o.indexOf(ok),e:p.nm+" es "+ok+(p.k.length>1?": es una mezcla y gasta los dos grupos.":".")};
  }
  function genCruce(){
    var ps=protec(), a, b, r, t=0;
    do{ a=barajar(ps)[0]; var mismos=ps.filter(function(x){ return x.l===a.l && x!==a; }); b=barajar(mismos)[0]; r=relacion(a.k,b.k); t++; }while(t<30 && Math.random()<(r==="si"||r==="ms"?.5:0));
    var o=["Sí rota","No rota","Rota solo en parte"], ok={si:0,ms:0,no:1,parte:2}[r];
    var an=nonM(a.k), bn=nonM(b.k), sh=inter(bn,an);
    var e=r==="no"?b.nm+" trae "+bn.map(code).join(" + ")+", que ya estaba en "+a.nm+".":r==="parte"?b.nm+" repite "+sh.map(code).join(" + ")+" pero aporta "+bn.filter(function(k){ return sh.indexOf(k)<0; }).map(code).join(" + ")+".":r==="ms"?b.nm+" es multisitio: no selecciona resistencia.":a.nm+" es "+(an.length?an.map(code).join(" + "):"multisitio")+" y "+b.nm+" es "+bn.map(code).join(" + ")+": no comparten sitio.";
    return {q:"El lote viene de "+a.nm+". ¿"+b.nm+" es rotación?",o:o,a:ok,e:e};
  }
  function qzNuevo(m){
    qz.m=m; qz.i=0; qz.ok=0; qz.resp=false;
    qz.qs=m==="clave"?D.QUIZ.slice():Array.apply(null,Array(10)).map(m==="grupo"?genGrupo:genCruce);
    $$(".qz-modes .fchip").forEach(function(b){ b.setAttribute("aria-pressed",String(b.dataset.m===m)); });
    qzPintar();
  }
  function qzPintar(){
    var c=$("#qzCard"), n=qz.qs.length, best=(store("cibo-quiz")||{})[qz.m];
    if(qz.i>=n){
      var pct=Math.round(qz.ok/n*100), b=store("cibo-quiz")||{}; if(!b[qz.m]||pct>b[qz.m]){ b[qz.m]=pct; store("cibo-quiz",b); }
      c.innerHTML='<div class="qz-end"><b class="big">'+qz.ok+" / "+n+"</b><p>"+(pct>=80?"Muy bien: tienes los grupos claros.":pct>=50?"Vas bien. Repasa las tarjetas de los grupos donde fallaste.":"Repasa la sección de grupos y los mini-videos, y vuelve a intentarlo.")+'</p><div class="qz-nav"><button type="button" class="btn" data-qz="otra">Otra ronda</button></div></div>';
      return;
    }
    var q=qz.qs[qz.i];
    c.innerHTML='<div class="qz-top"><span>Pregunta <b>'+(qz.i+1)+"</b> de "+n+'</span><span class="qz-bar"><i style="width:'+(qz.i/n*100)+'%"></i></span><span>Aciertos <b>'+qz.ok+"</b></span>"+(best!=null?"<span>Tu mejor: <b>"+best+" %</b></span>":"")+"</div>"
      +'<p class="qz-q">'+esc(q.q)+'</p><div class="qz-o">'+q.o.map(function(o,i){ return '<button type="button" data-o="'+i+'"><i>'+"ABCD".charAt(i)+"</i>"+esc(o)+"</button>"; }).join("")+'</div><div id="qzE"></div>';
  }
  $("#qz").addEventListener("click",function(e){
    var m=e.target.closest(".qz-modes .fchip"); if(m){ qzNuevo(m.dataset.m); return; }
    var o=e.target.closest(".qz-o button"); if(o && !qz.resp){
      qz.resp=true; var q=qz.qs[qz.i], i=+o.dataset.o, bien=i===q.a; if(bien) qz.ok++;
      $$(".qz-o button").forEach(function(b){ b.disabled=true; if(+b.dataset.o===q.a) b.classList.add("ok"); else if(b===o) b.classList.add("bad"); });
      $("#qzE").innerHTML='<div class="qz-e" style="--vc:var('+(bien?"--ok":"--hot")+')"><b>'+(bien?"Correcto":"No es esa")+"</b><p>"+esc(q.e)+'</p></div><div class="qz-nav"><button type="button" class="btn" data-qz="sig">'+(qz.i+1<qz.qs.length?"Siguiente":"Ver resultado")+"</button></div>";
      $("[data-qz=sig]").focus();
      return;
    }
    var nx=e.target.closest("[data-qz]"); if(!nx) return;
    if(nx.dataset.qz==="sig"){ qz.i++; qz.resp=false; qzPintar(); $("#qzCard").scrollIntoView({block:"nearest"}); }
    else qzNuevo(qz.m);
  });
  qzNuevo("clave");

  /* ---------- glosario ---------- */
  $("#glQ").addEventListener("input",function(){ var q=this.value.trim().toLowerCase(); $$(".gl-i").forEach(function(g){ g.hidden=q && g.dataset.q.indexOf(q)<0; }); });

  irA(location.hash,false);
})();
