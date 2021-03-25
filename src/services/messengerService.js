const request=require('request');
const dotenv=require('dotenv');
dotenv.config({ path: __dirname + `/.env` });
const FB_PAGE_ACCESS_TOKEN=process.env.FB_PAGE_ACCESS_TOKEN;

let setUpMessengerPlatform=()=>{
    return new Promise( (resolve,reject)=>{
     

        try{
         
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
                "qs": { "access_token": FB_PAGE_ACCESS_TOKEN },
                "method": "POST",
                "json": data
              }, (err, res, body) => {
                if (!err) {
                  resolve("Steup Done");
                } else {
                    reject("Error from Server");
                }
              }); 

        }catch(e){
            reject(e)
        }

    });
};


module.exports={
    setUpMessengerPlatform:setUpMessengerPlatform
}