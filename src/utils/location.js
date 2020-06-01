// const request = require('request');
// var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/karachi.json?access_token=pk.eyJ1IjoiamFzaW1hbGkiLCJhIjoiY2thMjl1ZXptMDB6NzNtbXNmeHZmNDdyaSJ9.goLZ5AXTuyZ8nzhprrbdGA"
// request({url:url,json:true},(error,response)=>{
//     if(error){ // for handling higher level error
//         console.log("Error in processing request");
//     }
//     else if(response.body.features.length===0){ // for handling errors in response low level errors
//         console.log("Something went wrong in response")
//     }
//     else{
//     console.log(response.body.features[0].geometry.coordinates);}
// });

const request = require("request");

const geocode = (address,callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiamFzaW1hbGkiLCJhIjoiY2thMjl1ZXptMDB6NzNtbXNmeHZmNDdyaSJ9.goLZ5AXTuyZ8nzhprrbdGA";
    request({url:url,json:true},(error,response)=>{
        if(error){
            console.log("Unable to connect")
        }
        else if(response.body.features.length===0){
            console.log("Something went wrong in response");
        }
        else{
            callback(undefined, response);
        }
    })
}
