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
        const profileData=profile._json;
        console.log(profileData.accounts);
        console.log(profile._j+son);
        console.log(profile._raw);
      return done(null, profileData);
        // process.nextTick(function(){
        //     let userAccount= new UserData();
        //     userAccount.facebookId = profile.id;                               
        //     userAccount.name  = profile.displayName;     
        //     userAccount.photo = profile.picture.data.url;  
        //     userAccount.email = profile.emails[0].value; 
        //     userAccount.accounts = profile.accounts;
        //     userAccount.token = accessToken; 
        //     console.log(userAccount);
        //     return done(null, profile);
        // });
        
     
    }
  ));


 
