Primeiro criei uma parte do front end da página para saber mais ou menos como o site vai ficar.

Agora que estou com o node instalado vou intalar o nodemon:

    npm install nodemon -g 
    *Serve para agilizar no processo de ficar reinicializando o servidor*

Express:

    npm install --save express
    *Ajuda a trabalhar com alguns Frameworks*

Handlebars:

    npm install --save express-handlebars
    *Tipo de view engine, basicamente um html com variaveis, condições, etc*


Body Parser:

    npm install body-parser --save
    *Ajuda na requisição de método POST*

Mongoose:

    npm install --save mongoose
    *Ajuda a trabalhar com banco de dados*

Agora vamos configura-los no arquivo app.js que irá servir como estrutura básica do site:

app.js:

    const express = require('express');
    const handlebars = require('express-handlebars');
    const bodyParser = require('body-parser');
    const app = expres();
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

    //Others

    const PORT = 8081;
    app.listen(PORT, () => {
        console.log("Servidor rodando!");
    });

Estrutura do arquivo main.handlebars:

    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>Blog Filmes</title>
    </head>
    <body>
        {{{body}}}
    </body>
    </html>

