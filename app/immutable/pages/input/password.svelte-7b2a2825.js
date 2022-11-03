import{S as I,i as L,s as H,l as x,m as T,p as A,h as m,q as s,b as E,L as M,a3 as z,P as O,H as q,R as U,n as c,T as G,x as p,y as f,z as h,f as g,t as b,C as y,u as K,v as N}from"../../chunks/index-8333b970.js";import{C as R,p as V}from"../../chunks/language-e15a231f.js";/* empty css                           */import{C as B}from"../../chunks/component-85bd3def.js";import{c as J}from"../../chunks/forward-events-ac79da41.js";import{v as Q}from"../../chunks/validate-9cb55136.js";const X={name:"Password",slots:[],description:`Password lets the user to securely enter a password. It presents as a
    one-line plain text editor control where the text is obscured so that
    it cannot be read. It replaces each character with a symbol such as the
    asterisk ("*") or a dot ("\u2022").`,workingDirectoryFilepath:"src/lib/components/input/password/password.svelte",props:[{kind:"let",name:"autocomplete",optional:!0,value:"",jsDoc:{description:"Guidance to the browser on information expected in the field. Helps UserAgent automate filling form field values.",tags:[{description:"",name:"",tag:"type",type:'"off" | "on" | string'}]}},{kind:"let",name:"autofocus",optional:!0,value:!1,jsDoc:{description:"When true, the password input will have input focus when the page loads.",tags:[{description:"",name:"",tag:"type",type:"boolean"}]}},{kind:"let",name:"disabled",optional:!0,value:!1,jsDoc:{description:"When true, the input cannot be edited or focused.",tags:[{description:"",name:"",tag:"type",type:"boolean"}]}},{kind:"let",name:"error",optional:!0,jsDoc:{description:"A function that takes a validity state string and returns an error message.",tags:[{description:"",name:"",tag:"type",type:"((error: string, input: HTMLInputElement) => string) | undefined"}]}},{kind:"let",name:"form",optional:!0,jsDoc:{description:"The id of the form to associate with the text input",tags:[{description:"",name:"",tag:"type",type:"string | undefined"}]}},{kind:"let",name:"hint",optional:!0,jsDoc:{description:"The id of the aria-describedby element.",tags:[{description:"",name:"",tag:"type",type:"string | undefined"}]}},{kind:"let",name:"id",optional:!0,jsDoc:{description:"The id of the password input",tags:[{description:"",name:"",tag:"type",type:"string | undefined"}]}},{kind:"let",name:"invalid",optional:!0,jsDoc:{description:"A function that returns the validity of the input.",tags:[{description:"",name:"",tag:"type",type:"((input: HTMLInputElement) => string) | undefined"}]}},{kind:"let",name:"list",optional:!0,value:"",jsDoc:{description:"The id of a <datalist> element located in the same document.",tags:[{description:"",name:"",tag:"type",type:"string"}]}},{kind:"let",name:"maxlength",optional:!0,jsDoc:{description:"The maximum number of characters allowed in the element.",tags:[{description:"",name:"",tag:"type",type:"number"}]}},{kind:"let",name:"minlength",optional:!0,jsDoc:{description:"The minimum number of characters allowed in the element.",tags:[{description:"",name:"",tag:"type",type:"number"}]}},{kind:"let",name:"name",optional:!0,value:"",jsDoc:{description:"The name of the name input. Submitted with its parent form as part of a name/value pair.",tags:[{description:"",name:"",tag:"type",type:"string"}]}},{kind:"let",name:"placeholder",optional:!0,value:"",jsDoc:{description:"Text that appears in the form control when it has no value set",tags:[{description:"",name:"",tag:"type",type:"string"}]}},{kind:"let",name:"readonly",optional:!0,value:!1,jsDoc:{description:"When true, the user cannot edit the value of the input",tags:[{description:"",name:"",tag:"type",type:"boolean"}]}},{kind:"let",name:"required",optional:!0,value:!1,jsDoc:{description:"When true, indicates that the user must input a value before the parent form can be submitted.",tags:[{description:"",name:"",tag:"type",type:"boolean"}]}},{kind:"let",name:"value",optional:!0,value:"",jsDoc:{description:"The initial value of the component.",tags:[{description:"",name:"",tag:"type",type:"string | undefined"}]}}],exports:[],customProperties:[{customProperty:"--br-input-password-root-padding-block",end:{offset:3452,line:139,column:67},location:"https://developer.mozilla.org/docs/Web/CSS/padding-block",property:"padding-block",start:{offset:3394,line:139,column:9},syntax:"<'padding-left'>{1,2}",cssDoc:null},{customProperty:"--br-input-password-root-padding-inline",end:{offset:3522,line:140,column:69},location:"https://developer.mozilla.org/docs/Web/CSS/padding-inline",property:"padding-inline",start:{offset:3462,line:140,column:9},syntax:"<'padding-left'>{1,2}",cssDoc:null},{customProperty:"--br-input-password-root-font-color",end:{offset:3579,line:141,column:56},location:"https://developer.mozilla.org/docs/Web/CSS/color",property:"color",start:{offset:3532,line:141,column:9},syntax:"<color>",cssDoc:null},{customProperty:"--br-input-password-root-border",end:{offset:3740,line:147,column:53},location:"https://developer.mozilla.org/docs/Web/CSS/border",property:"border",start:{offset:3696,line:147,column:9},syntax:"<line-width> || <line-style> || <color>",cssDoc:null},{customProperty:"--br-input-password-root-border-radius",end:{offset:3808,line:148,column:67},location:"https://developer.mozilla.org/docs/Web/CSS/border-radius",property:"border-radius",start:{offset:3750,line:148,column:9},syntax:"<length-percentage>{1,4} [ / <length-percentage>{1,4} ]?",cssDoc:null},{customProperty:"--br-input-password-root-background-color",end:{offset:3882,line:149,column:73},location:"https://developer.mozilla.org/docs/Web/CSS/background-color",property:"background-color",start:{offset:3818,line:149,column:9},syntax:"<color>",cssDoc:null},{customProperty:"--br-input-password-root-height",end:{offset:3936,line:150,column:53},location:"https://developer.mozilla.org/docs/Web/CSS/height",property:"height",start:{offset:3892,line:150,column:9},syntax:"auto | <length> | <percentage> | min-content | max-content | fit-content | fit-content(<length-percentage>)",cssDoc:null},{customProperty:"--br-input-password-root-transition",end:{offset:3998,line:151,column:61},location:"https://developer.mozilla.org/docs/Web/CSS/transition",property:"transition",start:{offset:3946,line:151,column:9},syntax:"<single-transition>#",cssDoc:null},{customProperty:"--br-input-password-root-hover-box-shadow",end:{offset:4114,line:154,column:67},location:"https://developer.mozilla.org/docs/Web/CSS/box-shadow",property:"box-shadow",start:{offset:4056,line:154,column:9},syntax:"none | <shadow>#",cssDoc:null},{customProperty:"--br-input-password-root-hover-border",end:{offset:4174,line:155,column:59},location:"https://developer.mozilla.org/docs/Web/CSS/border",property:"border",start:{offset:4124,line:155,column:9},syntax:"<line-width> || <line-style> || <color>",cssDoc:null},{customProperty:"--br-input-password-root-focus-box-shadow",end:{offset:4278,line:158,column:67},location:"https://developer.mozilla.org/docs/Web/CSS/box-shadow",property:"box-shadow",start:{offset:4220,line:158,column:9},syntax:"none | <shadow>#",cssDoc:null},{customProperty:"--br-input-password-root-focus-border",end:{offset:4338,line:159,column:59},location:"https://developer.mozilla.org/docs/Web/CSS/border",property:"border",start:{offset:4288,line:159,column:9},syntax:"<line-width> || <line-style> || <color>",cssDoc:null}]},Z={main:X};function $(i){let t,e,o,a,u;return{c(){t=x("div"),e=x("input"),this.h()},l(r){t=T(r,"DIV",{class:!0});var l=A(t);e=T(l,"INPUT",{type:!0,autocomplete:!0,form:!0,id:!0,list:!0,maxlength:!0,minlength:!0,name:!0,placeholder:!0,"aria-describedby":!0,class:!0}),l.forEach(m),this.h()},h(){s(e,"type","password"),s(e,"autocomplete",i[1]),e.autofocus=i[2],e.disabled=i[3],s(e,"form",i[5]),s(e,"id",i[7]),s(e,"list",i[9]),s(e,"maxlength",i[10]),s(e,"minlength",i[11]),s(e,"name",i[12]),s(e,"placeholder",i[13]),e.readOnly=i[14],e.required=i[15],s(e,"aria-describedby",i[6]),s(e,"class","svelte-1gls4ji"),s(t,"class","container svelte-1gls4ji")},m(r,l){E(r,t,l),M(t,e),z(e,i[0]),i[2]&&e.focus(),a||(u=[O(e,"input",i[17]),q(i[16].call(null,e)),q(o=Q.call(null,e,{invalid:i[8],error:i[4]}))],a=!0)},p(r,[l]){l&2&&s(e,"autocomplete",r[1]),l&4&&(e.autofocus=r[2]),l&8&&(e.disabled=r[3]),l&32&&s(e,"form",r[5]),l&128&&s(e,"id",r[7]),l&512&&s(e,"list",r[9]),l&1024&&s(e,"maxlength",r[10]),l&2048&&s(e,"minlength",r[11]),l&4096&&s(e,"name",r[12]),l&8192&&s(e,"placeholder",r[13]),l&16384&&(e.readOnly=r[14]),l&32768&&(e.required=r[15]),l&64&&s(e,"aria-describedby",r[6]),l&1&&e.value!==r[0]&&z(e,r[0]),o&&U(o.update)&&l&272&&o.update.call(null,{invalid:r[8],error:r[4]})},i:c,o:c,d(r){r&&m(t),a=!1,G(u)}}}function ee(i,t,e){let{autocomplete:o=""}=t,{autofocus:a=!1}=t,{disabled:u=!1}=t,{error:r=void 0}=t,{form:l=void 0}=t,{hint:w=void 0}=t,{id:v=void 0}=t,{invalid:_=void 0}=t,{list:D=""}=t,{maxlength:S=-1}=t,{minlength:k=-1}=t,{name:P=""}=t,{placeholder:j=""}=t,{readonly:C=!1}=t,{required:W=!1}=t,{value:d=""}=t;const F=J();function Y(){d=this.value,e(0,d)}return i.$$set=n=>{"autocomplete"in n&&e(1,o=n.autocomplete),"autofocus"in n&&e(2,a=n.autofocus),"disabled"in n&&e(3,u=n.disabled),"error"in n&&e(4,r=n.error),"form"in n&&e(5,l=n.form),"hint"in n&&e(6,w=n.hint),"id"in n&&e(7,v=n.id),"invalid"in n&&e(8,_=n.invalid),"list"in n&&e(9,D=n.list),"maxlength"in n&&e(10,S=n.maxlength),"minlength"in n&&e(11,k=n.minlength),"name"in n&&e(12,P=n.name),"placeholder"in n&&e(13,j=n.placeholder),"readonly"in n&&e(14,C=n.readonly),"required"in n&&e(15,W=n.required),"value"in n&&e(0,d=n.value)},[d,o,a,u,r,l,w,v,_,D,S,k,P,j,C,W,F,Y]}class te extends I{constructor(t){super(),L(this,t,ee,$,H,{autocomplete:1,autofocus:2,disabled:3,error:4,form:5,hint:6,id:7,invalid:8,list:9,maxlength:10,minlength:11,name:12,placeholder:13,readonly:14,required:15,value:0})}}function oe(i){let t,e;return t=new te({props:{placeholder:"I can say anything!"}}),{c(){p(t.$$.fragment)},l(o){f(t.$$.fragment,o)},m(o,a){h(t,o,a),e=!0},p:c,i(o){e||(g(t.$$.fragment,o),e=!0)},o(o){b(t.$$.fragment,o),e=!1},d(o){y(t,o)}}}function ne(i){let t,e,o;return e=new R({props:{highlight:V,code:`
<div class="element">
    <Label>
        Secret Key
        <Password slot='input' value="password"/>
    </Label>
</div>

<style>
    .element {
        --br-input-label-root-position: absolute;
        --br-input-label-root-height: 1px;
        --br-input-label-root-width: 1px;
        --br-input-label-root-overflow: hidden;
    }
</style>
`}}),{c(){t=K(`You should always include the label text for the input for the benefit
        of screen-reader users. You may use custom-properties to visually
        hide it if you must. For example:
        `),p(e.$$.fragment)},l(a){t=N(a,`You should always include the label text for the input for the benefit
        of screen-reader users. You may use custom-properties to visually
        hide it if you must. For example:
        `),f(e.$$.fragment,a)},m(a,u){E(a,t,u),h(e,a,u),o=!0},p:c,i(a){o||(g(e.$$.fragment,a),o=!0)},o(a){b(e.$$.fragment,a),o=!1},d(a){a&&m(t),y(e,a)}}}function ie(i){let t,e;return t=new B({props:{docs:Z,$$slots:{accessibility:[ne],inline:[oe]},$$scope:{ctx:i}}}),{c(){p(t.$$.fragment)},l(o){f(t.$$.fragment,o)},m(o,a){h(t,o,a),e=!0},p(o,[a]){const u={};a&1&&(u.$$scope={dirty:a,ctx:o}),t.$set(u)},i(o){e||(g(t.$$.fragment,o),e=!0)},o(o){b(t.$$.fragment,o),e=!1},d(o){y(t,o)}}}class ce extends I{constructor(t){super(),L(this,t,null,ie,H,{})}}export{ce as default};
