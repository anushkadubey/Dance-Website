
const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
const bodyparser = require("body-parser");
const port = 80;

//creating mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    username: String
});

var Contact = mongoose.model('Contact', contactSchema); //model 

app.use("/static", express.static("static")); //for serving static files
app.use(express.urlencoded());

app.set("view engine", "pug");     //setting template engine as pug
app.set("views", path.join(__dirname, "views")); //setting up the views directory

app.get("/", (req, res)=>{
    const params = { }
    res.status(200).render("home.pug", params);
});

app.get("/contacts", (req, res)=>{
    const params = { }
    res.status(200).render("contact.pug", params);
});

app.post("/contact", (req, res)=>{
    var myData = new Contact(req.body); //making a new contact object extracting data from req.body
    myData.save().then(()=>{             // it will return a promise after saving data which will be handled by .then()
    res.send("The data has been saved!")
}).catch(()=>{
    res.status(400).send("Could not save data.");
})
});

app.listen(port, ()=>{
    console.log(`The application is successfully running on port ${port}`);
})