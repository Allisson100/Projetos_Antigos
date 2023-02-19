const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const admin = require('./routes/admin');
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

// Routes
    app.use('/admin', admin);

//Others

app.get("/", (req, res) => {
    res.send("Seja Bem-Vindo ao site!!!");
})

const PORT = 8081;
app.listen(PORT, () => {
    console.log("Servidor rodando!");
});