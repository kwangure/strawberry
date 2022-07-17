import{S as x,i as k,s as C,w as m,x as d,y as u,q as f,o as g,B as $,k as w,e as D,t as h,m as S,c as j,a as W,h as y,d as p,g as b,J as _,E as P}from"../../chunks/index-2f8740a7.js";import{C as v,a as z,b as q}from"../../chunks/svelte-66471546.js";import{C as A}from"../../chunks/component-9a66da4d.js";/* empty css                              */import"../../chunks/forward-events-e3ac3cec.js";import"../../chunks/mdi-f29ca095.js";const E={name:"Code",slots:[],description:"",workingDirectoryFilepath:"src/lib/components/code/code.svelte",props:[{kind:"let",name:"language",optional:!1,jsDoc:{description:"Which syntax highlighter to use.",tags:[{description:"",name:"",tag:"type",type:'Language<"css" | "html" | "javascript"> | "svelte" | "xml">'}]}},{kind:"let",name:"code",optional:!1,jsDoc:{description:"Code to be highlighted",tags:[{description:"",name:"",tag:"type",type:"string"}]}},{kind:"let",name:"inline",optional:!0,value:!1,jsDoc:{description:"Whether to treat a codeblock as an inline element.",tags:[{description:"",name:"",tag:"type",type:"boolean"}]}}],exports:[],customProperties:[{customProperty:"--br-code-background-color",end:{offset:942,line:36,column:58},location:"https://developer.mozilla.org/docs/Web/CSS/background-color",property:"background-color",start:{offset:893,line:36,column:9},syntax:"<color>",cssDoc:null},{customProperty:"--br-code-text-color",end:{offset:984,line:37,column:41},location:"https://developer.mozilla.org/docs/Web/CSS/color",property:"color",start:{offset:952,line:37,column:9},syntax:"<color>",cssDoc:null},{customProperty:"--br-code-border-radius",end:{offset:1037,line:38,column:52},location:"https://developer.mozilla.org/docs/Web/CSS/border-radius",property:"border-radius",start:{offset:994,line:38,column:9},syntax:"<length-percentage>{1,4} [ / <length-percentage>{1,4} ]?",cssDoc:null},{customProperty:"--br-code-white-space",end:{offset:1105,line:40,column:48},location:"https://developer.mozilla.org/docs/Web/CSS/white-space",property:"white-space",start:{offset:1066,line:40,column:9},syntax:"normal | pre | nowrap | pre-wrap | pre-line | break-spaces",cssDoc:null}]},B={main:E};function F(c){let o,r,e,s,n,i,l;return o=new v({props:{language:z,code:"const five = 5;"}}),n=new v({props:{language:q,inline:!0,code:"<!-- codeblock -->"}}),{c(){m(o.$$.fragment),r=w(),e=D("div"),s=h("An inline "),m(n.$$.fragment),i=h(" just for you!")},l(t){d(o.$$.fragment,t),r=S(t),e=j(t,"DIV",{});var a=W(e);s=y(a,"An inline "),d(n.$$.fragment,a),i=y(a," just for you!"),a.forEach(p)},m(t,a){u(o,t,a),b(t,r,a),b(t,e,a),_(e,s),u(n,e,null),_(e,i),l=!0},p:P,i(t){l||(f(o.$$.fragment,t),f(n.$$.fragment,t),l=!0)},o(t){g(o.$$.fragment,t),g(n.$$.fragment,t),l=!1},d(t){$(o,t),t&&p(r),t&&p(e),$(n)}}}function I(c){let o,r;return o=new A({props:{docs:B,$$slots:{block:[F]},$$scope:{ctx:c}}}),{c(){m(o.$$.fragment)},l(e){d(o.$$.fragment,e)},m(e,s){u(o,e,s),r=!0},p(e,[s]){const n={};s&1&&(n.$$scope={dirty:s,ctx:e}),o.$set(n)},i(e){r||(f(o.$$.fragment,e),r=!0)},o(e){g(o.$$.fragment,e),r=!1},d(e){$(o,e)}}}class M extends x{constructor(o){super(),k(this,o,null,I,C,{})}}export{M as default};
