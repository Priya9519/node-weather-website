const request=require('request')

const forecast=(lat,lang,callback)=>{
    //http://api.weatherstack.com/current?access_key=f32292ffe299eff835738edb7a8b2195&query=26.22,84.36

    const url='http://api.weatherstack.com/current?access_key=f32292ffe299eff835738edb7a8b2195&query='+lat+","+lang
    
    request({url:url,json:true},(err,res)=>{

        if(err){

            callback('Unable to connect to wether services!',undefined)

        }
        else if(res.body.error){

            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined,{
                weather_descriptions:res.body.current.weather_descriptions,
                temperature:res.body.current.temperature,
                feelslike:res.body.current.feelslike

            })
        }

    })

}

//const url='http://api.weatherstack.com/current?access_key=f32292ffe299eff835738edb7a8b2195&query=1'

// request({url:url,json:true},(err,res)=>{

//     if(err){
        
//         console.log("Unable to connect to wether services!")
//     }
//     else if(res.body.error){
//         console.log("Unable to find location")

//     }
//     else{
//         //console.log(res.body.current)
//         console.log(res.body.current.weather_descriptions[0]+".It is currently "+res.body.current.temperature+" degrees out. It feels like "+res.body.current.feelslike+" degree out.")

//     }

// })

module.exports=forecast