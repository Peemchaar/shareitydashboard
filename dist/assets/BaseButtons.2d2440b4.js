import{B as o,C as t}from"./index.ec32f494.js";const l=o({name:"BaseButtons",props:{noWrap:Boolean,type:{type:String,default:"justify-start"},classAddon:{type:String,default:"last:mr-0 mb-3"},mb:{type:String,default:"-mb-3"}},render(){const r=this.$slots&&this.$slots.default,a=["flex","items-center",this.type,this.noWrap?"flex-nowrap":"flex-wrap"];return this.mb&&a.push(this.mb),t("div",{class:a},r?this.$slots.default().map(s=>s&&s.children&&typeof s.children=="object"?t(s,{},s.children.map(n=>t(n,{class:[this.classAddon]}))):t(s,{class:[this.classAddon]})):null)}});export{l as _};
