const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()
const port=process.env.PORT || 3000

//console.log(__dirname)
//console.log(path.join(__dirname,'../public'))

// all this code is for static pages

//Define path for express config
const publicDirectory=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

// app.get('',(req,res)=>{

//     res.send('<h1>Weather</h1>')
// })

// app.get('/help',(req,res)=>{
//     res.send([
//         {s
//             name:'Priya'
//         },
//         {
//             name:'Puja'
//         },
//         {
//             name:'Supriya'
//         }
        
//     ])
// })

// app.get('/about',(req,res)=>{
//     res.send("<h1>About Page</h1>")
// })

// app.get('/weather',(req,res)=>{
//     res.send({
//         location:"patna",
//         forecast:"Temperature is 23 degree and it feels like 28 degree"
//     })
// })


//For dynamic pages using handler bar
//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//set static directory to serve
app.use(express.static(publicDirectory))


app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather",
        name:"Priya Kumari"
    })
})

app.get('/weather',(req,response)=>{

    if(!req.query.address){
      return response.send({
          error:"Please provide address"
      })
    }
    geocode(req.query.address,(err,res)=>{

        if(err){
            return response.send({
                error:err
            })
        }
        else{
            
            forecast(res.latitude,res.longitude,(err,ress)=>{
                if(ress==undefined){
                    return response.send({
                        error:err
                    })
                   
                }
                else{

                    response.send({
                        forecast:ress.weather_descriptions[0]+", It is currently "+ress.temperature+" degrees out. It feels like "+ress.feelslike+" degree out.",
                        location:res.location,
                        address:req.query.address
    
                    })
                    
                    //console.log(ress.weather_descriptions[0]+","+res.location+".It is currently "+ress.temperature+" degrees out. It feels like "+ress.feelslike+" degree out.")
    
                }
    
            })
        }
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Me",
        name:"Priya Kumari"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        name:"Priya Kumari",
        helpText:"This is some helpful text",
    })
})

app.get('/help/*',(req,res)=>{

    res.render('error',{
        title:"404",
        name:"Priya Kumari",
        errorMsg:"Help article not found"
    })

})

app.get('*',(req,res)=>{

    res.render('error',{
        title:"404",
        name:"Priya Kumari",
        errorMsg:"Page not found"
    })

})

app.listen(port,()=>{
    console.log("server is up on port 3000.")
})