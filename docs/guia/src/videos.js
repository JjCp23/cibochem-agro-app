/* =====================================================================
   Mini-videos: animaciones SVG en bucle, como un GIF corto.
   Cada elemento animado recibe sus propios @keyframes (función A), que
   se juntan en VKF y van a la hoja de estilos. Corren solo con CSS, así
   que se ven aunque el navegador no ejecute JavaScript; con JavaScript
   se pueden pausar y repetir.
   ===================================================================== */
var VKF=[], _vk=0;
function A(dur,frames,opt){
  opt=opt||{};
  var id="k"+(++_vk);
  VKF.push("@keyframes "+id+"{"+frames.map(function(f){ return f[0]+"%{"+f[1]+"}"; }).join("")+"}");
  VKF.push(".vid ."+id+"{animation:"+id+" "+dur+"s "+(opt.ease||"ease-in-out")+" "+(opt.delay||0)+"s infinite both"+(opt.o?";transform-origin:"+opt.o:"")+"}");
  return "anim "+id;
}
/* visible entre a% y b% del ciclo */
function S(dur,a,b,fade){
  var f=fade||2, fr=[];
  if(a<=0) fr.push([0,"opacity:1"]); else { fr.push([0,"opacity:0"]); fr.push([Math.max(0,a-f),"opacity:0"]); fr.push([a,"opacity:1"]); }
  if(b>=100) fr.push([100,"opacity:1"]); else { fr.push([b,"opacity:1"]); fr.push([Math.min(100,b+f),"opacity:0"]); if(b+f<100) fr.push([100,"opacity:0"]); }
  return A(dur,fr,{ease:"linear"});
}
function tr(x,y){ return "transform:translate("+x+"px,"+y+"px)"; }
function T(x,y,txt,cls,anchor,extra){ return '<text class="'+(cls||"v-t")+'" x="'+x+'" y="'+y+'"'+(anchor?' text-anchor="'+anchor+'"':"")+(extra||"")+">"+txt+"</text>"; }
function fill(v){ return ' style="fill:var('+v+')"'; }
function svgOpen(w,h,label){ return '<svg viewBox="0 0 '+w+" "+h+'" role="img" aria-label="'+label+'">'; }

/* ---------- piezas de dibujo ---------- */
function leafPath(x,y,side,s){
  s=s||1; var d=side==="L"?-1:1;
  return "M"+x+" "+y+" C"+(x+d*18*s)+" "+(y-14*s)+" "+(x+d*40*s)+" "+(y-12*s)+" "+(x+d*54*s)+" "+(y+2*s)+" C"+(x+d*38*s)+" "+(y+12*s)+" "+(x+d*16*s)+" "+(y+10*s)+" "+x+" "+y+" Z";
}
function drop(x,y,c){ return '<path d="M'+x+" "+(y-9)+" C"+x+" "+(y-9)+" "+(x-6)+" "+(y-1)+" "+(x-6)+" "+(y+2)+" a6 6 0 0 0 12 0 C"+(x+6)+" "+(y-1)+" "+x+" "+(y-9)+" "+x+" "+(y-9)+' Z" style="fill:var('+c+')"></path>'; }
function bug(x,y,c){
  return '<g transform="translate('+x+" "+y+')"><path d="M-8 -4 l-5 -4 M-8 0 h-6 M-8 4 l-5 4 M8 -4 l5 -4 M8 0 h6 M8 4 l5 4" style="stroke:var('+c+');stroke-width:1.6;fill:none"></path><ellipse rx="9" ry="5.5"'+fill(c)+'></ellipse><circle cx="-10" cy="0" r="3.4"'+fill(c)+"></circle></g>";
}
function cruz(x,y,s,c){ s=s||6; return '<path d="M'+(x-s)+" "+(y-s)+" L"+(x+s)+" "+(y+s)+" M"+(x+s)+" "+(y-s)+" L"+(x-s)+" "+(y+s)+'" style="stroke:var('+(c||"--hot")+');stroke-width:2.6;stroke-linecap:round;fill:none"></path>'; }

/* ===================== 1. Cómo viaja la gota ===================== */
function leafSection(){
  var h=T(12,88,"HAZ","v-s")+'<rect x="10" y="94" width="220" height="5" rx="2"'+fill("--cut")+"></rect>"
    +'<rect x="10" y="99" width="220" height="12"'+fill("--surface-2")+"></rect>";
  for(var x=12;x<228;x+=10) h+='<rect x="'+x+'" y="111" width="8" height="30" rx="3"'+fill("--leaf-2")+"></rect>";
  h+='<rect x="10" y="141" width="220" height="30"'+fill("--leaf-3")+"></rect>";
  for(var i=0;i<11;i++) h+='<circle cx="'+(20+i*20)+'" cy="'+(150+(i%2)*12)+'" r="6"'+fill("--leaf-2")+' opacity=".8"></circle>';
  h+='<ellipse cx="120" cy="152" rx="20" ry="13" style="fill:var(--surface-3);stroke:var(--ink-3);stroke-width:1.5"></ellipse>'
    +'<rect x="10" y="171" width="220" height="11"'+fill("--surface-2")+'></rect><rect x="10" y="182" width="220" height="4" rx="2"'+fill("--cut")+"></rect>"
    +T(12,206,"ENVÉS","v-s");
  return h;
}
function plant(){
  var h='<rect x="250" y="212" width="160" height="50"'+fill("--soil")+'></rect><line x1="250" y1="212" x2="410" y2="212" style="stroke:var(--soil-2);stroke-width:2"></line>'
    +'<path d="M330 212 C326 226 318 236 306 254 M330 212 C334 228 342 238 354 254 M330 212 V258" style="fill:none;stroke:var(--root);stroke-width:2.6;stroke-linecap:round"></path>'
    +'<path d="M330 212 V64" style="stroke:var(--leaf);stroke-width:5;stroke-linecap:round"></path>';
  [[182,"L"],[150,"R"],[120,"L"],[94,"R"]].forEach(function(l){ h+='<path d="'+leafPath(330,l[0],l[1])+'"'+fill("--leaf")+"></path>"; });
  return h;
}
var BUD="M330 66 C320 56 322 44 330 36 C338 44 340 56 330 66 Z";
function budStatic(){ return '<path d="'+BUD+'"'+fill("--leaf")+"></path>"; }
function overlayLeaves(list,color,cls,op){
  return '<g class="'+cls+'" style="opacity:0">'+list.map(function(l){ return l==="bud"?'<path d="'+BUD+'"'+fill(color)+' opacity="'+(op||.75)+'"></path>':'<path d="'+leafPath(330,l[0],l[1])+'"'+fill(color)+' opacity="'+(op||.75)+'"></path>'; }).join("")+"</g>";
}
function sprayOn(x,y,dur,c){ return '<g class="'+A(dur,[[0,"opacity:0;"+tr(0,-50)],[4,"opacity:1;"+tr(0,-44)],[16,"opacity:1;"+tr(0,0)],[19,"opacity:0;"+tr(0,0)],[100,"opacity:0;"+tr(0,0)]])+'">'+drop(x,y,c)+"</g>"; }

