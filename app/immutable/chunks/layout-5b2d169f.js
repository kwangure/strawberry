import{S as G,i as P,s as S,F as I,w as b,k as y,e as w,x as k,m as d,c as q,a as E,d as $,b as c,y as N,g as m,J as H,G as M,H as j,I as x,q as g,o as v,B as L,t as _,h,E as C}from"./index-9f7629f3.js";import{N as B,L as A}from"./navbar-fd7cf21c.js";import{b as u}from"./paths-1c47712a.js";import{T as D}from"./Theme-2fdbed56.js";function F(f){let t,s,n;return{c(){t=_("\u{1F353} "),s=w("span"),n=_("strawberry"),this.h()},l(a){t=h(a,"\u{1F353} "),s=q(a,"SPAN",{class:!0});var e=E(s);n=h(e,"strawberry"),e.forEach($),this.h()},h(){c(s,"class","text")},m(a,e){m(a,t,e),m(a,s,e),H(s,n)},p:C,d(a){a&&$(t),a&&$(s)}}}function J(f){let t;return{c(){t=_("Components")},l(s){t=h(s,"Components")},m(s,n){m(s,t,n)},d(s){s&&$(t)}}}function V(f){let t;return{c(){t=_("Typography")},l(s){t=h(s,"Typography")},m(s,n){m(s,t,n)},d(s){s&&$(t)}}}function z(f){let t,s,n,a;return t=new A({props:{href:u+"/components",pattern:[`${u}/components`,`${u}/components/*`],$$slots:{default:[J]},$$scope:{ctx:f}}}),n=new A({props:{href:u+"/typography",pattern:u+"/typography",$$slots:{default:[V]},$$scope:{ctx:f}}}),{c(){b(t.$$.fragment),s=y(),b(n.$$.fragment)},l(e){k(t.$$.fragment,e),s=d(e),k(n.$$.fragment,e)},m(e,r){N(t,e,r),m(e,s,r),N(n,e,r),a=!0},p(e,r){const i={};r&2&&(i.$$scope={dirty:r,ctx:e}),t.$set(i);const o={};r&2&&(o.$$scope={dirty:r,ctx:e}),n.$set(o)},i(e){a||(g(t.$$.fragment,e),g(n.$$.fragment,e),a=!0)},o(e){v(t.$$.fragment,e),v(n.$$.fragment,e),a=!1},d(e){L(t,e),e&&$(s),L(n,e)}}}function K(f){let t,s,n,a,e;return{c(){t=w("a"),s=_("GitHub"),n=y(),a=w("a"),e=_("NPM"),this.h()},l(r){t=q(r,"A",{class:!0,href:!0,target:!0});var i=E(t);s=h(i,"GitHub"),i.forEach($),n=d(r),a=q(r,"A",{class:!0,href:!0,target:!0});var o=E(a);e=h(o,"NPM"),o.forEach($),this.h()},h(){c(t,"class","cta svelte-1q74s6"),c(t,"href","https://github.com/kwangure/strawberry"),c(t,"target","_blank"),c(a,"class","cta svelte-1q74s6"),c(a,"href","https://www.npmjs.com/package/@kwangure/strawberry"),c(a,"target","_blank")},m(r,i){m(r,t,i),H(t,s),m(r,n,i),m(r,a,i),H(a,e)},p:C,d(r){r&&$(t),r&&$(n),r&&$(a)}}}function O(f){let t,s,n,a,e,r;t=new D({}),a=new B({props:{logoHref:u+"/",$$slots:{actions:[K],links:[z],logo:[F]},$$scope:{ctx:f}}});const i=f[0].default,o=I(i,f,f[1],null);return{c(){b(t.$$.fragment),s=y(),n=w("div"),b(a.$$.fragment),e=y(),o&&o.c(),this.h()},l(l){k(t.$$.fragment,l),s=d(l),n=q(l,"DIV",{class:!0});var p=E(n);k(a.$$.fragment,p),e=d(p),o&&o.l(p),p.forEach($),this.h()},h(){c(n,"class","app-layout svelte-1q74s6")},m(l,p){N(t,l,p),m(l,s,p),m(l,n,p),N(a,n,null),H(n,e),o&&o.m(n,null),r=!0},p(l,[p]){const T={};p&2&&(T.$$scope={dirty:p,ctx:l}),a.$set(T),o&&o.p&&(!r||p&2)&&M(o,i,l,l[1],r?x(i,l[1],p,null):j(l[1]),null)},i(l){r||(g(t.$$.fragment,l),g(a.$$.fragment,l),g(o,l),r=!0)},o(l){v(t.$$.fragment,l),v(a.$$.fragment,l),v(o,l),r=!1},d(l){L(t,l),l&&$(s),l&&$(n),L(a),o&&o.d(l)}}}function Q(f,t,s){let{$$slots:n={},$$scope:a}=t;return f.$$set=e=>{"$$scope"in e&&s(1,a=e.$$scope)},[n,a]}class Y extends G{constructor(t){super(),P(this,t,Q,O,S,{})}}export{Y as L};
