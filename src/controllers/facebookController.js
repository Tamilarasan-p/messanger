const dotenv=require('dotenv');
dotenv.config({ path: __dirname + `/.env` });
const dataConfig= require('../config/config');
const request= require('request');
const URLparams=require('url');
const { response } = require('express');

const param=new URLparams.URLSearchParams();


const getStartedButton=(req,res)=>{
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
       res.status(200).json({"message":"success"});
    } else {
      res.status(500).json({"message":"something went wrong"})
    }
  }); 
}

const postMethodWebhook=(req,res)=>{
    let body = req.body;

    // Checks this is an event from a page subscription
    if (body.object === 'page') {
  
      // Iterates over each entry - there may be multiple if batched
      body.entry.forEach(function(entry) {
  
        // Gets the message. entry.messaging is an array, but 
        // will only ever contain one message, so we get i   ndex 0
        let webhook_event = entry.messaging[0];
        console.log(webhook_event);
        let sender_psid=webhook_event.sender.id;
        console.log("User PSID:" +sender_psid);


        //check if the event is message or postback and redirect it
        if(webhook_event.message){

            handleMessage(sender_psid,webhook_event.message)

        }else if(webhook_event.postback){

            handlePostback(sender_psid,webhook_event.postback)

        }

      });
  
      // Returns a '200 OK' response to all requests
      res.status(200).send('EVENT_RECEIVED');
    } else {
      // Returns a '404 Not Found' if event is not from a page subscription
      res.sendStatus(404);
    }
};


//get method

const getMethodWebhook=(req,res)=>{
    let VERIFY_TOKEN = process.env.VERIFY_TOKEN;
    console.log(VERIFY_TOKEN);
  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
    
  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
  
    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      
      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);      
    }
  }
};



// Handles messages events
function handleMessage(sender_psid, received_message) {
    let response_message;
    if(received_message.text){
        response_message={
            "text":dataConfig.messages.welcomeMessage
        }
    }

    callSendAPI(sender_psid,response_message);
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
  let payload=received_postback.payload;

  if(payload==="GET_STARTED"){
    response={ "text": dataConfig.messages.welcomeMessage}
  }
  


  //calling API send function
  callSendAPI(sender_psid,response);
}

































// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
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
    getStartedButton:getStartedButton,
    postWebhook:postMethodWebhook,
    getWebhook:getMethodWebhook
}