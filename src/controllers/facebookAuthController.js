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
      
    }, function (accessToken, refreshToken, profile, done) {
      console.log(profile);
        process.nextTick(function(){
            let userAccount= new UserData();
            userAccount.facebookId = profile.id;                  
            userAccount.token = accessToken;                     
            userAccount.name  = profile.name.givenName + ' ' + profile.name.familyName; 
            userAccount.email = profile.emails[0].value; 
            userAccount.extraInfo = profile.photos[0].value
            console.log(userAccount);
            return done(null, profile);
        });
        
     
    }
  ));


 
