const path = require('path') // path is core node module
const express = require('express') //express is a function as opposed to object
const hbs = require('hbs');
const request= require('request');
const geocode = require('./utils/location');
console.log(__dirname);
console.log(path.join(__dirname, '../public'));
const app = express();
//Define path for express config
publicDirectoryPath = path.join(__dirname, '../public') // we have fetched the complete path of public directory
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and view location
app.set('view engine', 'hbs'); // tell express that we have used handlebars as templating engine
app.set('views', viewPath); // we have set views to new path
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath)) // app.use customizes the server now express is going to serve up the directory

app.get('', (req, res) => {
    res.render('index', {
        'title': 'Weather App',
        'name': 'Andrew Mead'
    }); // since index is a hbs file we use render instead of send
});

app.get('/about', (req, res) => {
    res.render('about', {
        "title": "About",
        "name": "Jasim Ali"
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        "title": "HELP!!",
        "name": "Jasim Arif"
    })
})
//because now index.html will be called as we have served up the public folder

//first argument of app.get() is route, and second is callback funstion which tells what to do when this route is called

// app.get('/help', (req,res)=>{
//     res.send({"name":"jasim",
//               "age":  27});
// });

// app.get('/about',(req,res)=>{
//     res.send("About page")
// })

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            "error": "Please enter address"
        })
    }

    const geocode = (address, callback) => {
        const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiamFzaW1hbGkiLCJhIjoiY2thMjl1ZXptMDB6NzNtbXNmeHZmNDdyaSJ9.goLZ5AXTuyZ8nzhprrbdGA";
        request({ url: url, json: true }, (error, response) => {
            if (error) {
                res.send("Unable to connect")
            }
            else if (response.body.features.length === 0) {
                res.send("Something went wrong in response");
            }
            else {
                callback(undefined, response);
            }
        })
    }
    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({ error })
        }
        res.send({
            "forecast": "It is raining",
            "location": "Pakistan",
            "coordinates": data.body.features[0].geometry.coordinates,
        })
    });

    console.log(req.query.address);
})
//req is an object containing information about the incomming request
// res contains bunch of functions telling what we can send back to requestor
// app.com (our domain)
// app.com/help


app.get("/product", (req, res) => {
    if (!req.query.search) {
        return res.send({ //return is used lest two responses might not be get send in that case  ERR_HTTP_HEADERS_SENT will appear
            error: "You must provide a search"
        })
    }
    console.log(req.query.search);
    res.send({
        "products": []
    })
})

app.get('/help/*', (req, res) => { //if wrong route is entered after help 
    res.render('error', {
        "title": "404",
        "generalError": "Help page not found"
    })
});

app.get('*', (req, res) => { //wild card character used if any other path is entered other than the ones provided
    res.render('error', {
        "title": "404",
        "generalError": "Page not found"
    })
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
}) // starts the server 