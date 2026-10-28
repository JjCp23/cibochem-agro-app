/* =====================================================================
   Generadores que solo corren al construir. Usan los datos completos
   (P, GR, FG, OBJ…) y dejan el HTML escrito en la página, de modo que
   todo se lee aunque el navegador no ejecute JavaScript.
   ===================================================================== */

var RISKV={alto:"--hot",medio:"--warn",bajo:"--ok"};
var SYSN={IRAC:"Insecticidas",FRAC:"Fungicidas",HRAC:"Herbicidas"};

function prodsDe(k){ return D.P.filter(function(p){ return p.k.indexOf(k)>-1; }); }
function objetivosDe(p){ return D.OBJ.filter(function(o){ return o.p.indexOf(p.i)>-1; }); }

/* ---------- catálogo ---------- */
function rCard(p){
  var f=P[p.i], m=MOV[p.mov];
  var est=p.e?'<span class="state '+p.e+'">'+(p.e==="nuevo"?"Nuevo":"Pronto")+"</span>":"";
  var buscar=[p.m,p.f,f.ia,f.g,f.q,f.bl,f.cu,f.acc,MOV[p.mov].n].concat(p.k.map(function(k){ return code(k)+" "+GR[k].n+" "+GR[k].c+" "+GR[k].sub; }))
    .concat(p.fg?[FG.filter(function(x){ return x.id===p.fg; })[0].n]:[]).concat(objetivosDe(p).map(function(o){ return o.n+" "+o.ej; })).join(" ");
  buscar=buscar.replace(/<[^>]+>/g," ").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\s+/g," ");
  return '<details class="pc" id="'+p.id+'" data-i="'+p.i+'" data-s="'+esc(buscar)+'" data-l="'+p.l+'" data-mov="'+p.mov+'" data-k="'+p.k.join(" ")+'" data-e="'+(p.e||"")+'"'+(p.fg?' data-fg="'+p.fg+'"':"")+">"
    +'<summary style="--mc:var('+m.v+')">'
    +'<span class="pc-h"><span class="pc-n"><b>'+esc(p.m)+"</b><i>"+esc(p.f)+"</i></span>"+est+"</span>"
    +'<span class="pc-ia">'+esc(p.ia)+"</span>"
    +'<span class="pc-q">'+esc(f.q)+"</span>"
    +'<span class="pc-f">'+(p.k.length?codes(p.k):'<span class="gcode soft">'+(p.l==="REG"?"Regulador":"Bioestimulante")+"</span>")+movTag(p)+"</span>"
    +"</summary>"+rFicha(p)+"</details>";
}
function rFicha(p){
  var f=P[p.i], m=MOV[p.mov], h='<div class="ficha">';
  h+='<p class="f-ia">'+esc(f.ia)+"</p>";
  h+='<div class="f-chips"><span><small>Grupo de resistencia</small><b>'+esc(f.g)+"</b></span>"
    +"<span><small>Familia química</small><b>"+esc(f.q)+"</b></span>"
    +"<span><small>Tipo de acción</small><b>"+esc(f.acc)+"</b></span></div>";
  h+='<div class="f-mov" style="--mc:var('+m.v+')"><svg class="rt" aria-hidden="true"><use href="#r-'+p.mov+'"></use></svg><div><small>Cómo se mueve en la planta</small><b>'+m.n+"</b><p>"+m.d+"</p></div></div>";
  h+='<div class="f-sec"><h5>Qué hace por dentro</h5><p>'+f.moa+"</p></div>";
  h+='<div class="f-sec hi" style="--mc:var('+m.v+')"><h5>Qué ves en campo</h5><p>'+f.campo+"</p></div>";
  var sts=stagesOf(p);
  if(sts.length){
    var vel=p.k.filter(function(k){ return D.GR[k].vel; }).map(function(k){ return (p.k.length>1?code(k)+": ":"")+D.GR[k].vel; });
    h+='<div class="f-sec"><h5>Qué estadio alcanza</h5><div class="est big">'
      +["huevo","larva","pupa","adulto"].map(function(e){ return '<i class="'+(sts.indexOf(e)>-1?"on":"")+'">'+EST[e]+"</i>"; }).join("")
      +"</div>"+(vel.length?'<p class="soft">Velocidad: '+esc(vel.join(" · "))+"</p>":"")+"</div>";
  }
  if(f.bl && f.bl!=="—") h+='<div class="f-sec"><h5>Blancos típicos</h5><p>'+f.bl+"</p></div>";
  var objs=objetivosDe(p);
  if(objs.length) h+='<div class="f-sec"><h5>Aparece en el recomendador para</h5><div class="chips">'+objs.map(function(o){ return '<a class="ochip" href="#recomendar" data-o="'+o.id+'"><svg class="ic" aria-hidden="true"><use href="#i-'+o.ic+'"></use></svg>'+esc(o.n)+"</a>"; }).join("")+"</div></div>";
  h+='<div class="f-sec"><h5>Cultivos y posicionamiento</h5><p>'+f.cu+"</p></div>";
  h+=rFichaGrupo(p);
  h+='<div class="f-sec warn"><h5>Ojo con esto</h5><p>'+f.tip+"</p></div>";
  h+='<div class="f-sec"><h5>Presentaciones</h5><div class="pres">'+f.pr.map(function(x){ return "<span>"+esc(x)+"</span>"; }).join("")+"</div></div>";
  h+='<div class="f-sec"><h5>Como lo dice el portafolio</h5><p class="quote">&ldquo;'+esc(f.pdf)+"&rdquo;</p></div>";
  if(p.k.length && nonM(p.k).length) h+='<div class="f-act js-only"><button type="button" class="btn" data-act="cruce" data-p="'+p.i+'">Ver qué rota después de este</button></div>';
  return h+"</div>";
}
function rFichaGrupo(p){
  var h='<div class="f-sec"><h5>Grupo químico y cruces</h5>';
  if(!p.k.length){
    var fg=FG.filter(function(x){ return x.id===p.fg; })[0], sib=D.P.filter(function(x){ return x!==p && x.fg===p.fg; });
    h+='<a class="glink" href="#f-'+fg.id+'" data-g="BIO:'+fg.id+'"><span class="gn">'+esc(fg.n)+'</span><span class="gm">ver grupo →</span></a>';
    if(sib.length) h+='<div class="xrow"><span class="xl">Mismo grupo funcional</span><div class="chips">'+sib.map(function(x){ return pchip(x); }).join("")+"</div></div>";
    return h+'<p class="soft">'+fg.cruce+"</p></div>";
  }
  p.k.forEach(function(k){ h+='<a class="glink" href="#'+gid(k)+'" data-g="'+k+'"><span class="gcode">'+code(k)+'</span><span class="gn">'+esc(GR[k].n)+'</span><span class="gm">ver grupo →</span></a>'; });
  var nm=nonM(p.k);
  if(!nm.length) return h+'<div class="xrow"><span class="xl si">Multisitio</span><p class="soft">No selecciona resistencia, así que no se cruza con nada. Su lugar es acompañar a los sistémicos de riesgo alto, no reemplazarlos.</p></div></div>';
  h+='<div class="xrow"><span class="xl no">✕ Se cruza con · no es rotación</span>';
  nm.forEach(function(k){
    var o=prodsDe(k).filter(function(x){ return x!==p; });
    if(nm.length>1) h+='<div class="xsub">'+code(k)+" · "+esc(GR[k].c)+(o.length?"":" · pieza única en el portafolio")+"</div>";
    if(o.length) h+='<div class="chips">'+o.map(function(x){ return pchip(x); }).join("")+"</div>";
    else if(nm.length===1) h+='<p class="soft">Ninguna otra referencia del portafolio comparte su sitio de acción: es pieza única. Cuídala.</p>';
  });
  h+="</div>";
  var libres=[]; D.MOA[sysOf(p.k[0])].forEach(function(c){ c.g.forEach(function(k){ if(p.k.indexOf(k)<0) libres.push(k); }); });
  h+='<div class="xrow"><span class="xl si">✓ Para rotar, salta a</span><div class="chips">'+libres.map(gchip).join("")+"</div></div>";
  nm.forEach(function(k){
    h+='<div class="use">'+(nm.length>1?'<div class="xsub">'+code(k)+"</div>":"")
      +'<p class="yes"><b>Recomiéndalo cuando</b> '+GR[k].si+'</p><p class="no"><b>No lo recomiendes cuando</b> '+GR[k].no+"</p></div>";
  });
  return h+"</div>";
}
function rCatalogo(){ return D.P.map(rCard).join(""); }
function rFiltroGrupos(){
  var h='<option value="">Todos los grupos</option>';
  ["IRAC","FRAC","HRAC"].forEach(function(s){
    h+='<optgroup label="'+SYSN[s]+" · "+s+'">';
    D.MOA[s].forEach(function(c){ c.g.forEach(function(k){ h+='<option value="'+k+'">'+code(k)+" · "+esc(GR[k].n)+"</option>"; }); });
    h+="</optgroup>";
  });
  h+='<optgroup label="Bioestimulantes y reguladores">'+FG.map(function(f){ return '<option value="BIO:'+f.id+'">'+esc(f.n)+"</option>"; }).join("")+"</optgroup>";
  return h;
}

