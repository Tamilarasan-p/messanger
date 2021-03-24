$(document).ready(function(){
    $('#setUpButton').on("click",function(event){
        event.preventDefault();
        $.ajax({
            url:`${window.location.origin}/setUpButton`,
            method:'POST',
            data:{},
            success:function(data){
                console.log("success");
            },
            error:function(error){
                console.log(`Error:${error}`);
            }
        });
        //ajax end
    })
})