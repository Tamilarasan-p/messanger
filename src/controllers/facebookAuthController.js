const dotenv=require('dotenv');
dotenv.config({ path: __dirname + `/.env` });
const passport=require('passport');
const FacebookStrategy=require('passport-facebook').Strategy;
const UserData=require('../models/account')

passport.serializeUser(function (user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });
  
  passport.use(new FacebookStrategy({
      clientID:process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ['id', 'displayName', 'photos', 'email','accounts'],
      enableProof:true
      
    }, function (accessToken, refreshToken, profile, done) {
        
        //console.log(profile)
        process.nextTick(function(){
            let userAccount= new UserData();
            userAccount.facebookId = profile.id;                               
            userAccount.name  = profile.displayName;     
            userAccount.photo = profile.photos[0].value;  
            userAccount.email = profile.emails[0].value; 
            userAccount.token = accessToken; 
            userAccount.page_name = profile._json.accounts.data[0].name;
            userAccount.page_id = profile._json.accounts.data[0].id;
            userAccount.page_access_token = profile._json.accounts.data[0].access_token;   
            console.log(userAccount);
            return done(null, userAccount);
        });
        
     
    }
  ));


 