/* ---------- opciones de los selectores ---------- */
function rOpcionesP(sel,lineas){
  var h="";
  [["INS","Insecticidas"],["FUN","Fungicidas"],["HER","Herbicidas"]].forEach(function(l){
    if(lineas && lineas.indexOf(l[0])<0) return;
    h+='<optgroup label="Cibochem · '+l[1]+'">';
    D.P.forEach(function(p){ if(p.l===l[0]) h+='<option value="p'+p.i+'"'+(sel==="p"+p.i?" selected":"")+">"+esc(p.nm+(p.nm===p.m?" "+p.f:""))+"</option>"; });
    h+="</optgroup>";
  });
  return h;
}
function rOpcionesO(sel){
  var h="";
  ["IRAC","FRAC","HRAC"].forEach(function(s){
    h+='<optgroup label="Otras casas · '+SYSN[s].toLowerCase()+'">';
    D.OUT.forEach(function(o,i){ if(sysOf(o[2])===s) h+='<option value="o'+i+'"'+(sel==="o"+i?" selected":"")+">"+esc(o[0]+" ("+o[1]+")")+"</option>"; });
    h+="</optgroup>";
  });
  return h;
}

/* ---------- recomendador: botones de objetivos ---------- */
function rObjetivos(sel){
  var h="";
  [["INS","Insectos y ácaros"],["FUN","Enfermedades"],["HER","Malezas"]].forEach(function(l){
    h+='<div class="obj-grp" data-l="'+l[0]+'"><h4>'+l[1]+'</h4><div class="obj-list">';
    D.OBJ.forEach(function(o){
      if(o.l!==l[0]) return;
      h+='<button type="button" class="obj" data-o="'+o.id+'" aria-pressed="'+(o.id===sel)+'"><svg class="ic" aria-hidden="true"><use href="#i-'+o.ic+'"></use></svg><span><b>'+esc(o.n)+"</b><i>"+o.p.length+" opciones</i></span></button>";
    });
    h+="</div></div>";
  });
  return h;
}

