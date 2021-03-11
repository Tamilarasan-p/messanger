const basePage=(req,res)=>{
   return res.render('login.ejs')
};

const home=(req,res)=>{
    return res.render('home.ejs',{userdata:req.user})
}

const errorPage=(req,res)=>{
    return res.render('error.ejs');
}
module.exports={
    basePage:basePage,
    home:home,
    errorPage:errorPage
}