function r(e,t){return parseInt(e.getPropertyValue(t))||0}function n(e,t){const o=getComputedStyle(e);return r(o,t)}function s(e,t,o=":before"){const u=getComputedStyle(e,o);return r(u,t)}export{s as a,n as b,r as g};
