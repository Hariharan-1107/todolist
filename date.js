exports.getdate=function(){
    let today =new Date();
    let options={
        weekday:"long",
        day:"numeric",
        month:"long"
    }
    
    return today.toLocaleString("en-US",options);
  }