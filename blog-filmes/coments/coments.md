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

### Criar rotas para ADM

Agora vou criar um novo arquivo chamado admin.js para separar as rotas do admin.

E também vou criar uma pasta chamada routes e colocar o arquivo admin.js lá dentro.

Precisamos usar a biblioteca Router, pois como vamos usar arquivos diferentes para organizar as rotas do projeto, precisamos de uma biblioteca para nos ajudar a utilizar determinadas rotas em arquivos diferentes.

Então no arquivo admin.js digitamos:

    const express = require('express');
    const router = express.Router();

    module.exports = router;

Requisitamos o express para o arquivo e requisitamos o router.

Agora se nós fomos rodamos o app.js no nodemon ele ainda não vai reconhecer as rotas do admin.js, pois não imortamos ela ainda no arquivo app.js.

Para isso no arquivo app.js acrescentamos umas constante

    const admin = require('./routes/admin');

E na configuração de rotas digitamos:

    app.use('/admin', admin);

O arquivo app.js tem como código completo até agora:

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

Lembrando que agora para adicionarmos alguma rota no arquivo admin.js devemos usar a biblioteca router, exemplo:

    const express = require('express');
    const router = express.Router();

    router.get("/", (req,res) => [
        res.send("Essa é apágina do ADMIN!!")
    ])

    module.exports = router;

### Adicionando o CSS

Agora vou mostrar para o arquivo app.js onde está os arquivos de estilização o CSS.

Para isso vamos utilizar o módulo path que serve para trabalhar com diretórios, minipular pastas.

Antes vamos criar uma pasta views e colocar o arquivo main.handlebars lá.

Vamos criar também uma pasta chamada public e transferir nossos arquivos CSS e JS que estão na pasta assets e colocar nele.

Agora assim vamos usar o path no arquivo app.js:

    //Public
        app.use(express.static(path.join(__dirname, 'public')));

Com esse código estamos avisando o express que os nosso arquivos estáticos estão na pasta public.

Agora devemos carregar os arquivos CSS no arquivo main.handlebars.

E vamos carregar os arquivos JS também.

Agora vamos criar uam partial, para isso devemos criar a pasta partials e dentro dela vamos criar o header da página e vamos nomear o arquivo que contém o header como _navbar.handlebars e dentro do arquivos main.handlebars vamos chama-lo ficando:

    <body>
        {{>_navbar}}
        {{{body}}}
    </body>

Quando colocamos o sinal de > dentro das chaves no handlebars ele automaticamente entende que eu quero pegar um arquivo dentro da pasta partials.

Lembrando que temos que requisitar o mkódulo path com a constante:

    const path = require('path');

Bom, fiz alguns testes aqui no projeto e vou comentar as alterações:

- Primeiro criei a pasta layouts e coloquei o arquivo main.handlebars lá.

- Depois criei outra pasta chamada partial e fiz um arquivo único para o header com o nome _navbar.handlebars, pois o header provavelmente vamos utiliza-lo em pasginas diferentes.

- Apaguei o arquivo index.html, pois criei um novo arquivo chamado index.handlebars e nele chamei a partial do header e acrescentei os sliders e tals.

Lembrando que não precisamos mais chamar os arquivos css e js nos arquivos handlebars, pois já configuramos tudo isso no arquivo main.handlebars.

Também lembrando que caso quisermos uma configuração padrõa em todos as páginas do projeto é só chamar esse partial no arquivo main.handlebars.

- Criei também uma nova rota no arquivo app.js chamando o arquivo index.handlebars, ficando a parte de rotas assim:

    // Routes

        app.get("/", (req, res) => {
            res.render("index");
        })

        app.use('/admin', admin);








