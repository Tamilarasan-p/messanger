 class UserData{
    
    constructor(facebookId,name,photo,email,token,page_name,page_id,page_access_token){
        this.facebookId=facebookId;
        this.name=name;
        this.photo=photo;
        this.email=email;
        this.token=token;
        this.page_name=page_name;
        this.page_id=page_id;
        this.page_access_token=page_access_token;
        
    }

}

module.exports=UserData