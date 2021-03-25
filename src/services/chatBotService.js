const dotenv=require('dotenv');
dotenv.config({ path: __dirname + `/.env` });
const dataConfig= require('../config/config');
const request= require('request');
const FB_PAGE_ACCESS_TOKEN=process.env.FB_PAGE_ACCESS_TOKEN;
const BASE_URL=process.env.IMAGE_BASE_URL;
const PRODUCT_URL=process.env.PRODUCT_BASE_URL;





let getFacebookUserName=(sender_id)=>{

    return new Promise((resolve,reject)=>{

    let URL=`https://graph.facebook.com/${sender_id}?fields=first_name,last_name,profile_pic&access_token=${FB_PAGE_ACCESS_TOKEN}`
    request({
      "uri": URL,
      "method": "GET",
    }, (err, res, body) => {
      if (!err) {
            console.log(body);
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
const sendWelcomeMessage = (sender_psid,responseText)=>{
    return new Promise(async (resolve,reject)=>{

            try{
                

                //creating additional welcome message

                let welcomeResponse={
                    "attachment": {
                        "type": "template",
                        "payload": {
                          "template_type": "generic",
                          "elements": [{
                            "title": `${responseText}, Welcome to our Store`,
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

const sendMakeUpList=(sender_psid)=>{
    return new Promise( async(resolve,reject)=>{

            try{

                let makeup_response=makeUpItems_Response();
                await callSendAPI(sender_psid,makeup_response)
                resolve("done");
            }catch(e){
                reject(e);
            }
    });
};


//send spices list

const sendPaletteList=(sender_psid)=>{
    return new Promise( async(resolve,reject)=>{

            try{

                let palette_response=palette_Response();
                await callSendAPI(sender_psid,palette_response)
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
              "title": "Make Up Brushes",
              "subtitle":"Cosmetics",
              "image_url":`${BASE_URL}${dataConfig.data.menu1}`,
              "buttons":[{
                  "type":"postback",
                  "title":"View Products",
                  "payload":"BRUSHES"
                }]
            },
            {
                "title": "Highlighter",
                "subtitle":"Cosmetics",
                "image_url":`${BASE_URL}${dataConfig.data.menu2}`,
                "buttons":[{
                    "type":"postback",
                    "title":"View Products",
                    "payload":"NICMAC_PALETTE"
                  }]
            },
            {
                "title": "NIC & MIX PALETTE",
                "subtitle":"Cosmetics",
                "image_url":`${BASE_URL}${dataConfig.data.menu3}`,
                "buttons":[{
                    "type":"postback",
                    "title":"View Products",
                    "payload":"NICMAC_PALETTE"
                  }]
            },
            {
                "title": "NIC & MIX EYE SHADOWS",
                "subtitle":"Cosmetics",
                "image_url":`${BASE_URL}${dataConfig.data.menu4}`,
                "buttons":[{
                    "type":"postback",
                    "title":"View Products",
                    "payload":"EYE_SHADOWS"
                  }]
            }
        
        ]
           
         }
      }
    }
  }
  
  

  const makeUpItems_Response=()=>{
    return{
      "attachment":{
        "type":"template",
         "payload":{
          "template_type": "generic",
          "elements":[
            {
              "title": "Full Bodied Foundation Brush",
              "subtitle":"$40",
              "image_url":`${BASE_URL}${dataConfig.data.product1}`,
              "buttons":[{
                "type":"web_url",
                "url":"https://www.messenger.com/",
                "title":"Buy",
                "webview_height_ratio": "full"
                }]
            },
            {
                "title": "Tapered Powder Brush",
                "subtitle":"$45",
                "image_url":`${PRODUCT_URL}${dataConfig.data.product2}`,
                "buttons":[{
                    "type":"web_url",
                    "url":"https://www.nicmacbeauty.com/makeup-brushes/tapered-powder-brush",
                    "title":"Buy",
                    "webview_height_ratio": "full"
                  }]
            },
            {
                "title": "Tapered Blending Brush",
                "image_url":`${PRODUCT_URL}${dataConfig.data.product3}`,
                "buttons":[{
                    "type":"web_url",
                    "url":"https://www.nicmacbeauty.com/makeup-brushes/tapered-eyeshadow-blender",
                    "title":"Buy",
                    "webview_height_ratio": "full"
                  }]
            },
            {
                "title": "Eyeliner Brush",
                "image_url":`${PRODUCT_URL}${dataConfig.data.product4}`,
                "buttons":[{
                    "type":"web_url",
                    "url":"https://www.nicmacbeauty.com/makeup-brushes/eyeliner",
                    "title":"Buy",
                    "webview_height_ratio": "full"
                  }]
            },
            {
                "title": "Go Back to main list",
                "subtitle":"Cosmetics",
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
  };



  const palette_Response=()=>{
    return{
      "attachment":{
        "type":"template",
         "payload":{
          "template_type": "generic",
          "elements":[
            {
              "title": "Nic & Mix Palette",
              "subtitle":"Strawberry Milkshake Price: $40",
              "image_url":`${BASE_URL}${dataConfig.data.product5}`,
              "buttons":[{
                "type":"web_url",
                "url":"https://www.nicmacbeauty.com/nic-mix-eyeshadow-singles/nic-amp-mix-pressed-eyeshadow-strawberry-milkshake",
                "title":"Buy",
                "webview_height_ratio": "full"
                }]
            },
            {
                "title": "Nic & Mix Pressed Eyeshadow",
                "subtitle":"Candy Floss, Price: $45",
                "image_url":`${BASE_URL}${dataConfig.data.product6}`,
                "buttons":[{
                    "type":"web_url",
                    "url":"https://www.nicmacbeauty.com/nic-mix-eyeshadow-singles/nic-amp-mix-pressed-eyeshadow-candy-floss",
                    "title":"Buy",
                    "webview_height_ratio": "full"
                  }]
            },
            {
                "title": "Nic & Mix Pressed Eyeshadow",
                "subtitle":"Parma Violet, Price: $19",
                "image_url":`${BASE_URL}${dataConfig.data.product7}`,
                "buttons":[{
                    "type":"web_url",
                    "url":"https://www.nicmacbeauty.com/nic-mix-eyeshadow-singles/nic-amp-mix-pressed-eyeshadow-parma-violet",
                    "title":"Buy",
                    "webview_height_ratio": "full"
                  }]
            },
            {
                "title": "Nic & Mix Pressed Eyeshadow",
                "subtitle":"Cola Bottle,Price: $16",
                "image_url":`${BASE_URL}${dataConfig.data.product8}`,
                "buttons":[{
                    "type":"web_url",
                    "url":"https://www.nicmacbeauty.com/nic-mix-eyeshadow-singles/nic-amp-mix-pressed-eyeshadow-cola-bottle",
                    "title":"Buy",
                    "webview_height_ratio": "full"
                  }]
            },
            {
                "title": "Go Back to main list",
                "subtitle":"Cosmetics",
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
  };

  



const goBackMenu=(sender_psid)=>{
    sendMainCategory(sender_psid);
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
    sendMakeUpList:sendMakeUpList,
    sendPaletteList:sendPaletteList,
    goBackMenu:goBackMenu,
    callSendAPI:callSendAPI
};