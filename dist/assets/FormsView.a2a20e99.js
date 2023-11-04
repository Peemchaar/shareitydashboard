import{o as k,f as C,g as h,k as O,n as D,e as s,r as w,a as x,c as F,w as l,b as e,d as S,I as c,t as N}from"./index.ec32f494.js";import{Z as T,W as M,c as g,O as W}from"./mdi.f693eecd.js";import{b as d,_ as v}from"./NavBar.59cebfca.js";import{_}from"./CardBox.173aa79f.js";import{_ as b}from"./FormCheckRadioGroup.87217229.js";import{_ as j}from"./FormFilePicker.184d08bb.js";import{_ as i}from"./FormField.c48798ca.js";import{_ as m}from"./FormControl.280616cf.js";import{_ as p}from"./BaseButton.674e3c10.js";import{_ as q}from"./BaseButtons.2d2440b4.js";import{_ as $}from"./SectionTitle.06e75829.js";import{_ as z}from"./LayoutAuthenticated.0a6b42a9.js";import{S as E}from"./SectionTitleLineWithButton.85e6d937.js";import{f as G}from"./colors.dcae2bc6.js";import"./_plugin-vue_export-helper.cdc0426e.js";import"./FormCheckRadio.b41aa598.js";import"./BaseIcon.dec28c75.js";import"./ServerCall.7354e88a.js";import"./LoginController.9d60cd79.js";const I={class:"flex flex-col mb-6 -mt-6 -mr-6 -ml-6 animate-fade-in"},L={__name:"NotificationBarInCard",props:{color:{type:String,required:!0}},setup(V){return(u,a)=>(k(),C("div",I,[h("div",{class:D([[s(G)[V.color]],"rounded-t-2xl flex flex-col p-6 transition-colors"])},[O(u.$slots,"default")],2)]))}},Y={class:"capitalize"},de={__name:"FormsView",setup(V){const u=[{id:1,label:"Business development"},{id:2,label:"Marketing"},{id:3,label:"Sales"}],a=w({name:"John Doe",email:"john.doe@example.com",phone:"",department:u[0],subject:"",question:""}),n=w({checkbox:["lorem"],radio:"one",switch:["one"],file:null}),y=()=>{},U=x(!0),r=x(0),f=["info","success","danger","warning"],B=()=>{r.value=f[r.value+1]?r.value+1:0};return(H,o)=>(k(),F(z,null,{default:l(()=>[e(v,null,{default:l(()=>[e(E,{icon:s(T),title:"Forms example",main:""},{default:l(()=>[e(p,{href:"https://github.com/justboil/admin-one-vue-tailwind",target:"_blank",icon:s(M),label:"Star on GitHub",color:"contrast","rounded-full":"",small:""},null,8,["icon"])]),_:1},8,["icon"]),e(_,{form:"",onSubmit:S(y,["prevent"])},{footer:l(()=>[e(q,null,{default:l(()=>[e(p,{type:"submit",color:"info",label:"Submit"}),e(p,{type:"reset",color:"info",outline:"",label:"Reset"})]),_:1})]),default:l(()=>[e(i,{label:"Grouped with icons"},{default:l(()=>[e(m,{modelValue:a.name,"onUpdate:modelValue":o[0]||(o[0]=t=>a.name=t),icon:s(g)},null,8,["modelValue","icon"]),e(m,{modelValue:a.email,"onUpdate:modelValue":o[1]||(o[1]=t=>a.email=t),type:"email",icon:s(W)},null,8,["modelValue","icon"])]),_:1}),e(i,{label:"With help line",help:"Do not enter the leading zero"},{default:l(()=>[e(m,{modelValue:a.phone,"onUpdate:modelValue":o[2]||(o[2]=t=>a.phone=t),type:"tel",placeholder:"Your phone number"},null,8,["modelValue"])]),_:1}),e(i,{label:"Dropdown"},{default:l(()=>[e(m,{modelValue:a.department,"onUpdate:modelValue":o[3]||(o[3]=t=>a.department=t),options:u},null,8,["modelValue"])]),_:1}),e(d),e(i,{label:"Question",help:"Your question. Max 255 characters"},{default:l(()=>[e(m,{type:"textarea",placeholder:"Explain how we can help you"})]),_:1})]),_:1},8,["onSubmit"])]),_:1}),e($,null,{default:l(()=>[c("Custom elements")]),_:1}),e(v,null,{default:l(()=>[e(_,null,{default:l(()=>[e(i,{label:"Checkbox"},{default:l(()=>[e(b,{modelValue:n.checkbox,"onUpdate:modelValue":o[4]||(o[4]=t=>n.checkbox=t),name:"sample-checkbox",options:{lorem:"Lorem",ipsum:"Ipsum",dolore:"Dolore"}},null,8,["modelValue"])]),_:1}),e(d),e(i,{label:"Radio"},{default:l(()=>[e(b,{modelValue:n.radio,"onUpdate:modelValue":o[5]||(o[5]=t=>n.radio=t),name:"sample-radio",type:"radio",options:{one:"One",two:"Two"}},null,8,["modelValue"])]),_:1}),e(d),e(i,{label:"Switch"},{default:l(()=>[e(b,{modelValue:n.switch,"onUpdate:modelValue":o[6]||(o[6]=t=>n.switch=t),name:"sample-switch",type:"switch",options:{one:"One",two:"Two"}},null,8,["modelValue"])]),_:1}),e(d),e(j,{modelValue:n.file,"onUpdate:modelValue":o[7]||(o[7]=t=>n.file=t),label:"Upload"},null,8,["modelValue"])]),_:1}),e($,null,{default:l(()=>[c("Form with status example")]),_:1}),e(_,{class:"md:w-7/12 lg:w-5/12 xl:w-4/12 shadow-2xl md:mx-auto","is-form":"","is-hoverable":"",onSubmit:S(B,["prevent"])},{footer:l(()=>[e(p,{label:"Trigger",type:"submit",color:"info"})]),default:l(()=>[e(L,{color:f[r.value],"is-placed-with-header":U.value},{default:l(()=>[h("span",null,[h("b",Y,N(f[r.value]),1),c(" state")])]),_:1},8,["color","is-placed-with-header"]),e(i,{label:"Fields"},{default:l(()=>[e(m,{modelValue:a.name,"onUpdate:modelValue":o[8]||(o[8]=t=>a.name=t),"icon-left":s(g),help:"Your full name",placeholder:"Name"},null,8,["modelValue","icon-left"])]),_:1})]),_:1},8,["onSubmit"])]),_:1})]),_:1}))}};export{de as default};
