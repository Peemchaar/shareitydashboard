import{P as l,s as m,a6 as d,o as u,c as p,w as r,b as a,g as t}from"./index.ec32f494.js";import{u as n}from"./ServerCall.7354e88a.js";import{U as _}from"./UserController.5f62944b.js";import{_ as f}from"./LayoutAuthenticated.0a6b42a9.js";import{_ as h}from"./NavBar.59cebfca.js";import{L as x}from"./LoadingSpinner.889a7260.js";import"./mdi.f693eecd.js";import"./BaseIcon.dec28c75.js";import"./colors.dcae2bc6.js";import"./LoginController.9d60cd79.js";import"./_plugin-vue_export-helper.cdc0426e.js";const g={class:"text-center flex flex-col align-center justify-center h-[80vh]"},k=t("h1",{class:"text-xl mt-6"},"We are processing your purchase",-1),w=t("p",{class:"text-gray-500"}," In a few minutes the credits will be added to your account ",-1),P={__name:"CreditsValidateView",setup(y){const c=n();n().getUserNickname();const e=l();return m(async()=>{let s=c.getUserId();console.log(e);let o=e.params.amount,i=e.params.token;_.addCredits(s,i,o).then(S=>{d.replace("/credits")})}),(s,o)=>(u(),p(f,null,{default:r(()=>[a(h,null,{default:r(()=>[t("div",g,[a(x),k,w])]),_:1})]),_:1}))}};export{P as default};
