import{S as z,i as I,s as N,e as y,j as P,c as g,a as j,m as A,d,b as k,f as B,o as G,x as h,u as v,v as O,D as V,B as D,k as F,n as U,U as w,N as f,H as E,O as q,r as C,w as H,E as J,F as W,G as K,p as L,V as S,T as M,W as Q}from"./vendor-70f2b995.js";import{c as R}from"./forward-events-fd79329b.js";import{I as X}from"./Path-f1123d98.js";function T(l){let e,s,i;return s=new X({props:{path:l[1]}}),{c(){e=y("span"),P(s.$$.fragment),this.h()},l(o){e=g(o,"SPAN",{class:!0});var r=j(e);A(s.$$.fragment,r),r.forEach(d),this.h()},h(){k(e,"class","button-prefix svelte-3eizjl")},m(o,r){B(o,e,r),G(s,e,null),i=!0},p(o,r){const p={};r&2&&(p.path=o[1]),s.$set(p)},i(o){i||(h(s.$$.fragment,o),i=!0)},o(o){v(s.$$.fragment,o),i=!1},d(o){o&&d(e),O(s)}}}function Y(l){let e,s,i,o,r,p,a=l[1]&&T(l);const _=l[6].default,n=V(_,l,l[5],null);let m=[{class:"berry-button"},l[4]],u={};for(let t=0;t<m.length;t+=1)u=D(u,m[t]);return{c(){e=y("button"),s=y("div"),a&&a.c(),i=F(),n&&n.c(),this.h()},l(t){e=g(t,"BUTTON",{class:!0});var c=j(e);s=g(c,"DIV",{class:!0});var b=j(s);a&&a.l(b),i=U(b),n&&n.l(b),b.forEach(d),c.forEach(d),this.h()},h(){k(s,"class","content-wrapper svelte-3eizjl"),w(e,u),f(e,"primary",l[0]),f(e,"icon",l[1]),f(e,"slot_used",l[3].default),f(e,"svelte-3eizjl",!0)},m(t,c){B(t,e,c),E(e,s),a&&a.m(s,null),E(s,i),n&&n.m(s,null),e.autofocus&&e.focus(),o=!0,r||(p=q(l[2].call(null,e)),r=!0)},p(t,[c]){t[1]?a?(a.p(t,c),c&2&&h(a,1)):(a=T(t),a.c(),h(a,1),a.m(s,i)):a&&(C(),v(a,1,1,()=>{a=null}),H()),n&&n.p&&(!o||c&32)&&J(n,_,t,t[5],o?K(_,t[5],c,null):W(t[5]),null),w(e,u=L(m,[{class:"berry-button"},c&16&&t[4]])),f(e,"primary",t[0]),f(e,"icon",t[1]),f(e,"slot_used",t[3].default),f(e,"svelte-3eizjl",!0)},i(t){o||(h(a),h(n,t),o=!0)},o(t){v(a),v(n,t),o=!1},d(t){t&&d(e),a&&a.d(),n&&n.d(t),r=!1,p()}}}const te=JSON.parse('{"name":"Button","slots":[{"name":"default","htmlDoc":null}],"description":"A button triggers an event or action. They let users know what will happen next.","props":[{"kind":"let","name":"primary","optional":true,"value":false,"jsDoc":{"description":"Indicates whether the button should be coloured using the primary colour.","tags":[{"description":"","name":"","tag":"type","type":"boolean"}]}},{"kind":"let","name":"icon","optional":true,"value":"","jsDoc":{"description":"A \\"d\\" string that is usable in an SVG path element.","tags":[{"description":"","name":"","tag":"type","type":"string"}]}}],"exports":[{"kind":"const","name":"docs","optional":true,"value":true}],"customProperties":[{"property":"--br-button-width","value":" ","cssDoc":null},{"property":"--br-button-height","value":" ","cssDoc":null},{"property":"--br-button-border","value":" ","cssDoc":null},{"property":"--br-button-border-radius","value":" ","cssDoc":null},{"property":"--br-button-text-color","value":" ","cssDoc":null}]}');function Z(l,e,s){const i=["primary","icon"];let o=S(e,i),{$$slots:r={},$$scope:p}=e;const a=M(r);let{primary:_=!1}=e,{icon:n=""}=e;const m=R();return l.$$set=u=>{e=D(D({},e),Q(u)),s(4,o=S(e,i)),"primary"in u&&s(0,_=u.primary),"icon"in u&&s(1,n=u.icon),"$$scope"in u&&s(5,p=u.$$scope)},[_,n,m,a,o,p,r]}class se extends z{constructor(e){super();I(this,e,Z,Y,N,{primary:0,icon:1})}}export{se as B,te as d};
