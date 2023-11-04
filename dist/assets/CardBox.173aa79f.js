import{o as a,f as r,k as t,n as u,l as h,i as c,c as i,w as l,F as _,b,h as B,m as g}from"./index.ec32f494.js";import{_ as C}from"./_plugin-vue_export-helper.cdc0426e.js";const x={__name:"CardBoxComponentBody",props:{noPadding:Boolean},setup(o){return(n,s)=>(a(),r("div",{class:u(["flex-1",{"p-6":!o.noPadding}])},[t(n.$slots,"default")],2))}},k={},y={class:"px-6 pb-6"};function v(o,n){return a(),r("footer",y,[t(o.$slots,"default")])}const $=C(k,[["render",v]]),H={__name:"CardBox",props:{rounded:{type:String,default:"rounded-2xl"},flex:{type:String,default:"flex-col"},hasComponentLayout:Boolean,hasTable:Boolean,isForm:Boolean,isHoverable:Boolean,isModal:Boolean},emits:["submit"],setup(o,{emit:n}){const s=o,d=h(),m=c(()=>d.footer&&!!d.footer()),f=c(()=>{const e=[s.rounded,s.flex,s.isModal?"dark:bg-slate-900":"dark:bg-slate-900/70"];return s.isHoverable&&e.push("hover:shadow-lg transition-shadow duration-500"),e}),p=e=>{n("submit",e)};return(e,w)=>(a(),i(g(o.isForm?"form":"div"),{class:u([f.value,"bg-white flex shadow-lg"]),onSubmit:p},{default:l(()=>[o.hasComponentLayout?t(e.$slots,"default",{key:0}):(a(),r(_,{key:1},[b(x,{"no-padding":o.hasTable},{default:l(()=>[t(e.$slots,"default")]),_:3},8,["no-padding"]),m.value?(a(),i($,{key:0},{default:l(()=>[t(e.$slots,"footer")]),_:3})):B("",!0)],64))]),_:3},40,["class"]))}};export{H as _};
