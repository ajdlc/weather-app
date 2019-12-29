// Core Modules
const path = require("path");
// Requiring Express
const express = require("express");
const hbs = require("hbs");

// Local files
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// Express application
const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
// Static Public directory path
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
// Set hbs
app.set("view engine", "hbs");
// Tell Express to use the following for the views location
app.set("views", viewsPath);
// Tell hbs to use the following path for the partials directory
hbs.registerPartials(partialsPath);

// Setup static directory to serve.
app.use(express.static(publicDirectoryPath));

// Homepage
app.get("", (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "AJ"
    });
});

// About page
app.get("/about", (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "AJ"
    });
})

// Help page
app.get("/help", (req, res) => {
    res.render('help', {
        message: "This is an example message",
        title: "Help",
        name: "AJ"
    })
});

app.get("/weather", (req, res) => {
    // Make the address query string required
    if (!req.query.address) {
        return res.send({
            error: "No address was provided."
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location}={}) => {

        // Check to see if there is an error and return the error in the console to stop the function
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {

            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })

        })

    });
})

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "No search term was provided."
        });
    }
    res.send({
        queries: req.query,
        params: req.params,
        products: []
    })
});

app.get("/test", (req, res) => {
    res.send("This is the test page");
})

app.get("/help/*", (req, res) => {
  res.render("404", {
      title: "404 Help",
      name: "AJ",
      errorMessage: "Help article not found."
  })
});

// Use of the wildcard character that says, get everything that has not matched. This has to be placed at the bottom.
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "AJ",
    errorMessage: "Page not found."
  })
});

// Start the server
app.listen(process.env.PORT || 3000, () => {
    console.log("Server started!");
})