function escenaContacto(){
  var d=7, c="--mov-contacto", h=svgOpen(420,262,"Producto de contacto: la gota se queda en la cutícula y la lluvia la lava")+leafSection()+plant()+budStatic();
  h+=sprayOn(80,86,d,c)+'<ellipse class="'+A(d,[[0,"opacity:0;transform:scaleX(.1)"],[17,"opacity:0;transform:scaleX(.1)"],[25,"opacity:1;transform:scaleX(1)"],[62,"opacity:1;transform:scaleX(1)"],[76,"opacity:.4;transform:scaleX(1)"],[100,"opacity:.4;transform:scaleX(1)"]],{o:"center"})+'" cx="80" cy="93" rx="32" ry="3.4"'+fill(c)+"></ellipse>";
  var lluvia=""; for(var x=34;x<230;x+=32) lluvia+='<line x1="'+x+'" y1="16" x2="'+(x-7)+'" y2="32" style="stroke:var(--water);stroke-width:2.2;stroke-linecap:round"></line>';
  h+='<g class="'+A(d,[[0,"opacity:0;"+tr(0,-20)],[54,"opacity:0;"+tr(0,-20)],[58,"opacity:1;"+tr(0,-10)],[72,"opacity:1;"+tr(0,42)],[76,"opacity:0;"+tr(0,46)],[100,"opacity:0;"+tr(0,46)]],{ease:"linear"})+'">'+lluvia+"</g>";
  h+=bug(175,200,"--bug")+'<g class="'+S(d,78,100)+'">'+T(120,236,"El del envés sigue vivo","v-t","middle")+"</g>";
  h+=sprayOn(362,138,d,c)+'<g class="'+S(d,22,100)+'"><circle cx="352" cy="148" r="2.6"'+fill(c)+'></circle><circle cx="363" cy="150" r="2.6"'+fill(c)+'></circle><circle cx="374" cy="149" r="2.6"'+fill(c)+"></circle></g>";
  h+='<path class="'+A(d,[[0,"transform:scale(.25)"],[34,"transform:scale(.25)"],[70,"transform:scale(1)"],[100,"transform:scale(1)"]],{o:"center bottom"})+'" d="'+BUD+'"'+fill("--leaf-4")+"></path>";
  h+='<g class="'+S(d,72,100)+'">'+T(330,24,"Hoja nueva sin proteger","v-t","middle")+"</g>";
  return h+"</svg>";
}
function escenaTranslam(){
  var d=7, c="--mov-translam", h=svgOpen(420,262,"Producto translaminar: cruza la hoja y alcanza la plaga del envés")+leafSection()+plant()+budStatic();
  h+=sprayOn(80,86,d,c)+'<ellipse class="'+S(d,20,100)+'" cx="80" cy="93" rx="30" ry="3.4"'+fill(c)+"></ellipse>";
  h+='<rect class="'+A(d,[[0,"transform:scaleY(0)"],[24,"transform:scaleY(0)"],[58,"transform:scaleY(1)"],[100,"transform:scaleY(1)"]],{o:"center top"})+'" x="54" y="96" width="52" height="88" rx="6"'+fill(c)+' opacity=".5"></rect>';
  h+='<g class="'+A(d,[[0,"opacity:1"],[60,"opacity:1"],[66,"opacity:0"],[100,"opacity:0"]],{ease:"linear"})+'">'+bug(80,200,"--bug")+"</g>";
  h+='<g class="'+S(d,62,100)+'">'+bug(80,200,"--ink-3")+cruz(80,200,7)+"</g>";
  h+='<g class="'+S(d,70,100)+'">'+T(150,236,"Alcanza el envés","v-t","middle")+"</g>";
  h+=sprayOn(362,138,d,c)+overlayLeaves([[150,"R"]],c,S(d,38,100));
  h+='<g class="'+S(d,72,100)+'">'+T(330,24,"Solo la hoja tratada","v-t","middle")+"</g>";
  return h+"</svg>";
}
function escenaSistemica(ambi){
  var d=7, c=ambi?"--mov-ambi":"--mov-xilema";
  var h=svgOpen(420,262,ambi?"Producto ambimóvil: sube a la hoja nueva y baja hasta la raíz":"Sistémico por xilema: sube a la hoja nueva y nunca baja")+leafSection()+plant()+budStatic();
  h+=sprayOn(80,86,d,c)+'<ellipse class="'+A(d,[[0,"opacity:0"],[18,"opacity:0"],[22,"opacity:1"],[32,"opacity:1"],[42,"opacity:0"],[100,"opacity:0"]],{ease:"linear"})+'" cx="80" cy="93" rx="30" ry="3.4"'+fill(c)+"></ellipse>";
  for(var i=0;i<3;i++){
    var a=24+i*3;
    h+='<circle class="'+A(d,[[0,"opacity:0;"+tr(0,0)],[a,"opacity:0;"+tr(0,0)],[a+2,"opacity:1;"+tr(0,0)],[a+14,"opacity:1;"+tr(40-i*4,52)],[a+17,"opacity:0;"+tr(40-i*4,52)],[100,"opacity:0;"+tr(40-i*4,52)]])+'" cx="'+(74+i*6)+'" cy="100" r="3.2"'+fill(c)+"></circle>";
  }
  h+='<ellipse class="'+S(d,40,100)+'" cx="120" cy="152" rx="18" ry="11"'+fill(c)+' opacity=".75"></ellipse>';
  h+=sprayOn(362,138,d,c);
  for(i=0;i<4;i++){
    a=42+i*7;
    h+='<circle class="'+A(d,[[0,"opacity:0;"+tr(0,0)],[a,"opacity:0;"+tr(0,0)],[a+2,"opacity:1;"+tr(0,0)],[a+20,"opacity:1;"+tr(0,-84)],[a+23,"opacity:0;"+tr(0,-84)],[100,"opacity:0;"+tr(0,-84)]])+'" cx="330" cy="150" r="3.6"'+fill(c)+"></circle>";
    if(ambi) h+='<circle class="'+A(d,[[0,"opacity:0;"+tr(0,0)],[a,"opacity:0;"+tr(0,0)],[a+2,"opacity:1;"+tr(0,0)],[a+20,"opacity:1;"+tr(0,90)],[a+23,"opacity:0;"+tr(0,90)],[100,"opacity:0;"+tr(0,90)]])+'" cx="330" cy="150" r="3.6"'+fill(c)+"></circle>";
  }
  h+=overlayLeaves([[120,"L"],[94,"R"],"bud"],c,S(d,72,100),.7);
  if(ambi){
    h+='<path class="'+S(d,76,100)+'" d="M330 212 C326 226 318 236 306 254 M330 212 C334 228 342 238 354 254 M330 212 V258" style="fill:none;stroke:var('+c+');stroke-width:3.6;stroke-linecap:round"></path>';
    h+='<g class="'+S(d,76,100)+'">'+T(330,24,"Sube y baja","v-t","middle")+"</g>"+'<g class="'+S(d,80,100)+'">'+T(408,240,"Llega a la raíz","v-t","end")+"</g>";
  } else {
    h+='<g class="'+S(d,76,100)+'">'+T(330,24,"Sube a la hoja nueva","v-t","middle")+"</g>"+'<g class="'+S(d,80,100)+'">'+cruz(276,236,5)+T(288,240,"No baja a la raíz","v-t v-hot")+"</g>";
  }
  return h+"</svg>";
}
function escenaSuelo(){
  var d=8, c="--mov-raiz", h=svgOpen(420,262,"Producto al suelo: forma una capa que frena la plántula o entra por la raíz");
  h+=T(12,106,"SUELO","v-s")+'<rect x="10" y="112" width="220" height="140" rx="4"'+fill("--soil")+"></rect>";
  [[30,170],[70,214],[150,236],[196,180],[110,160],[60,238],[204,224]].forEach(function(q){ h+='<circle cx="'+q[0]+'" cy="'+q[1]+'" r="4"'+fill("--soil-2")+"></circle>"; });
  h+='<g class="'+A(d,[[0,"opacity:0;"+tr(0,-60)],[4,"opacity:1;"+tr(0,-54)],[14,"opacity:1;"+tr(0,0)],[17,"opacity:0;"+tr(0,0)],[100,"opacity:0;"+tr(0,0)]])+'">'+drop(80,104,c)+"</g>";
  [50,120,190].forEach(function(x,i){ h+='<g class="'+A(d,[[0,"opacity:0;"+tr(0,-70)],[16+i*4,"opacity:0;"+tr(0,-70)],[18+i*4,"opacity:1;"+tr(0,-64)],[28+i*4,"opacity:1;"+tr(0,0)],[31+i*4,"opacity:0;"+tr(0,0)],[100,"opacity:0;"+tr(0,0)]])+'">'+drop(x,104,"--water")+"</g>"; });
  h+='<rect class="'+A(d,[[0,"transform:scaleY(0)"],[26,"transform:scaleY(0)"],[44,"transform:scaleY(1)"],[100,"transform:scaleY(1)"]],{o:"center top"})+'" x="10" y="112" width="220" height="16"'+fill(c)+' opacity=".7"></rect>';
  h+='<g class="'+S(d,44,100)+'">'+T(228,106,"Capa activa","v-s","end")+"</g>";
  h+='<ellipse cx="120" cy="204" rx="6" ry="4"'+fill("--soil-2")+"></ellipse>";
  var brote='<path d="M120 204 V110" style="stroke:var(--leaf);stroke-width:3;stroke-linecap:round"></path><path d="M120 112 c-8 -9 -17 -7 -19 0 c8 5 14 5 19 0 Z M120 112 c8 -9 17 -7 19 0 c-8 5 -14 5 -19 0 Z"'+fill("--leaf")+"></path>";
  h+='<g class="'+A(d,[[0,"opacity:0;transform:scaleY(0)"],[44,"opacity:0;transform:scaleY(0)"],[46,"opacity:1;transform:scaleY(.05)"],[66,"opacity:1;transform:scaleY(1)"],[100,"opacity:1;transform:scaleY(1)"]],{o:"center bottom"})+'">'+brote+"</g>";
  h+='<g class="'+S(d,72,100)+'">'+brote.replace(/var\(--leaf\)/g,"var(--dead)")+"</g>";
  h+='<g class="'+S(d,80,100)+'">'+T(120,60,"Muere al cruzar la capa","v-t","middle")+"</g>";
  h+=plant()+budStatic();
  h+='<g class="'+A(d,[[0,"opacity:0;"+tr(0,-60)],[4,"opacity:1;"+tr(0,-54)],[14,"opacity:1;"+tr(0,0)],[17,"opacity:0;"+tr(0,0)],[100,"opacity:0;"+tr(0,0)]])+'">'+drop(296,204,c)+"</g>";
  h+='<ellipse class="'+S(d,30,100)+'" cx="330" cy="236" rx="44" ry="18"'+fill(c)+' opacity=".45"></ellipse>';
  for(var i=0;i<4;i++){ var a=48+i*7; h+='<circle class="'+A(d,[[0,"opacity:0;"+tr(0,0)],[a,"opacity:0;"+tr(0,0)],[a+2,"opacity:1;"+tr(0,0)],[a+22,"opacity:1;"+tr(0,-110)],[a+25,"opacity:0;"+tr(0,-110)],[100,"opacity:0;"+tr(0,-110)]])+'" cx="330" cy="234" r="3.6"'+fill(c)+"></circle>"; }
  h+=overlayLeaves([[182,"L"],[150,"R"],[120,"L"],[94,"R"]],c,S(d,80,100),.6);
  h+='<g class="'+S(d,82,100)+'">'+T(330,24,"Entra por la raíz","v-t","middle")+"</g>";
  return h+"</svg>";
}

