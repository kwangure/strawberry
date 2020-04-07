!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).Steps=e()}(this,(function(){"use strict";function t(){}function e(t,e){for(const n in e)t[n]=e[n];return t}function n(t){return t()}function o(){return Object.create(null)}function i(t){t.forEach(n)}function r(t){return"function"==typeof t}function s(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function c(t,e){t.appendChild(e)}function l(t,e,n){t.insertBefore(e,n||null)}function a(t){t.parentNode.removeChild(t)}function u(t){return document.createElement(t)}function f(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function p(t){return document.createTextNode(t)}function d(){return p(" ")}function h(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function $(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function g(t,e){for(const n in e)$(t,n,e[n])}function m(t,e,n,o){t.style.setProperty(e,n,o?"important":"")}function v(t,e,n){t.classList[n?"add":"remove"](e)}let x;function b(t){x=t}function y(){const t=function(){if(!x)throw new Error("Function called outside component initialization");return x}();return(e,n)=>{const o=t.$$.callbacks[e];if(o){const i=function(t,e){const n=document.createEvent("CustomEvent");return n.initCustomEvent(t,!1,!1,e),n}(e,n);o.slice().forEach(e=>{e.call(t,i)})}}}function w(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(t=>t(e))}const k=[],z=[],E=[],L=[],_=Promise.resolve();let C=!1;function I(t){E.push(t)}let A=!1;const M=new Set;function R(){if(!A){A=!0;do{for(let t=0;t<k.length;t+=1){const e=k[t];b(e),T(e.$$)}for(k.length=0;z.length;)z.pop()();for(let t=0;t<E.length;t+=1){const e=E[t];M.has(e)||(M.add(e),e())}E.length=0}while(k.length);for(;L.length;)L.pop()();C=!1,A=!1,M.clear()}}function T(t){if(null!==t.fragment){t.update(),i(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(I)}}const H=new Set;let S,j;function N(){S={r:0,c:[],p:S}}function B(){S.r||i(S.c),S=S.p}function P(t,e){t&&t.i&&(H.delete(t),t.i(e))}function O(t,e,n,o){if(t&&t.o){if(H.has(t))return;H.add(t),S.c.push(()=>{H.delete(t),o&&(n&&t.d(1),o())}),t.o(e)}}function q(t){t&&t.c()}function F(t,e,o){const{fragment:s,on_mount:c,on_destroy:l,after_update:a}=t.$$;s&&s.m(e,o),I(()=>{const e=c.map(n).filter(r);l?l.push(...e):i(e),t.$$.on_mount=[]}),a.forEach(I)}function U(t,e){const n=t.$$;null!==n.fragment&&(i(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function X(t,e){-1===t.$$.dirty[0]&&(k.push(t),C||(C=!0,_.then(R)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Y(e,n,r,s,c,l,u=[-1]){const f=x;b(e);const p=n.props||{},d=e.$$={fragment:null,ctx:null,props:l,update:t,not_equal:c,bound:o(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(f?f.$$.context:[]),callbacks:o(),dirty:u};let h=!1;if(d.ctx=r?r(e,p,(t,n,...o)=>{const i=o.length?o[0]:n;return d.ctx&&c(d.ctx[t],d.ctx[t]=i)&&(d.bound[t]&&d.bound[t](i),h&&X(e,t)),n}):[],d.update(),h=!0,i(d.before_update),d.fragment=!!s&&s(d.ctx),n.target){if(n.hydrate){const t=function(t){return Array.from(t.childNodes)}(n.target);d.fragment&&d.fragment.l(t),t.forEach(a)}else d.fragment&&d.fragment.c();n.intro&&P(e.$$.fragment),F(e,n.target,n.anchor),R()}b(f)}function Z(e){let n,o,r,s,u,p,d;return{c(){n=f("svg"),o=f("path"),s=f("slot"),this.c=t,$(o,"d",e[2]),$(o,"fill",r=e[3]||"currentColor"),$(n,"height",u=""+(e[0]+e[1])),m(n,"transform","rotate("+e[4]+"deg)"),$(n,"viewBox","0 0 24 24"),$(n,"width",p=""+(e[0]+e[1])),v(n,"horizontal",e[5]),v(n,"vertical",e[6]),v(n,"clockwise",e[7]),v(n,"counterclockwise",e[8])},m(t,r,a){l(t,n,r),c(n,o),c(n,s),a&&i(d),d=[h(n,"click",e[11]),h(n,"dblclick",e[12])]},p(t,[e]){4&e&&$(o,"d",t[2]),8&e&&r!==(r=t[3]||"currentColor")&&$(o,"fill",r),3&e&&u!==(u=""+(t[0]+t[1]))&&$(n,"height",u),16&e&&m(n,"transform","rotate("+t[4]+"deg)"),3&e&&p!==(p=""+(t[0]+t[1]))&&$(n,"width",p),32&e&&v(n,"horizontal",t[5]),64&e&&v(n,"vertical",t[6]),128&e&&v(n,"clockwise",t[7]),256&e&&v(n,"counterclockwise",t[8])},i:t,o:t,d(t){t&&a(n),i(d)}}}function D(t){return"clockwise"===t||"counterclockwise"===t}function G(t){return"horizontal"===t||"vertical"===t}function J(t,e,n){let o,i,r,s,{size:c=24}=e,{units:l="px"}=e,{path:a=""}=e,{flip:u=""}=e,{spin:f=""}=e,{color:p=""}=e,{rotate:d=0}=e;return t.$set=t=>{"size"in t&&n(0,c=t.size),"units"in t&&n(1,l=t.units),"path"in t&&n(2,a=t.path),"flip"in t&&n(9,u=t.flip),"spin"in t&&n(10,f=t.spin),"color"in t&&n(3,p=t.color),"rotate"in t&&n(4,d=t.rotate)},t.$$.update=()=>{512&t.$$.dirty&&n(5,o=G(u)&&"horizontal"===u),512&t.$$.dirty&&n(6,i=G(u)&&"vertical"===u),1024&t.$$.dirty&&n(7,r=D(f)&&"clockwise"===f),1024&t.$$.dirty&&n(8,s=D(f)&&"counterclockwise"===f)},[c,l,a,p,d,o,i,r,s,u,f,function(e){w(t,e)},function(e){w(t,e)}]}"function"==typeof HTMLElement&&(j=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){for(const t in this.$$.slotted)this.appendChild(this.$$.slotted[t])}attributeChangedCallback(t,e,n){this[t]=n}$destroy(){U(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}});class K extends j{constructor(t){super(),this.shadowRoot.innerHTML="<style>*,:host *{box-sizing:border-box}svg.horizontal{transform:scaleX(-1)}svg.vertical{transform:scaleY(-1)}svg.clockwise{-webkit-animation:clockwise 2s linear infinite;animation:clockwise 2s linear infinite}@-webkit-keyframes clockwise{0%{transform:rotate(0deg)}to{transform:rotate(359deg)}}@keyframes clockwise{0%{transform:rotate(0deg)}to{transform:rotate(359deg)}}svg.counterclockwise{-webkit-animation:counterclockwise 2s linear infinite;animation:counterclockwise 2s linear infinite}@-webkit-keyframes counterclockwise{0%{transform:rotate(359deg)}to{transform:rotate(0deg)}}@keyframes counterclockwise{0%{transform:rotate(359deg)}to{transform:rotate(0deg)}}</style>",Y(this,{target:this.shadowRoot},J,Z,s,{size:0,units:1,path:2,flip:9,spin:10,color:3,rotate:4}),t&&(t.target&&l(t.target,this,t.anchor),t.props&&(this.$set(t.props),R()))}static get observedAttributes(){return["size","units","path","flip","spin","color","rotate"]}get size(){return this.$$.ctx[0]}set size(t){this.$set({size:t}),R()}get units(){return this.$$.ctx[1]}set units(t){this.$set({units:t}),R()}get path(){return this.$$.ctx[2]}set path(t){this.$set({path:t}),R()}get flip(){return this.$$.ctx[9]}set flip(t){this.$set({flip:t}),R()}get spin(){return this.$$.ctx[10]}set spin(t){this.$set({spin:t}),R()}get color(){return this.$$.ctx[3]}set color(t){this.$set({color:t}),R()}get rotate(){return this.$$.ctx[4]}set rotate(t){this.$set({rotate:t}),R()}}function Q(n){let o,i=[{d:n[0]},{fill:n[1]},n[2]],r={};for(let t=0;t<i.length;t+=1)r=e(r,i[t]);return{c(){o=f("path"),this.c=t,g(o,r)},m(t,e){l(t,o,e)},p(t,[e]){g(o,function(t,e){const n={},o={},i={$$scope:1};let r=t.length;for(;r--;){const s=t[r],c=e[r];if(c){for(const t in s)t in c||(o[t]=1);for(const t in c)i[t]||(n[t]=c[t],i[t]=1);t[r]=c}else for(const t in s)i[t]=1}for(const t in o)t in n||(n[t]=void 0);return n}(i,[1&e&&{d:t[0]},2&e&&{fill:t[1]},4&e&&t[2]]))},i:t,o:t,d(t){t&&a(o)}}}function V(t,e,n){let{d:o}=e,{fill:i="currentColor"}=e,{props:r={}}=e;return t.$set=t=>{"d"in t&&n(0,o=t.d),"fill"in t&&n(1,i=t.fill),"props"in t&&n(2,r=t.props)},[o,i,r]}customElements.define("berry-icon",K);class W extends j{constructor(t){super(),Y(this,{target:this.shadowRoot},V,Q,s,{d:0,fill:1,props:2}),t&&(t.target&&l(t.target,this,t.anchor),t.props&&(this.$set(t.props),R()))}static get observedAttributes(){return["d","fill","props"]}get d(){return this.$$.ctx[0]}set d(t){this.$set({d:t}),R()}get fill(){return this.$$.ctx[1]}set fill(t){this.$set({fill:t}),R()}get props(){return this.$$.ctx[2]}set props(t){this.$set({props:t}),R()}}customElements.define("berry-icon-path",W),K.Path=W;var tt="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z";function et(e){let n;return{c(){n=p(e[3])},m(t,e){l(t,n,e)},p(t,e){8&e&&function(t,e){e=""+e,t.data!==e&&(t.data=e)}(n,t[3])},i:t,o:t,d(t){t&&a(n)}}}function nt(e){let n;const o=new K({props:{path:tt}});return{c(){q(o.$$.fragment)},m(t,e){F(o,t,e),n=!0},p:t,i(t){n||(P(o.$$.fragment,t),n=!0)},o(t){O(o.$$.fragment,t),n=!1},d(t){U(o,t)}}}function ot(e){let n,o,i,r,s,f,p,g;const m=[nt,et],x=[];function b(t,e){return t[2]?0:1}return i=b(e),r=x[i]=m[i](e),{c(){n=u("div"),o=u("span"),r.c(),s=d(),f=u("slot"),this.c=t,$(o,"class","progress-label"),v(o,"active",e[1]),$(n,"class","step-item"),v(n,"active",e[1]),v(n,"vertical",e[0])},m(t,r,a){l(t,n,r),c(n,o),x[i].m(o,null),c(n,s),c(n,f),p=!0,a&&g(),g=h(n,"click",e[4])},p(t,[e]){let s=i;i=b(t),i===s?x[i].p(t,e):(N(),O(x[s],1,1,()=>{x[s]=null}),B(),r=x[i],r||(r=x[i]=m[i](t),r.c()),P(r,1),r.m(o,null)),2&e&&v(o,"active",t[1]),2&e&&v(n,"active",t[1]),1&e&&v(n,"vertical",t[0])},i(t){p||(P(r),p=!0)},o(t){O(r),p=!1},d(t){t&&a(n),x[i].d(),g()}}}function it(t,e,n){let{vertical:o=!1}=e,{active:i=!1}=e,{completed:r=!1}=e,{position:s}=e;return t.$set=t=>{"vertical"in t&&n(0,o=t.vertical),"active"in t&&n(1,i=t.active),"completed"in t&&n(2,r=t.completed),"position"in t&&n(3,s=t.position)},[o,i,r,s,function(e){w(t,e)}]}class rt extends j{constructor(t){super(),this.shadowRoot.innerHTML="<style>*,:host *{box-sizing:border-box}.step-item{cursor:pointer;background-color:transparent;position:relative;display:flex;align-items:center;flex:auto;min-height:40px;line-height:24px;padding:8px 12px;border-radius:4px}.step-item.active{background-color:#dcebff;color:#196eff}.step-item+.step-item{margin-left:10px}.progress-label{display:flex;align-items:center;justify-content:center;min-width:35px;height:35px;border-radius:50%;background-color:#fff;color:#196eff;border:2px solid #196eff}.progress-label.active{background-color:#196eff;color:#fff}</style>",Y(this,{target:this.shadowRoot},it,ot,s,{vertical:0,active:1,completed:2,position:3}),t&&(t.target&&l(t.target,this,t.anchor),t.props&&(this.$set(t.props),R()))}static get observedAttributes(){return["vertical","active","completed","position"]}get vertical(){return this.$$.ctx[0]}set vertical(t){this.$set({vertical:t}),R()}get active(){return this.$$.ctx[1]}set active(t){this.$set({active:t}),R()}get completed(){return this.$$.ctx[2]}set completed(t){this.$set({completed:t}),R()}get position(){return this.$$.ctx[3]}set position(t){this.$set({position:t}),R()}}function st(t,e,n){const o=t.slice();return o[8]=e[n],o[10]=n,o}function ct(t){let e,n,o;return{c(){e=u("slot"),o=d(),$(e,"name","step"),$(e,"step",n={...t[8],active:t[0]===t[10],completed:t[0]>t[10],index:t[10]})},m(t,n){l(t,e,n),l(t,o,n)},p(t,o){3&o&&n!==(n={...t[8],active:t[0]===t[10],completed:t[0]>t[10],index:t[10]})&&$(e,"step",n)},d(t){t&&a(e),t&&a(o)}}}function lt(t){let e;const n=new rt({props:{active:t[0]===t[10],completed:t[0]>t[10],position:t[10]+1,$$slots:{default:[ct]},$$scope:{ctx:t}}});return n.$on("click",(function(...e){return t[7](t[10],...e)})),{c(){q(n.$$.fragment)},m(t,o){F(n,t,o),e=!0},p(e,o){t=e;const i={};1&o&&(i.active=t[0]===t[10]),1&o&&(i.completed=t[0]>t[10]),2051&o&&(i.$$scope={dirty:o,ctx:t}),n.$set(i)},i(t){e||(P(n.$$.fragment,t),e=!0)},o(t){O(n.$$.fragment,t),e=!1},d(t){U(n,t)}}}function at(e){let n,o,i,r,s,f,p=e[1],h=[];for(let t=0;t<p.length;t+=1)h[t]=lt(st(e,p,t));const g=t=>O(h[t],1,1,()=>{h[t]=null});return{c(){n=u("div"),o=u("div");for(let t=0;t<h.length;t+=1)h[t].c();i=d(),r=u("div"),s=u("slot"),this.c=t,$(o,"class","steps"),v(o,"horizontal",e[2]),v(o,"vertical",e[3]),$(s,"name","content"),$(s,"activeindex",e[0]),$(r,"class","content"),$(n,"class","wrapper")},m(t,e){l(t,n,e),c(n,o);for(let t=0;t<h.length;t+=1)h[t].m(o,null);c(n,i),c(n,r),c(r,s),f=!0},p(t,[e]){if(19&e){let n;for(p=t[1],n=0;n<p.length;n+=1){const i=st(t,p,n);h[n]?(h[n].p(i,e),P(h[n],1)):(h[n]=lt(i),h[n].c(),P(h[n],1),h[n].m(o,null))}for(N(),n=p.length;n<h.length;n+=1)g(n);B()}4&e&&v(o,"horizontal",t[2]),8&e&&v(o,"vertical",t[3]),(!f||1&e)&&$(s,"activeindex",t[0])},i(t){if(!f){for(let t=0;t<p.length;t+=1)P(h[t]);f=!0}},o(t){h=h.filter(Boolean);for(let t=0;t<h.length;t+=1)O(h[t]);f=!1},d(t){t&&a(n),function(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}(h,t)}}}function ut(t){return["horizontal","vertical"].includes(t)}function ft(t,e,n){let{steps:o=[]}=e,{direction:i="horizontal"}=e,{activeIndex:r=0}=e;const s=y();function c(t){n(0,r=t),s("step",t)}let l,a;return t.$set=t=>{"steps"in t&&n(1,o=t.steps),"direction"in t&&n(5,i=t.direction),"activeIndex"in t&&n(0,r=t.activeIndex)},t.$$.update=()=>{32&t.$$.dirty&&n(2,l=ut(i)),32&t.$$.dirty&&n(3,a=ut(i)),12&t.$$.dirty&&(l||a||(n(2,l=!0),console.warn('Invalid direction. Use "horizontal" or "vertical".')))},[r,o,l,a,c,i,s,t=>c(t)]}customElements.define("berry-steps-item",rt);class pt extends j{constructor(t){super(),this.shadowRoot.innerHTML="<style>*,:host *{box-sizing:border-box}.steps{display:flex}</style>",Y(this,{target:this.shadowRoot},ft,at,s,{steps:1,direction:5,activeIndex:0}),t&&(t.target&&l(t.target,this,t.anchor),t.props&&(this.$set(t.props),R()))}static get observedAttributes(){return["steps","direction","activeIndex"]}get steps(){return this.$$.ctx[1]}set steps(t){this.$set({steps:t}),R()}get direction(){return this.$$.ctx[5]}set direction(t){this.$set({direction:t}),R()}get activeIndex(){return this.$$.ctx[0]}set activeIndex(t){this.$set({activeIndex:t}),R()}}return customElements.define("berry-steps",pt),pt.Item=rt,pt}));
