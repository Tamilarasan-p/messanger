const dotenv=require('dotenv');
dotenv.config({ path: __dirname + `/.env` });
const request= require('request');
const FB_PAGE_ACCESS_TOKEN=process.env.FB_PAGE_ACCESS_TOKEN;


const basePage=(req,res)=>{
   return res.render('index.ejs')
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

const setupProfile=(req,res)=>{

    let data={
        "get_started":{
            "payload":"GET_STARTED"
          },
          "persistent_menu": [
            {
                "locale": "default",
                "composer_input_disabled": false,
                "call_to_actions": [
                    {
                        "type": "postback",
                        "title": "Talk to an agent",
                        "payload": "CARE_HELP"
                    },
                    {
                        "type": "postback",
                        "title": "Outfit suggestions",
                        "payload": "CURATION"
                    },
                    {
                        "type": "web_url",
                        "title": "Shop now",
                        "url": "https://www.originalcoastclothing.com/",
                        "webview_height_ratio": "full"
                    }
                ]
            }
        ],
        "whitelisted_domains":[
            "https://bothub-marketing.herokuapp.com",
        ]   
    };

    request({
        "uri": "https://graph.facebook.com/v6.0/me/messenger_profile",
        "qs": { "access_token": process.env.FB_PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": data
      }, (err, res, body) => {
        if (!err) {
          return res.status(200).json({"message":"success"});
        } else {
            return res.status(500).json({"message":"something went wrong"})
        }
      }); 

}
module.exports={
    basePage:basePage,
    signin:signin,
    home:home,
    errorPage:errorPage,
    setupProfile:setupProfile
}