var MYM_MED={"ga4":"G-TWJJ900M9T","ads":"","meta":"","t":{"es":{"texto":"Usamos Google Analytics y, si aceptás, el píxel de Meta, para saber cuántas personas nos visitan y cuántas nos escriben por WhatsApp.","enlace":"Más información","aceptar":"Aceptar","rechazar":"Rechazar","pie":"Cookies"},"pt":{"texto":"Usamos o Google Analytics e, se você aceitar, o pixel da Meta, para saber quantas pessoas nos visitam e quantas nos escrevem pelo WhatsApp.","enlace":"Mais informações","aceptar":"Aceitar","rechazar":"Recusar","pie":"Cookies"}}};
(function(){
var i=document.getElementById('q'),r=document.getElementById('res');
if(!i||!r)return;
var B=i.getAttribute('data-base')||'',L=i.getAttribute('data-lang')||'es',N=i.getAttribute('data-nada')||'',d=null,cargando=false;
function n(s){return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function go(){
if(!d)return;
var q=n(i.value.trim());
if(q.length<2){r.innerHTML='';return}
var t=q.split(/\s+/),o=[];
for(var k=0;k<d.length&&o.length<30;k++){
var s=n(d[k][1])+' '+d[k][0],ok=true;
for(var j=0;j<t.length;j++){if(s.indexOf(t[j])<0){ok=false;break}}
if(ok)o.push(d[k]);
}
r.innerHTML=o.length?o.map(function(a){return '<li><a href="'+B+'/'+L+'/articulo/'+a[0]+'/">'+esc(a[1])+' <small>'+a[0]+'</small></a></li>'}).join(''):'<li class="nada">'+esc(N)+'</li>';
}
function load(){
if(d||cargando)return;
cargando=true;
fetch(B+'/catalogo-'+L+'.json').then(function(x){return x.json()}).then(function(j){d=j;go()}).catch(function(){cargando=false});
}
i.addEventListener('focus',load);
i.addEventListener('input',function(){d?go():load()});
if(i.form)i.form.addEventListener('submit',function(ev){ev.preventDefault();d?go():load();i.focus()});
document.addEventListener('click',function(ev){
var a=ev.target.closest&&ev.target.closest('a[href="#q"]');
if(a){ev.preventDefault();window.scrollTo(0,0);i.focus();return}
if(!i.contains(ev.target)&&!r.contains(ev.target))r.innerHTML=''});
var m=/[?&]q=([^&#]*)/.exec(location.search);
if(m){try{i.value=decodeURIComponent(m[1].replace(/\+/g,' '))}catch(e){}if(i.value)load()}
})();
(function(){
document.documentElement.classList.add("js");
var quieto = matchMedia("(prefers-reduced-motion: reduce)").matches;
var nodos = document.querySelectorAll(".rev,.rev-lista,.pasos");
document.querySelectorAll(".rev-lista").forEach(function(l){
Array.prototype.forEach.call(l.children, function(h, i){ h.style.setProperty("--i", i); });
});
if (quieto || !("IntersectionObserver" in window)) {
nodos.forEach(function(n){ n.classList.add("visto"); });
return;
}
var ob = new IntersectionObserver(function(es){
es.forEach(function(e){
if (!e.isIntersecting) return;
e.target.classList.add("visto"); ob.unobserve(e.target);
});
}, { rootMargin: "0px 0px -8% 0px", threshold: 0 });   // 0: una lista alta (17 rubros) nunca llega al 12 % visible
nodos.forEach(function(n){ ob.observe(n); });
document.querySelectorAll(".hechos b[data-n]").forEach(function(b){
var fin = +b.dataset.n, t0 = null;
b.textContent = 0;
function paso(t){
if (t0 === null) t0 = t;
var p = Math.min(1, (t - t0) / 1100); p = 1 - Math.pow(1 - p, 3);
b.textContent = Math.round(fin * p);
if (p < 1) requestAnimationFrame(paso);
}
setTimeout(function(){ requestAnimationFrame(paso); }, 800);
});
})();
(function(){
var m=document.querySelector('.mapa-toque[data-mapa]');
if(!m)return;
var a=m.querySelector('a');
if(!a)return;
a.addEventListener('click',function(ev){
if(ev.ctrlKey||ev.metaKey||ev.shiftKey||ev.button)return;
ev.preventDefault();
var f=document.createElement('iframe');
f.src=m.getAttribute('data-mapa');
f.title=m.getAttribute('data-titulo')||'Google Maps';
f.setAttribute('referrerpolicy','no-referrer-when-downgrade');
f.setAttribute('allowfullscreen','');
m.innerHTML='';
m.appendChild(f);
f.focus();
});
})();
(function(){
var M=window.MYM_MED;if(!M||!M.ga4)return;
var w=window,d=document,K='mym_consent',fb=0,cart=null,
L=d.documentElement.lang.slice(0,2)=='pt'?'pt':'es',T=M.t[L]||{},G='granted',
S={ad_storage:G,ad_user_data:G,ad_personalization:G,analytics_storage:G};
w.dataLayer=w.dataLayer||[];
function g(){dataLayer.push(arguments)}w.gtag=g;
g('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
g('set','ads_data_redaction',true);
var el=null;try{var v=JSON.parse(localStorage.getItem(K));if(v.v==1&&Date.now()-v.t<31536e6)el=v.e}catch(x){}
if(el=='si')g('consent','update',S);
function meta(){if(fb||!M.meta)return;fb=1;
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(w,d,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init',M.meta);fbq('track','PageView')}
function ver(){if(cart)return;
var q=d.getElementById('q');cart=d.createElement('div');cart.className='cartel';cart.setAttribute('role','region');cart.setAttribute('aria-label','Cookies');
cart.innerHTML='<p></p><div><button type="button" data-c="no"></button><button type="button" class="btn-azul" data-c="si"></button></div>';
var p=cart.firstChild,a=d.createElement('a'),b=cart.getElementsByTagName('button');
p.textContent=T.texto+' ';a.href=(q&&q.getAttribute('data-base')||'')+'/'+L+'/privacidad/';a.textContent=T.enlace;p.appendChild(a);
b[0].textContent=T.rechazar;b[1].textContent=T.aceptar;
cart.onclick=function(ev){var e=ev.target.getAttribute('data-c');if(!e)return;el=e;
try{localStorage.setItem(K,JSON.stringify({v:1,e:e,t:Date.now()}))}catch(x){}
if(e=='si'){g('consent','update',S);meta()}cart.remove();cart=null};
d.body.appendChild(cart)}
function go(){if(go.h)return;go.h=1;
var s=d.createElement('script');s.async=1;s.src='https://www.googletagmanager.com/gtag/js?id='+M.ga4;d.head.appendChild(s);
g('js',new Date());g('config',M.ga4,/mym_debug=1/.test(location.search)?{debug_mode:true}:{});
if(M.ads)g('config',M.ads);if(el=='si')meta();if(!el)ver()}
function tras(){w.requestIdleCallback&&requestIdleCallback(go,{timeout:1500});setTimeout(go,1500)}
d.readyState=='complete'?tras():w.addEventListener('load',tras);
d.addEventListener('click',function(ev){var a=ev.target.closest('a[href]');if(!a)return;
var h=a.getAttribute('href'),t,c;
if(h=='#cookies'){ev.preventDefault();ver();return}
if(h.indexOf('https://wa.me/'))return;
try{t=new URL(h).searchParams.get('text')||''}catch(x){t=''}
c=t.match(/\(c[oó]digo ([^)]+)\)/i);c=c?c[1]:/prensado/i.test(t)?'prensado':'general';
g('event','clic_whatsapp',{codigo:c,idioma:L,lugar:a.closest('.art')?'ficha':a.closest('.barra')?'barra':a.closest('.pie')?'pie':'cuerpo'});
if(w.fbq){fbq('track','Contact',{content_name:c,content_category:'whatsapp'});
if(!(ev.ctrlKey||ev.metaKey||ev.shiftKey||a.target)){ev.preventDefault();setTimeout(function(){location.href=h},250)}}},true)
})();