/* ---------- grupos ---------- */
function rConc(){
  var max=0; Object.keys(GR).forEach(function(k){ max=Math.max(max,prodsDe(k).length); });
  var h='<div class="conc">';
  ["IRAC","FRAC","HRAC"].forEach(function(s){
    var ks=[]; D.MOA[s].forEach(function(c){ ks=ks.concat(c.g); });
    ks.sort(function(a,b){ return prodsDe(b).length-prodsDe(a).length || byG(a,b); });
    h+='<div class="conc-col"><h4>'+SYSN[s]+' <span>'+s+"</span></h4>";
    ks.forEach(function(k){
      var ps=prodsDe(k), g=GR[k];
      h+='<a class="conc-r" href="#'+gid(k)+'" data-g="'+k+'" data-tip="'+esc(code(k)+" · "+g.n+" · riesgo "+g.r+": "+ps.map(function(p){ return p.nm; }).join(", "))+'">'
        +'<span class="cr-k">'+code(k)+'</span><span class="cr-n">'+esc(g.c)+"<i>riesgo "+g.r+"</i></span>"
        +'<span class="cr-bar"><i style="width:'+(ps.length/max*100).toFixed(1)+"%;--rc:var("+RISKV[g.r]+')"></i></span><span class="cr-v">'+ps.length+"</span></a>";
    });
    h+="</div>";
  });
  h+='</div><div class="legend"><span><i style="--rc:var(--hot)"></i>Riesgo alto</span><span><i style="--rc:var(--warn)"></i>Riesgo medio</span><span><i style="--rc:var(--ok)"></i>Riesgo bajo</span><span class="soft">Largo de la barra: referencias que llevan el grupo, solas o en mezcla. Misma escala en las tres columnas.</span></div>';
  return h;
}
function rEstadios(){
  var h='<div class="tablewrap"><table class="estm"><thead><tr><th>Grupo</th><th>Huevo</th><th>Larva o ninfa</th><th>Pupa</th><th>Adulto</th><th>Velocidad</th></tr></thead><tbody>';
  D.MOA.IRAC.forEach(function(c){ c.g.forEach(function(k){
    var g=GR[k], e=g.est||[];
    h+='<tr><th scope="row"><a href="#'+gid(k)+'" data-g="'+k+'"><span class="gcode">'+code(k)+"</span> "+esc(g.n)+'</a><div class="chips sm">'+prodsDe(k).map(function(p){ return pchip(p); }).join("")+"</div></th>";
    ["huevo","larva","pupa","adulto"].forEach(function(s){ h+='<td class="dot">'+(e.indexOf(s)>-1?'<i class="on" aria-label="sí">●</i>':'<i aria-label="no">·</i>')+"</td>"; });
    h+='<td class="vel">'+esc(g.vel||"")+"</td></tr>";
  }); });
  return h+"</tbody></table></div>";
}
function rGcard(k){
  var g=GR[k], ps=prodsDe(k);
  var h='<article class="gc" id="'+gid(k)+'" tabindex="-1" style="--rc:var('+RISKV[g.r]+')">'
    +'<div class="gc-h"><span class="gcode">'+code(k)+'</span><span class="riskpill '+g.r+'">Riesgo '+g.r+'</span><span class="cnt">'+ps.length+(ps.length===1?" referencia":" referencias")+"</span></div>"
    +"<div><h4>"+esc(g.n)+'</h4><div class="sub">'+g.sub+"</div></div>"
    +'<p class="site"><b>Sitio de acción:</b> '+g.site+"</p>"
    +'<p class="how">'+g.how+"</p>";
  if(g.est) h+='<div class="est">'+["huevo","larva","pupa","adulto"].map(function(e){ return '<i class="'+(g.est.indexOf(e)>-1?"on":"")+'">'+EST[e]+"</i>"; }).join("")+"</div>";
  h+='<div class="mols"><div class="dlabel">Moléculas y marcas en el portafolio</div>';
  MOL.forEach(function(m){
    if(m.k!==k) return;
    var mp=D.P.filter(function(p){ return p.mol.indexOf(m.id)>-1; });
    h+='<div class="mol"><span class="mn">'+m.n+"<i>"+m.f+'</i></span><span class="chips">'+mp.map(function(p){ return pchip(p); }).join("")+"</span></div>";
  });
  h+="</div>"
    +'<p class="out"><b>También son '+code(k)+", aunque vengan de otra casa:</b> "+g.out+"</p>"
    +'<div class="use"><p class="yes"><b>Recomiéndalo cuando</b> '+g.si+'</p><p class="no"><b>No lo recomiendes cuando</b> '+g.no+"</p></div>"
    +"</article>";
  return h;
}
function rFcard(f){
  var ps=D.P.filter(function(p){ return p.fg===f.id; });
  return '<article class="gc" id="f-'+f.id+'" tabindex="-1" style="--rc:var(--accent-2)">'
    +'<div class="gc-h"><span class="gcode">'+(ps[0].l==="REG"?"Regulador":"Bioestimulante")+'</span><span class="cnt">'+ps.length+(ps.length===1?" referencia":" referencias")+"</span></div>"
    +"<div><h4>"+esc(f.n)+'</h4><div class="sub">'+esc(f.q)+"</div></div>"
    +'<div class="chips">'+ps.map(function(p){ return pchip(p); }).join("")+"</div>"
    +'<p class="how">'+f.que+"</p>"
    +'<p class="out"><b>Cómo se cruzan:</b> '+f.cruce+"</p>"
    +'<div class="use"><p class="yes"><b>Cuándo:</b> '+f.cuando+"</p></div></article>";
}
function rGrupos(){
  var tabs="", pan="";
  ["IRAC","FRAC","HRAC"].forEach(function(s,i){
    var n=0; D.MOA[s].forEach(function(c){ n+=c.g.length; });
    tabs+='<button class="gtab" type="button" role="tab" id="gt-'+s+'" aria-controls="gp-'+s+'" aria-selected="'+(i===0)+'" data-t="'+s+'">'+SYSN[s]+' <span class="n">'+s+" · "+n+"</span></button>";
    pan+='<div class="gpanel" role="tabpanel" id="gp-'+s+'" aria-labelledby="gt-'+s+'"><h3 class="panel-t">'+SYSN[s]+" · grupos "+s+"</h3>";
    if(s==="IRAC") pan+='<div class="moahead"><div class="eyebrow">Ciclo de vida</div><h4>Qué estadio alcanza cada grupo</h4><p>Muchos fracasos de campo son el producto correcto en el estadio equivocado. Un regulador de crecimiento no mata adultos; un piretroide no toca el huevo.</p></div>'+rEstadios();
    D.MOA[s].forEach(function(c){
      pan+='<div class="moahead"><div class="eyebrow">Modo de acción</div><h4>'+c.n+"</h4><p>"+c.d+'</p></div><div class="gcgrid">'+c.g.map(rGcard).join("")+"</div>";
    });
    pan+="</div>";
  });
  tabs+='<button class="gtab" type="button" role="tab" id="gt-BIO" aria-controls="gp-BIO" aria-selected="false" data-t="BIO">Bio y reguladores <span class="n">'+FG.length+"</span></button>";
  pan+='<div class="gpanel" role="tabpanel" id="gp-BIO" aria-labelledby="gt-BIO"><h3 class="panel-t">Bioestimulantes y reguladores</h3>'
    +'<div class="moahead"><div class="eyebrow">Sin grupo de resistencia</div><h4>Grupos funcionales</h4><p>No actúan sobre una plaga, así que no hay resistencia cruzada. Lo que sí hay son productos que repiten función, que se complementan o que se anulan entre sí.</p></div>'
    +'<div class="gcgrid">'+FG.map(rFcard).join("")+"</div></div>";
  return '<div class="gtabs js-only" role="tablist" aria-label="Línea de producto">'+tabs+"</div>"+pan;
}

