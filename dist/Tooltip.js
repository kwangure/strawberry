!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).Tooltip=e()}(this,(function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function r(t){t.forEach(e)}function o(t){return"function"==typeof t}function i(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function a(t,e,n){t.insertBefore(e,n||null)}function c(t){t.parentNode.removeChild(t)}function s(t){return document.createElement(t)}function l(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function f(t,e,n){t.classList[n?"add":"remove"](e)}let u;function d(t){u=t}const h=[],p=[],b=[],g=[],$=Promise.resolve();let m=!1;function x(t){b.push(t)}let y=!1;const v=new Set;function k(){if(!y){y=!0;do{for(let t=0;t<h.length;t+=1){const e=h[t];d(e),_(e.$$)}for(h.length=0;p.length;)p.pop()();for(let t=0;t<b.length;t+=1){const e=b[t];v.has(e)||(v.add(e),e())}b.length=0}while(h.length);for(;g.length;)g.pop()();m=!1,y=!1,v.clear()}}function _(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(x)}}const w=new Set;function E(t,e){-1===t.$$.dirty[0]&&(h.push(t),m||(m=!0,$.then(k)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function C(i,a,s,l,f,h,p=[-1]){const b=u;d(i);const g=a.props||{},$=i.$$={fragment:null,ctx:null,props:h,update:t,not_equal:f,bound:n(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(b?b.$$.context:[]),callbacks:n(),dirty:p};let m=!1;if($.ctx=s?s(i,g,(t,e,...n)=>{const r=n.length?n[0]:e;return $.ctx&&f($.ctx[t],$.ctx[t]=r)&&($.bound[t]&&$.bound[t](r),m&&E(i,t)),e}):[],$.update(),m=!0,r($.before_update),$.fragment=!!l&&l($.ctx),a.target){if(a.hydrate){const t=function(t){return Array.from(t.childNodes)}(a.target);$.fragment&&$.fragment.l(t),t.forEach(c)}else $.fragment&&$.fragment.c();a.intro&&((y=i.$$.fragment)&&y.i&&(w.delete(y),y.i(v))),function(t,n,i){const{fragment:a,on_mount:c,on_destroy:s,after_update:l}=t.$$;a&&a.m(n,i),x(()=>{const n=c.map(e).filter(o);s?s.push(...n):r(n),t.$$.on_mount=[]}),l.forEach(x)}(i,a.target,a.anchor),k()}var y,v;d(b)}let A;function j(e){let n,r;return{c(){n=s("span"),r=s("slot"),this.c=t,l(n,"aria-label",e[3]),l(n,"class","berry-tooltip"),f(n,"active",e[3]),f(n,"left",e[1]),f(n,"center",!e[1]&&!e[2]),f(n,"right",e[2]),f(n,"breakParent",e[0])},m(t,e){a(t,n,e),function(t,e){t.appendChild(e)}(n,r)},p(t,[e]){8&e&&l(n,"aria-label",t[3]),8&e&&f(n,"active",t[3]),2&e&&f(n,"left",t[1]),6&e&&f(n,"center",!t[1]&&!t[2]),4&e&&f(n,"right",t[2]),1&e&&f(n,"breakParent",t[0])},i:t,o:t,d(t){t&&c(n)}}}function L(t,e,n){let{break:r=!1}=e,{left:o=!1}=e,{right:i=!1}=e,{label:a=""}=e;return t.$set=t=>{"break"in t&&n(0,r=t.break),"left"in t&&n(1,o=t.left),"right"in t&&n(2,i=t.right),"label"in t&&n(3,a=t.label)},[r,o,i,a]}"function"==typeof HTMLElement&&(A=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){for(const t in this.$$.slotted)this.appendChild(this.$$.slotted[t])}attributeChangedCallback(t,e,n){this[t]=n}$destroy(){!function(t,e){const n=t.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}});class M extends A{constructor(t){super(),this.shadowRoot.innerHTML='<style>*,:host *{box-sizing:border-box}.active{position:relative}.active:after,.active:before{opacity:0;transition:opacity .3s ease-in-out;pointer-events:none;position:absolute;display:block;z-index:300}.active:hover:after,.active:hover:before{opacity:1}.active.breakParent{position:static}.active:before{top:100%;border:solid;border-left-color:transparent;border-bottom-color:#46505a;border-right-color:transparent;border-top-color:#46505a;border-width:0 8px 9px;content:""}.active:after{height:35px;display:flex;align-items:center;justify-content:center;background:#46505a;border-radius:4px;top:calc(100% + 8px);color:#fff;content:attr(aria-label);padding:10px;white-space:nowrap;font-size:12px;text-transform:none;font-weight:400}.active.left:before{left:0}.active.left:after{left:-10px}.active.center:after,.active.center:before{left:50%;transform:translateX(-50%)}.active.right:before{right:0}.active.right:after{right:-10px}</style>',C(this,{target:this.shadowRoot},L,j,i,{break:0,left:1,right:2,label:3}),t&&(t.target&&a(t.target,this,t.anchor),t.props&&(this.$set(t.props),k()))}static get observedAttributes(){return["break","left","right","label"]}get break(){return this.$$.ctx[0]}set break(t){this.$set({break:t}),k()}get left(){return this.$$.ctx[1]}set left(t){this.$set({left:t}),k()}get right(){return this.$$.ctx[2]}set right(t){this.$set({right:t}),k()}get label(){return this.$$.ctx[3]}set label(t){this.$set({label:t}),k()}}return customElements.define("berry-tooltip",M),M}));
