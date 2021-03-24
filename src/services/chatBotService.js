const dotenv=require('dotenv');
dotenv.config({ path: __dirname + `/.env` });
const dataConfig= require('../config/config');
const request= require('request');
const FB_PAGE_ACCESS_TOKEN=process.env.FB_PAGE_ACCESS_TOKEN;


let getFacebookUserName=(sender_id)=>{

    return new Promise((resolve,reject)=>{

    let URL=`https://graph.facebook.com/${sender_id}?fields=first_name,last_name,profile_pic&access_token=${FB_PAGE_ACCESS_TOKEN}`
    request({
      "uri": URL,
      "method": "GET",
    }, (err, res, body) => {
      if (!err) {
          //console.log(body);
            body=JSON.parse(body);
            let username=`${body.first_name} ${body.last_name}`
            resolve(username);
      } 
      else {
        reject("Unable to fetch details");
      }

    }); 
});

};



//send welcome message
const sendWelcomeMessage=(sender_psid,response)=>{
    return Promise((resolve,reject)=>{

            try{
                await callSendAPI(sender_psid,response);

                //creating additional welcome message

                let welcomeResponse={
                    "attachment": {
                        "type": "template",
                        "payload": {
                          "template_type": "generic",
                          "elements": [{
                            "title": "Welcome to Shoppers Store",
                            "subtitle": "Lets get started",
                            "image_url": "",
                            "buttons": [
                              {
                                "type": "postback",
                                "title": "Show Categories",
                                "payload": "CATEGORY",
                              }
                            ],
                          }]
                        }
                      }
                }
                     
                await callSendAPI(sender_psid,welcomeResponse);

                resolve("done");

            }catch(e){
                reject(e);
            }

    });
};


const callSendAPI=(sender_psid, response)=> {
    console.log(response);
      // Construct the message body
    let request_body = {
      "recipient": {
        "id": sender_psid
      },
      "message": response
    }
  
    // Send the HTTP request to the Messenger Platform
        request({
        "uri": "https://graph.facebook.com/v6.0/me/messages",
        "qs": { "access_token": process.env.FB_PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
        }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
        }); 
  } 


module.exports={
    sendWelcomeMessage:sendWelcomeMessage,
    getFacebookUserName:getFacebookUserName,
    callSendAPI:callSendAPI
}