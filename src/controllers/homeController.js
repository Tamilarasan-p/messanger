const dotenv=require('dotenv');
dotenv.config({ path: __dirname + `/.env` });
const request= require('request');
const messengerService=require('../services/messengerService');


const basePage=(req,res)=>{
   return res.render('login.ejs')
};

const signin=(req,res)=>{
    return res.render('login.ejs')
 };

const home=(req,res)=>{
    return res.render('home.ejs',{user:req.user})
}

const errorPage=(req,res)=>{
    return res.render('error.ejs');
}

const setUpMessengerProfile= async(req,res)=>{
    
     try{
        await messengerService.setUpMessengerPlatform();
        return res.status(200).json({"message":"success"});
     }catch(e){
        return res.status(500).json({"message":"something went wrong"})
     }

};
module.exports={
    basePage:basePage,
    signin:signin,
    home:home,
    errorPage:errorPage,
    setUpMessengerProfile:setUpMessengerProfile
}