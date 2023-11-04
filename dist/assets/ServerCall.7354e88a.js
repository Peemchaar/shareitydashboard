import{r as m,D as k,E as c}from"./index.ec32f494.js";var g={expireTimes:"1d",path:"; path=/",domain:"",secure:!1,sameSite:"; SameSite=Lax"},_=function(){function n(){this.current_default_config=g}return n.prototype.config=function(t){for(var e in this.current_default_config)this.current_default_config[e]=t[e]?t[e]:g[e]},n.prototype.get=function(t){var e=decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(t).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"))||null;if(e&&e.substring(0,1)==="{"&&e.substring(e.length-1,e.length)==="}")try{e=JSON.parse(e)}catch{return e}return e},n.prototype.set=function(t,e,r,f,h,l,u){if(t){if(/^(?:expires|max-age|path|domain|secure|SameSite)$/i.test(t))throw new Error('Cookie name illegality. Cannot be set to ["expires","max-age","path","domain","secure","SameSite"]	 current key name: '+t)}else throw new Error("Cookie name is not found in the first argument.");e&&e.constructor===Object&&(e=JSON.stringify(e));var a="";if(r==null&&(r=this.current_default_config.expireTimes?this.current_default_config.expireTimes:""),r&&r!=0)switch(r.constructor){case Number:r===1/0||r===-1?a="; expires=Fri, 31 Dec 9999 23:59:59 GMT":a="; max-age="+r;break;case String:if(/^(?:\d+(y|m|d|h|min|s))$/i.test(r)){var s=r.replace(/^(\d+)(?:y|m|d|h|min|s)$/i,"$1");switch(r.replace(/^(?:\d+)(y|m|d|h|min|s)$/i,"$1").toLowerCase()){case"m":a="; max-age="+ +s*2592e3;break;case"d":a="; max-age="+ +s*86400;break;case"h":a="; max-age="+ +s*3600;break;case"min":a="; max-age="+ +s*60;break;case"s":a="; max-age="+s;break;case"y":a="; max-age="+ +s*31104e3;break}}else a="; expires="+r;break;case Date:a="; expires="+r.toUTCString();break}return document.cookie=encodeURIComponent(t)+"="+encodeURIComponent(e)+a+(h?"; domain="+h:this.current_default_config.domain?this.current_default_config.domain:"")+(f?"; path="+f:this.current_default_config.path?this.current_default_config.path:"; path=/")+(l==null?this.current_default_config.secure?"; Secure":"":l?"; Secure":"")+(u==null?this.current_default_config.sameSite?"; SameSute="+this.current_default_config.sameSite:"":u?"; SameSite="+u:""),this},n.prototype.remove=function(t,e,r){return!t||!this.isKey(t)?!1:(document.cookie=encodeURIComponent(t)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT"+(r?"; domain="+r:this.current_default_config.domain?this.current_default_config.domain:"")+(e?"; path="+e:this.current_default_config.path?this.current_default_config.path:"; path=/")+"; SameSite=Lax",!0)},n.prototype.isKey=function(t){return new RegExp("(?:^|;\\s*)"+encodeURIComponent(t).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=").test(document.cookie)},n.prototype.keys=function(){if(!document.cookie)return[];for(var t=document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g,"").split(/\s*(?:\=[^;]*)?;\s*/),e=0;e<t.length;e++)t[e]=decodeURIComponent(t[e]);return t},n}(),d=null;function S(){d==null&&(d=new _);var n=m(d);return{cookies:n}}const{cookies:o}=S(),y=k("session",{state:()=>({userNickname:null,userId:null,accessToken:null,rol:null}),actions:{isLoged(){return o.get("accessToken")},getUserId(){return o.get("userId")},getUserNickname(){return o.get("userNickname")},getUserRole(){return o.get("userRole")},setUserData(n,t,e,r){o.set("userId",n),o.set("accessToken",e),o.set("userNickname",t),o.set("userRole",r)},clearUserData(){o.remove("userId"),o.remove("accessToken"),o.remove("userNickname"),o.remove("userRole")}}}),p=y(),i={headers:{Authorization:"Bearer"+p.sessionToken}},C={get:async n=>await c.get("https://apinodedev.shareity.com"+n,i),post:async(n,t)=>await c.post("https://apinodedev.shareity.com"+n,t,i),patch:async(n,t)=>await c.patch("https://apinodedev.shareity.com"+n,t,i),put:async(n,t)=>await c.put("https://apinodedev.shareity.com"+n,t,i),delete:async n=>await c.delete("https://apinodedev.shareity.com"+n,i),postMedia:async(n,t)=>{const e={Headers:{"Content-Type":"multipart/form-data",Authorization:"Bearer"+p.sessionToken}};return await c.post("https://apinodedev.shareity.com"+n,t,e)}};export{C as S,S as a,y as u};