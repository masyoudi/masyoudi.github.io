!function(e){var t={};function r(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(o,n,function(t){return e[t]}.bind(null,n));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=1)}([,function(e,t,r){"use strict";r.r(t);r(2),r(3);"dark"===localStorage.getItem("theme")?(document.body.setAttribute("data-theme","dark"),localStorage.setItem("theme","dark")):(document.body.removeAttribute("data-theme"),localStorage.setItem("theme","")),document.addEventListener("DOMContentLoaded",(function(){let e=document.getElementById("toggle-sidebar"),t=document.getElementById("toggle-sidebar-mobile"),r=document.querySelector("div.sidebar-dimmer"),o=document.getElementById("toggle-theme");e.addEventListener("click",(function(){document.querySelector("aside.sidebar").classList.toggle("show")})),r.addEventListener("click",(function(){document.querySelector("aside.sidebar").classList.toggle("mobile")})),t.addEventListener("click",(function(){document.querySelector("aside.sidebar").classList.toggle("mobile")})),o.addEventListener("click",(function(){let e=document.body;if(null===e.getAttribute("data-theme"))return e.setAttribute("data-theme","dark"),void localStorage.setItem("theme","dark");e.removeAttribute("data-theme"),localStorage.setItem("theme","")})),setTimeout(()=>{document.querySelector("div.preloader").remove()},575)}))},function(e,t,r){},function(e,t,r){}]);
//# sourceMappingURL=app.bundle.js.map