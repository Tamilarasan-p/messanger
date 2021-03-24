const dotenv=require('dotenv');
dotenv.config({ path: __dirname + `/.env` });
const dataConfig= require('../config/config');
const request= require('request');

let getFacebookUserName=(sender_id)=>{

    return new Promise(  (resolve,reject)=>{

    let URL=`https://graph.facebook.com/${sender_id}?fields=first_name,last_name,profile_pic&access_token=${FB_PAGE_ACCESS_TOKEN}`
    request({
      "uri": URL,
      "method": "GET",
    }, (err, res, body) => {
      if (!err) {
          let body=JSON.parse(body);
          let username=`${body.first_name} ${body.last_name}`
            resolve(username);

      } else {
        reject("Unable to send message:" + err);
      }
    }); 

}



module.exports={
    getFacebookUserName:getFacebookUserName
}

    
  }