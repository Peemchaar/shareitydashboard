import{G as ae,H as ne,I as re,J as ce,K as de,L as ue}from"./mdi.f693eecd.js";import{_ as ie}from"./NavBar.59cebfca.js";import{_ as _e}from"./CardBox.173aa79f.js";import{_ as pe}from"./LayoutAuthenticated.0a6b42a9.js";import{_ as V}from"./BaseButton.674e3c10.js";import{U as H}from"./UserController.5f62944b.js";import{C as ve}from"./ChallengeController.9b8120ad.js";import{U as me}from"./utilityMethods.670eb443.js";import{u as fe}from"./ServerCall.7354e88a.js";import{a as c,i as Z,r as he,M as ge,G as d,o as r,c as h,w as o,b as l,g as e,e as p,I as n,f as u,F as P,z as j,t as g,h as T}from"./index.ec32f494.js";import"./_plugin-vue_export-helper.cdc0426e.js";import"./BaseIcon.dec28c75.js";import"./colors.dcae2bc6.js";import"./LoginController.9d60cd79.js";const xe={class:"flex justify-between pb-5"},we={class:"flex gap-2 items-center"},ye=e("p",{class:"font-extrabold"},"All Users",-1),ke=e("b",null,"Delete",-1),be=e("b",null,"Block",-1),Ce=e("b",null,"Unblock",-1),Ue={className:"w-80 relative my-0 m-auto"},Ve={key:0,class:"table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400"},Se=e("thead",{class:"text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"},[e("tr",null,[e("th",{scope:"col",class:"px-3 py-3"},"Badge"),e("th",{scope:"col",class:"px-6 py-3"},"Chalelnge Name")])],-1),$e={class:"bg-white border-b dark:bg-gray-800 dark:border-gray-700"},Be={class:"px-3 py-4 w-[80px] h-[80px]"},Ae=["src"],Le={class:"px-3 py-4"},De={key:1},Ne=e("p",null,"No user challenges to show",-1),Ie=[Ne],Me={className:"w-80 relative my-0 m-auto"},Ze={key:0,class:"p-3 bg-gray-100/50 dark:bg-slate-800"},He={class:"relative overflow-x-auto shadow-md sm:rounded-lg"},Pe={class:"table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400"},je={class:"text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"},Te=e("th",{scope:"col",class:"w-12 px-6 py-3"},"Profile Picture",-1),Ee={scope:"col",class:"px-6 py-3"},Fe={class:"flex items-center"},Ge=e("svg",{class:"w-3 h-3 ml-1.5","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",viewBox:"0 0 24 24"},[e("path",{d:"M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"})],-1),Oe=[Ge],ze={scope:"col",class:"w-20 px-6 py-3"},Je={class:"flex items-center"},Ke=e("svg",{class:"w-3 h-3 ml-1.5","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",viewBox:"0 0 24 24"},[e("path",{d:"M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"})],-1),Re=[Ke],qe={scope:"col",class:"w-20 px-6 py-3"},Qe={class:"flex items-center"},We=e("svg",{class:"w-3 h-3 ml-1.5","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",viewBox:"0 0 24 24"},[e("path",{d:"M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"})],-1),Xe=[We],Ye={scope:"col",class:"w-20 px-6 py-3"},et={class:"flex items-center"},tt=e("svg",{class:"w-3 h-3 ml-1.5","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",viewBox:"0 0 24 24"},[e("path",{d:"M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"})],-1),st=[tt],lt=e("th",{scope:"col",class:"w-12 px-6 py-3"},[e("div",{class:"flex items-center"},"Challenges Completed")],-1),ot=e("th",{scope:"col",class:"w-20 px-6 py-3"},[e("span",{class:"text-center"},"Sway Score")],-1),at=e("th",{scope:"col",class:"col-auto px-6 py-3"},[e("span",{class:"text-center"},"Actions")],-1),nt={key:1,scope:"row",class:"px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"},rt=["src"],ct={key:2,scope:"row",class:"px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"},dt={class:"px-6 py-4"},ut={class:"px-6 py-4"},it={class:"px-6 py-4"},_t={class:"px-6 py-4"},pt={class:"px-6 py-4"},vt={class:"px-6 py-4 text-right flex row"},mt={class:"before:hidden lg:w-1 whitespace-nowrap"},ft={class:"p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800"},ht=e("p",{class:"text-lg italic font-bold"},[n("User has been "),e("b",null,"Deleted")],-1),J=!1,gt="../../assets/user.png",It={__name:"AllUsersView",setup(xt){const K=fe(),w=c([]),E="https://chgsdev.shareity.com/",y=c({}),S=c({}),$=c(!1),F=c(0),k=c(!1),b=c(10),B=c(1),G=c([]),C=c({field:"firstName",order:1}),A=c(!1),L=c(!1),U=c(!1),x=c({});Z(()=>{const a=B.value*b.value;return O.value.reverse().slice(a,a+b.value)});const R=he(a=>{switch(a){case 0:return"Inactive";case 1:return"Active";case 2:return"Deleted";default:return"Unknown"}}),O=Z(()=>{const{field:a,order:t}=C.value,i=(B.value-1)*b.value;return w.value.sort((_,v)=>a==="createdAt"?t*(new Date(_[a])-new Date(v[a])):t*(_[a]<v[a]?1:-1)).slice(i,i+b.value)}),q=Z(()=>Math.ceil(w.value.length/b.value)-1),Q=Z(()=>{const a=[];for(let t=0;t<q.value;t++)a.push(t);return a});ge(()=>{H.getAll(K.getUserId()).then(a=>{w.value=a,console.log("data",a)})});function D(a){C.value.field===a?(console.log("campo",a),C.value.order*=-1):(C.value.field=a,C.value.order=1)}function W(a){ve.getUserChallenge(a.id).then(t=>{y.value=t.data.page,console.log(y)}),A.value=!0,console.log(y.value)}function X(a){H.getSwayScore(a.id).then(t=>{S.value=t.value,console.log(S)}),L.value=!0,console.log(S)}function Y(){console.log("deleted",F.value),k.value=!1,$.value=!0}async function ee(){const a=x.value.id,t=!x.value.status==1,i=await H.blockUser(a,t),_=w.value.indexOf(x.value);w.value[_].status=i.status,U.value=!1}return(a,t)=>{const i=d("v-card-title"),_=d("v-card-text"),v=d("v-spacer"),m=d("v-btn"),N=d("v-card-actions"),I=d("v-card"),M=d("v-dialog"),z=d("TableCheckboxCell"),te=d("BaseButtons"),se=d("v-pagination"),le=d("BaseLevel"),oe=d("v-snackbar");return r(),h(pe,null,{default:o(()=>[l(ie,null,{default:o(()=>[e("div",xe,[e("div",we,[l(V,{to:"/dashboard",icon:p(ae),color:"info","rounded-full":"",small:""},null,8,["icon"]),ye])]),l(_e,{class:"mb-6 m","has-table":""},{default:o(()=>[e("div",null,[l(M,{modelValue:k.value,"onUpdate:modelValue":t[2]||(t[2]=s=>k.value=s),width:"auto"},{default:o(()=>[l(I,null,{default:o(()=>[l(i,{class:"text-h5"},{default:o(()=>[n(" Delete? ")]),_:1}),l(_,null,{default:o(()=>[n("Are you sure you want to "),ke,n(" this user?")]),_:1}),l(N,null,{default:o(()=>[l(v),l(m,{color:"green-darken-1",variant:"text",onClick:t[0]||(t[0]=s=>k.value=!1)},{default:o(()=>[n(" Disagree ")]),_:1}),l(m,{color:"red",variant:"text",onClick:t[1]||(t[1]=s=>Y())},{default:o(()=>[n(" Agree ")]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),l(M,{modelValue:U.value,"onUpdate:modelValue":t[5]||(t[5]=s=>U.value=s),width:"auto"},{default:o(()=>[l(I,null,{default:o(()=>[x.value.status?(r(),h(i,{key:0,class:"text-h5"},{default:o(()=>[n(" Block User? ")]),_:1})):(r(),h(i,{key:1,class:"text-h5"},{default:o(()=>[n(" Unblock User? ")]),_:1})),x.value.status?(r(),h(_,{key:2},{default:o(()=>[n("Are you sure you want to "),be,n(" this user?")]),_:1})):(r(),h(_,{key:3},{default:o(()=>[n("Are you sure you want to "),Ce,n(" this user?")]),_:1})),l(N,null,{default:o(()=>[l(v),l(m,{color:"green-darken-1",variant:"text",onClick:t[3]||(t[3]=s=>U.value=!1)},{default:o(()=>[n(" Disagree ")]),_:1}),l(m,{color:"red",variant:"text",onClick:t[4]||(t[4]=s=>ee())},{default:o(()=>[n(" Agree ")]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),l(M,{modelValue:A.value,"onUpdate:modelValue":t[8]||(t[8]=s=>A.value=s),width:"auto"},{default:o(()=>[l(I,null,{default:o(()=>[l(i,{class:"text-h5 ml-2"},{default:o(()=>[n(" Detail ")]),_:1}),l(_,null,{default:o(()=>[e("div",Ue,[y.value.length>0?(r(),u("table",Ve,[Se,e("tbody",null,[(r(!0),u(P,null,j(y.value,s=>(r(),u("tr",$e,[J?(r(),h(z,{key:0,onChecked:t[6]||(t[6]=f=>a.checked(f,a.client))})):T("",!0),e("td",Be,[e("img",{class:"w-full object-cover",src:p(E)+s.challenge.badge,alt:"Badge of challenge"},null,8,Ae)]),e("td",Le,g(s.challenge.name),1)]))),256))])])):(r(),u("div",De,Ie))])]),_:1}),l(N,null,{default:o(()=>[l(v),l(m,{class:"mr-2",color:"red-darken-1",variant:"text",onClick:t[7]||(t[7]=s=>A.value=!1)},{default:o(()=>[n(" Close ")]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),l(M,{modelValue:L.value,"onUpdate:modelValue":t[10]||(t[10]=s=>L.value=s),width:"auto"},{default:o(()=>[l(I,null,{default:o(()=>[l(i,{class:"text-h5 ml-2"},{default:o(()=>[n(" Detail Info Sway Score")]),_:1}),l(_,null,{default:o(()=>[e("div",Me,[e("p",null,"Sway Score: "+g(S.value),1)])]),_:1}),l(N,null,{default:o(()=>[l(v),l(m,{class:"mr-2",color:"red-darken-1",variant:"text",onClick:t[9]||(t[9]=s=>L.value=!1)},{default:o(()=>[n(" Close ")]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),G.value.length?(r(),u("div",Ze,[(r(!0),u(P,null,j(G.value,s=>(r(),u("span",{key:s.id,class:"inline-block px-2 py-1 rounded-sm mr-2 text-sm bg-gray-100 dark:bg-slate-700"},g(s.name),1))),128))])):T("",!0),e("div",He,[e("table",Pe,[e("thead",je,[e("tr",null,[Te,e("th",Ee,[e("div",Fe,[n(" Name "),e("a",{onClick:t[11]||(t[11]=s=>D("firstName"))},Oe)])]),e("th",ze,[e("div",Je,[n(" Status "),e("a",{onClick:t[12]||(t[12]=s=>D("status"))},Re)])]),e("th",qe,[e("div",Qe,[n(" Sway score "),e("a",{onClick:t[13]||(t[13]=s=>D("sway"))},Xe)])]),e("th",Ye,[e("div",et,[n(" Registered "),e("a",{onClick:t[14]||(t[14]=s=>D("createdAt"))},st)])]),lt,ot,at])]),e("tbody",null,[(r(!0),u(P,null,j(O.value,s=>(r(),u("tr",{key:s.id,class:"bg-white border-b dark:bg-gray-800 dark:border-gray-700"},[J?(r(),h(z,{key:0,onChecked:f=>a.checked(f,s)},null,8,["onChecked"])):T("",!0),s.image&&s.imagen.match(/.*\..{2,5}/)?(r(),u("th",nt,[e("img",{class:"rounded-full",src:p(E)+s.imagen,alt:""},null,8,rt)])):(r(),u("th",ct,[e("img",{src:gt,alt:""})])),e("td",dt,g(`${s.firstName} ${s.lastName}`),1),e("td",ut,g(R(s.status)),1),e("td",it,g(s.sway),1),e("td",_t,g(p(me).formatDate(s.createdAt)),1),e("td",pt,[l(V,{color:"info",icon:p(ne),small:"",onClick:f=>W(s),class:"m-2"},null,8,["icon","onClick"])]),e("td",vt,[l(V,{color:"info",icon:p(re),small:"",onClick:f=>X(s),class:"m-2 via-violet-500"},null,8,["icon","onClick"])]),e("td",mt,[l(te,{type:"justify-start lg:justify-end","no-wrap":""},{default:o(()=>[l(V,{color:"danger",icon:p(ce),small:"",onClick:f=>{k.value=!0,F.value=s.id}},null,8,["icon","onClick"]),l(V,{class:"ml-5",color:s.status==1?"success":"bg-gray-300",icon:s.status==1?p(de):p(ue),small:"",onClick:f=>{U.value=!0,x.value=s}},null,8,["color","icon","onClick"])]),_:2},1024)])]))),128))])])]),e("div",ft,[l(le,null,{default:o(()=>[l(se,{length:Q.value.length,color:"black","total-visible":10,modelValue:B.value,"onUpdate:modelValue":t[15]||(t[15]=s=>B.value=s)},null,8,["length","modelValue"])]),_:1})])])]),_:1})]),_:1}),l(oe,{modelValue:$.value,"onUpdate:modelValue":t[17]||(t[17]=s=>$.value=s),timeout:3e3,color:"red"},{actions:o(()=>[l(m,{color:"white",variant:"text",onClick:t[16]||(t[16]=s=>$.value=!1)},{default:o(()=>[n(" Close ")]),_:1})]),default:o(()=>[ht]),_:1},8,["modelValue"])]),_:1})}}};export{It as default};
