import{u as t,a as o,S as a}from"./ServerCall.7354e88a.js";const d=t();o();const i={getAll:async()=>{try{return(await a.get("/reward/list-rewards")).data}catch(r){throw r}},create:async r=>{try{const e=d.getUserId(),s={title:r.title,description:r.description,type:r.type,point:r.point,imgBgReward:r.imgBgReward,imgBadReward:r.imgBadReward,userId:e};return(await a.post("/reward/create",s)).data}catch(e){throw e}},giveReward:async r=>{try{const e={idUser:r.idUsr,idReward:r.reward};return(await a.post("/reward/obtain-reward",e)).data}catch(e){throw e}}};export{i as R};