/* ===================== 2. La cerradura y las llaves ===================== */
function candado(x,top,sub){
  return T(x,16,top,"v-t","middle")+T(x,31,sub,"v-s","middle")
    +'<path d="M'+(x-20)+" 84 V68 a20 20 0 0 1 40 0 V84\" style=\"fill:none;stroke:var(--ink-3);stroke-width:7;stroke-linecap:round\"></path>"
    +'<rect x="'+(x-38)+'" y="80" width="76" height="70" rx="10" style="fill:var(--surface-2);stroke:var(--ink-3);stroke-width:2"></rect>';
}
function hueco(x){ return '<circle cx="'+x+'" cy="108" r="8"'+fill("--ink")+'></circle><rect x="'+(x-3.5)+'" y="108" width="7" height="24" rx="2"'+fill("--ink")+"></rect>"; }
function hueco2(x){ return '<path d="M'+(x-10)+" 100 L"+(x+10)+" 100 L"+x+' 122 Z"'+fill("--hot")+'></path><rect x="'+(x-9)+'" y="125" width="18" height="5" rx="2"'+fill("--hot")+"></rect>"; }
function llave(x,y,c,txt){
  return '<g transform="translate('+x+" "+y+')"><circle cx="0" cy="22" r="10" style="fill:none;stroke:var('+c+');stroke-width:5"></circle><rect x="-3" y="-26" width="6" height="40" rx="2"'+fill(c)+'></rect><rect x="3" y="-24" width="6" height="4"'+fill(c)+'></rect><rect x="3" y="-15" width="5" height="4"'+fill(c)+"></rect></g>"+T(x,y+48,txt,"v-s","middle");
}
function videoCerradura(){
  var d=12, h=svgOpen(420,300,"Tres moléculas del mismo grupo entran en la misma cerradura; cuando la plaga la cambia, ninguna entra, pero una molécula de otro grupo abre otra cerradura");
  h+=candado(75,"IRAC 4","receptor nicotínico")+candado(210,"IRAC 6","canal de cloruro")+candado(345,"IRAC 28","rianodina");
  h+='<g class="'+S(d,0,38)+'">'+hueco(75)+"</g>"+'<g class="'+S(d,38,100)+'">'+hueco2(75)+"</g>"+hueco(210)+hueco(345);
  h+='<rect class="'+S(d,38,100)+'" x="37" y="80" width="76" height="70" rx="10" style="fill:none;stroke:var(--hot);stroke-width:3"></rect>';
  h+='<rect class="'+S(d,9,36)+'" x="37" y="80" width="76" height="70" rx="10" style="fill:none;stroke:var(--ok);stroke-width:3.5"></rect>';
  h+='<rect class="'+S(d,71,95)+'" x="172" y="80" width="76" height="70" rx="10" style="fill:none;stroke:var(--ok);stroke-width:3.5"></rect>';
  h+='<g class="'+S(d,9,36)+'">'+T(75,176,"✓ entra","v-t v-ok","middle")+"</g>";
  h+='<g class="'+S(d,40,62)+'">'+T(75,176,"✕ no entra","v-t v-hot","middle")+"</g>";
  h+='<g class="'+S(d,71,95)+'">'+T(210,176,"✓ entra","v-t v-ok","middle")+"</g>";
  /* tres llaves del grupo 4: mismo color, misma cerradura */
  [[39,36,2,"THX"],[75,0,13,"IMI"],[111,-36,24,"DIN"]].forEach(function(k,i){
    var a=k[2], b=44+i*5;
    h+='<g class="'+A(d,[[0,tr(0,0)+";opacity:1"],[a,tr(0,0)],[a+7,tr(k[1],-72)],[a+10,tr(k[1],-72)+";opacity:1"],[a+12,tr(k[1],-72)+";opacity:0"],[a+13,tr(0,0)+";opacity:0"],[38,tr(0,0)+";opacity:0"],[40,tr(0,0)+";opacity:1"],[b,tr(0,0)],[b+3,tr(k[1],-46)],[b+5,tr(k[1],-40)],[b+8,tr(0,0)],[100,tr(0,0)+";opacity:1"]])+'">'+llave(k[0],210,"--mov-xilema",k[3])+"</g>";
  });
  h+='<g class="'+A(d,[[0,tr(0,0)+";opacity:1"],[63,tr(0,0)],[70,tr(0,-72)],[95,tr(0,-72)+";opacity:1"],[97,tr(0,-72)+";opacity:0"],[98,tr(0,0)+";opacity:0"],[100,tr(0,0)+";opacity:1"]])+'">'+llave(210,210,"--mov-translam","EMA")+"</g>";
  h+=llave(345,210,"--mov-ambi","CLO");
  h+='<g class="'+S(d,9,36)+'">'+T(210,290,"Thiametoxam, imidacloprid y dinotefuran: una sola cerradura","v-t","middle")+"</g>";
  h+='<g class="'+S(d,40,62)+'">'+T(210,290,"La plaga cambia la cerradura y ninguna de las tres entra","v-t v-hot","middle")+"</g>";
  h+='<g class="'+S(d,66,86)+'">'+T(210,290,"Emamectina abre otra cerradura: IRAC 6","v-t","middle")+"</g>";
  h+='<g class="'+S(d,88,100)+'">'+T(210,290,"Rotar es cambiar de cerradura, no de llave","v-t v-acc","middle")+"</g>";
  return h+"</svg>";
}

