import{S as E,i as z,s as S,e as g,t as V,k as P,j as k,c as $,a as y,g as B,d as u,n as J,m as w,b as j,f as C,H as h,o as D,_ as U,h as Y,x as m,U as F,a6 as T,a7 as q,u as p,v as I,l as H,r as G,w as K,a8 as L,a9 as M,Y as Q,aa as R,ab as W,ac as X}from"../../chunks/vendor-d49c0083.js";import{B as Z}from"../../chunks/Tabs.svelte_svelte_type_style_lang-471159a0.js";import{C as x}from"../../chunks/component-086765e4.js";import{I as ee}from"../../chunks/Path-fb573547.js";import"../../chunks/forward-events-e4dd3255.js";import"../../chunks/JavaScript.svelte_svelte_type_style_lang-abfc83d5.js";function O(s){let t,i,e,n,o,l,c,a,r,d,v;return c=new ee({props:{path:M}}),{c(){t=g("div"),i=g("div"),e=g("div"),n=V(s[2]),o=P(),l=g("div"),k(c.$$.fragment),this.h()},l(f){t=$(f,"DIV",{class:!0});var _=y(t);i=$(_,"DIV",{class:!0});var b=y(i);e=$(b,"DIV",{class:!0});var N=y(e);n=B(N,s[2]),N.forEach(u),o=J(b),l=$(b,"DIV",{class:!0});var A=y(l);w(c.$$.fragment,A),A.forEach(u),b.forEach(u),_.forEach(u),this.h()},h(){j(e,"class","message svelte-ch5fz7"),j(l,"class","close svelte-ch5fz7"),j(i,"class","notification svelte-ch5fz7"),j(t,"class","berry-notification wrapper svelte-ch5fz7")},m(f,_){C(f,t,_),h(t,i),h(i,e),h(e,n),h(i,o),h(i,l),D(c,l,null),r=!0,d||(v=U(l,"click",s[3]),d=!0)},p(f,_){s=f,(!r||_&4)&&Y(n,s[2])},i(f){r||(m(c.$$.fragment,f),F(()=>{a||(a=T(i,q,{x:200,duration:s[1]},!0)),a.run(1)}),r=!0)},o(f){p(c.$$.fragment,f),a||(a=T(i,q,{x:200,duration:s[1]},!1)),a.run(0),r=!1},d(f){f&&u(t),I(c),f&&a&&a.end(),d=!1,v()}}}function te(s){let t,i,e=s[0]&&O(s);return{c(){e&&e.c(),t=H()},l(n){e&&e.l(n),t=H()},m(n,o){e&&e.m(n,o),C(n,t,o),i=!0},p(n,[o]){n[0]?e?(e.p(n,o),o&1&&m(e,1)):(e=O(n),e.c(),m(e,1),e.m(t.parentNode,t)):e&&(G(),p(e,1,1,()=>{e=null}),K())},i(n){i||(m(e),i=!0)},o(n){p(e),i=!1},d(n){e&&e.d(n),n&&u(t)}}}const ie=JSON.parse('{"name":"Notification","slots":[],"description":"","props":[{"kind":"let","name":"removeAfter","optional":true,"value":4000},{"kind":"let","name":"duration","optional":true,"value":500},{"kind":"let","name":"visible","optional":true,"value":false},{"kind":"let","name":"message","optional":false}],"exports":[{"kind":"const","name":"docs","optional":true,"value":true}],"customProperties":[{"property":"--br-notification-padding-block","value":" ","cssDoc":null},{"property":"--br-notification-padding-inline","value":" ","cssDoc":null}]}');function ne(s,t,i){const e=L();let{removeAfter:n=4e3}=t,{duration:o=500}=t,{visible:l=!1}=t,{message:c}=t;function a(){i(0,l=!1),e("dismiss")}return s.$$set=r=>{"removeAfter"in r&&i(4,n=r.removeAfter),"duration"in r&&i(1,o=r.duration),"visible"in r&&i(0,l=r.visible),"message"in r&&i(2,c=r.message)},s.$$.update=()=>{s.$$.dirty&17&&l&&n&&setTimeout(()=>{i(0,l=!1)},n)},[l,o,c,a,n]}class se extends E{constructor(t){super();z(this,t,ne,te,S,{removeAfter:4,duration:1,visible:0,message:2})}}const ae={main:ie};function oe(s){let t;return{c(){t=V("Click to show notification")},l(i){t=B(i,"Click to show notification")},m(i,e){C(i,t,e)},d(i){i&&u(t)}}}function re(s){let t,i,e,n,o;t=new Z({props:{primary:!0,$$slots:{default:[oe]},$$scope:{ctx:s}}}),t.$on("click",function(){Q(s[1])&&s[1].apply(this,arguments)});function l(a){s[2](a)}let c={message:"Prepare yee the way!"};return s[0]!==void 0&&(c.visible=s[0]),e=new se({props:c}),R.push(()=>W(e,"visible",l)),{c(){k(t.$$.fragment),i=P(),k(e.$$.fragment)},l(a){w(t.$$.fragment,a),i=J(a),w(e.$$.fragment,a)},m(a,r){D(t,a,r),C(a,i,r),D(e,a,r),o=!0},p(a,r){s=a;const d={};r&8&&(d.$$scope={dirty:r,ctx:s}),t.$set(d);const v={};!n&&r&1&&(n=!0,v.visible=s[0],X(()=>n=!1)),e.$set(v)},i(a){o||(m(t.$$.fragment,a),m(e.$$.fragment,a),o=!0)},o(a){p(t.$$.fragment,a),p(e.$$.fragment,a),o=!1},d(a){I(t,a),a&&u(i),I(e,a)}}}function le(s){let t,i;return t=new x({props:{docs:ae,$$slots:{inline:[re]},$$scope:{ctx:s}}}),{c(){k(t.$$.fragment)},l(e){w(t.$$.fragment,e)},m(e,n){D(t,e,n),i=!0},p(e,[n]){const o={};n&11&&(o.$$scope={dirty:n,ctx:e}),t.$set(o)},i(e){i||(m(t.$$.fragment,e),i=!0)},o(e){p(t.$$.fragment,e),i=!1},d(e){I(t,e)}}}function ce(s,t,i){let e,n;function o(l){n=l,i(0,n)}return s.$$.update=()=>{s.$$.dirty&1&&i(1,e=n?()=>{}:()=>{i(0,n=!0)})},[n,e,o]}class ve extends E{constructor(t){super();z(this,t,ce,le,S,{})}}export{ve as default};
