import{S as s,i as a,s as e,D as l,e as c,k as t,c as n,a as i,d as o,n as r,b as d,E as b,f,H as u,G as h,v as p,r as v,Y as $}from"./index-f035eec9.js";import{u as m}from"./index-8ba9bb0d.js";const L=s=>({}),k=s=>({labelId:s[2]}),x=s=>({}),E=s=>({labelId:s[2]});function g(s){let a,e,$,m,g;const I=s[4].label,j=l(I,s,s[3],E),D=s[4].default,A=l(D,s,s[3],k);return{c(){a=c("div"),e=c("label"),j&&j.c(),$=t(),A&&A.c(),this.h()},l(s){a=n(s,"DIV",{class:!0});var l=i(a);e=n(l,"LABEL",{for:!0,class:!0});var c=i(e);j&&j.l(c),c.forEach(o),$=r(l),A&&A.l(l),l.forEach(o),this.h()},h(){d(e,"for",s[2]),d(e,"class","svelte-190pvgk"),b(e,"br-accessible-hide",s[1]),d(a,"class",m=s[0]+" container svelte-190pvgk")},m(s,l){f(s,a,l),u(a,e),j&&j.m(e,null),u(a,$),A&&A.m(a,null),g=!0},p(s,[l]){j&&j.p&&8&l&&h(j,I,s,s[3],l,x,E),2&l&&b(e,"br-accessible-hide",s[1]),A&&A.p&&8&l&&h(A,D,s,s[3],l,L,k),(!g||1&l&&m!==(m=s[0]+" container svelte-190pvgk"))&&d(a,"class",m)},i(s){g||(p(j,s),p(A,s),g=!0)},o(s){v(j,s),v(A,s),g=!1},d(s){s&&o(a),j&&j.d(s),A&&A.d(s)}}}function I(s,a,e){let{$$slots:l={},$$scope:c}=a;$(l);let{class:t=""}=a,{hideLabel:n=!1}=a;const i=m();return s.$$set=s=>{"class"in s&&e(0,t=s.class),"hideLabel"in s&&e(1,n=s.hideLabel),"$$scope"in s&&e(3,c=s.$$scope)},[t,n,i,c,l]}class j extends s{constructor(s){super(),a(this,s,I,g,e,{class:0,hideLabel:1})}}function D(s,a){function e(a){a&&s.focus()}return e(a),{update:e}}export{j as C,D as f};