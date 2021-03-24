$(document).ready(function(){
    $('#setUpButton').on("click",function(event){
        event.preventDefault();
        $.ajax({
            url:`https://bothub-marketing.herokuapp.com/setUpButton`,
            method:'POST',
            data:{},
            success:function(data){
                alert("success");
                console.log("success");
            },
            error:function(error){
                console.log(`Error:${error}`);
            }
        });
        //ajax end
    })
})