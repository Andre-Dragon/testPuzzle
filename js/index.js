"use strict";const appPuzzle=()=>{const e=document.getElementById("app__puzzle"),n=document.getElementById("app__puzzle--lock"),o=document.getElementById("app__shuffle"),t=document.getElementById("app__counter"),T=document.getElementById("app__result--count"),M=document.getElementById("app__result--time"),$=document.getElementById("app__record--count"),P=document.getElementById("app__record--time"),a=Array.from(e.querySelectorAll(".app__puzzle--btn")),r=document.querySelector(".app__rules"),l=document.querySelector(".app__box"),c=document.querySelector(".app__puzzle--public"),i=document.querySelector(".app__record"),u=document.querySelector(".app__record--time"),d=document.querySelector(".app__actual"),s=new Audio("./audio/valid.mp3"),D=new Audio("./audio/no-valid.mp3"),m=new Audio("./audio/won.mp3"),p=new Audio("./audio/record.mp3"),H=new Audio("./audio/start.mp3"),j=document.querySelector(".preloader"),F=document.getElementById("minute"),y=document.getElementById("second"),g=document.getElementById("millisecond"),G=new Array(16).fill(0).map((t,e)=>e+1),x={count:0,maxCount:9999,time:"00:00:00",ms:0,limit:3599990},_=16,K=4,Q=100;let h=!1,v=[],R=null,I=null,f=null,b=0,C=0,S=0,w=null;t.textContent=x.count;const U=()=>{b=0,C=0,S=0,g.textContent=z(S),y.textContent=z(C),F.textContent=z(b)},E=()=>{var t=JSON.parse(localStorage.getItem("data"));$.textContent=t.count,P.textContent=t.time},V=()=>{window.navigator&&window.navigator.vibrate&&navigator.vibrate(100),L(D)},z=t=>t<10?"0"+t:t,k=(t,e)=>t.classList.add(e),A=(t,e)=>t.classList.remove(e),B=t=>{c.textContent=t,k(c,"open"),setTimeout(()=>A(c,"open"),5e3)},W=()=>{x.count<x.maxCount&&(x.count++,t.textContent=x.count)};const L=t=>t.play(),q=t=>t.currentTime=0,X=()=>{59<C&&(b++,F.textContent=z(b),C=0,y.textContent=z(C)),59===b&&59===C&&99===S&&(clearInterval(w),rt())},Y=()=>{S++,g.textContent=z(S),99<S&&(C++,y.textContent=z(C),S=0,g.textContent=z(S)),X()},Z=()=>{var t;x.ms===x.limit&&(B("Лимит по времени исчерпан!"),k(d,"animate-opacity"),U(),x.count=0,x.time="00:00:00",L(m)),localStorage.length<1&&(localStorage.setItem("data",JSON.stringify(x)),E()),1<=localStorage.length&&(E(),localStorage.getItem("data")&&(t=JSON.parse(localStorage.getItem("data")),0<x.count&&0===t.count&&(localStorage.setItem("data",JSON.stringify(x)),E(),B("Рекорд установлен!"),k(i,"animate-opacity"),L(p)),0!==x.count&&x.count<t.count&&(localStorage.setItem("data",JSON.stringify(x)),E(),B("Новый рекорд!"),k(i,"animate-opacity"),L(p)),x.count>=t.count&&0<t.count&&(B("Рекорд не побит!"),k(d,"animate-opacity"),L(m)),x.count===t.count&&x.ms<t.ms&&(localStorage.setItem("data",JSON.stringify(x)),E(),B("Время улучшено!"),k(u,"animate-opacity"),L(p))))},tt=()=>{var t;(t=>{var e=t.flat();for(let t=0;t<G.length;t++)if(e[t]!==G[t])return!1;return!0})(v)?(x.time=`${z(b)}:${z(C)}:`+z(S),x.ms=10*(t=x.time.split(":"))[2]+1e3*t[1]+6e4*t[0],Z(),o.getAttribute("disabled")&&o.removeAttribute("disabled"),clearInterval(w),q(m),T.textContent=x.count,M.textContent=x.time,A(n,"hide"),k(l,"hide"),A(r,"hide"),setTimeout(()=>A(e,"won"),70)):setTimeout(()=>k(e,"won"),70)},et=(t,e,n)=>{t.style.transform=`translate3D(${100*e}%, ${100*n}%, 0)`},N=n=>{for(let e=0;e<n.length;e++)for(let t=0;t<n[e].length;t++){var o=n[e][t],o=a[o-1];et(o,t,e)}tt()},J=(n,o)=>{for(let e=0;e<o.length;e++)for(let t=0;t<o[e].length;t++)if(o[e][t]===n)return{y:e,x:t};return null},nt=(t,e)=>{var n=Math.abs(t.x-e.x),o=Math.abs(t.y-e.y);return!(1!==n&&1!==o||t.x!==e.x&&t.y!==e.y)},O=(t,e,n)=>{var o=n[t.y][t.x];n[t.y][t.x]=n[e.y][e.x],n[e.y][e.x]=o},ot=t=>{var e=J(16,t),n=(({blankCoords:n,matrix:o,blockedCoords:a})=>{const r=[];for(let e=0;e<o.length;e++)for(let t=0;t<o[e].length;t++)!nt({x:t,y:e},n)||a&&a.x===t&&a.y===e||r.push({x:t,y:e});return r})({blankCoords:e,matrix:t,blockedCoords:R}),n=n[Math.floor(Math.random()*n.length)];O(e,n,t),R=e};const at=(t,e)=>{t.y>=v.length||t.y<0||t.x>=v.length||t.x<0||(W(),O(t,e,v),N(v))};e.addEventListener("click",({target:t})=>{var e;h||(t=t.closest(".app__puzzle--btn"))&&(t=Number(t.dataset.matrixId),t=J(t,v),e=J(16,v),t=t,e=e,nt(t,e)?(W(),q(s),L(s),O(t,e,v),N(v)):(q(D),V()))}),o.addEventListener("click",()=>{h||(h=!0,I=0,x.count=0,t.textContent=x.count,c.classList.contains("open")&&A(c,"open"),[i,u,d].forEach(t=>{t.classList.contains("animate-opacity")&&A(t,"animate-opacity")}),clearInterval(f),0===I&&(q(H),L(H),f=setInterval(()=>{ot(v),N(v),o.setAttribute("disabled",!0),(I+=1)>=Q&&(k(n,"hide"),k(r,"hide"),A(l,"hide"),U(),clearInterval(f),clearInterval(w),w=setInterval(Y,10),h=!1)},20)))}),document.body.addEventListener("keydown",t=>{if(!h&&t.key.includes("Arrow")){var e=J(16,v),n={x:e.x,y:e.y},t=t.key.split("Arrow")[1].toLowerCase(),o=n,n=e;switch(t){case"up":o.y+=1;break;case"down":--o.y;break;case"left":o.x+=1;break;case"right":--o.x}at(o,n)}});const rt=()=>{if(a.length<_)throw new Error(`Должно быть ровно ${_} items in HTML`);a[_-1].style.display="none";var t=a.map(t=>Number(t.dataset.matrixId));v=(t=>{const e=[[],[],[],[]];let n=0,o=0;for(var a of t)o>=K&&(n++,o=0),e[n][o]=a,o++;return e})(t),N(v)};setTimeout(()=>{j.classList.contains("hide")||k(j,"hide")},2e3),rt()};appPuzzle();