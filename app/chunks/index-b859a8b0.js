import{_ as t}from"./index-f035eec9.js";function o(t){const o=t-1;return o*o*o+1}function a(o,{delay:a=0,duration:n=400,easing:e=t}={}){const r=+getComputedStyle(o).opacity;return{delay:a,duration:n,easing:e,css:t=>"opacity: "+t*r}}function n(t,{delay:a=0,duration:n=400,easing:e=o,x:r=0,y:i=0,opacity:p=0}={}){const d=getComputedStyle(t),s=+d.opacity,c="none"===d.transform?"":d.transform,g=s*(1-p);return{delay:a,duration:n,easing:e,css:(t,o)=>`\n\t\t\ttransform: ${c} translate(${(1-t)*r}px, ${(1-t)*i}px);\n\t\t\topacity: ${s-g*o}`}}function e(t,{delay:a=0,duration:n=400,easing:e=o}={}){const r=getComputedStyle(t),i=+r.opacity,p=parseFloat(r.height),d=parseFloat(r.paddingTop),s=parseFloat(r.paddingBottom),c=parseFloat(r.marginTop),g=parseFloat(r.marginBottom),m=parseFloat(r.borderTopWidth),l=parseFloat(r.borderBottomWidth);return{delay:a,duration:n,easing:e,css:t=>`overflow: hidden;opacity: ${Math.min(20*t,1)*i};height: ${t*p}px;padding-top: ${t*d}px;padding-bottom: ${t*s}px;margin-top: ${t*c}px;margin-bottom: ${t*g}px;border-top-width: ${t*m}px;border-bottom-width: ${t*l}px;`}}export{a,o as c,n as f,e as s};
