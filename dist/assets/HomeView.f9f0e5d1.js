import{_ as b}from"./NavBar.59cebfca.js";import{_ as h}from"./LayoutAuthenticated.0a6b42a9.js";import{S as v}from"./SectionTitleLineWithButton.85e6d937.js";import{u as y}from"./ServerCall.7354e88a.js";import{_ as c}from"./CardBoxWidget.2ba28216.js";import{U as w}from"./UserController.5f62944b.js";import{_ as C}from"./BaseButton.674e3c10.js";import{a as i,u as k,s as N,o as s,c as n,w as u,b as r,g as a,e as f,h as d}from"./index.ec32f494.js";import"./mdi.f693eecd.js";import"./BaseIcon.dec28c75.js";import"./colors.dcae2bc6.js";import"./LoginController.9d60cd79.js";import"./_plugin-vue_export-helper.cdc0426e.js";import"./CardBox.173aa79f.js";import"./PillTag.9c62ac72.js";const S={class:"grid min-w-[50%] gap-6 mb-6"},B=a("div",{class:"grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"},[a("div",{class:"flex flex-col justify-between"}),a("div",{class:"flex flex-col justify-between"})],-1),T={__name:"HomeView",setup($){const o=i({});i();let l=y(),p=l.getUserNickname(),t=i(Boolean);const _=k();N(async()=>{o.value=await w.userAction(p),l.getUserRole()=="cause"&&o.value.organization.logo==""?t=!1:t=!0});function g(e){_.push({name:"create-cause",query:{id:e}})}return(e,m)=>(s(),n(h,null,{default:u(()=>[r(b,null,{default:u(()=>[r(v,{title:"Hi,",userName:o.value.firstName,main:""},null,8,["userName"]),a("div",S,[r(c,{icon:e.mdiCartOutline,label:"Annoucements from Shareity",content:"Welcome to the Shareity Dashboard \u2122! Let's create some awesome campaigns! Please start a live chat session below if you have any questions!"},null,8,["icon"]),f(t)?d("",!0):(s(),n(c,{key:0,icon:e.mdiCartOutline,label:"Reminder",content:"Your organization data is incomplete, please click on the button bellow in order to complete your organization data and enable challenge creation."},null,8,["icon","content"])),f(t)?d("",!0):(s(),n(C,{key:1,label:"Edit Cause",color:"info",icon:e.mdiPlus,onClick:m[0]||(m[0]=x=>g(o.value.organization.id))},null,8,["icon"]))]),B]),_:1})]),_:1}))}};export{T as default};