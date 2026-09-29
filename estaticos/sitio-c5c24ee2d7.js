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
