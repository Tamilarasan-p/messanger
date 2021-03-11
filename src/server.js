const express= require('express');
const session=require('express-session');
const bodyParser=require('body-parser');
const passport=require('passport');
const dotenv=require('dotenv');
dotenv.config({ path: __dirname + `/.env` });
const viewEngine=require('./config/viewEngine');
const initWebRoutes=require('./routes/botRouter');
const port=process.env.PORT ;

const app=express();

//config views
viewEngine(app);



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    resave:true,
    saveUninitialized:false,
    secret:'keyforlogin'
}));
app.use(passport.initialize());
app.use(passport.session());


//config  routers
app.use('/',initWebRoutes);

const fbAuthController=require('./controllers/facebookAuthController');
//authenticate
app.get('/auth/facebook',passport.authenticate('facebook',{scope:['email','pages_show_list','public_profile','pages_messaging']}));
app.get('/auth/facebook/callback',passport.authenticate('facebook',{
    successRedirect:'/home',
    failureRedirect:'/error'
}));

app.get('/auth/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

app.listen(port,(req,res)=>{
    console.log(`Server Running on Port:${port}`);
});



