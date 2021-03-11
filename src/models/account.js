 class UserData{
    
    constructor(id,facebookId,name,email,extraInfo,token){
        this.facebookId=id;
        this.name=name;
        this.email=email;
        this.extraInfo=extraInfo;
        this.token=token;
    }

}

module.exports=UserData