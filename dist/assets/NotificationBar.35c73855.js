import{A as p}from"./mdi.f693eecd.js";import{e as _,f as B}from"./colors.dcae2bc6.js";import{a as g}from"./LayoutAuthenticated.0a6b42a9.js";import{_ as k}from"./BaseIcon.dec28c75.js";import{_ as v}from"./BaseButton.674e3c10.js";import{i as r,a as y,l as w,o as t,f as n,b as i,w as x,g as c,c as C,h as o,k as m,e as S,n as $}from"./index.ec32f494.js";const b={class:"flex flex-col md:flex-row items-center"},N={class:"text-center"},V={key:1},R={__name:"NotificationBar",props:{icon:{type:String,default:null},outline:Boolean,haveButton:Boolean,color:{type:String,required:!0}},setup(e){const s=e,u=r(()=>s.outline?_[s.color]:B[s.color]),a=y(!1),d=()=>{a.value=!0},f=w(),h=r(()=>f.right);return(l,z)=>a.value?o("",!0):(t(),n("div",{key:0,class:$([u.value,"px-3 py-6 md:py-3 mb-6 last:mb-0 border rounded-lg transition-colors duration-150"])},[i(g,null,{default:x(()=>[c("div",b,[e.icon?(t(),C(k,{key:0,path:e.icon,w:"w-10 md:w-5",h:"h-10 md:h-5",size:"24",class:"md:mr-2"},null,8,["path"])):o("",!0),c("span",N,[m(l.$slots,"default")])]),h.value?m(l.$slots,"right",{key:0}):o("",!0),e.haveButton?(t(),n("div",V,[i(v,{icon:S(p),small:"","rounded-full":"",color:"white",onClick:d},null,8,["icon"])])):o("",!0)]),_:3})],2))}};export{R as _};