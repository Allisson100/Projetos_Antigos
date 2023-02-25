const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const admin = require('./routes/admin');
const path = require('path');
const mongoose = require('mongoose');

//Settings
    //Body Parser
        app.use(express.urlencoded({extended:true}));
        app.use(express.json());
    
    //Handlebars
        app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
        app.set('view engine', 'handlebars');

    // Mongoose
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://127.0.0.1:27017/blog-filmes').then(() => {
            console.log("Connect to Mongo");
        }).catch((err) => {
            console.log("Failed to connect Mongo" + err);
        })
    
    //Public
        app.use(express.static(path.join(__dirname, 'public')));

// Routes

    app.get("/", (req, res) => {
        res.render('index');
    })

    app.use('/admin', admin);

//Others



const PORT = 8081;
app.listen(PORT, () => {
    console.log("Server running!");
});