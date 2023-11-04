import{_ as j}from"./CardBox.173aa79f.js";import{L as D,i as V,o as S,c as M,w as $,b as P,h as R,g as E,I as A,t as O}from"./index.ec32f494.js";import{_ as G}from"./BaseIcon.dec28c75.js";import{a as I}from"./LayoutAuthenticated.0a6b42a9.js";import{D as Z,E as K,F as U}from"./mdi.f693eecd.js";import{_ as Y}from"./PillTag.9c62ac72.js";import{_ as q}from"./BaseButton.674e3c10.js";var W={exports:{}};/*! @preserve
 * numeral.js
 * version : 2.0.6
 * author : Adam Draper
 * license : MIT
 * http://adamwdraper.github.com/Numeral-js/
 */(function(b){(function(n,d){b.exports?b.exports=d():n.numeral=d()})(D,function(){var n,d,L="2.0.6",y={},N={},w={currentLocale:"en",zeroFormat:null,nullFormat:null,defaultFormat:"0,0",scalePercentBy100:!0},c={currentLocale:w.currentLocale,zeroFormat:w.zeroFormat,nullFormat:w.nullFormat,defaultFormat:w.defaultFormat,scalePercentBy100:w.scalePercentBy100};function T(e,t){this._input=e,this._value=t}return n=function(e){var t,o,i,r;if(n.isNumeral(e))t=e.value();else if(e===0||typeof e>"u")t=0;else if(e===null||d.isNaN(e))t=null;else if(typeof e=="string")if(c.zeroFormat&&e===c.zeroFormat)t=0;else if(c.nullFormat&&e===c.nullFormat||!e.replace(/[^0-9]+/g,"").length)t=null;else{for(o in y)if(r=typeof y[o].regexps.unformat=="function"?y[o].regexps.unformat():y[o].regexps.unformat,r&&e.match(r)){i=y[o].unformat;break}i=i||n._.stringToNumber,t=i(e)}else t=Number(e)||null;return new T(e,t)},n.version=L,n.isNumeral=function(e){return e instanceof T},n._=d={numberToFormat:function(e,t,o){var i=N[n.options.currentLocale],r=!1,l=!1,a=0,s="",f=1e12,u=1e9,h=1e6,B=1e3,p="",v=!1,g,F,m,_,k,z,x;if(e=e||0,F=Math.abs(e),n._.includes(t,"(")?(r=!0,t=t.replace(/[\(|\)]/g,"")):(n._.includes(t,"+")||n._.includes(t,"-"))&&(k=n._.includes(t,"+")?t.indexOf("+"):e<0?t.indexOf("-"):-1,t=t.replace(/[\+|\-]/g,"")),n._.includes(t,"a")&&(g=t.match(/a(k|m|b|t)?/),g=g?g[1]:!1,n._.includes(t," a")&&(s=" "),t=t.replace(new RegExp(s+"a[kmbt]?"),""),F>=f&&!g||g==="t"?(s+=i.abbreviations.trillion,e=e/f):F<f&&F>=u&&!g||g==="b"?(s+=i.abbreviations.billion,e=e/u):F<u&&F>=h&&!g||g==="m"?(s+=i.abbreviations.million,e=e/h):(F<h&&F>=B&&!g||g==="k")&&(s+=i.abbreviations.thousand,e=e/B)),n._.includes(t,"[.]")&&(l=!0,t=t.replace("[.]",".")),m=e.toString().split(".")[0],_=t.split(".")[1],z=t.indexOf(","),a=(t.split(".")[0].split(",")[0].match(/0/g)||[]).length,_?(n._.includes(_,"[")?(_=_.replace("]",""),_=_.split("["),p=n._.toFixed(e,_[0].length+_[1].length,o,_[1].length)):p=n._.toFixed(e,_.length,o),m=p.split(".")[0],n._.includes(p,".")?p=i.delimiters.decimal+p.split(".")[1]:p="",l&&Number(p.slice(1))===0&&(p="")):m=n._.toFixed(e,0,o),s&&!g&&Number(m)>=1e3&&s!==i.abbreviations.trillion)switch(m=String(Number(m)/1e3),s){case i.abbreviations.thousand:s=i.abbreviations.million;break;case i.abbreviations.million:s=i.abbreviations.billion;break;case i.abbreviations.billion:s=i.abbreviations.trillion;break}if(n._.includes(m,"-")&&(m=m.slice(1),v=!0),m.length<a)for(var C=a-m.length;C>0;C--)m="0"+m;return z>-1&&(m=m.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1"+i.delimiters.thousands)),t.indexOf(".")===0&&(m=""),x=m+p+(s||""),r?x=(r&&v?"(":"")+x+(r&&v?")":""):k>=0?x=k===0?(v?"-":"+")+x:x+(v?"-":"+"):v&&(x="-"+x),x},stringToNumber:function(e){var t=N[c.currentLocale],o=e,i={thousand:3,million:6,billion:9,trillion:12},r,l,a;if(c.zeroFormat&&e===c.zeroFormat)l=0;else if(c.nullFormat&&e===c.nullFormat||!e.replace(/[^0-9]+/g,"").length)l=null;else{l=1,t.delimiters.decimal!=="."&&(e=e.replace(/\./g,"").replace(t.delimiters.decimal,"."));for(r in i)if(a=new RegExp("[^a-zA-Z]"+t.abbreviations[r]+"(?:\\)|(\\"+t.currency.symbol+")?(?:\\))?)?$"),o.match(a)){l*=Math.pow(10,i[r]);break}l*=(e.split("-").length+Math.min(e.split("(").length-1,e.split(")").length-1))%2?1:-1,e=e.replace(/[^0-9\.]+/g,""),l*=Number(e)}return l},isNaN:function(e){return typeof e=="number"&&isNaN(e)},includes:function(e,t){return e.indexOf(t)!==-1},insert:function(e,t,o){return e.slice(0,o)+t+e.slice(o)},reduce:function(e,t){if(this===null)throw new TypeError("Array.prototype.reduce called on null or undefined");if(typeof t!="function")throw new TypeError(t+" is not a function");var o=Object(e),i=o.length>>>0,r=0,l;if(arguments.length===3)l=arguments[2];else{for(;r<i&&!(r in o);)r++;if(r>=i)throw new TypeError("Reduce of empty array with no initial value");l=o[r++]}for(;r<i;r++)r in o&&(l=t(l,o[r],r,o));return l},multiplier:function(e){var t=e.toString().split(".");return t.length<2?1:Math.pow(10,t[1].length)},correctionFactor:function(){var e=Array.prototype.slice.call(arguments);return e.reduce(function(t,o){var i=d.multiplier(o);return t>i?t:i},1)},toFixed:function(e,t,o,i){var r=e.toString().split("."),l=t-(i||0),a,s,f,u;return r.length===2?a=Math.min(Math.max(r[1].length,l),t):a=l,f=Math.pow(10,a),u=(o(e+"e+"+a)/f).toFixed(a),i>t-a&&(s=new RegExp("\\.?0{1,"+(i-(t-a))+"}$"),u=u.replace(s,"")),u}},n.options=c,n.formats=y,n.locales=N,n.locale=function(e){return e&&(c.currentLocale=e.toLowerCase()),c.currentLocale},n.localeData=function(e){if(!e)return N[c.currentLocale];if(e=e.toLowerCase(),!N[e])throw new Error("Unknown locale : "+e);return N[e]},n.reset=function(){for(var e in w)c[e]=w[e]},n.zeroFormat=function(e){c.zeroFormat=typeof e=="string"?e:null},n.nullFormat=function(e){c.nullFormat=typeof e=="string"?e:null},n.defaultFormat=function(e){c.defaultFormat=typeof e=="string"?e:"0.0"},n.register=function(e,t,o){if(t=t.toLowerCase(),this[e+"s"][t])throw new TypeError(t+" "+e+" already registered.");return this[e+"s"][t]=o,o},n.validate=function(e,t){var o,i,r,l,a,s,f,u;if(typeof e!="string"&&(e+="",console.warn&&console.warn("Numeral.js: Value is not string. It has been co-erced to: ",e)),e=e.trim(),e.match(/^\d+$/))return!0;if(e==="")return!1;try{f=n.localeData(t)}catch{f=n.localeData(n.locale())}return r=f.currency.symbol,a=f.abbreviations,o=f.delimiters.decimal,f.delimiters.thousands==="."?i="\\.":i=f.delimiters.thousands,u=e.match(/^[^\d]+/),u!==null&&(e=e.substr(1),u[0]!==r)||(u=e.match(/[^\d]+$/),u!==null&&(e=e.slice(0,-1),u[0]!==a.thousand&&u[0]!==a.million&&u[0]!==a.billion&&u[0]!==a.trillion))?!1:(s=new RegExp(i+"{2}"),e.match(/[^\d.,]/g)?!1:(l=e.split(o),l.length>2?!1:l.length<2?!!l[0].match(/^\d+.*\d$/)&&!l[0].match(s):l[0].length===1?!!l[0].match(/^\d+$/)&&!l[0].match(s)&&!!l[1].match(/^\d+$/):!!l[0].match(/^\d+.*\d$/)&&!l[0].match(s)&&!!l[1].match(/^\d+$/)))},n.fn=T.prototype={clone:function(){return n(this)},format:function(e,t){var o=this._value,i=e||c.defaultFormat,r,l,a;if(t=t||Math.round,o===0&&c.zeroFormat!==null)l=c.zeroFormat;else if(o===null&&c.nullFormat!==null)l=c.nullFormat;else{for(r in y)if(i.match(y[r].regexps.format)){a=y[r].format;break}a=a||n._.numberToFormat,l=a(o,i,t)}return l},value:function(){return this._value},input:function(){return this._input},set:function(e){return this._value=Number(e),this},add:function(e){var t=d.correctionFactor.call(null,this._value,e);function o(i,r,l,a){return i+Math.round(t*r)}return this._value=d.reduce([this._value,e],o,0)/t,this},subtract:function(e){var t=d.correctionFactor.call(null,this._value,e);function o(i,r,l,a){return i-Math.round(t*r)}return this._value=d.reduce([e],o,Math.round(this._value*t))/t,this},multiply:function(e){function t(o,i,r,l){var a=d.correctionFactor(o,i);return Math.round(o*a)*Math.round(i*a)/Math.round(a*a)}return this._value=d.reduce([this._value,e],t,1),this},divide:function(e){function t(o,i,r,l){var a=d.correctionFactor(o,i);return Math.round(o*a)/Math.round(i*a)}return this._value=d.reduce([this._value,e],t),this},difference:function(e){return Math.abs(n(this._value).subtract(e).value())}},n.register("locale","en",{delimiters:{thousands:",",decimal:"."},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(e){var t=e%10;return~~(e%100/10)===1?"th":t===1?"st":t===2?"nd":t===3?"rd":"th"},currency:{symbol:"$"}}),function(){n.register("format","bps",{regexps:{format:/(BPS)/,unformat:/(BPS)/},format:function(e,t,o){var i=n._.includes(t," BPS")?" ":"",r;return e=e*1e4,t=t.replace(/\s?BPS/,""),r=n._.numberToFormat(e,t,o),n._.includes(r,")")?(r=r.split(""),r.splice(-1,0,i+"BPS"),r=r.join("")):r=r+i+"BPS",r},unformat:function(e){return+(n._.stringToNumber(e)*1e-4).toFixed(15)}})}(),function(){var e={base:1e3,suffixes:["B","KB","MB","GB","TB","PB","EB","ZB","YB"]},t={base:1024,suffixes:["B","KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"]},o=e.suffixes.concat(t.suffixes.filter(function(r){return e.suffixes.indexOf(r)<0})),i=o.join("|");i="("+i.replace("B","B(?!PS)")+")",n.register("format","bytes",{regexps:{format:/([0\s]i?b)/,unformat:new RegExp(i)},format:function(r,l,a){var s,f=n._.includes(l,"ib")?t:e,u=n._.includes(l," b")||n._.includes(l," ib")?" ":"",h,B,p;for(l=l.replace(/\s?i?b/,""),h=0;h<=f.suffixes.length;h++)if(B=Math.pow(f.base,h),p=Math.pow(f.base,h+1),r===null||r===0||r>=B&&r<p){u+=f.suffixes[h],B>0&&(r=r/B);break}return s=n._.numberToFormat(r,l,a),s+u},unformat:function(r){var l=n._.stringToNumber(r),a,s;if(l){for(a=e.suffixes.length-1;a>=0;a--){if(n._.includes(r,e.suffixes[a])){s=Math.pow(e.base,a);break}if(n._.includes(r,t.suffixes[a])){s=Math.pow(t.base,a);break}}l*=s||1}return l}})}(),function(){n.register("format","currency",{regexps:{format:/(\$)/},format:function(e,t,o){var i=n.locales[n.options.currentLocale],r={before:t.match(/^([\+|\-|\(|\s|\$]*)/)[0],after:t.match(/([\+|\-|\)|\s|\$]*)$/)[0]},l,a,s;for(t=t.replace(/\s?\$\s?/,""),l=n._.numberToFormat(e,t,o),e>=0?(r.before=r.before.replace(/[\-\(]/,""),r.after=r.after.replace(/[\-\)]/,"")):e<0&&!n._.includes(r.before,"-")&&!n._.includes(r.before,"(")&&(r.before="-"+r.before),s=0;s<r.before.length;s++)switch(a=r.before[s],a){case"$":l=n._.insert(l,i.currency.symbol,s);break;case" ":l=n._.insert(l," ",s+i.currency.symbol.length-1);break}for(s=r.after.length-1;s>=0;s--)switch(a=r.after[s],a){case"$":l=s===r.after.length-1?l+i.currency.symbol:n._.insert(l,i.currency.symbol,-(r.after.length-(1+s)));break;case" ":l=s===r.after.length-1?l+" ":n._.insert(l," ",-(r.after.length-(1+s)+i.currency.symbol.length-1));break}return l}})}(),function(){n.register("format","exponential",{regexps:{format:/(e\+|e-)/,unformat:/(e\+|e-)/},format:function(e,t,o){var i,r=typeof e=="number"&&!n._.isNaN(e)?e.toExponential():"0e+0",l=r.split("e");return t=t.replace(/e[\+|\-]{1}0/,""),i=n._.numberToFormat(Number(l[0]),t,o),i+"e"+l[1]},unformat:function(e){var t=n._.includes(e,"e+")?e.split("e+"):e.split("e-"),o=Number(t[0]),i=Number(t[1]);i=n._.includes(e,"e-")?i*=-1:i;function r(l,a,s,f){var u=n._.correctionFactor(l,a),h=l*u*(a*u)/(u*u);return h}return n._.reduce([o,Math.pow(10,i)],r,1)}})}(),function(){n.register("format","ordinal",{regexps:{format:/(o)/},format:function(e,t,o){var i=n.locales[n.options.currentLocale],r,l=n._.includes(t," o")?" ":"";return t=t.replace(/\s?o/,""),l+=i.ordinal(e),r=n._.numberToFormat(e,t,o),r+l}})}(),function(){n.register("format","percentage",{regexps:{format:/(%)/,unformat:/(%)/},format:function(e,t,o){var i=n._.includes(t," %")?" ":"",r;return n.options.scalePercentBy100&&(e=e*100),t=t.replace(/\s?\%/,""),r=n._.numberToFormat(e,t,o),n._.includes(r,")")?(r=r.split(""),r.splice(-1,0,i+"%"),r=r.join("")):r=r+i+"%",r},unformat:function(e){var t=n._.stringToNumber(e);return n.options.scalePercentBy100?t*.01:t}})}(),function(){n.register("format","time",{regexps:{format:/(:)/,unformat:/(:)/},format:function(e,t,o){var i=Math.floor(e/60/60),r=Math.floor((e-i*60*60)/60),l=Math.round(e-i*60*60-r*60);return i+":"+(r<10?"0"+r:r)+":"+(l<10?"0"+l:l)},unformat:function(e){var t=e.split(":"),o=0;return t.length===3?(o=o+Number(t[0])*60*60,o=o+Number(t[1])*60,o=o+Number(t[2])):t.length===2&&(o=o+Number(t[0])*60,o=o+Number(t[1])),Number(o)}})}(),n})})(W);const H={__name:"PillTagTrend",props:{trend:{type:String,required:!0},trendType:{type:String,default:null},small:Boolean},setup(b){const n=b,d=V(()=>n.trendType==="up"?{icon:Z,style:"success"}:n.trendType==="down"?{icon:K,style:"danger"}:n.trendType==="alert"?{icon:U,style:"warning"}:{style:"info"});return(L,y)=>(S(),M(Y,{label:b.trend,color:d.value.style,icon:d.value.icon,small:b.small},null,8,["label","color","icon","small"]))}},J={class:"text-lg leading-tight text-gray-500 dark:text-slate-400"},Q={class:"text-lg leading-tight text-gray-500 dark:text-slate-400"},oe={__name:"CardBoxWidget",props:{number:{type:String,default:null},prefix:{type:String,default:null},suffix:{type:String,default:null},icon:{type:String,default:null},label:{type:String,default:null},color:{type:String,default:null},trend:{type:String,default:null},trendType:{type:String,default:null},content:{type:String,default:null}},setup(b){return(n,d)=>(S(),M(j,null,{default:$(()=>[b.trend?(S(),M(I,{key:0,class:"mb-3",mobile:""},{default:$(()=>[P(H,{trend:b.trend,"trend-type":b.trendType,small:""},null,8,["trend","trend-type"]),P(q,{icon:n.mdiPencilBoxMultiple,"icon-w":"w-4","icon-h":"h-4",color:"lightDark",small:""},null,8,["icon"])]),_:1})):R("",!0),P(I,{mobile:""},{default:$(()=>[E("div",null,[E("h3",J,[A(O(b.label)+" "+O(b.icon)+" ",1),b.icon?(S(),M(G,{key:0,path:b.icon,size:40},null,8,["path"])):R("",!0)]),E("h1",Q,O(b.content),1)])]),_:1})]),_:1}))}};export{oe as _};
