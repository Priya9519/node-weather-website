const request=require('request')

const geocode=(address,callback)=>{

    const geoUrl="https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoicHJpeWFrdW1hcmkiLCJhIjoiY2tlazM2Nms0MDV2YjJzcHdqY2J5ODVrbCJ9.oJ6iCbd-4hGN0CCOXFCzdw"
    request({url:geoUrl,json:true},(err,res)=>{

    if(err){

        callback("Unable to connect to location service",undefined)

    }
    else if(res.body.features.length==0){

        callback("Unable to find location. Please try another search",undefined)
    }
    else{

        callback(null,{
            latitude:res.body.features[0].center[1],
            longitude: res.body.features[0].center[0],
            location:res.body.features[0].place_name
            
        })
    }
})
}

module.exports=geocode