/* ===================== 3. Repetir o rotar ===================== */
function videoPoblacion(){
  var d=15, h=svgOpen(420,262,"Dos poblaciones: la que recibe siempre el mismo grupo termina resistente; la que rota sigue sensible");
  var seed=7; function rnd(){ seed=(seed*16807)%2147483647; return (seed-1)/2147483646; }
  var pos=[]; for(var r=0;r<5;r++) for(var c=0;c<8;c++) pos.push([21+c*22+(rnd()-.5)*8, 78+r*30+(rnd()-.5)*8]);
  var R2=[1,3,5,8,12,16,19,22,25,27,29,33,35,39], S1=[2,13,21,30,36,38], S3=[0,10,24,31], S4=[0,6,10,17,24,31,34,37];
  function estado(panel,f,i){
    if(f===0) return [5,27].indexOf(i)>-1?"R":"S";
    if(f===1) return [5,27].indexOf(i)>-1?"R":(S1.indexOf(i)>-1?"S":"x");
    if(f===2) return R2.indexOf(i)>-1?"R":"S";
    if(f===3){ if(panel===0) return R2.indexOf(i)>-1?"R":(S3.indexOf(i)>-1?"S":"x"); return i===16?"R":(S3.indexOf(i)>-1?"S":"x"); }
    if(panel===0) return S4.indexOf(i)>-1?"S":"R";
    return [5,16,27].indexOf(i)>-1?"R":"S";
  }
  function forma(t,x,y){
    if(t==="S") return '<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="6.5"'+fill("--leaf")+"></circle>";
    if(t==="R") return '<path d="M'+x.toFixed(1)+" "+(y-8).toFixed(1)+" l8 8 l-8 8 l-8 -8 Z\""+fill("--hot")+"></path>";
    return cruz(x,y,4,"--ink-3");
  }
  var titulos=[["Población inicial","Población inicial"],["Aplicación 1 · IRAC 4","Aplicación 1 · IRAC 4"],["Se reproducen","Se reproducen"],["Aplicación 2 · IRAC 4","Aplicación 2 · IRAC 6"],["El 4 ya no controla","Sigue sensible"]];
  var conteo=[["2 de 40 resistentes","2 de 40 resistentes"],["Sobreviven 8","Sobreviven 8"],["14 de 40 resistentes","14 de 40 resistentes"],["Sobreviven 18","Sobreviven 5"],["32 de 40 resistentes","3 de 40 resistentes"]];
  [0,1].forEach(function(panel){
    var x0=panel?214:6;
    h+='<rect x="'+x0+'" y="4" width="200" height="232" rx="10" style="fill:var(--surface-3);stroke:var(--line)"></rect>';
    h+=T(x0+100,24,panel?"Rotar: 4 y luego 6":"Repetir el grupo 4","v-t","middle");
    for(var f=0;f<5;f++){
      var a=f*20, b=f===4?100:(f+1)*20-1;
      var cls=f===0?A(d,[[0,"opacity:1"],[19,"opacity:1"],[20,"opacity:0"],[99,"opacity:0"],[100,"opacity:1"]],{ease:"linear"}):S(d,a,b,1);
      var g='<g class="'+cls+'">'+T(x0+100,46,titulos[f][panel],"v-s"+(f===4?(panel?" v-ok":" v-hot"):""),"middle");
      for(var i=0;i<40;i++) g+=forma(estado(panel,f,i),x0+pos[i][0],pos[i][1]);
      g+=T(x0+100,228,conteo[f][panel],"v-t"+(f===4?(panel?" v-ok":" v-hot"):""),"middle")+"</g>";
      h+=g;
    }
  });
  h+='<circle cx="98" cy="252" r="5.5"'+fill("--leaf")+"></circle>"+T(108,256,"Sensible","v-s")
    +'<path d="M182 245 l7 7 l-7 7 l-7 -7 Z"'+fill("--hot")+"></path>"+T(194,256,"Resistente al 4","v-s")
    +cruz(304,252,4,"--ink-3")+T(314,256,"Muerto","v-s");
  return h+"</svg>";
}

