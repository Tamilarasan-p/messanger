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
const sendWelcomeMessage = (sender_psid,response)=>{
    return new Promise(async (resolve,reject)=>{

            try{
                await callSendAPI(sender_psid, response);

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
                                "title": "Shop Now",
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


//sending category list

const sendMainCategory=(sender_psid)=>{
    return new Promise( async(resolve,reject)=>{

            try{

                let category_response=mainCategory_Response();
                await callSendAPI(sender_psid,category_response)
                resolve("done");
            }catch(e){
                reject(e);
            }

    });
};



//sending category list

const sendGroceryList=(sender_psid)=>{
    return new Promise( async(resolve,reject)=>{

            try{

                let grocery_response=groceryItems_Response();
                await callSendAPI(sender_psid,grocery_response)
                resolve("done");
            }catch(e){
                reject(e);
            }

    });
};

const sendGrainsList=(sender_psid)=>{
    return new Promise( async(resolve,reject)=>{

            try{

                let grains_response=grainsItems_Response();
                await callSendAPI(sender_psid,grains_response)
                resolve("done");
            }catch(e){
                reject(e);
            }
    });
};


//send spices list

const sendSpicesList=(sender_psid)=>{
    return new Promise( async(resolve,reject)=>{

            try{

                let spices_response=spicesItems_Response();
                await callSendAPI(sender_psid,spices_response)
                resolve("done");
            }catch(e){
                reject(e);
            }
    });
};



//create category response

const mainCategory_Response=()=>{
    return{
      "attachment":{
        "type":"template",
         "payload":{
          "template_type": "generic",
          "elements":[
            {
              "title": "Groceries",
              "subtitle":"Fresho",
              "buttons":[{
                  "type":"postback",
                  "title":"View Items",
                  "payload":"GROCERY"
                }]
            },
            {
                "title": "Grains",
                "subtitle":"Fresho",
                "buttons":[{
                    "type":"postback",
                    "title":"View Items",
                    "payload":"GRAINS"
                  }]
            },
            {
                "title": "Spices",
                "subtitle":"Fresho",
                "buttons":[{
                    "type":"postback",
                    "title":"View Items",
                    "payload":"SPICES"
                  }]
            }
        
        ]
           
         }
      }
    }
  }
  
  

  const groceryItems_Response=()=>{
    return{
      "attachment":{
        "type":"template",
         "payload":{
          "template_type": "generic",
          "elements":[
            {
              "title": "Beverages",
              "subtitle":"Fresho",
              "buttons":[{
                  "type":"postback",
                  "title":"View",
                  "payload":"BEVERAGES"
                }]
            },
            {
                "title": "Dry Fruits & Nuts",
                "subtitle":"Fresho",
                "buttons":[{
                    "type":"postback",
                    "title":"View",
                    "payload":"DRY_FRUIT_NUTS"
                  }]
            },
            {
                "title": "Oils",
                "subtitle":"Fresho",
                "buttons":[{
                    "type":"postback",
                    "title":"View",
                    "payload":"OILS"
                  }]
            },
            {
                "title": "Pooja Items",
                "subtitle":"Fresho",
                "buttons":[{
                    "type":"postback",
                    "title":"View",
                    "payload":"POOJA_ITEMS"
                  }]
            }
        
        ]
           
         }
      }
    }
  };



  const grainsItems_Response=()=>{
    return{
      "attachment":{
        "type":"template",
         "payload":{
          "template_type": "generic",
          "elements":[
            {
              "title": "Pulses",
              "subtitle":"Fresho",
              "buttons":[{
                  "type":"postback",
                  "title":"Buy",
                  "payload":"BUY"
                }]
            },
            {
                "title": "Rice",
                "subtitle":"Fresho",
                "buttons":[{
                    "type":"postback",
                    "title":"Buy",
                    "payload":"BUY"
                  }]
            }   
        ]
           
         }
      }
    }
  };

  const spicesItems_Response=()=>{
    return{
      "attachment":{
        "type":"template",
         "payload":{
          "template_type": "generic",
          "elements":[
            {
              "title": "Ground Spices",
              "subtitle":"Fresho",
              "buttons":[{
                  "type":"postback",
                  "title":"Buy",
                  "payload":"Buy"
                }]
            },
            {
                "title": "Masala Spices",
                "subtitle":"Fresho",
                "buttons":[{
                    "type":"postback",
                    "title":"BUY",
                    "payload":"BUY"
                  }]
            },
            {
                "title": "Herbs",
                "subtitle":"Fresho",
                "buttons":[{
                    "type":"postback",
                    "title":"View",
                    "payload":"HERBS"
                  }]
            },
            {
                "title": "Whole Spices",
                "subtitle":"Fresho",
                "buttons":[{
                    "type":"postback",
                    "title":"View",
                    "payload":"WHOLE_SPICES"
                  }]
            }
        
        ]
           
         }
      }
    }
  };



const goBackMenu=(sender_psid)=>{
    mainCategory_Response(sender_psid);
}

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
    sendMainCategory:sendMainCategory,
    sendGroceryList:sendGroceryList,
    sendGrainsList:sendGrainsList,
    sendSpicesList:sendSpicesList,
    goBackMenu:goBackMenu,
    callSendAPI:callSendAPI
}