import{_ as d}from"./FormCheckRadio.b41aa598.js";import{i as p,o as l,f as u,F as f,z as y,c as b,n as s}from"./index.ec32f494.js";const g={__name:"FormCheckRadioGroup",props:{options:{type:Object,default:()=>{}},name:{type:String,required:!0},type:{type:String,default:"checkbox",validator:e=>["checkbox","radio","switch"].includes(e)},componentClass:{type:String,default:null},isColumn:Boolean,modelValue:{type:[Array,String,Number,Boolean],default:null}},emits:["update:modelValue"],setup(e,{emit:m}){const r=e,a=p({get:()=>r.modelValue,set:t=>{m("update:modelValue",t)}});return(t,o)=>(l(),u("div",{class:s(["flex justify-start flex-wrap -mb-3",{"flex-col":e.isColumn}])},[(l(!0),u(f,null,y(e.options,(c,n)=>(l(),b(d,{key:n,modelValue:a.value,"onUpdate:modelValue":o[0]||(o[0]=i=>a.value=i),type:e.type,name:e.name,"input-value":n,label:c,class:s([e.componentClass,"mr-6 mb-3 last:mr-0"])},null,8,["modelValue","type","name","input-value","label","class"]))),128))],2))}};export{g as _};