/* ===================== 4. Mismo canal, distinto sitio ===================== */
function membrana(cx,hueco){
  var h="";
  for(var x=cx-62;x<=cx+62;x+=10){
    if(Math.abs(x-cx)<20) continue;
    h+='<circle cx="'+x+'" cy="114" r="4.5"'+fill("--lipid")+'></circle><circle cx="'+x+'" cy="146" r="4.5"'+fill("--lipid")+"></circle>"
      +'<path d="M'+(x-1.5)+" 118 V142 M"+(x+1.5)+' 118 V142" style="stroke:var(--lipid);stroke-width:1.2"></path>';
  }
  return h+'<rect x="'+(cx-19)+'" y="102" width="13" height="56" rx="4"'+fill("--mov-xilema")+'></rect><rect x="'+(cx+6)+'" y="102" width="13" height="56" rx="4"'+fill("--mov-xilema")+"></rect>";
}
function ion(cx,y){ return '<circle cx="'+cx+'" cy="'+y+'" r="5"'+fill("--water")+"></circle>"; }
function videoCanal(){
  var d=8, h=svgOpen(420,250,"Canal de sodio: normal se abre y se cierra, con piretroide queda abierto, con indoxacarb queda tapado");
  [[70,"Normal",""],[210,"Piretroide","IRAC 3"],[350,"Indoxacarb","IRAC 22"]].forEach(function(p){ h+=T(p[0],22,p[1],"v-t","middle")+T(p[0],38,p[2],"v-s","middle")+membrana(p[0]); });
  /* normal: la compuerta se abre dos veces y pasan iones */
  h+='<rect class="'+A(d,[[0,tr(0,0)],[10,tr(0,0)],[14,tr(-17,0)],[26,tr(-17,0)],[30,tr(0,0)],[56,tr(0,0)],[60,tr(-17,0)],[72,tr(-17,0)],[76,tr(0,0)],[100,tr(0,0)]])+'" x="63" y="96" width="14" height="7" rx="2"'+fill("--ink")+"></rect>";
  [0,4].forEach(function(o){
    h+='<g class="'+A(d,[[0,"opacity:1;"+tr(0,0)],[12+o,tr(0,0)],[16+o,tr(0,36)],[26+o,"opacity:1;"+tr(0,116)],[28+o,"opacity:0;"+tr(0,116)],[29+o,"opacity:0;"+tr(0,0)],[33+o,"opacity:1;"+tr(0,0)],[58+o,tr(0,0)],[62+o,tr(0,36)],[72+o,"opacity:1;"+tr(0,116)],[74+o,"opacity:0;"+tr(0,116)],[75+o,"opacity:0;"+tr(0,0)],[79+o,"opacity:1;"+tr(0,0)],[100,"opacity:1;"+tr(0,0)]])+'">'+ion(70,o?54:66)+"</g>";
  });
  h+=ion(38,74)+ion(104,62)+T(70,186,"Abre y cierra","v-t","middle")+T(70,202,"señal normal","v-s","middle");
  /* piretroide: queda abierto y los iones pasan sin parar */
  h+='<rect x="186" y="96" width="14" height="7" rx="2"'+fill("--ink")+"></rect>";
  for(var i=0;i<5;i++) h+='<g class="'+A(d,[[0,"opacity:0;"+tr(0,0)],[6,"opacity:1;"+tr(0,6)],[70,"opacity:1;"+tr(0,128)],[78,"opacity:0;"+tr(0,134)],[100,"opacity:0;"+tr(0,134)]],{ease:"linear",delay:-i*1.6})+'">'+ion(210,52)+"</g>";
  h+='<path class="'+A(.7,[[0,"opacity:.2"],[50,"opacity:1"],[100,"opacity:.2"]],{ease:"linear"})+'" d="M196 168 l6 6 l-4 0 l6 6 M214 168 l6 6 l-4 0 l6 6" style="fill:none;stroke:var(--hot);stroke-width:2"></path>';
  h+=T(210,198,"Queda abierto","v-t","middle")+T(210,214,"descarga sin parar","v-s","middle");
  /* indoxacarb: el canal está tapado */
  h+='<rect x="326" y="96" width="14" height="7" rx="2"'+fill("--ink")+'></rect><rect x="344" y="110" width="12" height="34" rx="5"'+fill("--hot")+"></rect>";
  h+='<g class="'+A(d,[[0,tr(0,0)],[30,tr(0,44)],[36,tr(0,34)],[42,tr(0,44)],[48,tr(0,38)],[54,tr(0,44)],[80,tr(0,44)],[94,tr(0,0)],[100,tr(0,0)]])+'">'+ion(350,56)+"</g>"+ion(320,70)+ion(382,64);
  h+=T(350,186,"Tapado","v-t","middle")+T(350,202,"no pasa la señal","v-s","middle");
  h+=T(210,240,"Mismo canal, distinto sitio: la mutación kdr no afecta al 22","v-t v-acc","middle");
  return h+"</svg>";
}

