class o extends Error{}o.prototype.name="InvalidTokenError";function d(r){return decodeURIComponent(atob(r).replace(/(.)/g,(e,t)=>{let n=t.charCodeAt(0).toString(16).toUpperCase();return n.length<2&&(n="0"+n),"%"+n}))}function s(r){let e=r.replace(/-/g,"+").replace(/_/g,"/");switch(e.length%4){case 0:break;case 2:e+="==";break;case 3:e+="=";break;default:throw new Error("base64 string is not of the correct length")}try{return d(e)}catch{return atob(e)}}function i(r,e){if(typeof r!="string")throw new o("Invalid token specified: must be a string");e||(e={});const t=e.header===!0?0:1,n=r.split(".")[t];if(typeof n!="string")throw new o(`Invalid token specified: missing part #${t+1}`);let c;try{c=s(n)}catch(a){throw new o(`Invalid token specified: invalid base64 for part #${t+1} (${a.message})`)}try{return JSON.parse(c)}catch(a){throw new o(`Invalid token specified: invalid json for part #${t+1} (${a.message})`)}}function l(r){try{return i(r).id}catch(e){return console.error("Token inválido:",e),null}}function p(r){try{return i(r)}catch(e){return console.error("Token inválido:",e),null}}export{p as a,l as g};
