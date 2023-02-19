const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const admin = require('./routes/admin');
const path = require('path');
// const mongoose = require('mongoose');

//Settings
    //Body Parser
        app.use(express.urlencoded({extended:true}));
        app.use(express.json());
    
    //Handlebars
        app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
        app.set('view engine', 'handlebars');

    // Mongoose
        //Em breve
    
    //Public
        app.use(express.static(path.join(__dirname, 'public')));

// Routes

    app.get("/", (req, res) => {
        res.render("index");
    })

    app.use('/admin', admin);

//Others



const PORT = 8081;
app.listen(PORT, () => {
    console.log("Servidor rodando!");
});