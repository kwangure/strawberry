import{S as A,i as C,s as G,D as P,j as b,k as y,e as d,m as k,n as w,c as j,a as E,d as $,b as u,o as N,f as c,H as T,E as S,F as D,G as M,x as g,u as v,v as q,t as m,g as _}from"./vendor-5dcc93bd.js";import{T as x,N as F,L}from"./Theme-7e0e4291.js";import{b as h}from"./paths-28a87002.js";function I(f){let t,s,n;return{c(){t=m("\u{1F353} "),s=d("span"),n=m("strawberry"),this.h()},l(a){t=_(a,"\u{1F353} "),s=j(a,"SPAN",{class:!0});var e=E(s);n=_(e,"strawberry"),e.forEach($),this.h()},h(){u(s,"class","text")},m(a,e){c(a,t,e),c(a,s,e),T(s,n)},d(a){a&&$(t),a&&$(s)}}}function V(f){let t;return{c(){t=m("Components")},l(s){t=_(s,"Components")},m(s,n){c(s,t,n)},d(s){s&&$(t)}}}function z(f){let t;return{c(){t=m("Typography")},l(s){t=_(s,"Typography")},m(s,n){c(s,t,n)},d(s){s&&$(t)}}}function B(f){let t,s,n,a;return t=new L({props:{href:""+(h+"/components"),pattern:[`${h}/components`,`${h}/components/*`],$$slots:{default:[V]},$$scope:{ctx:f}}}),n=new L({props:{href:""+(h+"/typography"),pattern:""+(h+"/typography"),$$slots:{default:[z]},$$scope:{ctx:f}}}),{c(){b(t.$$.fragment),s=y(),b(n.$$.fragment)},l(e){k(t.$$.fragment,e),s=w(e),k(n.$$.fragment,e)},m(e,r){N(t,e,r),c(e,s,r),N(n,e,r),a=!0},p(e,r){const i={};r&2&&(i.$$scope={dirty:r,ctx:e}),t.$set(i);const o={};r&2&&(o.$$scope={dirty:r,ctx:e}),n.$set(o)},i(e){a||(g(t.$$.fragment,e),g(n.$$.fragment,e),a=!0)},o(e){v(t.$$.fragment,e),v(n.$$.fragment,e),a=!1},d(e){q(t,e),e&&$(s),q(n,e)}}}function J(f){let t,s,n,a,e;return{c(){t=d("a"),s=m("GitHub"),n=y(),a=d("a"),e=m("NPM"),this.h()},l(r){t=j(r,"A",{class:!0,href:!0,target:!0});var i=E(t);s=_(i,"GitHub"),i.forEach($),n=w(r),a=j(r,"A",{class:!0,href:!0,target:!0});var o=E(a);e=_(o,"NPM"),o.forEach($),this.h()},h(){u(t,"class","cta svelte-1q74s6"),u(t,"href","https://github.com/kwangure/strawberry"),u(t,"target","_blank"),u(a,"class","cta svelte-1q74s6"),u(a,"href","https://www.npmjs.com/package/@kwangure/strawberry"),u(a,"target","_blank")},m(r,i){c(r,t,i),T(t,s),c(r,n,i),c(r,a,i),T(a,e)},d(r){r&&$(t),r&&$(n),r&&$(a)}}}function K(f){let t,s,n,a,e,r;t=new x({}),a=new F({props:{logoHref:""+(h+"/"),$$slots:{actions:[J],links:[B],logo:[I]},$$scope:{ctx:f}}});const i=f[0].default,o=P(i,f,f[1],null);return{c(){b(t.$$.fragment),s=y(),n=d("div"),b(a.$$.fragment),e=y(),o&&o.c(),this.h()},l(l){k(t.$$.fragment,l),s=w(l),n=j(l,"DIV",{class:!0});var p=E(n);k(a.$$.fragment,p),e=w(p),o&&o.l(p),p.forEach($),this.h()},h(){u(n,"class","app-layout svelte-1q74s6")},m(l,p){N(t,l,p),c(l,s,p),c(l,n,p),N(a,n,null),T(n,e),o&&o.m(n,null),r=!0},p(l,[p]){const H={};p&2&&(H.$$scope={dirty:p,ctx:l}),a.$set(H),o&&o.p&&(!r||p&2)&&S(o,i,l,l[1],r?M(i,l[1],p,null):D(l[1]),null)},i(l){r||(g(t.$$.fragment,l),g(a.$$.fragment,l),g(o,l),r=!0)},o(l){v(t.$$.fragment,l),v(a.$$.fragment,l),v(o,l),r=!1},d(l){q(t,l),l&&$(s),l&&$(n),q(a),o&&o.d(l)}}}function O(f,t,s){let{$$slots:n={},$$scope:a}=t;return f.$$set=e=>{"$$scope"in e&&s(1,a=e.$$scope)},[n,a]}class W extends A{constructor(t){super();C(this,t,O,K,G,{})}}export{W as L};
