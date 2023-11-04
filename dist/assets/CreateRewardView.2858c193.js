import{q as $,a as p,o as c,c as g,w as t,b as e,g as s,e as n,d as A,h as U,f as x}from"./index.ec32f494.js";import{G as D,c as E,S as I,T as q}from"./mdi.f693eecd.js";import{u as N,_ as O}from"./NavBar.59cebfca.js";import{_ as j}from"./CardBox.173aa79f.js";import{_ as i}from"./FormField.c48798ca.js";import{_ as r}from"./FormControl.280616cf.js";import{_ as R}from"./FormFilePicker.184d08bb.js";import{_ as y}from"./BaseButton.674e3c10.js";import{_ as P}from"./BaseButtons.2d2440b4.js";import{_ as G}from"./LayoutAuthenticated.0a6b42a9.js";import{_ as L}from"./FormCheckRadio.b41aa598.js";/* empty css             */import{Z}from"./vue-datepicker.1260500d.js";import{U as C}from"./utilityMethods.670eb443.js";import{R as h}from"./RewardController.8eab5a43.js";import{u as H}from"./ServerCall.7354e88a.js";import{U as Q}from"./UserController.5f62944b.js";import"./_plugin-vue_export-helper.cdc0426e.js";import"./BaseIcon.dec28c75.js";import"./colors.dcae2bc6.js";import"./LoginController.9d60cd79.js";const W={class:"flex justify-between pb-5"},z={class:"flex gap-2 items-center"},F=s("p",{class:"font-extrabold"},"Create Reward",-1),J={class:"gap-3"},K={key:1,class:"grid grid-cols-5 gap-5"},X={class:"col-span-3"},Y={class:"col-span-2"},ee={class:"grid grid-cols-1 md:grid-cols-2 gap-5 justify-items-center"},ye={__name:"CreateRewardView",setup(le){const T=N(),_=H();$();const u=p(),m=p(),b=[{id:1,label:"Manual"}],f=[{id:1,label:"One Day"},{id:2,label:"Two Days"},{id:3,label:"A Week"},{id:4,label:"A Month"},{id:5,label:"Custom"}],v=[{id:1,label:"LightBeat"},{id:2,label:"Graphics"},{id:3,label:"UPC Code"},{id:4,label:"QR Code"}];p();const l=p({title:"",description:"",type:v[0],point:"",sendReward:b[0],certainTime:f[0],certainTimeCustom:0,hubEmail:!1}),B=d=>{u.value=d},S=d=>{m.value=d},M=async()=>{let d=_.getUserId(),a=_.getUserRole(),o=1;if(a!="admin"&&(o=await Q.getCredit(d)),o>0){let V="";u&&(V=await C.verifyMedia(u.value,"rewards"));let w="";m&&(w=await C.verifyMedia(m.value,"rewards"));let k={title:l.value.title,description:l.value.description,type:l.value.type.label,point:l.value.point,imgBgReward:V,imgBadReward:w};await h.create(k,"Reward")}else T.createAlert({title:"Insufficient credits",color:"error",icon:"$warning",text:"Acquire more credits to create a reward"})};return(d,a)=>(c(),g(G,null,{default:t(()=>[e(O,null,{default:t(()=>[s("div",W,[s("div",z,[e(y,{icon:n(D),to:"/rewards-messages",color:"info","rounded-full":"",small:""},null,8,["icon"]),F])]),e(j,{"is-form":"",class:"col-span-3",onSubmit:A(M,["prevent"])},{footer:t(()=>[e(P,{class:"justify-end"},{default:t(()=>[e(y,{color:"info",type:"submit",label:"Save"})]),_:1})]),default:t(()=>[s("div",J,[e(i,{label:"Reward Name"},{default:t(()=>[e(r,{modelValue:l.value.title,"onUpdate:modelValue":a[0]||(a[0]=o=>l.value.title=o),icon:n(E),required:""},null,8,["modelValue","icon"])]),_:1}),e(i,{label:"Reward Description"},{default:t(()=>[e(r,{modelValue:l.value.description,"onUpdate:modelValue":a[1]||(a[1]=o=>l.value.description=o),icon:n(I),required:""},null,8,["modelValue","icon"])]),_:1}),e(i,{label:"Reward Points"},{default:t(()=>[e(r,{modelValue:l.value.point,"onUpdate:modelValue":a[2]||(a[2]=o=>l.value.point=o),icon:n(q)},null,8,["modelValue","icon"])]),_:1}),e(i,{label:"Send Reward"},{default:t(()=>[e(r,{modelValue:l.value.sendReward,"onUpdate:modelValue":a[3]||(a[3]=o=>l.value.sendReward=o),options:b},null,8,["modelValue"])]),_:1}),l.value.sendReward.id==2?(c(),g(i,{key:0,label:"Select Date"},{default:t(()=>[e(n(Z),{modelValue:d.dateMessage,"onUpdate:modelValue":a[4]||(a[4]=o=>d.dateMessage=o)},null,8,["modelValue"])]),_:1})):U("",!0),e(i,{label:"Afeter Certain Time"},{default:t(()=>[e(r,{modelValue:l.value.certainTime,"onUpdate:modelValue":a[5]||(a[5]=o=>l.value.certainTime=o),options:f},null,8,["modelValue"])]),_:1}),l.value.certainTime.id==5?(c(),x("div",K,[s("div",X,[e(i,{label:"After Certain Time Custom"},{default:t(()=>[e(r,{modelValue:l.value.certainTimeCustom,"onUpdate:modelValue":a[6]||(a[6]=o=>l.value.certainTimeCustom=o),type:"number"},null,8,["modelValue"])]),_:1})]),s("div",Y,[e(i,{label:"Time"},{default:t(()=>[e(r,{modelValue:l.value.certainTime,"onUpdate:modelValue":a[7]||(a[7]=o=>l.value.certainTime=o),options:f},null,8,["modelValue"])]),_:1})])])):U("",!0),e(i,{label:"Reward Type"},{default:t(()=>[e(r,{modelValue:l.value.type,"onUpdate:modelValue":a[8]||(a[8]=o=>l.value.type=o),options:v},null,8,["modelValue"])]),_:1}),e(i,null,{default:t(()=>[e(L,{label:"Hubspot Email",modelValue:l.value.hubEmail,"onUpdate:modelValue":a[9]||(a[9]=o=>l.value.hubEmail=o)},null,8,["modelValue"])]),_:1}),s("div",ee,[e(i,{label:"Background Image"},{default:t(()=>[e(R,{label:"Upload",modelValue:u.value,"onUpdate:modelValue":B},null,8,["modelValue"])]),_:1}),e(i,{label:"Reward Icon"},{default:t(()=>[e(R,{label:"Upload",modelValue:m.value,"onUpdate:modelValue":S},null,8,["modelValue"])]),_:1})])])]),_:1},8,["onSubmit"])]),_:1})]),_:1}))}};export{ye as default};