/* ===================== 5. Glifosato o glufosinato ===================== */
function maleza(cx){
  var sx=cx-20, h='<rect x="'+(cx-100)+'" y="170" width="200" height="96"'+fill("--soil")+"></rect>"
    +'<path d="M'+(cx-82)+" 212 C"+(cx-40)+" 202 "+(cx+20)+" 218 "+(cx+82)+' 206" style="fill:none;stroke:var(--root);stroke-width:9;stroke-linecap:round"></path>'
    +'<ellipse cx="'+(cx+50)+'" cy="205" rx="6" ry="5"'+fill("--root")+"></ellipse>"
    +'<path d="M'+sx+" 210 V86\" style=\"stroke:var(--leaf);stroke-width:4;stroke-linecap:round\"></path>";
  [[150,"L"],[126,"R"],[104,"L"],[88,"R"]].forEach(function(l){ h+='<path d="'+leafPath(sx,l[0],l[1],.85)+'"'+fill("--leaf")+"></path>"; });
  return h;
}
function hojasMaleza(cx,color,cls){
  var sx=cx-20, g='<g class="'+cls+'">';
  [[150,"L"],[126,"R"],[104,"L"],[88,"R"]].forEach(function(l){ g+='<path d="'+leafPath(sx,l[0],l[1],.85)+'"'+fill(color)+"></path>"; });
  return g+'<path d="M'+sx+" 170 V86\" style=\"stroke:var("+color+');stroke-width:4;stroke-linecap:round"></path></g>';
}
function lluviaProducto(cx,d,c){
  var h=""; [-56,-34,-12,10].forEach(function(dx,i){ h+='<g class="'+A(d,[[0,"opacity:0;"+tr(0,-30)],[2+i,"opacity:1;"+tr(0,-28)],[10+i,"opacity:1;"+tr(0,14)],[13+i,"opacity:0;"+tr(0,16)],[100,"opacity:0;"+tr(0,16)]])+'">'+drop(cx+dx,58,c)+"</g>"; });
  return h;
}
function videoGlifosato(){
  var d=12, h=svgOpen(420,270,"Glifosato baja al rizoma y la maleza no rebrota; glufosinato quema la parte aérea y la maleza rebrota");
  var izq=105, der=315, rizoma=function(cx){ return "M"+(cx-82)+" 212 C"+(cx-40)+" 202 "+(cx+20)+" 218 "+(cx+82)+" 206"; };
  h+=T(izq,18,"Glifosato · HRAC 9","v-t","middle")+T(izq,34,"baja por floema","v-s","middle")+T(der,18,"Glufosinato · HRAC 10","v-t","middle")+T(der,34,"no baja a la raíz","v-s","middle");
  h+=maleza(izq)+maleza(der)+lluviaProducto(izq,d,"--mov-ambi")+lluviaProducto(der,d,"--mov-contacto");
  for(var i=0;i<5;i++){ var a=14+i*4;
    h+='<circle class="'+A(d,[[0,"opacity:0;"+tr(0,0)],[a,"opacity:0;"+tr(0,0)],[a+2,"opacity:1;"+tr(0,0)],[a+18,"opacity:1;"+tr(0,96)],[a+28,"opacity:1;"+tr(60,94)],[a+31,"opacity:0;"+tr(60,94)],[100,"opacity:0;"+tr(60,94)]])+'" cx="'+(izq-20)+'" cy="112" r="3.6"'+fill("--mov-ambi")+"></circle>"; }
  h+='<path class="'+S(d,46,72)+'" d="'+rizoma(izq)+'" style="fill:none;stroke:var(--mov-ambi);stroke-width:9;stroke-linecap:round"></path>';
  h+=hojasMaleza(izq,"--warn",S(d,56,72))+hojasMaleza(izq,"--dead",S(d,72,100));
  h+='<path class="'+S(d,74,100)+'" d="'+rizoma(izq)+'" style="fill:none;stroke:var(--dead);stroke-width:9;stroke-linecap:round"></path>';
  h+='<g class="'+S(d,84,100)+'">'+T(izq,250,"✓ Mata el rizoma: no rebrota","v-t v-ok","middle")+"</g>";
  h+=hojasMaleza(der,"--dead",A(d,[[0,"opacity:0"],[14,"opacity:0"],[24,"opacity:1"],[100,"opacity:1"]],{ease:"linear"}));
  h+='<g class="'+S(d,24,60)+'">'+T(der,62,"Quema en 2 a 4 días","v-s","middle")+"</g>";
  var bx=der+50;
  h+='<g class="'+A(d,[[0,"opacity:0;transform:scaleY(0)"],[50,"opacity:0;transform:scaleY(0)"],[52,"opacity:1;transform:scaleY(.05)"],[78,"opacity:1;transform:scaleY(1)"],[100,"opacity:1;transform:scaleY(1)"]],{o:"center bottom"})+'"><path d="M'+bx+" 204 V128\" style=\"stroke:var(--leaf);stroke-width:4;stroke-linecap:round\"></path><path d=\""+leafPath(bx,160,"R",.6)+'"'+fill("--leaf")+'></path><path d="'+leafPath(bx,140,"L",.6)+'"'+fill("--leaf")+"></path></g>";
  h+='<g class="'+S(d,80,100)+'">'+T(der,250,"✕ Rebrota desde el rizoma","v-t v-hot","middle")+"</g>";
  return h+"</svg>";
}

