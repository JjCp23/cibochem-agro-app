/* =====================================================================
   Funciones compartidas entre la construcción y la página.
   Solo arman texto HTML a partir de D (los datos livianos de la página):
   no tocan el DOM, así que la construcción puede dejar el resultado ya
   escrito en el HTML y la página lo vuelve a generar al interactuar.
   ===================================================================== */

var MOV={
  contacto:{n:"Contacto",v:"--mov-contacto",d:"Se queda donde cayó la gota. Todo depende del cubrimiento."},
  translam:{n:"Translaminar",v:"--mov-translam",d:"Cruza la hoja del haz al envés, sin viajar a otras hojas."},
  xilema:{n:"Sistémico por xilema",v:"--mov-xilema",d:"Sube con el agua hacia la hoja nueva. Nunca baja a la raíz."},
  ambi:{n:"Xilema + floema",v:"--mov-ambi",d:"Se mueve en los dos sentidos y llega a raíz, rizoma y fruto."},
  raiz:{n:"Suelo / rizosfera",v:"--mov-raiz",d:"Actúa en el suelo o alrededor de la raíz. Necesita humedad."}
};
var LIN={INS:"Insecticida",HER:"Herbicida",FUN:"Fungicida",BIO:"Bioestimulante",REG:"Regulador"};
var SYSL={IRAC:"INS",FRAC:"FUN",HRAC:"HER"};
var EST={huevo:"Huevo",larva:"Larva o ninfa",pupa:"Pupa",adulto:"Adulto"};
var ALTO_FRAC=["FRAC:1","FRAC:7","FRAC:11"];

