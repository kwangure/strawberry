import{af as m}from"./index-2f8740a7.js";function d(o){const t=o-1;return t*t*t+1}function $(o,{delay:t=0,duration:n=400,easing:s=m}={}){const a=+getComputedStyle(o).opacity;return{delay:t,duration:n,easing:s,css:c=>`opacity: ${c*a}`}}function g(o,{delay:t=0,duration:n=400,easing:s=d,x:a=0,y:c=0,opacity:i=0}={}){const r=getComputedStyle(o),e=+r.opacity,p=r.transform==="none"?"":r.transform,u=e*(1-i);return{delay:t,duration:n,easing:s,css:(f,y)=>`
			transform: ${p} translate(${(1-f)*a}px, ${(1-f)*c}px);
			opacity: ${e-u*y}`}}export{g as a,d as c,$ as f};