/* ===================== 6. Sitio único o multisitio ===================== */
function copa(x,y,angosta,c){ var n=angosta?2:6; return '<path d="M'+(x-10)+" "+y+" h"+(10-n/2)+" v7 h"+n+" v-7 h"+(10-n/2)+" v14 h-20 Z\""+fill(c||"--mov-xilema")+"></path>"; }
function videoSitio(){
  var d=11, h=svgOpen(420,262,"Un fungicida de sitio único deja de funcionar con una mutación; un multisitio sigue funcionando");
  [[105,"Sitio único","estrobilurina, triazol, SDHI"],[315,"Multisitio","MANCONEX, CLOROPAZ"]].forEach(function(p){
    var cx=p[0];
    h+=T(cx,18,p[1],"v-t","middle")+T(cx,34,p[2],"v-s","middle")
      +'<ellipse cx="'+cx+'" cy="132" rx="74" ry="50" style="fill:var(--fungus);stroke:var(--ink-3);stroke-width:1.5"></ellipse>';
  });
  /* sitio único */
  var cx=105;
  h+='<path class="'+A(d,[[0,"stroke-dashoffset:110"],[62,"stroke-dashoffset:110"],[92,"stroke-dashoffset:0"],[100,"stroke-dashoffset:0"]],{ease:"linear"})+'" d="M'+(cx+34)+" 174 C"+(cx+44)+" 200 "+(cx+70)+" 214 "+(cx+94)+' 240" style="fill:none;stroke:var(--fungus-2);stroke-width:7;stroke-linecap:round;stroke-dasharray:110"></path>';
  h+='<g class="'+S(d,0,35)+'">'+copa(cx,124,false)+"</g>"+'<g class="'+S(d,35,100)+'">'+copa(cx,124,true,"--hot")+"</g>";
  h+='<rect class="'+A(d,[[0,"opacity:0;"+tr(0,-70)],[2,"opacity:1;"+tr(0,-70)],[14,"opacity:1;"+tr(0,0)],[28,"opacity:1;"+tr(0,0)],[31,"opacity:0;"+tr(0,0)],[100,"opacity:0;"+tr(0,0)]])+'" x="'+(cx-3)+'" y="122" width="6" height="8" rx="1"'+fill("--accent")+"></rect>";
  h+='<rect class="'+A(d,[[0,"opacity:0;"+tr(0,-70)],[42,"opacity:0;"+tr(0,-70)],[44,"opacity:1;"+tr(0,-70)],[52,"opacity:1;"+tr(0,-12)],[58,"opacity:1;"+tr(0,-48)],[61,"opacity:0;"+tr(0,-48)],[100,"opacity:0;"+tr(0,-48)]])+'" x="'+(cx-3)+'" y="122" width="6" height="8" rx="1"'+fill("--accent")+"></rect>";
  h+='<g class="'+S(d,14,32)+'">'+T(cx,166,"Frenado","v-s","middle")+"</g>"+'<g class="'+S(d,36,58)+'">'+T(cx,166,"La enzima mutó","v-s v-hot","middle")+"</g>";
  h+='<g class="'+S(d,82,100)+'">'+T(cx-14,254,"✕ Vuelve a crecer","v-t v-hot","middle")+"</g>";
  /* multisitio */
  cx=315;
  var sitios=[[-42,112],[0,104],[42,112],[-42,146],[0,152],[42,146]];
  sitios.forEach(function(s,i){
    var x=cx+s[0], y=s[1];
    if(i===2) h+='<g class="'+S(d,0,35)+'">'+copa(x,y,false)+"</g>"+'<g class="'+S(d,35,100)+'">'+copa(x,y,true,"--hot")+"</g>";
    else h+=copa(x,y,false);
    var a=1+i*2;
    var fr=[[0,"opacity:0;"+tr(0,-60)],[a,"opacity:1;"+tr(0,-60)],[a+11,"opacity:1;"+tr(0,0)]];
    if(i===2) fr=fr.concat([[34,"opacity:1;"+tr(0,0)],[38,"opacity:0;"+tr(0,-16)],[100,"opacity:0;"+tr(0,-16)]]); else fr.push([100,"opacity:1;"+tr(0,0)]);
    h+='<rect class="'+A(d,fr)+'" x="'+(x-3)+'" y="'+(y-2)+'" width="6" height="8" rx="1"'+fill("--accent")+"></rect>";
  });
  h+='<g class="'+S(d,36,58)+'">'+T(cx,194,"Una enzima mutó","v-s v-hot","middle")+"</g>";
  h+='<g class="'+S(d,66,100)+'">'+T(cx,254,"✓ Sigue frenado","v-t v-ok","middle")+"</g>";
  return h+"</svg>";
}

/* ===================== 7. Hongo verdadero u oomiceto ===================== */
function membranaAncha(cx,ergo){
  var h="";
  for(var x=cx-86;x<=cx+86;x+=10){
    h+='<circle cx="'+x+'" cy="112" r="4.5"'+fill("--lipid")+'></circle><circle cx="'+x+'" cy="146" r="4.5"'+fill("--lipid")+"></circle>"
      +'<path d="M'+(x-1.5)+" 116 V142 M"+(x+1.5)+' 116 V142" style="stroke:var(--lipid);stroke-width:1.2"></path>';
  }
  return h;
}
function hexa(x,y,c){ return '<path d="M'+(x-7)+" "+y+" l3.5 -6 h7 l3.5 6 l-3.5 6 h-7 Z\""+fill(c)+"></path>"; }
function rombo(x,y,c){ return '<path d="M'+x+" "+(y-8)+" l8 8 l-8 8 l-8 -8 Z\""+fill(c)+"></path>"; }
function videoOomiceto(){
  var d=10, h=svgOpen(420,250,"El triazol rompe la membrana del hongo verdadero porque ataca el ergosterol; en el oomiceto no hay ergosterol y no hace nada");
  var izq=105, der=315;
  h+=T(izq,18,"Hongo verdadero","v-t","middle")+T(izq,34,"tiene ergosterol","v-s","middle")+T(der,18,"Oomiceto","v-t","middle")+T(der,34,"no tiene ergosterol","v-s","middle");
  h+=membranaAncha(izq,true)+membranaAncha(der,false);
  var erg=""; for(var x=izq-75;x<=izq+75;x+=30) erg+='<rect x="'+(x-3)+'" y="118" width="6" height="22" rx="3"'+fill("--erg")+"></rect>";
  h+='<g class="'+A(d,[[0,"opacity:1"],[24,"opacity:1"],[40,"opacity:0"],[100,"opacity:0"]],{ease:"linear"})+'">'+erg+"</g>";
  h+=T(izq+90,166,"↑ ergosterol","v-s","end");
  [-40,0,40].forEach(function(dx,i){
    h+='<g class="'+A(d,[[0,"opacity:0;"+tr(0,-40)],[2+i*2,"opacity:1;"+tr(0,-40)],[18+i*2,"opacity:1;"+tr(0,0)],[100,"opacity:1;"+tr(0,0)]])+'">'+hexa(izq+dx,96,"--mov-xilema")+"</g>";
    h+='<g class="'+A(d,[[0,"opacity:0;"+tr(0,-40)],[2+i*2,"opacity:1;"+tr(0,-40)],[18+i*2,"opacity:1;"+tr(0,0)],[26+i*2,"opacity:1;"+tr(dx/2,-30)],[34+i*2,"opacity:0;"+tr(dx,-46)],[100,"opacity:0;"+tr(dx,-46)]])+'">'+hexa(der+dx,96,"--mov-xilema")+"</g>";
    h+='<rect class="'+S(d,42+i*3,100)+'" x="'+(izq+dx-7)+'" y="106" width="14" height="46"'+fill("--surface")+"></rect>";
    h+='<g class="'+A(d,[[0,"opacity:0;"+tr(0,-50)],[58+i*3,"opacity:0;"+tr(0,-50)],[60+i*3,"opacity:1;"+tr(0,-50)],[72+i*3,"opacity:1;"+tr(0,0)],[100,"opacity:1;"+tr(0,0)]])+'">'+rombo(der+dx,94,"--mov-ambi")+"</g>";
  });
  h+='<g class="'+S(d,48,100)+'">'+T(izq,186,"✕ Se rompe la membrana","v-t v-hot","middle")+"</g>";
  h+='<g class="'+S(d,34,56)+'">'+T(der,186,"Nada que bloquear","v-t","middle")+"</g>";
  h+='<g class="'+S(d,76,100)+'">'+T(der,186,"✓ KURAX PRO sí actúa","v-t v-ok","middle")+"</g>";
  h+=hexa(120,220,"--mov-xilema")+T(132,224,"triazol","v-s")+rombo(232,220,"--mov-ambi")+T(244,224,"anti-oomiceto","v-s");
  return h+"</svg>";
}