function esc(s){ return String(s==null?"":s).replace(/[&<>"]/g,function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }
function code(k){ return k.replace(":"," "); }
function sysOf(k){ return k.split(":")[0]; }
function isM(k){ return /^FRAC:M/.test(k); }
function nonM(ks){ return ks.filter(function(k){ return !isM(k); }); }
function grp(k){ return D.GR[k]||D.GX[k]; }
function uniq(a){ return a.filter(function(x,i){ return a.indexOf(x)===i; }); }
function gid(k){ return "g-"+k.replace(":","-"); }
var _gord=null;
function gord(){
  if(!_gord){ _gord=[]; ["IRAC","FRAC","HRAC"].forEach(function(s){ D.MOA[s].forEach(function(c){ _gord=_gord.concat(c.g); }); }); }
  return _gord;
}
function byG(a,b){ var o=gord(), x=o.indexOf(a), y=o.indexOf(b); return (x<0?999:x)-(y<0?999:y); }
function inter(a,b){ return a.filter(function(k){ return b.indexOf(k)>-1; }); }

/* Referencias: "p12" es el producto 12 del portafolio, "o5" la molécula 5 de otras casas. */
function resolve(r){
  if(!r) return null;
  var i=+r.slice(1);
  if(r.charAt(0)==="p"){ var p=D.P[i]; return p?{ref:r,name:p.nm,k:p.k,p:p}:null; }
  var o=D.OUT[i]; return o?{ref:r,name:o[0],fam:o[1],k:[o[2]],p:null}:null;
}
function lineOf(x){ return x.p?x.p.l:SYSL[sysOf(x.k[0])]; }

/* ---------- piezas pequeñas ---------- */
function pchip(p,cls){
  return '<a class="pchip'+(p.mol.length>1?" mix":"")+(cls?" "+cls:"")+'" href="#'+p.id+'" data-p="'+p.i+'">'+esc(p.nm)+"</a>";
}
function gchip(k){
  var g=grp(k);
  if(D.GR[k]) return '<a class="gchip" href="#'+gid(k)+'" data-g="'+k+'"><b>'+code(k)+"</b>"+esc(g.n)+"</a>";
  return '<span class="gchip"><b>'+code(k)+"</b>"+esc(g.n)+"</span>";
}
function codes(ks){ return ks.map(function(k){ return '<span class="gcode">'+code(k)+"</span>"; }).join(""); }
function klist(ks){ return ks.map(function(k){ return "<b>"+code(k)+"</b> ("+esc(grp(k).c)+")"; }).join(" y "); }
function sameTarget(a,b){
  for(var i=0;i<D.SAME.length;i++){
    var s=D.SAME[i];
    if((a.indexOf(s[0])>-1&&b.indexOf(s[1])>-1)||(a.indexOf(s[1])>-1&&b.indexOf(s[0])>-1)) return s[2];
  }
  return "";
}
function movTag(p){ var m=MOV[p.mov]; return '<span class="mov" style="--mc:var('+m.v+')"><i></i>'+m.n+"</span>"; }
function stagesOf(p){
  var s=[]; p.k.forEach(function(k){ var g=D.GR[k]; if(g&&g.est) g.est.forEach(function(e){ if(s.indexOf(e)<0) s.push(e); }); });
  return ["huevo","larva","pupa","adulto"].filter(function(e){ return s.indexOf(e)>-1; });
}

/* ---------- relación entre lo aplicado (A) y lo que se piensa aplicar (B) ---------- */
function relacion(aK,bK){
  var sa=uniq(aK.map(sysOf)), sb=uniq(bK.map(sysOf));
  if(!inter(sa,sb).length) return "otra";
  var an=nonM(aK), bn=nonM(bK), sh=inter(bn,an);
  if(!bn.length) return "ms";
  if(!sh.length) return "si";
  return sh.length===bn.length?"no":"parte";
}

/* ---------- verificador con historial ----------
   st.h: lo aplicado, del más reciente al más antiguo · st.c: lo que se piensa aplicar */
function rTimeline(H,C){
  var items=H.slice().reverse(), h='<ol class="tl">';
  items.forEach(function(x,i){
    var last=i===items.length-1;
    h+='<li class="tl-it'+(last?" last":"")+'"><span class="tl-n">'+(last?"Última":"Antes")+"</span>"
      +'<b>'+esc(x.name)+"</b>"+'<span class="tl-k">'+codes(x.k)+"</span></li>";
  });
  if(C){
    var r=H.length?relacion(H[0].k,C.k):"si";
    h+='<li class="tl-it cand r-'+r+'"><span class="tl-n">Lo que piensas aplicar</span><b>'+esc(C.name)+"</b>"
      +'<span class="tl-k">'+codes(C.k)+"</span></li>";
  }
  return h+"</ol>";
}
function rVeredicto(H,C){
  var A=H[0], B=C, t, c, msg, extra="";
  var an=nonM(A.k), bn=nonM(B.k), sh=inter(bn,an), r=relacion(A.k,B.k);
  var a="<b>"+esc(A.name)+"</b>", b="<b>"+esc(B.name)+"</b>";
  if(A.ref===B.ref){ t="Es el mismo producto"; c="--hot"; msg="Repetirlo es repetir exactamente el mismo sitio de acción sobre la misma población."; }
  else if(r==="otra"){ t="No se comparan"; c="--ink-3";
    msg=a+" y "+b+" son de líneas distintas. Entre un insecticida, un fungicida y un herbicida no hay resistencia cruzada; lo que sí hay que revisar es la compatibilidad en el tanque."; }
  else if(r==="ms"){ t="Sí rota · multisitio"; c="--ok";
    msg=b+" es multisitio: no selecciona resistencia y puede ir después de cualquier cosa. Lo ideal es que vaya acompañando al sistémico."; }
  else if(r==="si"){ t="Sí rota"; c="--ok";
    msg=b+" trae "+klist(bn)+"; "+a+" traía "+(an.length?klist(an):"solo multisitio")+". No comparten sitio de acción.";
    var st=sameTarget(an,bn);
    if(st) extra+='<p class="soft">Comparten blanco ('+st+") pero no el sitio de unión: el comité los numera aparte y la resistencia de uno no pasa al otro. Si el lote tiene historia larga con uno de los dos, vigila la resistencia metabólica.</p>"; }
  else if(r==="no"){ t="No rota"; c="--hot";
    msg="Todo lo que trae "+b+" ya estaba en "+a+": "+klist(sh)+". Para la plaga es la misma presión de selección con otra etiqueta.";
    if(A.p&&B.p&&A.p.mol.slice().sort().join()===B.p.mol.slice().sort().join()) extra+='<p class="soft">Además tienen la misma composición: es una marca gemela o la misma molécula en otra presentación.</p>'; }
  else { t="Rota solo en parte"; c="--warn";
    msg=b+" aporta "+klist(bn.filter(function(k){ return sh.indexOf(k)<0; }))+", pero repite "+klist(sh)+". Si la plaga solo la controla la parte repetida, no es rotación."; }
  /* repeticiones con aplicaciones anteriores del ciclo */
  if(H.length>1 && (r==="si"||r==="ms")){
    var antes=[]; H.slice(1).forEach(function(x){ antes=antes.concat(nonM(x.k)); });
    var rep=uniq(inter(bn,antes));
    if(rep.length){ c="--warn"; t="Rota con la última, pero repite el ciclo";
      extra+='<p class="soft">'+klist(rep)+" ya se usó antes en este ciclo. "+(lineOf(B)==="INS"?"Si fue en la generación anterior de la plaga, está bien; si fue en la misma, no.":"Revisa cuántas veces va ese grupo en el ciclo.")+"</p>"; }
  }
  /* conteo de grupos de riesgo alto en fungicidas */
  if(lineOf(B)==="FUN"){
    var todas=[]; H.concat([B]).forEach(function(x){ todas=todas.concat(uniq(nonM(x.k))); });
    bn.forEach(function(k){
      if(ALTO_FRAC.indexOf(k)<0 && k!=="FRAC:3") return;
      var n=todas.filter(function(x){ return x===k; }).length;
      if(n>=2) extra+='<p class="soft">Con esta serían <b>'+n+" aplicaciones de "+code(k)+"</b> en el ciclo. "+(n>=3?"Es el máximo razonable para un grupo de riesgo "+esc(D.GR[k].r)+".":"Acompaña con MANCONEX o CLOROPAZ.")+"</p>";
    });
  }
  return '<div class="verdict" style="--vc:var('+c+')"><div class="vt">'+t+"</div><p>"+msg+"</p>"+extra+"</div>";
}
function rCruces(st){
  var H=(st.h||[]).map(resolve).filter(Boolean), C=resolve(st.c);
  if(!H.length) return '<p class="empty">Agrega arriba lo último que se aplicó. Si es un producto de otra casa, búscalo por su molécula al final de la lista.</p>';
  var A=H[0], h=rTimeline(H,C);
  h+='<div class="eq"><span>'+esc(A.name)+(A.fam?" ("+esc(A.fam)+")":"")+" equivale a</span>"+A.k.map(gchip).join("<span>+</span>")+"</div>";
  if(C) h+=rVeredicto(H,C);
  var sys=uniq(A.k.map(sysOf)), an=nonM(A.k), antes=[];
  H.slice(1).forEach(function(x){ antes=antes.concat(nonM(x.k)); });
  var no={}, noK=[], ya={}, yaK=[], si={}, siK=[], nNo=0, nYa=0, nSi=0;
  D.P.forEach(function(p){
    if((A.p&&p.i===A.p.i) || !p.k.length || !p.k.some(function(k){ return sys.indexOf(sysOf(k))>-1; })) return;
    var sh=inter(p.k,an);
    if(sh.length){ nNo++; sh.forEach(function(k){ if(!no[k]){ no[k]=[]; noK.push(k); } no[k].push(p); }); return; }
    var sg=p.k.join("+"), rep=inter(nonM(p.k),antes).length>0;
    if(rep){ nYa++; if(!ya[sg]){ ya[sg]=[]; yaK.push(sg); } ya[sg].push(p); }
    else { nSi++; if(!si[sg]){ si[sg]=[]; siK.push(sg); } si[sg].push(p); }
  });
  function sortSig(x,y){ var a=x.split("+"), b=y.split("+"); return byG(a[0],b[0])||a.length-b.length||byG(a[1]||"",b[1]||""); }
  noK.sort(byG); yaK.sort(sortSig); siK.sort(sortSig);
  function bloque(sg,lst){ return '<div class="ck-grp"><div class="gl">'+sg.split("+").map(function(k){ return code(k)+" · "+esc(D.GR[k].n); }).join(" + ")+'</div><div class="chips">'+lst.map(function(p){ return pchip(p); }).join("")+"</div></div>"; }
  h+='<div class="ck-cols">';
  h+='<div class="ck-col" style="--vc:var(--hot)"><h4><span class="sym">✕</span> No rotan · repiten lo último <span class="n">'+nNo+"</span></h4>"
    +(noK.length?noK.map(function(k){ return bloque(k,no[k]); }).join(""):'<p class="empty">'+(an.length?"Ninguna referencia del portafolio repite su sitio de acción.":"Es multisitio: no bloquea nada.")+"</p>")+"</div>";
  if(H.length>1) h+='<div class="ck-col" style="--vc:var(--warn)"><h4><span class="sym">◐</span> Rotan, pero el grupo ya se usó en el ciclo <span class="n">'+nYa+"</span></h4>"
    +(yaK.length?yaK.map(function(s){ return bloque(s,ya[s]); }).join(""):'<p class="empty">Ninguno.</p>')+"</div>";
  h+='<div class="ck-col" style="--vc:var(--ok)"><h4><span class="sym">✓</span> Sí rotan · grupo nuevo <span class="n">'+nSi+"</span></h4>"
    +siK.map(function(s){ return bloque(s,si[s]); }).join("")+"</div>";
  h+='</div><p class="note-s">El verificador solo mira el sitio de acción. Antes de recomendar, confirma en la ficha que el producto que rota también controla la plaga, la enfermedad o la maleza que tienes.</p>';
  return h;
}

/* ---------- recomendador por objetivo ----------
   st.o: id del objetivo · st.u: lo último aplicado (referencia) · st.e: estadio (solo insectos) */
function objOf(id){ for(var i=0;i<D.OBJ.length;i++) if(D.OBJ[i].id===id) return D.OBJ[i]; return null; }
/* Programa de ejemplo: tres pasos que cambian de número de grupo.
   Reglas, en orden: no repetir el grupo del paso anterior (obligatorio); no usar
   productos de rescate; preferir un producto que no esté ya en el programa, un
   grupo que no se haya usado, otra molécula distinta de lo último aplicado, un
   producto de un solo grupo y, al final, el orden de prioridad del objetivo. */
var RESCATE=["METOMIL","CYPER West"];
function programa(o,U){
  var lastK=U?nonM(U.k):[], lastMol=U&&U.p?U.p.mol:[], lastI=U&&U.p?U.p.i:-1;
  var cands=o.p.map(function(i){ return D.P[i]; }).filter(function(p){ return nonM(p.k).length && RESCATE.indexOf(p.m)<0; });
  var seq=[], usados=lastK.slice(), mols=lastMol.slice(), prev=lastK, repite=[];
  function clave(p,orden){
    return [seq.indexOf(p)>-1?1:0, inter(nonM(p.k),usados).length?1:0, inter(p.mol,mols).length?1:0, p.i===lastI?1:0, nonM(p.k).length, orden];
  }
  for(var s=0;s<3;s++){
    var mejor=null, mk=null;
    cands.forEach(function(p,orden){
      if(inter(nonM(p.k),prev).length) return;
      var k=clave(p,orden);
      for(var x=0;x<k.length;x++){ if(!mk || k[x]<mk[x]){ mejor=p; mk=k; return; } if(k[x]>mk[x]) return; }
    });
    if(!mejor) break;
    if(inter(nonM(mejor.k),usados).length) repite.push(s+1);
    seq.push(mejor); usados=usados.concat(nonM(mejor.k)); mols=mols.concat(mejor.mol); prev=nonM(mejor.k);
  }
  var ms=o.p.map(function(i){ return D.P[i]; }).filter(function(p){ return p.k.length && !nonM(p.k).length; })[0]||null;
  return {seq:seq,ms:ms,repite:repite};
}
function rPrograma(o,U){
  var pr=programa(o,U), l=o.l, lastK=U?nonM(U.k):[];
  var paso={INS:"Una ventana por generación de la plaga, de unos 30 días.",FUN:"A lo largo del ciclo, siempre sobre una base de multisitio.",HER:"En aplicaciones o temporadas sucesivas sobre el mismo lote."}[l];
  if(!pr.seq.length) return '<div class="prog"><p class="empty">Las opciones del portafolio para este objetivo repiten el grupo que se aplicó la última vez. Toca salir a otro grupo registrado para el cultivo.</p></div>';
  var h='<div class="prog"><div class="prog-h"><h4>Programa de ejemplo</h4><span>'+paso+'</span></div><ol class="prog-l">';
  pr.seq.forEach(function(p,i){
    var acomp=(l==="FUN" && pr.ms && nonM(p.k).some(function(k){ return ALTO_FRAC.indexOf(k)>-1||k==="FRAC:3"; }))?'<span class="prog-ms">+ '+esc(pr.ms.nm)+" de base</span>":"";
    h+='<li><span class="prog-n">'+(i+1)+'</span><a class="prog-p" href="#'+p.id+'" data-p="'+p.i+'"><b>'+esc(p.nm)+"</b><span>"+codes(nonM(p.k))+"</span>"+acomp+"</a></li>";
  });
  h+="</ol>";
  if(pr.seq.length===1) h+='<p class="note-s">El portafolio tiene un solo grupo útil para este objetivo. Altérnalo con manejo cultural o con otro grupo registrado para el cultivo.</p>';
  else {
    h+='<p class="note-s">Cada paso cambia de número de grupo'+(lastK.length?" y el primero no repite lo último aplicado":"")+". Ajusta a la etiqueta ICA, al cultivo y al umbral.";
    if(pr.repite.length) h+=" El portafolio tiene pocos grupos para este objetivo: el paso "+pr.repite.join(" y ")+" vuelve a un grupo ya usado, por eso tiene que caer en otra generación o ventana.";
    h+="</p>";
  }
  return h+"</div>";
}
function rRecomendar(st){
  var o=objOf(st.o);
  if(!o) return '<p class="empty">Escoge arriba qué tienes en campo.</p>';
  var U=resolve(st.u), lastK=U?nonM(U.k):[], est=o.l==="INS"?st.e:"";
  var h='<div class="obj-h"><svg class="ic big" aria-hidden="true"><use href="#i-'+o.ic+'"></use></svg><div><h3>'+esc(o.n)+"</h3><p>"+esc(o.ej)+"</p></div></div>";
  h+='<div class="tipbox"><b>Clave de campo</b><p>'+esc(o.tip)+"</p></div>";
  h+=rPrograma(o,U);
  var grupos={}, orden=[];
  o.p.forEach(function(i){ var p=D.P[i], sg=p.k.join("+"); if(!grupos[sg]){ grupos[sg]=[]; orden.push(sg); } grupos[sg].push(p); });
  function estado(p){ return lastK.length && inter(nonM(p.k),lastK).length ? (inter(nonM(p.k),lastK).length===nonM(p.k).length?"no":"parte") : "si"; }
  orden.sort(function(x,y){
    var px=grupos[x][0], py=grupos[y][0], ex=estado(px), ey=estado(py), w={si:0,parte:1,no:2};
    return (w[ex]-w[ey]) || x.split("+").length-y.split("+").length || byG(x.split("+")[0],y.split("+")[0]);
  });
  h+='<h4 class="rec-t">'+o.p.length+" opciones del portafolio, por grupo químico</h4>";
  orden.forEach(function(sg){
    var ks=sg.split("+"), first=grupos[sg][0], e=estado(first);
    var tag=e==="no"?'<span class="tag no">✕ Repite lo último</span>':e==="parte"?'<span class="tag parte">◐ Repite en parte</span>':(lastK.length?'<span class="tag si">✓ Rota</span>':"");
    h+='<section class="rec-g r-'+e+'"><header>'+ks.map(function(k){ return gchip(k); }).join("")+tag+"</header>";
    grupos[sg].forEach(function(p){
      var sts=stagesOf(p), fuera=est && sts.length && sts.indexOf(est)<0;
      h+='<a class="rec-p'+(fuera?" fuera":"")+'" href="#'+p.id+'" data-p="'+p.i+'"><span class="rp-n"><b>'+esc(p.nm)+"</b> <i>"+esc(p.f)+"</i></span>"
        +'<span class="rp-ia">'+esc(p.ia)+"</span>"
        +'<span class="rp-m">'+movTag(p)+(sts.length?'<span class="est">'+sts.map(function(s){ return '<i class="'+(s===est?"on":"")+'">'+EST[s]+"</i>"; }).join("")+"</span>":"")
        +(fuera?'<span class="tag fuera">No alcanza ese estadio</span>':"")+"</span></a>";
    });
    h+="</section>";
  });
  return h;
}

/* ---------- simulador didáctico de resistencia ----------
   Frecuencia de individuos resistentes a cada grupo, aplicación tras aplicación.
   Aplicar un grupo deja vivo al 40 % de los sensibles y a todos los resistentes;
   cada aplicación en que no se usa le cuesta al resistente un 15 % de su ventaja.
   Es un modelo didáctico: muestra la lógica, no predice un lote. */
var SIM_G=[{k:"IRAC:6",n:"avermectinas"},{k:"IRAC:28",n:"diamidas"},{k:"IRAC:22",n:"oxadiazinas"}];
var SIM_P=[{n:"MULTA",g:["IRAC:6"],s:1,et:"IRAC 6"},{n:"MULTA PRO",g:["IRAC:6"],s:1,et:"IRAC 6 + 4"},{n:"ACELEREX",g:["IRAC:28"],s:2,et:"IRAC 28"},{n:"ESE O ESE",g:["IRAC:22"],s:3,et:"IRAC 22"}];
var SIM_PRE={rep:[0,0,0,0,0,0,0,0],rot:[0,2,3,0,2,3,0,2],mal:[0,1,0,1,0,1,0,1]};
function simular(seq,gs){
  var p={}, serie={};
  gs.forEach(function(g){ p[g]=0.005; serie[g]=[0.005]; });
  seq.forEach(function(ap){
    gs.forEach(function(h){
      var x=p[h];
      p[h]= ap.indexOf(h)>-1 ? x/(x+(1-x)*0.4) : x*0.85/(x*0.85+(1-x));
      serie[h].push(p[h]);
    });
  });
  return serie;
}
function rSimChart(seq,gs,names){
  var serie=simular(seq,gs), n=Math.max(8,seq.length);
  var W=640, H=300, L=46, R=104, T=16, B=40, w=W-L-R, hh=H-T-B;
  function X(i){ return L+w*i/n; } function Y(v){ return T+hh*(1-v); }
  var s='<svg class="sim-svg" viewBox="0 0 '+W+" "+H+'" role="img" aria-label="Porcentaje de la población resistente a cada grupo después de cada aplicación">';
  [0,.25,.5,.75,1].forEach(function(v){
    s+='<line class="grid" x1="'+L+'" x2="'+(L+w)+'" y1="'+Y(v)+'" y2="'+Y(v)+'"></line><text class="ax" x="'+(L-8)+'" y="'+(Y(v)+4)+'" text-anchor="end">'+Math.round(v*100)+" %</text>";
  });
  for(var i=0;i<=n;i++) s+='<text class="ax" x="'+X(i)+'" y="'+(H-B+18)+'" text-anchor="middle">'+i+"</text>";
  s+='<text class="ax t" x="'+(L+w/2)+'" y="'+(H-4)+'" text-anchor="middle">Aplicación número</text>';
  s+='<line class="umbral" x1="'+L+'" x2="'+(L+w)+'" y1="'+Y(.5)+'" y2="'+Y(.5)+'"></line><text class="umbral-t" x="'+(L+6)+'" y="'+(Y(.5)-6)+'">Desde aquí el grupo falla en campo</text>';
  for(i=0;i<seq.length;i++){ var j=gs.indexOf(seq[i][0]); s+='<rect class="ap" x="'+(X(i+1)-5)+'" y="'+(T+hh+3)+'" width="10" height="5" rx="1.5" style="fill:var(--s'+(j+1)+')"></rect>'; }
  var ends=[];
  gs.forEach(function(g,j){
    var pts=serie[g].map(function(v,i){ return X(i).toFixed(1)+","+Y(v).toFixed(1); }).join(" ");
    s+='<polyline class="ln" points="'+pts+'" style="stroke:var(--s'+(j+1)+')"></polyline>';
    var last=serie[g].length-1, v=serie[g][last];
    s+='<circle class="pt" cx="'+X(last).toFixed(1)+'" cy="'+Y(v).toFixed(1)+'" r="4.5" style="fill:var(--s'+(j+1)+')"></circle>';
    ends.push({y:Y(v),t:names[j]+" · "+Math.round(v*100)+" %",x:X(last)});
  });
  ends.sort(function(a,b){ return a.y-b.y; });
  for(i=1;i<ends.length;i++) if(ends[i].y-ends[i-1].y<15) ends[i].y=ends[i-1].y+15;
  ends.forEach(function(e){ s+='<text class="lbl" x="'+(e.x+9).toFixed(1)+'" y="'+(e.y+4).toFixed(1)+'">'+esc(e.t)+"</text>"; });
  s+='<g class="hover" aria-hidden="true"><line class="cross" x1="0" x2="0" y1="'+T+'" y2="'+(T+hh)+'"></line></g>';
  for(i=0;i<=n;i++) s+='<rect class="hit" x="'+(X(i)-w/n/2).toFixed(1)+'" y="'+T+'" width="'+(w/n).toFixed(1)+'" height="'+hh+'" data-i="'+i+'" fill="transparent"></rect>';
  return s+"</svg>";
}
function rSimBtns(){
  return SIM_P.map(function(p,i){ return '<button type="button" data-s="'+i+'" style="--sc:var(--s'+p.s+')">+ '+esc(p.n)+" <small>"+p.et+"</small></button>"; }).join("");
}
function rSimSeq(seq){
  if(!seq.length) return "Toca un producto para agregar la primera aplicación.";
  return "Secuencia: "+seq.map(function(i,j){ return '<b style="--sc:var(--s'+SIM_P[i].s+')" title="'+esc(SIM_P[i].n)+'">'+(j+1)+" · "+esc(SIM_P[i].n)+"</b>"; }).join("");
}
function rSimLeg(){
  return SIM_G.map(function(g,j){ return '<span><i style="--rc:var(--s'+(j+1)+')"></i>'+code(g.k)+" · "+g.n+"</span>"; }).join("")+'<span class="soft">Cada punto: parte de la población que ya resiste a ese grupo.</span>';
}
function rSimNota(seq){
  if(!seq.length) return "Sin aplicaciones todavía.";
  var gs=SIM_G.map(function(g){ return g.k; }), serie=simular(seq.map(function(i){ return SIM_P[i].g; }),gs);
  var peor=gs.slice().sort(function(a,b){ return serie[b][seq.length]-serie[a][seq.length]; })[0], v=serie[peor][seq.length];
  var cruce=-1; serie[peor].forEach(function(x,i){ if(cruce<0 && x>=.5) cruce=i; });
  var nombres=uniq(seq.map(function(i){ return SIM_P[i].n; }));
  var t="Después de "+seq.length+" aplicaciones, el "+Math.round(v*100)+" % de la población resiste a "+code(peor)+" ("+esc(SIM_G[gs.indexOf(peor)].n)+").";
  if(cruce>0) t+=" Ese grupo empezó a fallar en la aplicación "+cruce+".";
  else t+=" Ningún grupo llega al punto de falla.";
  if(nombres.length>1 && uniq(seq.map(function(i){ return SIM_P[i].g.join(); })).length===1) t+=" Ojo: se usaron "+nombres.length+" marcas distintas, pero todas son "+code(peor)+". Para la plaga no hubo rotación.";
  return t;
}
