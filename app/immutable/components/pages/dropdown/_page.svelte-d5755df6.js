import{S as F,i as H,s as L,k as S,l as T,m as j,h as p,n as B,b as l,A as C,v as m,w as c,x as u,f as _,t as g,y as d,q as w,r as h,D as N,a as P,c as x}from"../../../chunks/index-50a5c4be.js";import{C as O,D as U,P as V,I as k}from"../../../chunks/component-756ec2d0.js";/* empty css                              */function W(s){let t;return{c(){t=S("div"),this.h()},l(r){t=T(r,"DIV",{class:!0}),j(t).forEach(p),this.h()},h(){B(t,"class","br-arrow svelte-1pv59d6")},m(r,e){l(r,t,e)},p:C,i:C,o:C,d(r){r&&p(t)}}}class z extends F{constructor(t){super(),H(this,t,null,W,L,{})}}var G="Dropdown",J=[{name:"trigger",htmlDoc:null},{name:"default",htmlDoc:null}],K="Dropdown displays a list of actions or options to a user.",M="src/lib/components/dropdown/dropdown.svelte",Q=[{kind:"let",name:"placement",optional:!0,value:"bottom",jsDoc:{description:"Where to position the popup relative to the reference element.",tags:[{description:"",name:"",tag:"type",type:'"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end"'}]}}],R=[],X=[];const Y={name:G,slots:J,description:K,workingDirectoryFilepath:M,props:Q,exports:R,customProperties:X},Z={main:Y};function y(s){let t;return{c(){t=w("Purple")},l(r){t=h(r,"Purple")},m(r,e){l(r,t,e)},d(r){r&&p(t)}}}function tt(s){let t;return{c(){t=w("Penguin")},l(r){t=h(r,"Penguin")},m(r,e){l(r,t,e)},d(r){r&&p(t)}}}function et(s){let t;return{c(){t=w("Has")},l(r){t=h(r,"Has")},m(r,e){l(r,t,e)},d(r){r&&p(t)}}}function rt(s){let t;return{c(){t=w("Landed")},l(r){t=h(r,"Landed")},m(r,e){l(r,t,e)},d(r){r&&p(t)}}}function nt(s){let t,r,e,o,$,v,f,D,i,b;return t=new z({}),e=new k({props:{$$slots:{default:[y]},$$scope:{ctx:s}}}),$=new k({props:{active:!0,$$slots:{default:[tt]},$$scope:{ctx:s}}}),f=new k({props:{$$slots:{default:[et]},$$scope:{ctx:s}}}),i=new k({props:{$$slots:{default:[rt]},$$scope:{ctx:s}}}),{c(){m(t.$$.fragment),r=P(),m(e.$$.fragment),o=P(),m($.$$.fragment),v=P(),m(f.$$.fragment),D=P(),m(i.$$.fragment)},l(n){c(t.$$.fragment,n),r=x(n),c(e.$$.fragment,n),o=x(n),c($.$$.fragment,n),v=x(n),c(f.$$.fragment,n),D=x(n),c(i.$$.fragment,n)},m(n,a){u(t,n,a),l(n,r,a),u(e,n,a),l(n,o,a),u($,n,a),l(n,v,a),u(f,n,a),l(n,D,a),u(i,n,a),b=!0},p(n,a){const I={};a&1&&(I.$$scope={dirty:a,ctx:n}),e.$set(I);const q={};a&1&&(q.$$scope={dirty:a,ctx:n}),$.$set(q);const A={};a&1&&(A.$$scope={dirty:a,ctx:n}),f.$set(A);const E={};a&1&&(E.$$scope={dirty:a,ctx:n}),i.$set(E)},i(n){b||(_(t.$$.fragment,n),_(e.$$.fragment,n),_($.$$.fragment,n),_(f.$$.fragment,n),_(i.$$.fragment,n),b=!0)},o(n){g(t.$$.fragment,n),g(e.$$.fragment,n),g($.$$.fragment,n),g(f.$$.fragment,n),g(i.$$.fragment,n),b=!1},d(n){d(t,n),n&&p(r),d(e,n),n&&p(o),d($,n),n&&p(v),d(f,n),n&&p(D),d(i,n)}}}function ot(s){let t,r;return t=new V({props:{$$slots:{default:[nt]},$$scope:{ctx:s}}}),{c(){m(t.$$.fragment)},l(e){c(t.$$.fragment,e)},m(e,o){u(t,e,o),r=!0},p(e,o){const $={};o&1&&($.$$scope={dirty:o,ctx:e}),t.$set($)},i(e){r||(_(t.$$.fragment,e),r=!0)},o(e){g(t.$$.fragment,e),r=!1},d(e){d(t,e)}}}function st(s){let t,r;return{c(){t=S("button"),r=w("Click for dropdown"),this.h()},l(e){t=T(e,"BUTTON",{slot:!0});var o=j(t);r=h(o,"Click for dropdown"),o.forEach(p),this.h()},h(){B(t,"slot","trigger")},m(e,o){l(e,t,o),N(t,r)},p:C,d(e){e&&p(t)}}}function at(s){let t,r;return t=new U({props:{$$slots:{trigger:[st],default:[ot]},$$scope:{ctx:s}}}),{c(){m(t.$$.fragment)},l(e){c(t.$$.fragment,e)},m(e,o){u(t,e,o),r=!0},p(e,o){const $={};o&1&&($.$$scope={dirty:o,ctx:e}),t.$set($)},i(e){r||(_(t.$$.fragment,e),r=!0)},o(e){g(t.$$.fragment,e),r=!1},d(e){d(t,e)}}}function $t(s){let t,r;return t=new O({props:{docs:Z,$$slots:{inline:[at]},$$scope:{ctx:s}}}),{c(){m(t.$$.fragment)},l(e){c(t.$$.fragment,e)},m(e,o){u(t,e,o),r=!0},p(e,[o]){const $={};o&1&&($.$$scope={dirty:o,ctx:e}),t.$set($)},i(e){r||(_(t.$$.fragment,e),r=!0)},o(e){g(t.$$.fragment,e),r=!1},d(e){d(t,e)}}}class it extends F{constructor(t){super(),H(this,t,null,$t,L,{})}}export{it as default};