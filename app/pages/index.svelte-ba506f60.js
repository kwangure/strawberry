import{S as U,i as W,s as X,e as f,j as C,k as G,t as v,c as h,a as m,m as M,n as T,g as $,d as n,b as l,f as w,o as V,H as c,x as B,u as q,v as J,J as Y,K as Z}from"../chunks/vendor-9f6e7ae3.js";import{b as K}from"../chunks/paths-28a87002.js";import{B as Q}from"../chunks/Tabs.svelte_svelte_type_style_lang-c76c1b6a.js";import{N as tt}from"../chunks/Navbar-b6ee0e89.js";import"../chunks/forward-events-77cf227d.js";import"../chunks/Path-900721d5.js";function et(g){let e,t,i;return{c(){e=v("\u{1F353} "),t=f("span"),i=v("strawberry"),this.h()},l(s){e=$(s,"\u{1F353} "),t=h(s,"SPAN",{class:!0});var r=m(t);i=$(r,"strawberry"),r.forEach(n),this.h()},h(){l(t,"class","text")},m(s,r){w(s,e,r),w(s,t,r),c(t,i)},d(s){s&&n(e),s&&n(t)}}}function st(g){let e;return{c(){e=v("GitHub")},l(t){e=$(t,"GitHub")},m(t,i){w(t,e,i)},d(t){t&&n(e)}}}function at(g){let e;return{c(){e=v("NPM")},l(t){e=$(t,"NPM")},m(t,i){w(t,e,i)},d(t){t&&n(e)}}}function rt(g){let e,t,i,s,r,y;return t=new Q({props:{icon:Y,$$slots:{default:[st]},$$scope:{ctx:g}}}),r=new Q({props:{icon:Z,$$slots:{default:[at]},$$scope:{ctx:g}}}),{c(){e=f("a"),C(t.$$.fragment),i=G(),s=f("a"),C(r.$$.fragment),this.h()},l(a){e=h(a,"A",{class:!0,href:!0,target:!0});var o=m(e);M(t.$$.fragment,o),o.forEach(n),i=T(a),s=h(a,"A",{class:!0,href:!0,target:!0});var u=m(s);M(r.$$.fragment,u),u.forEach(n),this.h()},h(){l(e,"class","cta svelte-so9ja"),l(e,"href","https://github.com/kwangure/strawberry"),l(e,"target","_blank"),l(s,"class","cta svelte-so9ja"),l(s,"href","https://www.npmjs.com/package/@kwangure/strawberry"),l(s,"target","_blank")},m(a,o){w(a,e,o),V(t,e,null),w(a,i,o),w(a,s,o),V(r,s,null),y=!0},p(a,o){const u={};o&1&&(u.$$scope={dirty:o,ctx:a}),t.$set(u);const _={};o&1&&(_.$$scope={dirty:o,ctx:a}),r.$set(_)},i(a){y||(B(t.$$.fragment,a),B(r.$$.fragment,a),y=!0)},o(a){q(t.$$.fragment,a),q(r.$$.fragment,a),y=!1},d(a){a&&n(e),J(t),a&&n(i),a&&n(s),J(r)}}}function nt(g){let e,t,i,s,r,y,a,o,u,_,x,N,H,j,k,S,A,D,E;return t=new tt({props:{logoHref:""+(K+"/"),$$slots:{"calls-to-action":[rt],logo:[et]},$$scope:{ctx:g}}}),{c(){e=f("div"),C(t.$$.fragment),i=G(),s=f("main"),r=f("h1"),y=v("Strawberry"),a=v(`
        Strawberry is a set of Svelte components.

        `),o=f("div"),u=f("h3"),_=f("a"),x=v("Components"),N=v(`
            Documentation on how to use Strawberry components.`),H=G(),j=f("div"),k=f("h3"),S=f("a"),A=v("Typography"),D=v(`
            See how typography is used in Strawberry.`),this.h()},l(p){e=h(p,"DIV",{class:!0});var d=m(e);M(t.$$.fragment,d),i=T(d),s=h(d,"MAIN",{class:!0});var b=m(s);r=h(b,"H1",{});var R=m(r);y=$(R,"Strawberry"),R.forEach(n),a=$(b,`
        Strawberry is a set of Svelte components.

        `),o=h(b,"DIV",{class:!0});var I=m(o);u=h(I,"H3",{class:!0});var z=m(u);_=h(z,"A",{href:!0,class:!0});var F=m(_);x=$(F,"Components"),F.forEach(n),z.forEach(n),N=$(I,`
            Documentation on how to use Strawberry components.`),I.forEach(n),H=T(b),j=h(b,"DIV",{class:!0});var P=m(j);k=h(P,"H3",{class:!0});var L=m(k);S=h(L,"A",{href:!0,class:!0});var O=m(S);A=$(O,"Typography"),O.forEach(n),L.forEach(n),D=$(P,`
            See how typography is used in Strawberry.`),P.forEach(n),b.forEach(n),d.forEach(n),this.h()},h(){l(_,"href",""+(K+"/components")),l(_,"class","svelte-so9ja"),l(u,"class","svelte-so9ja"),l(o,"class","link svelte-so9ja"),l(S,"href",""+(K+"/typography")),l(S,"class","svelte-so9ja"),l(k,"class","svelte-so9ja"),l(j,"class","link svelte-so9ja"),l(s,"class","svelte-so9ja"),l(e,"class","layout svelte-so9ja")},m(p,d){w(p,e,d),V(t,e,null),c(e,i),c(e,s),c(s,r),c(r,y),c(s,a),c(s,o),c(o,u),c(u,_),c(_,x),c(o,N),c(s,H),c(s,j),c(j,k),c(k,S),c(S,A),c(j,D),E=!0},p(p,[d]){const b={};d&1&&(b.$$scope={dirty:d,ctx:p}),t.$set(b)},i(p){E||(B(t.$$.fragment,p),E=!0)},o(p){q(t.$$.fragment,p),E=!1},d(p){p&&n(e),J(t)}}}class ht extends U{constructor(e){super();W(this,e,null,nt,X,{})}}export{ht as default};