/* ---------- matriz de cruces ---------- */
function rMatriz(l){
  var ps=D.P.filter(function(p){ return p.l===l; });
  ps.sort(function(a,b){ return byG(a.k[0],b.k[0]) || a.k.length-b.k.length || (a.nm<b.nm?-1:1); });
  var h='<div class="mx-wrap"><table class="mx" data-l="'+l+'"><thead><tr><th class="mx-c"><span>Aplicado ↓ · Siguiente →</span></th>';
  ps.forEach(function(p,j){ h+='<th class="mx-col" scope="col" data-j="'+j+'"><span>'+esc(p.nm)+"</span></th>"; });
  h+="</tr></thead><tbody>";
  ps.forEach(function(a,i){
    h+='<tr><th scope="row" class="mx-row" data-i="'+i+'"><span>'+esc(a.nm)+"</span> "+codes(a.k)+"</th>";
    ps.forEach(function(b,j){
      if(i===j){ h+='<td class="m-same" aria-label="mismo producto"></td>'; return; }
      var r=relacion(a.k,b.k);
      if(r==="no") h+='<td class="m-no" data-a="'+a.i+'" data-b="'+b.i+'" title="Después de '+esc(a.nm)+", "+esc(b.nm)+' no rota">✕</td>';
      else if(r==="parte") h+='<td class="m-parte" data-a="'+a.i+'" data-b="'+b.i+'" title="Después de '+esc(a.nm)+", "+esc(b.nm)+' rota solo en parte">◐</td>';
      else h+='<td data-a="'+a.i+'" data-b="'+b.i+'"></td>';
    });
    h+="</tr>";
  });
  return h+"</tbody></table></div>";
}

