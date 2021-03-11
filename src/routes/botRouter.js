const express = require('express');
const passport=require('passport');
const router = express.Router();
const homeController=require('../controllers/homeController');
const botController=require('../controllers/facebookController');
const fbAuthController=require('../controllers/facebookAuthController');

function isLoggedIn(req,res,next){
    if (req.isAuthenticated())
    return next();
    res.redirect('/');
}

    router.get("/", homeController.basePage);
    router.get('/webhook',botController.getWebhook);
    router.post('/webhook',botController.postWebhook);
    router.get('/home',isLoggedIn,homeController.home);
    router.get('/error',isLoggedIn,homeController.errorPage);



module.exports=router;