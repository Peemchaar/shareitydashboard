import{a as v,r as S,o as m,c as b,w as o,b as e,g as n,e as r,d as T,h as V,f as y}from"./index.ec32f494.js";import{G as w,c as A,P as g}from"./mdi.f693eecd.js";import{u as $,_ as k}from"./NavBar.59cebfca.js";import{_ as x}from"./CardBox.173aa79f.js";import{_ as s}from"./FormField.c48798ca.js";import{_ as i}from"./FormControl.280616cf.js";import{_ as C}from"./BaseButton.674e3c10.js";import{_ as j}from"./BaseButtons.2d2440b4.js";import{_ as D}from"./LayoutAuthenticated.0a6b42a9.js";/* empty css             */import{Z as B}from"./vue-datepicker.1260500d.js";import{u as N}from"./ServerCall.7354e88a.js";import{U as O}from"./UserController.5f62944b.js";import"./_plugin-vue_export-helper.cdc0426e.js";import"./BaseIcon.dec28c75.js";import"./colors.dcae2bc6.js";import"./LoginController.9d60cd79.js";const I={class:"flex justify-between pb-5"},q={class:"flex gap-2 items-center"},H=n("p",{class:"font-extrabold"},"Create Message",-1),P={class:"gap-3"},R={key:1,class:"grid grid-cols-5 gap-5"},W={class:"col-span-3"},Z={class:"col-span-2"},ne={__name:"CreateMessageView",setup(E){const M=$(),d=N(),u=[{id:1,label:"Manual"},{id:2,label:"Date"},{id:3,label:"Achievement"}],f=[{id:1,label:"One Day"},{id:2,label:"Two Days"},{id:3,label:"A Week"},{id:4,label:"A Month"},{id:5,label:"Custom"}],c=[{id:1,label:"Minutes"},{id:2,label:"Hours"},{id:3,label:"Days"},{id:4,label:"Weeks"},{id:5,label:"Months"}],p=v(),a=S({name:"",sendMessage:u[0],certainTime:f[0],certainTimeCustom:0,time:c[0],subject:"",message:""}),U=async()=>{let _=d.getUserId(),l=d.getUserRole(),t=1;l!="admin"&&(t=await O.getCredit(_)),t>0?mainStore.setUser(profileForm):M.createAlert({title:"Insufficient credits",color:"error",icon:"$warning",text:"Acquire more credits to create a message"})};return(_,l)=>(m(),b(D,null,{default:o(()=>[e(k,null,{default:o(()=>[n("div",I,[n("div",q,[e(C,{icon:r(w),to:"/rewards-messages",color:"info","rounded-full":"",small:""},null,8,["icon"]),H])]),e(x,{"is-form":"",class:"col-span-3",onSubmit:T(U,["prevent"])},{footer:o(()=>[e(j,{class:"justify-end"},{default:o(()=>[e(C,{color:"info",type:"submit",label:"Save"})]),_:1})]),default:o(()=>[n("div",P,[e(s,{label:"Name"},{default:o(()=>[e(i,{modelValue:a.name,"onUpdate:modelValue":l[0]||(l[0]=t=>a.name=t),icon:r(A),required:""},null,8,["modelValue","icon"])]),_:1}),e(s,{label:"Send Message"},{default:o(()=>[e(i,{modelValue:a.sendMessage,"onUpdate:modelValue":l[1]||(l[1]=t=>a.sendMessage=t),options:u},null,8,["modelValue"])]),_:1}),a.sendMessage.id==2?(m(),b(s,{key:0,label:"Select Date"},{default:o(()=>[e(r(B),{modelValue:p.value,"onUpdate:modelValue":l[2]||(l[2]=t=>p.value=t)},null,8,["modelValue"])]),_:1})):V("",!0),e(s,{label:"Afeter Certain Time"},{default:o(()=>[e(i,{modelValue:a.certainTime,"onUpdate:modelValue":l[3]||(l[3]=t=>a.certainTime=t),options:f},null,8,["modelValue"])]),_:1}),a.certainTime.id==5?(m(),y("div",R,[n("div",W,[e(s,{label:"After Certain Time Custom"},{default:o(()=>[e(i,{modelValue:a.certainTimeCustom,"onUpdate:modelValue":l[4]||(l[4]=t=>a.certainTimeCustom=t),type:"number"},null,8,["modelValue"])]),_:1})]),n("div",Z,[e(s,{label:"Time"},{default:o(()=>[e(i,{modelValue:a.time,"onUpdate:modelValue":l[5]||(l[5]=t=>a.time=t),options:c},null,8,["modelValue"])]),_:1})])])):V("",!0),e(s,{label:"Subject"},{default:o(()=>[e(i,{modelValue:a.subject,"onUpdate:modelValue":l[6]||(l[6]=t=>a.subject=t),icon:r(g)},null,8,["modelValue","icon"])]),_:1}),e(s,{label:"Message"},{default:o(()=>[e(i,{modelValue:a.message,"onUpdate:modelValue":l[7]||(l[7]=t=>a.message=t),icon:r(g)},null,8,["modelValue","icon"])]),_:1})])]),_:1},8,["onSubmit"])]),_:1})]),_:1}))}};export{ne as default};