/* ---------- tarjetas de video ---------- */
function vidCard(o){
  return '<figure class="vid'+(o.cls?" "+o.cls:"")+'" id="'+o.id+'" style="--rest:-'+o.rest+'s">'
    +'<div class="vid-top"><span class="vid-n">Mini-video '+o.n+'</span><h3>'+o.t+"</h3></div>"
    +o.body
    +'<div class="vid-ctl js-only"><button type="button" class="btn sm" data-v="pausa" aria-pressed="false">Pausar</button><button type="button" class="btn sm ghost" data-v="repetir">Repetir</button><span>'+o.d+" s · en bucle</span></div>"
    +"<figcaption>"+o.cap+"</figcaption></figure>";
}
function videoRutas(){
  var esc5=[["contacto","Contacto",escenaContacto(),"La gota se queda en la cutícula. La lluvia la lava y la hoja que sale después queda sin protección. La plaga del envés no recibe nada.","Volumen alto, boquilla fina y llegar al envés. MANCONEX, CLOROPAZ, piretroides, LIMPION."],
    ["translam","Translaminar",escenaTranslam(),"Cruza el grosor de la hoja y forma un depósito adentro. Alcanza al ácaro y al minador del envés, pero no viaja a otras hojas.","Al atardecer y con coadyuvante. ROMECTIN, MULTA, EVASOR, TENAZ."],
    ["xilema","Xilema",escenaSistemica(false),"Entra al haz vascular y sube con el agua hacia la hoja nueva. Nunca baja.","Protege el brote que viene y sirve en drench, pero no cura la raíz. TIOXAM, METELON, triazoles."],
    ["ambi","Xilema + floema",escenaSistemica(true),"Entra al floema y viaja hacia donde van los azúcares: brotes, frutos, raíz y rizoma.","Lo único que mata el rizoma de una perenne o lleva el fungicida a la raíz. PROTECSOL, STOP West, hormonales."],
    ["suelo","Suelo",escenaSuelo(),"Actúa en el suelo: forma una capa que frena la plántula al germinar, o entra por la raíz y sube.","Sin humedad no se activa y si remueves el suelo rompes la capa. TRIASOL, KANERO, DESMALEXE."]];
  var h=esc5.map(function(e,i){ return '<input type="radio" name="v1r" id="v1-'+e[0]+'" class="vr"'+(i===0?" checked":"")+">"; }).join("");
  h+='<div class="vtabs">'+esc5.map(function(e){ return '<label for="v1-'+e[0]+'" style="--mc:var('+MOV[e[0]==="suelo"?"raiz":e[0]].v+')"><i></i>'+e[1]+"</label>"; }).join("")+"</div>";
  h+='<div class="vid-stage">'+esc5.map(function(e){ return '<div class="scene s-'+e[0]+'">'+e[2]+'<p class="sc-cap">'+e[3]+' <b>En campo:</b> '+e[4]+"</p></div>"; }).join("")+"</div>";
  return vidCard({id:"v-rutas",n:1,t:"Cómo viaja la gota dentro de la planta",d:"7–8",rest:5.6,body:h,cls:"v-wide",
    cap:"<p>Escoge una ruta. Cada producto del portafolio viaja por una de estas cinco, y eso decide dónde tiene que caer la gota y qué plaga alcanza.</p>"});
}
function videosTodos(){
  return [
    videoRutas(),
    vidCard({id:"v-cerradura",n:2,t:"La cerradura y las llaves: por qué se cruzan",d:12,rest:5.2,body:'<div class="vid-stage">'+videoCerradura()+"</div>",
      cap:"<p>El sitio de acción es la cerradura y cada molécula es una llave. Thiametoxam, imidacloprid y dinotefuran son llaves distintas de la misma cerradura (IRAC 4). Cuando la plaga cambia esa cerradura, las tres fallan juntas.</p><p class=\"campo\"><b>En campo:</b> rotar es cambiar de número de grupo. Cambiar de marca dentro del mismo grupo es usar otra llave en la misma cerradura.</p>"}),
    vidCard({id:"v-poblacion",n:3,t:"Repetir o rotar: cómo nace la resistencia",d:15,rest:13,body:'<div class="vid-stage">'+videoPoblacion()+"</div>",
      cap:"<p>En toda población hay unos pocos individuos que ya resisten. Si repites el mismo grupo, sobreviven solo ellos y en dos generaciones son mayoría. Si cambias de grupo, el segundo los mata.</p><p class=\"campo\"><b>En campo:</b> «ya no me sirve» casi siempre es esto. La salida no es subir la dosis, es cambiar de número.</p>"}),
    vidCard({id:"v-canal",n:4,t:"Mismo canal, distinto sitio",d:8,rest:3,body:'<div class="vid-stage">'+videoCanal()+"</div>",
      cap:"<p>Los piretroides (IRAC 3) dejan abierto el canal de sodio y el nervio descarga sin parar. El indoxacarb de ESE O ESE (IRAC 22) lo tapa por dentro, en otro sitio. Por eso la resistencia kdr de los piretroides no le afecta.</p><p class=\"campo\"><b>En campo:</b> donde los piretroides ya fallan contra lepidópteros, ESE O ESE sí es rotación.</p>"}),
    vidCard({id:"v-glifosato",n:5,t:"Glifosato o glufosinato en una maleza perenne",d:12,rest:10.5,body:'<div class="vid-stage">'+videoGlifosato()+"</div>",
      cap:"<p>El glifosato baja por el floema hasta el rizoma y mata la planta completa, aunque tarda. El glufosinato quema rápido lo que mojó, pero no baja: la maleza rebrota desde el rizoma.</p><p class=\"campo\"><b>En campo:</b> glufosinato para limpiar rápido y sembrar pronto; glifosato para acabar con la perenne.</p>"}),
    vidCard({id:"v-sitio",n:6,t:"Sitio único o multisitio",d:11,rest:9.5,body:'<div class="vid-stage">'+videoSitio()+"</div>",
      cap:"<p>Un fungicida de sitio único se pega a una sola enzima: si el hongo la cambia, vuelve a crecer. Un multisitio se pega a muchas; cambiar una no le alcanza al hongo.</p><p class=\"campo\"><b>En campo:</b> por eso MANCONEX o CLOROPAZ acompañan a cada estrobilurina, triazol o SDHI.</p>"}),
    vidCard({id:"v-oomiceto",n:7,t:"Hongo verdadero u oomiceto",d:10,rest:8.5,body:'<div class="vid-stage">'+videoOomiceto()+"</div>",
      cap:"<p>El triazol bloquea la síntesis de ergosterol y la membrana del hongo se rompe. Los oomicetos (Phytophthora, Pythium, mildeos vellosos) no usan ergosterol: el triazol no tiene nada que bloquear.</p><p class=\"campo\"><b>En campo:</b> gota, mildeo velloso o damping-off piden KURAX PRO o PROTECSOL, nunca un triazol solo.</p>"})
  ].join("");
}
