const dotenv=require('dotenv');
dotenv.config({ path: __dirname + `/.env` });
const fetch= require('node-fetch');
const request= require('request');
const URLparams=require('url');

const param=new URLparams.URLSearchParams();

const postMethodWebhook=(req,res)=>{
    let body = req.body;

    // Checks this is an event from a page subscription
    if (body.object === 'page') {
  
      // Iterates over each entry - there may be multiple if batched
      body.entry.forEach(function(entry) {
  
        // Gets the message. entry.messaging is an array, but 
        // will only ever contain one message, so we get index 0
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
            "text":`You have sent: "${received_message.text}".`
        }
    }

    callSendAPI(sender_psid,response_message);
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {

}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
    let body={
        "recepient":{
            "id":sender_psid
        },
        "message":response
    }

    //const URL=`https://graph.facebook.com/v2.6/me/messages?access_token=${process.env.FB_PAGE_ACCESS_TOKEN}`;
    //param.append('access_token',process.env.FB_PAGE_ACCESS_TOKEN);


    request({
      "uri": "https://graph.facebook.com/v6.0/me/messages",
      "qs": { "access_token": process.env.FB_PAGE_ACCESS_TOKEN },
      "method": "POST",
      "json": body
  }, (err, res, body) => {
      if (!err) {
          console.log('message sent!'+body.message);
      } else {
          console.error("Unable to send message:" + err);
      }
  });
}

module.exports={
    postWebhook:postMethodWebhook,
    getWebhook:getMethodWebhook
}