/* ---------- aprender ---------- */
function rLecciones(){
  return TEMAS.map(function(t,i){
    return '<details class="lec"'+(i===0?" open":"")+"><summary><b>"+esc(t.titulo)+"</b><span>"+esc(t.resumen)+"</span></summary><div class=\"lec-b\">"
      +t.secciones.map(function(s){ return '<div class="lec-s'+(s.destacado?" dest":"")+'"><h5>'+esc(s.titulo)+"</h5><p>"+esc(s.texto)+"</p></div>"; }).join("")
      +"</div></details>";
  }).join("");
}
function tarjetasDeGrupo(){
  var out=[];
  ["IRAC","FRAC","HRAC"].forEach(function(s){ D.MOA[s].forEach(function(c){ c.g.forEach(function(k){
    var g=GR[k], ps=prodsDe(k).map(function(p){ return p.nm; });
    out.push({t:SYSN[s],f:"¿Qué es "+code(k)+" y qué marcas lo llevan?",b:"<b>"+esc(g.n)+".</b> "+esc(g.site)+". En el portafolio: "+esc(ps.join(", "))+".",k:k});
  }); }); });
  return out;
}
function rTarjetas(){
  var todas=CARDS.map(function(c){ return {t:c.t,f:c.f,b:esc(c.b)}; }).concat(tarjetasDeGrupo());
  var temas=uniq(todas.map(function(c){ return c.t; }));
  var h='<div class="chips filt js-only" id="flashF"><button type="button" class="fchip" aria-pressed="true" data-t="">Todas <span>'+todas.length+"</span></button>"
    +temas.map(function(t){ return '<button type="button" class="fchip" aria-pressed="false" data-t="'+esc(t)+'">'+esc(t)+" <span>"+todas.filter(function(c){ return c.t===t; }).length+"</span></button>"; }).join("")
    +'</div><p class="soft js-only" id="flashN"></p><div class="flashes">';
  todas.forEach(function(c,i){
    h+='<details class="flash" data-t="'+esc(c.t)+'" data-n="'+i+'"><summary><span class="fl-t">'+esc(c.t)+"</span><b>"+esc(c.f)+'</b><span class="fl-h">Toca para ver la respuesta</span></summary><div class="fl-b"><p>'+c.b+'</p><label class="js-only fl-ok"><input type="checkbox" data-n="'+i+'"> Ya me la sé</label></div></details>';
  });
  return h+"</div>";
}
function rQuizNoJS(){
  return '<ol class="qz-static">'+QUIZ.map(function(q){
    return "<li><p><b>"+esc(q.q)+"</b></p><ul>"+q.o.map(function(o){ return "<li>"+esc(o)+"</li>"; }).join("")+'</ul><details><summary>Ver respuesta</summary><p><b>'+esc(q.o[q.a])+".</b> "+esc(q.e)+"</p></details></li>";
  }).join("")+"</ol>";
}
function rGlosario(){
  var gl=GLOS.slice().sort(function(a,b){ return a.t.localeCompare(b.t,"es"); });
  return '<dl class="glos">'+gl.map(function(g){ return '<div class="gl-i" data-q="'+esc((g.t+" "+g.d).toLowerCase())+'"><dt>'+esc(g.t)+"</dt><dd>"+esc(g.d)+"</dd></div>"; }).join("")+"</dl>";
}
function rTips(){
  var temas=uniq(TIPS.map(function(t){ return t.t; }));
  return '<div class="tipcols">'+temas.map(function(t){
    return '<div class="tipcol"><h4>'+esc(t)+'</h4><ul>'+TIPS.filter(function(x){ return x.t===t; }).map(function(x){ return "<li>"+esc(x.x)+"</li>"; }).join("")+"</ul></div>";
  }).join("")+"</div>";
}
function rFaq(){
  return '<div class="faq">'+FAQ.concat(PREGAPP).map(function(q){
    return '<details class="faq-i"><summary>'+esc(q.p)+"</summary><p>"+q.r+"</p></details>";
  }).join("")+"</div>";
}
