const exp = require('constants')
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))
 
const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebar engine and views location
app.set('view engine','hbs')  
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static dir to serve
app.use(express.static(publicDirPath))

app.get('', (req, res)=> {
    res.render('index',{
        title: 'Weather App',
        name: 'Sandesh Sitaula'
    } )
})

app.get('/about', (req, res)=> {
    res.render('about',{
        title: 'About Me',
        name: 'Sandesh Sitaula'
    } )
})

app.get('/help', (req, res)=> {
    res.render('help',{
        title: 'Help',
        help: 'Help me!!!!',
        name: 'Sandesh Sitaula',
    } )
})


// app.com
// app.com/help
// app.com/about

// app.get('',(req, res) => {
//     res.send('<h1> Weather </h1>')
// })

// app.get('/help',(req, res) => {
//     res.send({
//         name: 'Sandesh',
//         age: 20 
//     })
// })

// app.get('/about',(req, res) => {
//     res.send('<h1>About</h1>')
// })

app.get('/weather',(req, res) => {
    // res.sendStatus(201)
    if (!req.query.address) {
        return res.send({
           error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
            // return console.log(error)
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
            return res.send({ error })
                // return console.log(error)
            }
            // res.send(location)
            res.send({
                location, 
                forecast : forecastData,
                address: req.query.address,
            })
            // console.log(location)
            // console.log(forecastData)
        })
    })


    // console.log(req.query.)
    // res.send({
    //     forecast: 'Cloudy',
    //     address: req.query.address
    // })
})

// app.get('/products', (req, res) => {
//     if (!req.query.search){
//         return res.send({
//             error: 'You must provide a search item'
//         })
//     }
//     console.log(req.query.search)
//     res.send({
//         products: []
//     })
// })

app.get('/help/*', (req,res)=> {
    res.render('404', {
        name: 'Sandesh',
        errorMessage: 'Help article not found',
        title: '404'
    })
    // res.send('Help article not found')
})

app.get('*', (req, res) => {
    res.render('404', {
        name: 'Sandesh',
        title: '404',
        errorMessage: 'Page not found'
    })
    // res.send('My 404 page')
})

app.listen(port, ()=> {
    console.log('Server is up on port '+ port)
})