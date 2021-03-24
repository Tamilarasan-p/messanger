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


//sending category list

const sendCategory=(sender_psid)=>{
    return new Promise( async(resolve,reject)=>{

            try{

                let category_response=categoryResponse();
                await callSendAPI(sender_psid,category_response)
                resolve("done");
            }catch(e){
                reject(e);
            }

    });
};



//sending category list

const sendSubCategory=(sender_psid)=>{
    return new Promise( async(resolve,reject)=>{

            try{

                let subcategory_response=subCategoryResponse();
                await callSendAPI(sender_psid,subcategory_response)
                resolve("done");
            }catch(e){
                reject(e);
            }

    });
};

const sendShirtsMen=(sender_psid)=>{
    return new Promise( async(resolve,reject)=>{

            try{

                let product_response=productResponse_Men();
                await callSendAPI(sender_psid,product_response)
                resolve("done");
            }catch(e){
                reject(e);
            }

    });
};



//create category response

const categoryResponse=()=>{
    return{
      "attachment":{
        "type":"template",
         "payload":{
          "template_type": "generic",
          "elements":[
            {
              "title": "Men",
              "buttons":[{
                  "type":"postback",
                  "title":"Men",
                  "payload":"MEN"
                }]
            },
            {
                "title": "Women",
                "buttons":[{
                    "type":"postback",
                    "title":"Women",
                    "payload":"WOMEN"
                  }]
              }
        
        ]
           
         }
      }
    }
  }
  
  

  const subCategoryResponse=()=>{
    return{
      "attachment":{
        "type":"template",
         "payload":{
          "template_type": "generic",
          "elements":[
            {
              "title": "Shirts",
              "buttons":[{
                  "type":"postback",
                  "title":"View",
                  "payload":"SHIRTS"
                }]
            },
            {
                "title": "Pants",
                "buttons":[{
                    "type":"postback",
                    "title":"View",
                    "payload":"PANTS"
                  }]
            },
            {
                "title": "T-Shirts",
                "buttons":[{
                    "type":"postback",
                    "title":"View",
                    "payload":"TSHIRTS"
                  }]
            },
            {
                "title": "Sports Wear",
                "buttons":[{
                    "type":"postback",
                    "title":"View",
                    "payload":"SPORTS"
                  }]
            }
        
        ]
           
         }
      }
    }
  };



  const productResponse_Men=()=>{
    return{
      "attachment":{
        "type":"template",
         "payload":{
          "template_type": "generic",
          "elements":[
            {
              "title": "U.S Polo Assn",
              "subtitle":"Checked Shirt with patch pocket",
              "buttons":[{
                  "type":"postback",
                  "title":"Buy",
                  "payload":"BUY"
                }]
            },
            {
                "title": "PETER ENGLAND",
                "subtitle":"Solid Comfort Fit Shirt",
                "buttons":[{
                    "type":"postback",
                    "title":"Buy",
                    "payload":"BUY"
                  }]
            },
            {
                "title": "ARMANI EXCHANGE",
                "subtitle":"Slim Fit Poplin Shirt",
                "buttons":[{
                    "type":"postback",
                    "title":"Buy",
                    "payload":"BUY"
                  }]
            },
            {
                "title": "TOMMY HILFIGER",
                "subtitle":"Slim Fit Shirt",
                "buttons":[{
                    "type":"postback",
                    "title":"Buy",
                    "payload":"BUY"
                  }]
            },
            {
                "buttons":[{
                    "type":"postback",
                    "title":"Go Back",
                    "payload":"BACK_TO_MAIN"
                  }]
            }
        
        ]
           
         }
      }
    }
  }



const goBackMenu=(sender_psid)=>{
    sendCategory(sender_psid);
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
    sendCategory:sendCategory,
    sendSubCategory:sendSubCategory,
    sendShirtsMen:sendShirtsMen,
    goBackMenu:goBackMenu,
    callSendAPI:callSendAPI
}