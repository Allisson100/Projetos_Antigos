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

### Criando a primeira parte do ADMIN, que será a parte de criar categorias

Vamos term uma página inicial onde ele poderá escolher qual parte do site ele quer mexer e ai ao clicar no botão ele será redicrecionado para uma parte específica.

Vamos começar pela parte de categorias.

No arquivo admin.js vamos criar as rotas:

    router.get('/add', (req, res) => {
        res.render('admin/add');
    })

    router.get('/add/category', (req, res) => {
        res.render('admin/addcategory')
    })

A primeira rota vai renderizar a página orincipla do ADMIN que por enquanto só vai ter o botão de categorias.

A segunda rota vai mostrar uma página mais completa para a parte de categorias.

Vamos criar uma pasta chamada admin dentro da pasta views e colocar nossos arquivos handlebars lá.

Vamos criar um html simples da página add:

    <h2 class="adm-title">Aqui você poderá editar seu website</h2>

    <section class="adm">
        
        <form class="adm-form" action="/admin/add/category" method="get">
            <label class="adm-lable" for="category">Add new category:</label>
            <input class="adm-button" type="submit" name="category" id="category" value="New Category">
        </form>
    </section>

Então na página add criamos apenas um formulário simples e linkamos o botão para a página addcategory.

Também adicionamos o link ADMIN la navbar.

Agora precisamos criar um banco de dados para cadastrar as cetegorias e para isso vamos utilizar o mongoose.

Vamos requista-lo e configura-lo no arquivo app.js:

    const mongoose = require('mongoose');

    // Mongoose
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://127.0.0.1:27017/blog-filmes').then(() => {
        console.log("Connect to Mongo");
    }).catch((err) => {
        console.log("Failed to connect Mongo" + err);
    })

Agora vamos criar o model de categorias. Primeiro vamos criar uma pasta nova chamada models e dentro dessa pasta vamos criar o arquivo Categoria.js, no plural e primeira maiúscula por organização.

Dentro do arquivo Categoria.js digitamos:

    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    const Categoria = new Schema ({
        name: {
            tyupe: String,
            required: true
        },

        slug: {
            type: String,
            required:true
        },

        date : {
            type: Date,
            default: Date.now()
        }
    })

    mongoose.model("categorias", Categoria);

Agora vamos cadastrar a categoria dentro do banco de dados.

Para isso dentro do arquivo admin.js digitamos:

    const mongoose = require('mongoose');
    require ('../models/Cateogry');
    const Category = mongoose.model('categories');

    router.post('category/newcategory', (req, res) => {
        const newCategory = {
            name: req.body.name,
            slug: req.body.slug
        }

        new Category(newCategory).save.then(() => {
            console.log("Category saved sucessfully");
        }).catch((err) => {
            console.log("Failed to save new category");
        })
    })

Basicamente requisitamos o mongoose e o model Category no arquivo e criamos uma nova rota do tipo post para que podemos enviar as informações da página para o banco de dados.

Agora vamos configurar sessões para páginas e um middleware que avisará o ADMIN se as categorias foram cadastradas com sucesso ou se teve algum erro.

Primeiro vamos instalar mais dois módulos:

    npm install --save express-session

    npm install --save connect-flash

Agora vamos carrega-lo no arquivo app.js:

    const session = require('express-session');
    const flash = require('connect-flash');

A agora vamos configurar a sessão:

    //Session
        app.use(session({
            secret: 'blogfilmes',
            resave: true,
            saveUninitialized: true
        }))
        app.use(flash());

E agora o middleware:

    // Middleware
        app.use((req, res, next) => {
            res.locals.sucess_msg = req.flash("sucess_msg");
            res.locals.error_msg = req.flash("error_msg");
            next();
        })

O middleware serve como um "observador", quando o adm tentar criar uma nova categoria, esse porcesso da rota chegar ao banco de dados no meio dela vai ter o middleware e com isso ele consegue saber se houve algum errou ou não com o cadastro e assim ele passa para as variáveis globais sucess_msg e error_msg ou valores que passaremos no futuro do projeto e com isso podemos utilizar essas variavéis em nossas páginas para avisar ao usuário se houve algum erro ou não.

Lembrando que quando utilizamos um middleware temos que utilizar o next().

Agora vou validar o formulário no express.

Temos que basicamoente criar algumas condições na rota post das categorias no arquivo admin.js:

    var erros = [];

    if(!req.body.name || typeof req.body.name == undefined || req.body.name == null) {
        erros.push({texto: "Invalid name"});
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
        erros.push({texto: "Invlid slug"});
    }

    if (erros.length > 0) {
        res.render("addcategory", {erros: erros});
    } 

Aqui basicamente criamos uma array com o nome erros e abaixo tem as condições. Caso o usuário nã escreva o slug ou nome e caso algum dele stenha algum valor undefined ou null ele coloca no array erros a mensagem de erros o que faria com que o array tenha um length maior que zero. 
Se tiver array maior que zero ele vai rendenizar a página addcategory com a mensagem de erro.

E tomo como código na rota o seguinte:

    router.post('category/newcategory', (req, res) => {

        var error = [];

        if(!req.body.name || typeof req.body.name == undefined || req.body.name == null) {
            error.push({texto: "Invalid name"});
        }

        if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
            error.push({texto: "Invlid slug"});
        }

        if (error.length > 0) {
            res.render("addcategory", {error: error});
        } else {
            const newCategory = {
                name: req.body.name,
                slug: req.body.slug
            }

            new Category(newCategory).save.then(() => {
                req.flash('sucess_msg', "Category created successfully");
                res.redirect('/admin/addcategory');
            }).catch((err) => {
                req.flash('error_msg', "Error to create a new category, try again");
                res.redirect('/admin/add');
            })
        }
    })

Adicionamos o req.flash para exibir as mensagens de sucesso ou erro.

Agora temos que passar essas mensagem de erros na página addcategory.handlebars. Para isso basta criar uma nova partial chamado _msg.handlebars.

No arquivos _msg.handlebars temos:

    {{#if success_msg}}
        <div class="alert-success">{{success_msg}}</div>
    {{/if}}

    {{#if error_msg}}
        <div class="alert-danger">{{error_msg}}</div>
    {{/if}}

E no arquivo addcategory fica:

    {{#each error}}
        <div class="alert-danger">{{texto}}</div>
    {{else}}

    {{/each}}

E no arquivo main.handlebars digitamos:
    
    <body>
        {{>_msg}}
        {{{body}}}
    </body>

Então agora vamos explicar o código passo a passo, pois está um pouco confuso.

Primeiro criamos a rota do tipo post para enviar a categoria para o banco de dados.

Depois instalamos a session para que junto com o middleware ela possa me retornar mensagens dizendo se está tudo ok com o cadastro da nova categoria ou se deu algum erro.

Ainda na rota do tipo post ('category/newcategory'), falamos que caso os campos do formulário(vamos fazer o formulário ainda de categorias) não estejam preenchidos corretamente ele vai colocar no array error um texto com as mensagens Invalid name ou Invalid slug. Já que sabemos que houve um erro com a expressão if (error.length > 0) então vamos rendenizar a página addcategory.handlebars mandando junto a variável error que contém as mensagens Invalid name ou Invalid slug. E para que o arquivo html/handlebars do addcategory interprete essa variável error temos que colocar a seguinte estrutura no arquivo:

    {{#each error}}
        <div class="alert-danger">{{texto}}</div>
    {{else}}

    {{/each}}

Beleza, então já entendemos como o usuário vai receber as mensagens de erro se ele colocar dados inválidos no formulario de cadastro das categorias.

Agora vamos entender caso aconteça ou não um erro na parte de cadastro dentro do banco de dados.

Vamos entender primeiro que o flash é um tipo de sessão que só aparece uma vez, quando a pessoa for recarregar a página ele desaparece.

Após o else significa que todos os IFs anteriores foram corretos, então no else pegamos o nome e o slug que o usuário digitou e salvamos no banco de dados com o new Category(newCategory).save, porém utilizamos um .then() e um .catch() para sabermos se nesse processo de salvamento houve algum erro ou não. Então no .then()(que significa que houve sucesso) colocamos req.flash('sucess_msg', "Category created successfully"), ou seja, se houve sucesso faça com que a variável sucess_msg passe a valer Category created successfully e depois redirecione o usuário para a rota req.redirect('/admin/addcategory').
Caso tenha algum erro no processo de salvamento utilizamos o .catch() onde ele está dizendo para que a variável 'error_msg' tenha o valor Error to create a new category, try again. E redirecione o usuário para a rota /admin/add.

Agora precisamos criar uma partial para essa mensagem, pois futuramente utilizaremos ela para exibir ao usuario qualquer mensagem de erro ou sucesso em futuros cadastros. Para isso temos que criarmos uma div simples na partial junto com uma estrutura de condição do handlebars:

    {{#if success_msg}}
        <div class="alert-success">{{success_msg}}</div>
    {{/if}}

    {{#if error_msg}}
        <div class="alert-danger">{{error_msg}}</div>
    {{/if}}

Aqui é um html simples onde com a classe alert-sucess e alert-danger personalizamos a mensagem como queremos.
Depois utilizamos a estrutura de condições do handlebars para dizer que, caso receber uma sucess_msg apareça da seguinte forma, se aparecer com o error_msg apareça de outra forma.

Aqui temos uma estrutura diferente, pois na parte de validação nós carregamos a página addcategory junto com as variáveis, aqui nós estamos apenas redirecionando o usuário para uma determinada rota, pois as variáveis sucess_msg e error_msg serão carregadas em uma partial e essa partial estará no arquivo main.handlebars, ou seja, essas variáveis serão utilizadas em todas as páginas do projeto, de maneira global.

Por isso que no arquivo main.handlebars adicionamos:

    <body>
        {{>_msg}}
        {{{body}}}
    </body>

E com isso entendemos um pouco como funciona essa parte de enviarmos variáveis para os arquivos html. Por isso utilizamos o handlebars, pois ele no permite essa função.

### Criando formulário de categorias

Devia ter feito o formulário antes de criar as rotas para ele, mas não tem problema vou criar-lo agora.

Para isso no arquivo addcategory digitamos:

{{#each error}}
    <div class="alert-danger">{{texto}}</div>
{{else}}
    
{{/each}}

    <section class="categoryForm">
        <h3 class="categoryForm-subtitle">New Category</h3>
        <form class="categoryForm-form" action="/admin/category/new" method="POST">
        
            <label class="categoryForm-label" for="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Category name" class="categoryForm-input">

            <label class="categoryForm-label" for="name">Slug:</label>
            <input type="text" id="name" name="slug" placeholder="Slug name" class="categoryForm-input">

            <button type="submit" class="adm-button">Create category</button>
        </form>
    </section>

Tive alguns problemas no código então fiz algumas mudanças.

A primeira foi que eu criei uma página nova. O ADMIN primeiro entra na página add.handlebars depois quando ele clica em adicionar nova categoria ele é direcionado para uma página onde ele vai poder ver as categorias já criadas, vai poder deletar e adiconar novas (porém essa parte vou adicionar mais para frente). 

E quando ele clicar no botão criar categoria ele vai para página do formulário em si.

Estava com problemas com a parte do flash para saber se foi registrado ou não a categoria mas já resolvi o problema, era apenas um problema de digitação no res.redirect, estava escrito req.redirect, mas agora está certo.

Agora vou colocar um css nas mensagens de erro ou sucesso no cadastro, para isso no arquivo msg.css digitamos:

    .alert-success {
        align-items: center;
        background-color: green;
        border-radius: 1rem;
        color: white;
        display: flex;
        font-family: 'Lobster', cursive,'Times New Roman', Times, serif;
        font-size: 2rem;
        height: 50px;
        justify-content: center;
        margin: 0 auto;
        padding: .5rem;
        width: 30%;
    }

    .alert-danger {
        align-items: center;
        animation: fadeInFadeOut 2s linear infinite;
        background-color: #b21515;
        border-radius: 1rem;
        color: white;
        display: flex;
        font-family: 'Lobster', cursive,'Times New Roman', Times, serif;
        font-size: 2rem;
        height: 50px;
        justify-content: center;
        margin: 0.5rem 0 .5rem .5rem;
        padding: .5rem;
        width: 15%;
    }

    @keyframes fadeInFadeOut {
        0% {opacity: 1;}
        50% {opacity: 0.3;}
        100% {opacity: 1;}
    }

Agora vou criar um arquivo JS para o slug, pois eu quero que o nome do slug que o usuário escolher seja o mesmo nome da categoria porém em letra minúscula.

O arquivo vai se chamar slug.js e temos que caregá-lo no arquivo addcategory.handlebars.

Depois no arquivo slug.js digitamos:

    const inputSlug = document.getElementById("slug")
    const inputName = document.getElementById("name");
    inputName.addEventListener("keyup", slugName);

    function slugName () {
        
        inputSlug.value = inputName.value.toLowerCase();
    }

Adicionamos também uma variação no arquivo addcategory.handlebars com o nome --gray, pois como queremos que o input slug seja apenas readonly então coloquei uma cor de font no input diferente.

### Listar as categorias existentes

Vamos na rota /categoiries e digitamos:

    router.get('/categories', (req, res) => {

        Category.find().lean().then((categories) => {
            res.render('admin/categories', {categories: categories});
        }).catch((err) => {
            req.flash('error_msg', "Error in categories list");
            res.redirect("/admin/add")
        })
    })

Basicamente eu peguei a constante Category que faz referencia ao model das categorias e falei para ele listar as categorias presentes no banco de dados naquela rota e com isso passamos tipo uma variável para a página com  aparte {categories: categories}, agora temos que modificar um pouco o arquivo categories.handlebars, ficando:

    <section class="adm">
        <div class="adm-div">
            <h3 class="adm-title --h3">Category list</h3>
            <a href="/admin/categories/add"><button class="adm-button">Create new category</button></a>
        </div>
    </section>


    {{#each categories}}
    <section class="admCategory">
        <div class="admCategory-div">
            <h4 class="admCategory-title">{{name}}</h4>
            <small class="admCategory-subtitle">Slug: {{slug}}</small>
            <small class="admCategory-subtitle">Creation date: {{date}}</small>
        </div>
    </section>
        
    {{else}}

    {{/each}}

Criamos também o css da página.

Vamos agora criar a parte de edição das categorias, para isso vamos criar uma nova rota e um novo arquivo handlebars chamado editcategories.handlebars:

    router.get('/categories/edit/:id', (req,res) => {
        res.render('admin/editcategories');
    })

Agora dentro do arquivo categories.handlebars vamos acrescentar um botão que vai nos direcionar para essa rota edit:

    <section class="adm">
        <div class="adm-div">
            <h3 class="adm-title --h3">Category list</h3>
            <a href="/admin/categories/add"><button class="adm-button">Create new category</button></a>
        </div>
    </section>


    {{#each categories}}
    <section class="admCategory">
        <div class="admCategory-div">
            <h4 class="admCategory-title">{{name}}</h4>
            <small class="admCategory-subtitle">Slug: {{slug}}</small>
            <small class="admCategory-subtitle">Creation date: {{date}}</small>
            <a href="/admin/categories/edit/{{_id}}"><button class="admCategory-button">Edit category</button></a>
        </div>
    </section>
        
    {{else}}

    {{/each}}

Agora no arquivo editcategories.handlebars vamos ter uma estrutura semelhante ao arquivo addcategory.handlebars:

    {{#each error}}
        <div class="alert-danger">{{texto}}</div>
    {{else}}
        
    {{/each}}

    <section class="categoryForm">
        <h3 class="categoryForm-subtitle">New Category</h3>
        <form class="categoryForm-form" action="/admin/category/new" method="POST">
        
            <label class="categoryForm-label" for="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Category name" class="categoryForm-input">

            <label class="categoryForm-label" for="name">Slug:</label>
            <input type="text" id="slug" name="slug" placeholder="Slug name" class="categoryForm-input --gray" readonly>

            <button type="submit" class="adm-button">Create category</button>
        </form>
    </section>

Agora dentro da rota de editcategories precisamos passar os valores dos campos nome e slug que está lá no banco de dados referentes ao id, para isso digitamos na rota /categories/edit/:id :

Agra no arquivo editcategories.handlebars precisamos adcionar um input do tipo hidden:

    <input type="hidden" name="id" value="{{category._id}}">

O arquivo completo fica:

    {{#each error}}
        <div class="alert-danger">{{texto}}</div>
    {{else}}
        
    {{/each}}

    <section class="categoryForm">
        <h3 class="categoryForm-subtitle">New Category</h3>
        <form class="categoryForm-form" action="/admin/category/new" method="POST">

            <input type="hidden" name="id" value="{{category._id}}">
            <label class="categoryForm-label" for="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Category name" class="categoryForm-input">

            <label class="categoryForm-label" for="name">Slug:</label>
            <input type="text" id="slug" name="slug" placeholder="Slug name" class="categoryForm-input --gray" readonly>

            <button type="submit" class="adm-button">Create category</button>
        </form>
    </section>

Esse input serve para pegar o id para utilizar no backend.

Agora com isso vamos criar uma nova rota do tipo post para pegarmos esses novos campos do editcategories.handlebars e atualizar lá no banco de dados:

    router.post('/categories/edit', (req, res) => {
        Category.findOne({_id: req.body.id}).then((category) => {

            category.name = req.body.name;
            category.slug = req.body.slug;

            category.save().then(() => {
                req.flash('success_msg', "Category edited successfully");
                res.redirect('/admin/categories');
            }).catch((err) => {
                req.flash('error_msg', "Internal error in saving category edit");
                res.redirect('/admin/categories');
            })
        }).catch((err) => {
            req.flash('error_msg', "Error editing category");
            req.redirect('/admin/categories');
        })
    })

Temos que lembrar também de editar o arquivo editcategories.handlebars para que tudo funcioane bem, então ele ficou da seguinte forma:

    {{#each error}}
        <div class="alert-danger">{{texto}}</div>
    {{else}}
        
    {{/each}}

    <section class="categoryForm">
        <h3 class="categoryForm-subtitle">Edit Category</h3>
        <form class="categoryForm-form" action="/admin/categories/edit" method="POST">

            <input type="hidden" name="id" value="{{category._id}}">
            <label class="categoryForm-label" for="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Category name" class="categoryForm-input" value="{{category.name}}">

            <label class="categoryForm-label" for="name">Slug:</label>
            <input type="text" id="slug" name="slug" placeholder="Slug name" class="categoryForm-input --gray" readonly value="{{category.slug}}">

            <button type="submit" class="adm-button">Edit category</button>
        </form>
    </section>

Vamos agora dar uma resumida nessa parte do código.

Primeiro temos que entender que no banco de dados o nome do campo id é _id que já vem como padrão.

Então sabnedo disso no arquivo categories.handlebars eu adicionei um botão onde ao clica-lo o usuário vai ser direcionado para a rota /admin/categories/edit/{{_id}}.

Esse {{_id}} vem de uma variavel *{categories: categories}* que foi passada ao arquivo categories.handlebars através da rota /categories.

Como no nosso arquivo categories.handlebars cada elemento do banco de dados tem seu botão de edit, então cada _id é único, por isso conseguimos acessar a página que queremos corretamente.

Então a rota que criamos /categories/edit/:id vai ser de cordo com o id passado da página anterior *categories.handlebars*.

Dentro da rota /categories/edit/:id pedimos para a constante Category (que se refere ao model Category) encontre um elemento no banco de dados que tenha o id passado e para isso utilizamos aquele comando Category.findOne({_id:req.params.id}).lean().

Então se ele encontrar algum elemento referente a aquele id ele vai rendenizar a página editcategories.handlebars com o objeto {category: category}, aqui basicamente ele está fazendo exatamente que nem antes, ele passar nesse objeto todos os dados do banco de dados referente a o id passado.

Isso é necessário, pois queremos que na página editcategories tenha os inputs com os nomes já cadstrados que no caso vai ser editável, não faria sentido nenhum você querer editar um dado sem saber que dado é esse.

Lembrado que também pode ocorrer algum erro, por isso utilizamos o .catch().

Beleza, com isso já temos nossa página editcategories.handlebars do jeito certo. Agora falta nós pegarmos os novos campos *pois os antigos foram editados* e salvar essa alteração lá no banco de dados. Lembrando que estamos dando um update no banco de dados e não criando uma nova categoria.

Então como enviamos dados com o método post, precisamos criar uma rota do tipo post e criamos a /categories/edit.

Dentro dessa rota precisamos dizer qual é o id que será atualizado, por isso criamos um input do tipo hidden no arquivo editcategories.handlebars, pois com isso temos acesso ao id.

Então pedimos para a constante encontrar um elemento no banco de dados com o determinado id, caso ele encontre *.then()* então precimos dizer quais serão os novos nomes e por isso digitamos category.name = req.body.name e category. slug = req.body.slug, pois os nome que eles estão requisitando do body é o novo nome e slug.

E agora basicamente temos que usar um comando para slvar esses novos dados no banco de dados que é category.save() e caso de certo ou errado somos direcionados para outras páginas.

Lembrando que esses nomes de category ou categories são apenas nomes para representar os elementos encontrados do banco de dados, esses nomes podem ser qualquer um.

### Deletando alguma categoria

Para deletarmos alguma categoria que criamos precisamos fazer uma alteração no arquivo categories.handlebars, vamos ter que adicionar um formulário ficando:

    <section class="adm">
        <div class="adm-div">
            <h3 class="adm-title --h3">Category list</h3>
            <a href="/admin/categories/add"><button class="adm-button">Create new category</button></a>
        </div>
    </section>


    {{#each categories}}
    <section class="admCategory">
        <div class="admCategory-div">
            <h4 class="admCategory-title">{{name}}</h4>
            <small class="admCategory-subtitle">Slug: {{slug}}</small>
            <small class="admCategory-subtitle">Creation date: {{date}}</small>
            <div class="admCategory-position">
            <a href="/admin/categories/edit/{{_id}}"><button class="admCategory-button">Edit category</button></a>
                <form action="" method="POST">
                    <input type="hidden" name="id" value="{{_id}}">
                    <button type="submit" class="admCategory-button">Delete category</button>
                </form>
            </div>
        </div>
    </section>

Criei também uma div apenas para posicionar os botões corretamente.

E de novo criamos um input do tipo hidden para pegar o valor do id.

Agora criamos uma nova rota para deletar:

    router.post('/categories/delete', (req, res) => {
        Category.deleteOne({_id: req.body.id}).then(() => {
            req.flash('success_msg', "Category deleted successfully");
            res.redirect('/admin/categories');
        }).catch((err) => {
            req.flash('error_msg', "Error deleting category");
            res.redirect('/admin/categories');
        })
    })

Basicamente ela requisita o id e com o comando .remove ela remove, depois fazemos os redirecionamentos e mensagens de acordo com os erros ou sucessos.

Agora é só mudar o action do formulário do arquivo categories.handlebars ficando:

    <section class="adm">
        <div class="adm-div">
            <h3 class="adm-title --h3">Category list</h3>
            <a href="/admin/categories/add"><button class="adm-button">Create new category</button></a>
        </div>
    </section>


    {{#each categories}}
    <section class="admCategory">
        <div class="admCategory-div">
            <h4 class="admCategory-title">{{name}}</h4>
            <small class="admCategory-subtitle">Slug: {{slug}}</small>
            <small class="admCategory-subtitle">Creation date: {{date}}</small>
            <div class="admCategory-position">
            <a href="/admin/categories/edit/{{_id}}"><button class="admCategory-button">Edit category</button></a>
                <form action="/admin/categories/delete" method="POST">
                    <input type="hidden" name="id" value="{{_id}}">
                    <button type="submit" class="admCategory-button">Delete category</button>
                </form>
            </div>
        </div>
    </section>
        
    {{else}}
        <h4 class="admCategory-title --noCategory">There is no registered category</h4>
    {{/each}}

Acrescentei apenas um h4 no else para caso não tenha nenhuma categoria cadastrada avisar o usuário.

### Postagens

Agora vou criar a parte de postagens.

Vamos criar um banco de dados para as postagens, nele deve conter um título, um slug, uma descrição, um conteúdo, uma categoria, uma data e também uma imagem onde vamos utiliza-la para colocar futuramente no nosso carrossel.

Lembrando que somente o nome da imagem será salva no banco de dados a imagem em si ficará em uma pasta chamada uploads que criamos dentro da pasta public.

Então para isso vamos criar o model de postagem. Vamos criar um arquivo chamado Post.js dentro da pasta de models e nele digitamos:

    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    const Post = new Schema ({
        imageName: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'categories',
            required: true
        },
        data: {
            type: Date,
            defaut: Date.now()
        }
    })

    mongoose.model('posts', Post);

Aqui criamos um model padrão, porém na parte de categorias defino o type como Schema.Types.ObjectId. Isso significa que aquele campo de categoria vai ser um id referenciando a categoria e tmabém devemos passar uma referencia que no nosso caso é a collection com o nome categories(onde está armazenado as categorias).

Depois utilizamos o mongoose.model e dizemos a ele que a nova collection vai se chamar posts e tem como referencia a constante Post.

Agora vou criar o formulário de postagens.

Para isso vou criar uma nova rota no arquivo admin.js:

    router.get('/posts', (req,res) => {
        res.render('admin/posts');
    })

Vamos criar esse arquivo posts.handlebars dentro da pasta view/admin e é nesse arquivo que vai aparecer as postagens criadas e onde vai ter um botão para criar uma nova postagem.

Esse arquivo tem a mesma estrutura do arquivo categories.handlebars com pequenas alterações.

No arquivo add.handlebars vamos adiconar um novo botão que será da parte de postagens e nele vamos colocar o direcionamento para a rota que acabamos de criar ficando da seguinte forma:

    <h2 class="adm-title">Aqui você poderá editar seu website</h2>

    <section class="adm">
        <nav class="adm-nav">
            <a href="admin/categories"><button class="adm-button">Categories</button></a>
            <a href="admin/posts"><button class="adm-button">Posts</button></a>
        </nav>
    </section>

O arquivo posts.handlebars ficou da seguinte forma:

    <section class="admPost">
        <div class="admPost-create">
            <h3 class="admPost-title --h3Post">Posts list</h3>
            <a href=""><button class="admPost-buttonNew">Create new post</button></a>
        </div>
    </section>

    {{#each posts}}

    {{else}}
        <h4 class="admPost-title">There is no registered posts</h4>
    {{/each}}

Agora vamos criar uma nova rota para carregar o arquivo que vai conter o formulário das postagens:

    router.get('/posts/add', (req, res) => {
        res.render('admin/addpost');
    })

E também temos que criar esse arquivo addposts.handlebars na pasta views.

Dentro dele vamos criar o formulário:

    <section class="formPost">
        <h3 class="formPost-title">New post</h3>

        <div class="formPost-div">
            <h4 class="formPost-subtitle">Add Image</h4>
            <label class="formPost-label --imageLabel" for="file"> </label>
            <input class="formPost-input --imageInput" type="file" id="file" name="file" required>
            <h4 class="formPost-nameFile" id="formPost-text">No file selected ...</h4>
        </div>


        <form class="formPost-form" action="" method="POST">

            <label class="formPost-label --imageInput" for="fileName">fileName:</label>
            <input class="formPost-input --imageInput" type="text" id="formPost-fileName" name="imageName" placeholder="File name" required readonly>

            <label class="formPost-label" for="title">Title:</label>
            <input class="formPost-input" type="text" id="formPost-title" name="title" placeholder="Post title" required>

            <label class="formPost-label" for="name">Slug:</label>
            <input type="text" id="formPost-slug" name="slug" placeholder="Slug name" class="formPost-input --gray" readonly>

            <label class="formPost-label" for="description">Description:</label>
            <textarea rows="5" class="formPost-textarea" type="text" name="description" placeholder="Description" required></textarea>

            <label class="formPost-label" for="title">Content:</label>
            <textarea rows="10" class="formPost-textarea" type="text" name="content" placeholder="Content" required></textarea>

            <button type="submit" class="formPost-button">Create post</button>
        </form>
    </section>

Criei o fomulário e alguns campos diferente, pois é necessário a criação de um input com display none para fazer um css diferente e também outro input com display none para apenas obter o nome da foto para cadastrar no banco de dados e utilizarmos futuramente.

Agora precisamos fazer algum código para pegar a imagem e além de salvar seu nome no banco de dados vamos salvar a foto/imagem na pasta uploads.

Para isso eu vou mudar um pouco o HTML do formulário de postagens:

    <h4 class="formPost-subtitle">Add Image</h4>
    <form class="formPost-div">
        <label class="formPost-label --imageLabel" for="file"> </label>
        <input class="formPost-input --diplay-none" type="file" id="file" name="file" required>  
        <input id="formPost-enviarImagem" class="" type="submit"> 
    </form>
    <h4 class="formPost-nameFile" id="formPost-text">No file selected ...</h4>

Agora vou instalar uma biblioteca chamada multer, ela permite uploads de arquivos no express. Para isso digitamos no terminal:

    npm install multer --save

Para esse passo de enviar imagens na pasta uploads precisamos definir no formulário o tipo de encriptação então no form digitamos enctype="multipart/form-data". Ficanod da seguinte forma:

    <form class="formPost-div" method="post" enctype="multipart/form-data">
        <label class="formPost-label --imageLabel" for="file"> </label>
        <input class="formPost-input --diplay-none" type="file" id="file" name="file" required>  
        <input id="formPost-enviarImagem" class="" type="submit"> 
    </form>

Então assim o formulário para enviar arquivos já está preparado para enviar as imagens.

Agora vamos configurar as rotas e o multer no arquivo admin.js

Primeiro vamos importar o multer no arquivo:

    const multer = require('multer');

Lembrando que o multer é um middleware.

Agora vamos para a configuração do multer:

    const upload = multer({dest: "uploads/"});

Agora vou criar uma rota que vai receber o arquivo/imagem:

    router.post('/upload',upload.single('file') , (req, res) => {
        res.send("Arquivo recebido!!")
    })

Fiz também uma alteração no action do formulário:

    <form class="formPost-div" method="post" enctype="multipart/form-data" action="/admin/upload">
        <label class="formPost-label --imageLabel" for="file"> </label>
        <input class="formPost-input --diplay-none" type="file" id="file" name="file" required>  
        <input id="formPost-enviarImagem" class="" type="submit"> 
    </form>

Essa configuração que fiz no multer está salvando os arquivos sem nome e sem extensão. Para resolver esse problema precisamos criar uma função para o middlewre:

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null,'public/uploads/')
        },
        filename: function(req, file, cb) {
            cb(null, file.originalname);
        }
    })

    const upload = multer({storage});

Dessa forma conseguimos salvar o arquivo na pasta uploads com o nome original da imagem. Com o código:

     filename: function(req, file, cb) {
            cb(null, file.originalname);
            }

Podemos manipular o nome da imagem, nesse caso utilizamos o file.originalname que como o próprio nome diz, salva o arquivo com seu nome original, mas pode acontecer de salvar o arquivo com o nome de um arquivo já existente. Então podemos mudar esse nome, por exemplo:

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null,'public/uploads/')
        },
        filename: function(req, file, cb) {
            cb(null, file.originalname + Date.now() + path.extname(file.originalname));
        }
    })

Utilizamos cb(null, file.originalname + Date.now() + path.extname(file.originalname)); para nomear todas as imagens com nomes difenrentes. Nesse caso ele pega o nome original da imagem com a extensão soma com a data atual em milisegundos e soma com a extensão de arquivo sendo impossivel o usuário adicionar imagens com mesmo nome.

Essa questão do nome do rquivo em vou penasr mais para frente quando eu for colocar as imagens do banco de dados nos swipers.

Lembrando que como eu quero um nome de arquivo diferente do outro eu tive que requisitar o path no arquivo admin.js (const path = require('path');).

De momento vou utilizar somente o nome do arquivo original. Então temos como rota final desse processo de enviar foto para a pasta:

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null,'public/uploads/')
        },
        filename: function(req, file, cb) {
            cb(null, file.originalname);
        }
    })

    const upload = multer({storage});

    router.post('/upload',upload.single('file') , (req, res) => {
        res.send("Arquivo recebido!!")
    })

Agora vou cadastrar as postagens no banco de dados.

Primeiro vou criar uma nova rota:

    router.post('/post/new', (req, res) {
        
    })

E vou colocar a rota no method lá no form:

    <form class="formPost-form" action="/admin/post/new" method="POST">

Adiciono o each também no arquivo addpost para exibir as possíveis mensagens de erro:

    {{#each error}}
        <div class="alert-danger">{{texto}}</div>
    {{else}}
        
    {{/each}}

Agora vamos requisitar o model de postagem no arquivo admin.js:

    require('../models/Post');
    const Post = mongoose.model('posts');

Eu esqueci de adicionar o campo categorias no fomulário de postagens. Então vamos lá.

Primeiro na rota /posts/add digitamos:

    router.get('/posts/add', (req, res) => {
        Category.find().lean().then((categories) => {
            res.render('admin/addpost', {categories: categories});
        }).catch((err) => {
            req.flash('erro_msg', "Error to load post form");
            res.redirect('/admin');
        }) 
    })

Ou seja, ele vai fazer uma busca no banco de dados Category. Se essa busca não tiver nenhum erro então ele vai pegar todos os elementos presentes em uma variável chamada categories e fazer com que essas variáveis carregue junto com a página addpost.handlebars.

Dentro do arquivo addpost.handlebars acrescentamos o input de categorias ficando:

    <label class="formPost-label" for="category">Category:</label>
    <select name="category" class="formPost-input">
        {{#each categories}}
            <option value="{{_id}}">{{name}}</option>
        {{else}}
            <option value="0">Nenhuma categoria registrada</option>
        {{/each}}
    </select> 

Ou seja, caso tenha alguma categoria cadastrada, na tag option ele vai conter o nome do name do id específico.

Agora com tudo adiconado, após a adicionar o model de postagem no arquivo admin.js vamos digitar no else da rota /post/new:

const newPost = {
            imageName: req.body.imageName,
            title: req.body.title,
            slug: req.body.slug,
            description: req.body.description,
            content: req.body.content,
            category: req.body.category
        }

        new Post (newPost).save().then(() => {
            req.flash('success_msg', "Post create successfully");
            res.redirect('/admin/posts');
        }).catch((err) => {
            req.flash('error_msg', "Post save error");
            res.redirect('/admin/posts');
        })

Ficando como código finl da rota:

    router.post('/post/new', (req, res) => {
        var error = [];

        if(!req.body.name || typeof req.body.name == undefined || req.body.name == null) {
            error.push({texto: "Invalid name"});
        }

        if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
            error.push({texto: "Invalid slug"});
        }

        if (req.body.categoria == "0") {
            erros.push({texto: "Categoria inválida, registre uma categoria"});
        }

        if (error.length > 0){
            res.render('admin/addpost', {error: error});
        } else {
            const newPost = {
                imageName: req.body.imageName,
                title: req.body.title,
                slug: req.body.slug,
                description: req.body.description,
                content: req.body.content,
                category: req.body.category
            }

            new Post (newPost).save().then(() => {
                req.flash('success_msg', "Post create successfully");
                res.redirect('/admin/posts');
            }).catch((err) => {
                req.flash('error_msg', "Post save error");
                res.redirect('/admin/posts');
            })
        }
    })

E com isso conseguimos cadastrar corretamente no banco de dados as postagens, porém ele ainda não enviar a imagem automaticamente para a pasta uploads e para isso vamos fazer outro script.

Depois de muito estudo consegui resolver essa parte, eu qeu sou iniciante tem algumas coias que ainda acho complicado.

Primeiro eu criei uma nova pasta chamada config e criei um arquivo chamado multer.js, nele fica a configuração do multer:

    const multer = require('multer');
    const path = require('path');

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null,'public/uploads/');
        },
        filename: function(req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    })

    const upload = multer({storage});

    module.exports = upload;

Aqui está a confiduração padrão de antes, porém eu decidi que as imagens agora vão ter o nome da data atual em milisegundos + a extensão da imagem.

Depois mudei a rota. Basicamente eu estou falando para a mesma rota enviar a imagem para a pasta uploads e após isso criar o banco de dados:

    router.post('/post/new', upload.single('file'), (req, res) => {
        var error = [];

        if(!req.body.title || typeof req.body.title == undefined || req.body.title == null) {
            error.push({texto: "Invalid name"});
        }

        if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
            error.push({texto: "Invalid slug"});
        }

        if (req.body.categoria == "0") {
            error.push({texto: "Categoria inválida, registre uma categoria"});
        }

        if (error.length > 0){
            res.render('admin/addpost', {error: error});
        } else {

            const newPost = {
                imageName: req.body.imageName,
                imageSrc: req.file.path,
                title: req.body.title,
                slug: req.body.slug,
                description: req.body.description,
                content: req.body.content,
                category: req.body.category
            }

            new Post (newPost).save().then(() => {
                req.flash('success_msg', "Post create successfully");
                res.redirect('/admin/posts');
            }).catch((err) => {
                req.flash('error_msg', "Post save error");
                res.redirect('/admin/posts');
            })
        }
    })

No banco de dados eu dei uma alterada. Agora temos tanto o nome original da imagem (nome que o usuário deu) e também temos o scr da imagem que contém o caminho da imagem e também o novo nome da imagem.

Aruumei também o campo da data porque estava escrito errado e agora está tudo certo deixando no banco de dados como padrão a data de publicação da imagem.

Agora vou arrumar o css do formulario de postagens e mostrar como ficou o código final:

    <form class="formPost-form" action="/admin/post/new" enctype="multipart/form-data" method="post" id="formPost-sendPost">

        <h4 class="formPost-subtitle">Add Image</h4>

        <label class="formPost-label --imageLabel" for="file"> </label>
        <input class="formPost-input --diplay-none" type="file" id="file" name="file" required>
        
        <h4 class="formPost-nameFile" id="formPost-text">No file selected ...</h4>

        <label class="formPost-label --diplay-none" for="fileName">fileName:</label>
        <input class="formPost-input --diplay-none" type="text" id="formPost-fileName" name="imageName" placeholder="File name" required readonly>

        <label class="formPost-label" for="formPost-title">Title:</label>
        <input class="formPost-input" type="text" id="formPost-title" name="title" placeholder="Post title" required>

        <label class="formPost-label" for="formPost-slug">Slug:</label>
        <input type="text" id="formPost-slug" name="slug" placeholder="Slug name" class="formPost-input --gray" readonly>

        <label class="formPost-label" for="description">Description:</label>
        <textarea rows="5" id="description" class="formPost-textarea" type="text" name="description" placeholder="Description" required></textarea>

        <label class="formPost-label" for="content">Content:</label>
        <textarea rows="10" id="content" class="formPost-textarea" type="text" name="content" placeholder="Content" required></textarea>

        <label class="formPost-label" for="category">Category:</label>
        <select name="category" class="formPost-input">
            {{#each categories}}
                <option value="{{_id}}">{{name}}</option>
            {{else}}
                <option value="0">Nenhuma categoria registrada</option>
            {{/each}}
        </select> 

        <button type="submit" id="formPost-sendForm" class="formPost-button">Create post</button>
    </form>

Agora no arquivo file.js eu vou dar uma estilizada melhor na parte do formulario dos posts, pois a única forma do usuário saber que ele adicionou uma imagem é através do texto em baixo.

Então dentro do arquivo file.js fica:

    const text = document.getElementById("formPost-text");
    const inputFile = document.getElementById("file");

    const fileName = document.getElementById("formPost-fileName"); //Para o input none

    const chooseImage = document.getElementById("formPost-chooseImage");

    const imageTag = document.getElementById("formPost-imageTag");

    if (text == null || inputFile == null || fileName == null) {

    } else {
        inputFile.addEventListener("change", changeImage);
        inputFile.addEventListener("change", nameFile);
    }

    function nameFile () {
        var name  = inputFile.files[0].name;
        text.textContent = "File selected: " + name;
        fileName.value = name;
        console.log(fileName.value);
    }

    function changeImage (e) {
        const inputTarget = e.target;
        const file = inputTarget.files[0];

        if (file) {
            chooseImage.innerHTML = "Change image";

            const reader = new FileReader();

            reader.addEventListener("load", function(e) {
                const readerTarget = e.target;

                const img = document.createElement("img");
                img.src = readerTarget.result;
                img.classList.add("formPost-image");

                imageTag.innerHTML = "";

                imageTag.appendChild(img)

            })

            reader.readAsDataURL(file);
        }
    }

Aqui basicamente criamos uma tag img no corpo do formulário e adicoinamos uma função FileReader e readAsDataURL, para conseguirmos pegar o caminho absoluto da imagem no computador do usuário e assim usar isso como src na tag img e fazer um preview da imagem.

Agora vamos listar as postagens. Para isso mudamos a rota /posts:

    router.get('/posts', (req, res) => {
        Post.find().lean().populate({path:'category', strictPopulate: false}).sort({date:'desc'}).then((posts) => {
            res.render('admin/posts', {posts: posts});
        }).catch((err) => {
            req.flash('error_msg', "Error to list posts");
            res.redirect('/dmin');
        }) 
    })

Aqui procuramos todos os posts no banco de dados de postagens e também utilizamos o populate para obter as ctegorias das postagens. Utilizamos sort também mostar as postagens mais recentes primeiro e atribuimos esses valores do banco de dados à variável posts e mandamos isso para o arquivo posts.handlebar. 

Então o arquivo fica:

    <section class="admPost">
        <div class="admPost-create">
            <h3 class="admPost-title --h3Post">Posts list</h3>
            <a href="posts/add"><button class="admPost-buttonNew">Create new post</button></a>
        </div>
    </section>

    {{#each posts}}
        <section class="admPosts-section">
            <div class="admPosts-div">
                <h4 class="admPosts-title">{{title}}</h4>
                <p class="admPosts-description-subtitle">Description:</p>
                <p class="admPosts-description">{{description}}</p>
                <small class="admPosts-subtitle">Date: {{date}}</small>
                <small class="admPosts-subtitle">Category: {{category.name}}</small>
            </div>
        </section>

    {{else}}
        <h4 class="admPost-title">There is no registered posts</h4>
    {{/each}}

Agora vamos acrescentar um botão para editar as postagens.

Vamos primeiro criar uma rota do tipo get, pois nessa rota precisaremos obter o id do elemento que queremos editar. Então a nova rota fica:

    router.get('/post/edit/:id', (req, res) => {
        res.render('admin/editposts');
    })

Vamos criar esse arquivo editposts.handlebars e dentro dele digitamos:

    {{#each error}}
        <div class="alert-danger">{{texto}}</div>
    {{else}}
        
    {{/each}}

    <section class="formPost">
        <h3 class="formPost-title">Edit post</h3>

        <form class="formPost-form" action="/admin/post/new" enctype="multipart/form-data" method="post" id="formPost-sendPost">

            <label for="file" id="formPost-chooseImage" class="main-btn --chooseFile">Choose an image</label>
            <div class="formPost-position">
                <label id="formPost-imageTag" class="formPost-label --imageLabel" for="file">

                </label>
            </div>
            <input class="formPost-input --diplay-none" type="file" id="file" name="file" required>
            <label for="file" class="formPost-nameFile" id="formPost-text">No image selected ...</label>


            <label class="formPost-label --diplay-none" for="fileName">fileName:</label>
            <input class="formPost-input --diplay-none" type="text" id="formPost-fileName" name="imageName" placeholder="File name" required readonly>

            <label class="formPost-label" for="formPost-title">Title:</label>
            <input class="formPost-input" type="text" id="formPost-title" name="title" placeholder="Post title" required>

            <label class="formPost-label" for="formPost-slug">Slug:</label>
            <input type="text" id="formPost-slug" name="slug" placeholder="Slug name" class="formPost-input --gray" readonly>

            <label class="formPost-label" for="description">Description:</label>
            <textarea rows="5" id="description" class="formPost-textarea" type="text" name="description" placeholder="Description" required></textarea>

            <label class="formPost-label" for="content">Content:</label>
            <textarea rows="10" id="content" class="formPost-textarea" type="text" name="content" placeholder="Content" required></textarea>

            <label class="formPost-label" for="category">Category:</label>
            <select name="category" class="formPost-input">
                {{#each categories}}
                    <option value="{{_id}}">{{name}}</option>
                {{else}}
                    <option value="0">Nenhuma categoria registrada</option>
                {{/each}}
            </select> 

            <button type="submit" id="formPost-sendForm" class="main-btn --postFormButton">Edit post</button>
        </form>
    </section>

No arquivo posts.handlebars eu vou adicionar o botão de editar e o botão de excluir, pois vamos fazer essa parte depois:

    <div class="div-title-btn --dtbPost">
        <h3 class="adm-main-title">Posts list</h3>
        <a href="posts/add"><button class="main-btn">Create new post</button></a>
    </div>


    {{#each posts}}
        <article class="db-article">
            <div class="db-div">
                <h4 class="db-title">{{title}}</h4>
                <p class="db-subtitle">Description:</p>
                <p class="db-description">{{description}}</p>
                <small class="db-small">Date: {{date}}</small>
                <small class="db-small">Category: {{category.name}}</small>

                <div class="div-edit-delete">
                <a href="/admin/post/edit/{{_id}}"><button class="secundary-btn">Edit post</button></a>

                <form action="#" method="POST">
                    <input type="hidden" name="id" value="{{_id}}">
                    <button type="submit" class="secundary-btn">Delete post</button>
                </form>
            </div>
            </div>
        </article>

    {{else}}
        <h4 class="db-title --noData">There is no registered posts</h4>
    {{/each}}


Agora no arquivo editposts.handlebars precisamos fazer com que os dados cadastrados no banco de dados apareçam no formulário de edição, para isso precisamos fazer duas buscas, pois temos tanto o banco de dados de categorias como o de postagens, então para isso modificamos a rota de editar postagens:

    router.get('/post/edit/:id', (req, res) => {

        Post.findOne({_id: req.params.id}).lean().then((post) => {

            Category.find().lean().then((categories) => {
                res.render('admin/editposts', {categories: categories, post: post});
            }).catch((err) => {
                req.flash('error_msg', "Error to list categories");
                res.redirect('/admin/posts');
            })

        }).catch((err) => {
            req.flash('error_msg', "Error to load edit form");
            res.redirect('/admin/posts');
        })
    })

Dessa forma através do id ele consegue pegar os dados de um post específico e depois pegars todas as categorias cadastradas e passar para esse formulário de edição.

Agora como a rota ja carregar o formulário e os dados, vamos adiconar esses dados nos campos do formulário editposts.handlebars:

    {{#each error}}
        <div class="alert-danger">{{texto}}</div>
    {{else}}
        
    {{/each}}

    <section class="formPost">
        <h3 class="formPost-title">Edit post</h3>

        <form class="formPost-form" action="/admin/post/new" enctype="multipart/form-data" method="post" id="formPost-sendPost">

            <input type="hidden" value="{{postagem._id}}" name="id">

            <label for="editFile" id="formEditPost-chooseImage" class="main-btn --chooseFile">Choose an image</label>
            <div class="formPost-position">
                <label id="formEditPost-imageTag" class="formPost-label --imageLabel" for="editFile">

                </label>
            </div>
            <input class="formPost-input --diplay-none" type="file" id="editFile" name="file" required>
            <label for="editFile" class="formPost-nameFile" id="formEditPost-text">No image selected ...</label>


            <label class="formPost-label --diplay-none" for="fileName">fileName:</label>
            <input class="formPost-input --diplay-none" type="text" id="formEditPost-fileName" name="imageName" placeholder="File name" required readonly>

            <label class="formPost-label" for="formPost-title">Title:</label>
            <input class="formPost-input" type="text" id="formPost-title" name="title" placeholder="Post title" required value="{{post.title}}">

            <label class="formPost-label" for="formPost-slug">Slug:</label>
            <input type="text" id="formPost-slug" name="slug" placeholder="Slug name" class="formPost-input --gray" readonly value="{{post.slug}}">

            <label class="formPost-label" for="description">Description:</label>
            <textarea rows="5" id="description" class="formPost-textarea" type="text" name="description" placeholder="Description" required>{{post.description}}"</textarea>

            <label class="formPost-label" for="content">Content:</label>
            <textarea rows="10" id="content" class="formPost-textarea" type="text" name="content" placeholder="Content" required>{{post.content}}"</textarea>

            <label class="formPost-label" for="category">Category:</label>
            <select name="category" class="formPost-input">
                {{#each categories}}
                    <option value="{{_id}}">{{name}}</option>
                {{else}}
                    <option value="0">Nenhuma categoria registrada</option>
                {{/each}}
            </select> 

            <button type="submit" id="formPost-sendForm" class="main-btn --postFormButton">Edit post</button>
        </form>
    </section>

Tive que editar alguns IDs e criei um novo arquivo js para fazer aquele esquema de preview de imagens.

Lembrando que adiconamos um input do tipo hidden apenas para obter o id do elemento.

    <input type="hidden" value="{{postagem._id}}" name="id">

Agora vamos criar uma noava rota para salvar essas edições no banco de dados:

    router.post('/post/edit',upload.single('file'),  (req, res) => {

        Post.findOne({_id: req.body.id}).then((post) => {
            
            post.imageName = req.body.imageName
            post.imageSrc = req.file.path
            post.title = req.body.title
            post.slug = req.body.slug
            post.description = req.body.description
            post.content = req.body.content
            post.category = req.body.category

            post.save().then(() => {
                req.flash('success_msg', "Post edit successfully");
                res.redirect('/admin/posts');
            }).catch((err) => {
                req.flash('error_msg', "Error to edit post");
                res.redirect('/admin/posts');
            })

        }).catch((err) => {
            req.flash('error_msg', "Error saving edit");
            res.redirect('/admin/posts');
        })
    })

Essa rota ela procura no banco de dados através do id do input tipo hidden que criamos no formulário edit, depois ela pega os novos nome nos campos do formulário e depois salva os dados no banco de dados.

Agora vamos adcionar a rota para deletar o post:

    router.post('/posts/delete', (req, res) => {
        Post.deleteOne({_id: req.body.id}).then(() => {
            req.flash('success_msg', "Post deleted successfully");
            res.redirect('/admin/posts');
        }).catch((err) => {
            req.flash('error_msg', "Error deleting post");
            res.redirect('/admin/posts');
        })
    })

E adicionamos a rota /admin/posts/delete no action do botão delete do arquivo posts.handlebars.

Agora vou começar a parte onde o ADMIN vai poder alterar algumas coisas da página inicial como título subtitulo, imagens do corroussel, e adiconar novos slider com determinada categoria.

### Criando Model para os elementos da página inicial

Para isso criei um arquivo chamado MainPage.js e nele digitamos:

    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    const MainPage = new Schema ({
        title: {
            type: String,
            require: true
        },

        subtitle: {
            type: String,
            require: true
        },

        bannerImageSrc: {
            type: String,
            required: true
        },

        idPost: {
            type: Schema.Types.ObjectId,
            reference: 'posts',
            required: true
        }
    })

De momento vou deixar essa prte parada, pois acho mais interessante fazer a parte dos slides estilo netflix que tem em baixo.

### Swiper

Precisamos agora pegar todas as postagens criadas e colocar elas no swiper.

Vamos primeiro requisitar o banco de dados das postagens na página inicial:

    require('./models/Post');
    const Post = mongoose.model('posts');

Para isso isso na rota "/" do arquivo app.js vamos digitar:

 app.get("/", (req, res) => {

        Post.find().lean().then((posts) => {
            res.render('index', {posts: posts})
        }).catch((err) => {
            req.flash("error_msg", "An internal error occurred");
            res.redirect("/404");
        })
    })

E no arquivo index.handlebars:

    <section class="category">
        <h2 class="category-title">Filmes</h2>
        <hr>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                {{#each posts}}
                <div class="swiper-slide"><a href=""><img src={{imageSrc}} alt="Movie"></a></div>
                
                {{else}}
                    <h4 class="db-title --noData">There is no registered posts</h4>
                {{/each}}
            </div>

            <div class="button-prev"><span></span><span></span></div>
            <div class="button-next"><span></span><span></span></div>
        </div>
    </section>

Adicionei essa section que nada mais é que um novo slider, porém ele tem relação com o bnaco de dados.

O src da imagem que estava no banco de dados estava com problemas então tive que criar algumas funções para certar isso. Então no arquivo admin.js na rota /post/new e na rota /post/edit eu fiz algumas alterações:

    const imagePathBody = req.file.path;

    let nameNumbersImage = imagePath(imagePathBody);
    let exe = getExtension(imagePathBody);

    const fullPath = `/uploads/${nameNumbersImage}.${exe}`;

Eu criei uma const imagePathBody que obtem o caminho completo da imagem.

A let nameNumbersImage chama uma função para modificar esse caminho e me retrona somente o nome da imagem, (que nesse caso é o nome em número por conta do multer), 

    function imagePath (imagePath) {
        let justNumbers = imagePath.replace(/[^0-9]/g,'');
        return parseInt(justNumbers);
    }

Essa função pega o caminho e me retorna somente os números dele. Lembrando que todo nome de imagem na nossa palicação são somente números.

Depois criei outra variável let exe que chama outra função que vai apenas me retornar a extensão do arquivo.

    function getExtension(imagePathBody) {
        var r = /\.([^./]+)$/.exec(imagePathBody);
        return r && r[1] || '';
    }

Esse função ela verifica e me retrona o que tem no final da string após o ponto, como nesse caso temos apenas um ponto no path, ela vai retornar a extensão, mas é importante verificar e alterar essa função caso o nome da imagem tenha vários pontos por algum motivo.

### Criando link na imagem

Agora precisamos fazer a imagem ser clicável. Após o clique o usuário será redirecionado para uma página onde vai ter o conteúdo de acordo com a foto clicada.

Para isso primeiro vamos criar uma nova rota no arquivo app.js:

    app.get('/posts/:slug', (req, res) => {
        Post.findOne({slug: req.params.slug})
    })

Essa rota vai basicamente pesquisar uma postagem no banco de dados de acordo com o slug, que vai ser obtido através do usuário pelo parâmetro da rota.

Agora precisamos criar um arquivo handlebars para a rota rendenizar e também para personalizarmos a postagem.

Então dentro da pasta view criamos uma nova pasta cahamada posts e dentro dela criamos um arquivo chamado index,handlebars.

E agora vamos alterar um pouco a rota que acabamos de criar no arquivo app.js:

    app.get('/posts/:slug', (req, res) => {
        Post.findOne({slug: req.params.slug}).then((posts) => {
            if (posts) {
                res.render('posts/index', {posts: posts});
            } else {
                req.flash('error_msg', "Error, post doesn't exist");
                res.redirect('/');
            }
        })
    })

Essa rota vai pesquisar no banco de dados um post que tenha aquele slug, se existir ele rendeniza a página se não da mensagem de erro.

Lembrando que a página inicial já está sendo carregada com o slug dos posts que estão no swiper, por isso é possível fazer essa busca no banco de dados através do slug.

Agora dentro do href da tag a que está envolvendo cada imagem do swiper, vamos fazer um redirecionamento para essa rota:

    <div class="swiper-wrapper">
        {{#each posts}}
        <div class="swiper-slide"><a href="/posts/{{slug}}"><img src={{imageSrc}} alt="Movie"></a></div>
        {{/each}}
    </div>

### Personalizando a página da postagem

Apenas acrescentei coisas a respieto de personalização.

### Terminando de criar a main page do admin

Como funciona a parte do preview do banner e a parte da criação do banner. vou colocar aqui o script interio e e depois explicar passo a passo.

Arquivo mainpage.js:

    var mpFile = document.getElementById("mpFile");

    let correctInputLabelImage = ""
    let correctLabelText = ""
    let chooseAnImage = ""

    if (mpFile) {
        getButton()
    }

    function getButton() {

        const btChooseImage = document.querySelectorAll("[data-inputSelected]")
        btChooseImage.forEach(elemento => elemento.addEventListener("click", selectCorrectLabelImage))
    }

    function selectCorrectLabelImage(e) {

        mpFile = document.getElementById("mpFile");

        mpFile.value = ""

        let a = e.target.parentNode
        var b = a.parentNode
        let c = b.querySelector("[data-mpLabelImage]")
        let d = b.querySelector("[data-mpFileText]")
        let f = b.querySelector("[data-inputSelected]")
        correctInputLabelImage = c
        correctLabelText = d    
        chooseAnImage = f

        if (mpFile) {
            mpFile.addEventListener("change", mpChangeImage);
        }
    }

    function nameFile () {
        var name  = mpFile.files[0].name;
        correctLabelText.textContent = "File selected: " + name;
        
    }

    function mpChangeImage(e) {
        const mpInputTarget = e.target;
        const mpFile = mpInputTarget.files[0];

        if(mpFile) {
            chooseAnImage.innerHTML = "Change image";        

            const reader = new FileReader();

            reader.addEventListener("load", function(e) {

                const element = correctInputLabelImage.querySelector("img")
                element.parentNode.removeChild(element)

                const img = document.createElement("img");

                const readerTarget = e.target.result;

                img.src = readerTarget;

                correctInputLabelImage.appendChild(img);
            })

            reader.readAsDataURL(mpFile);

            nameFile()
            getButton()
        }
    }


    // -----------------------------------------------------------

    const btAddBanner = document.querySelector("[data-btAddBanner]")
    const mainDiv = document.querySelector("[data-mainDiv]");

    if(btAddBanner) {
        btAddBanner.addEventListener("click", addNewBanner)
    }


    function addNewBanner () {

        let div = document.createElement("div")
        div.className = "mpBannerPreview" 

        div.innerHTML += `
        <div class="mpButtonSelect">        
        <label for="mpFile" id="mpChooseAnImage" class="main-btn --chooseFile --mpButton" data-inputSelected="inputImage">Choose an image
        </label>
            <div>
                <h4>Link post with banner</h4>
                <select name="" id="">
                    <optgroup label="Link post with banner">
                        <option value="">No link</option>
                        <option value="">Batman</option>
                        <option value="">Harry Potter</option>
                        <option value="">Jogo Vorazes</option>
                    </optgroup>
                </select>
            </div>

            <a href="">
                <i class="fa-solid fa-trash fa-2xl" style="color: #ffffff;"></i>
            </a>
        </div>

        <label id="mpLabelImage" data-mpLabelImage="">
            <img src="/img/banner/fundoCinza.png" alt="">
        </label>

        <input class="formPost-input --diplay-none" type="file" id="mpFile" name="file" data-empty="" required>
        <label class="mpName" id="mpFile-text" data-mpFileText="">No image selected ...</label>
        `

        mainDiv.appendChild(div)

        getButton()
    }

Primeiro começamos definindo algumas variáveis e constantes:

    var mpFile = document.getElementById("mpFile");

    let correctInputLabelImage = ""
    let correctLabelText = ""
    let chooseAnImage = ""

Esse var mpFile nada mais que o input do tipo file dentro do arquivo mainpage do admin.

Depois temos uma validação:

    if (mpFile) {
        getButton()
    }

A função getButton é onde basicamente começa a rodar o script, mas ele só será chamada caso o mpFile for verdadeiro. Isso serve para não dar erro na própria página mainpage do admin e em outras páginas também já que os scripts são todos carregador de uma vez no main.handlebars.

Depois vem a função getButton():

    function getButton() {

        const btChooseImage = document.querySelectorAll("[data-inputSelected]")
        btChooseImage.forEach(elemento => elemento.addEventListener("click", selectCorrectLabelImage))
    }

Essa função ele cria uma constante chamada btChooseImage que nada mais é que o botão choose image que existe dentro da criação do banner.

Nesse script eu criei um preview do banner que basicamente é a imagem que você escolher dentro do seu computador.

Porém eu preciso que esse preview fique em uma label específica que é destinada a envolver a tag de img, nessa tag img que será criada é onde o src da imagem vinda do pc do admin ficará.

Dito isso a função getButton() serve para selecionar todos os botões choose image que existem na página e identificar quais desses botões foi clicado já que temos a possibilidade de ter diversos banners diferentes e com isso teremos varios botões de escolher imagens e por isso devemos saber qual botão foi clicado e sabendo disso vamos chamar uma outra função chamada selectCorrectLabelImage.

Função selectCorrectLabelImage():

    function selectCorrectLabelImage(e) {

        mpFile = document.getElementById("mpFile");

        mpFile.value = ""

        let a = e.target.parentNode
        var b = a.parentNode
        let c = b.querySelector("[data-mpLabelImage]")
        let d = b.querySelector("[data-mpFileText]")
        let f = b.querySelector("[data-inputSelected]")
        correctInputLabelImage = c
        correctLabelText = d    
        chooseAnImage = f

        if (mpFile) {
            mpFile.addEventListener("change", mpChangeImage);
        }
    }

Essa função como o próprio nome diz seleciona o label da imagem correto. Primeiro, sabemos que o usuário pode clicar diversas vezes no botão adicionar banner e com isso termos varios campos de banner diferente. Sabemos também que cada imagem é envolvida por uma label. Então como saber qual label é a correta para adcionarmos a imagem.

Com esssa função nós utilzamos o parâmetro de evento (e). Dentro da função mudamos o do mpFile que nada mais é que o mesmo input do tipo file, mas precimos seta-lo qui de novo. Depois ver uma sequência de varias let que decidi nomear com letras mesmo, pois eu só quero buscar uma div específica, mas como temos diversos passos para isso mão achei necessário criar nomes tão intuitivos.

A let a = e.target.parentNode ele nos retorna uma div que está envolvendo vários componenetes.
A var b = a.parentNode nos retorna a tag pai da tag da div que buscamos na let a, que nesse caso é a div que contém a classe mpBannerPreview, esse div da var b é a div que vamos criar futuramente para termos a criação de diversos banners.

Aqui é importante saber que, como na função getButton() selecionamos o botão choose image que foi clicado, então todas as funções que contem no parâmetro e da próxima função, faz referência a esse botão, então na let c = b.querySelector("[data-mpLabelImage]") estmaos buscando naquela div em que o botão foi clicado uma label que contem o data-attribute data-mpLabelImage, ou seja, a label daquela div que iremos implementar a imagem.

A let let d = b.querySelector("[data-mpFileText]") nada mias que a busca de outro elemento daquela div específica para conseguirmos posteriormente mostrar também ao usuário o nome da imagem que ele selecionou.

A let f = b.querySelector("[data-inputSelected]") é o botão choose image que clicamos, ele serve apenas para identificarmos o botão, pois depois irei mudar o nome desse botão clicado.

Depois para deixar o código mais entendivel eu redefini as seguintes variáveis:

    correctInputLabelImage = c
    correctLabelText = d    
    chooseAnImage = f

Só fiz para entendimento código mesmo.

Seguindo o código temos: 

    if (mpFile) {
        mpFile.addEventListener("change", mpChangeImage);
    }

Ou seja, caso o input do tipo file daquela div em específico seja alterado eu quero chamar a função mpChangeImage.

Função mpChangeImage():

    function mpChangeImage(e) {
        const mpInputTarget = e.target;
        const mpFile = mpInputTarget.files[0];

        if(mpFile) {
            chooseAnImage.innerHTML = "Change image";        

            const reader = new FileReader();

            reader.addEventListener("load", function(e) {

                const element = correctInputLabelImage.querySelector("img")
                element.parentNode.removeChild(element)

                const img = document.createElement("img");

                const readerTarget = e.target.result;

                img.src = readerTarget;

                correctInputLabelImage.appendChild(img);
            })

            reader.readAsDataURL(mpFile);

            nameFile()
        }
    }

Utilizamos de novo o parâmetro e do evento. 
Com ele criamos a const mpInputTarget = e.target. Com essa contante eu consigo obter qual foi o input do tipo file que foi selecionado já que esse parâmetro e faz referencia ao elemento que recebeu o evento change que no nosso caso é o input.

const mpFile = mpInputTarget.files[0] contem alguns elementos da imagem selecionada do computador do usuário importantes que serão utilizados a seguir.

Logo em seguida temos um validação. Se a constante mpFile foi "criada", lembrando que ela só tem valor se o usuário escolher de fato uma imagem, caso ele clique em choose image e depois cancele, essa const mpFile não tem vlor nenhum atribuido a ela.

Sabendo disso caso o usuário tanha escolhido uma imagem, nós vamos pegar aquela variável chooseAnImage e dizer para ela troca seu valor para Change image, já que nõ faz sentido estar escrito choose image se já existe uma imagem lá, então chooseAnImage.innerHTML = "Change image" faz esse papel de trocar o conteúdo do botão.

Depois definos a const reader = new FileReader(). Essa função new FileReader() é uma função que já vem por padrão no javaScript, e ela quando é chamado ele automaticamte cria um evento de load e nossa const reader vai ouvir isso com: 

    reader.addEventListener("load", function(e) {

        const element = correctInputLabelImage.querySelector("img")
        element.parentNode.removeChild(element)

        const img = document.createElement("img");

        const readerTarget = e.target.result;

        img.src = readerTarget;

        correctInputLabelImage.appendChild(img);
    })

Ou seja, chamamos o método new FileReader(), ele sozinho criou um evento load, chamamos o addEventListener para ouvir esse evento load e atrvés da arrow funtion  dizemos que queremos deletar umatag img que já existe por padrão e tem seu conteúdo com uma imagem cinza. Então ele apaga com const element = correctInputLabelImage.querySelector("img") e element.parentNode.removeChild(element), depois nós criamos uma nova tag img dentro da label feita para isso.

Depois pegamos o src da imagem que a pessoa selecionou com const readerTarget = e.target.result. Depois falamos que img.src = readerTarget  e dissemos também qual é a div pai para fazer o appendChild.

Após isso colocamos:

    reader.readAsDataURL(mpFile);

    nameFile()

Esse reader.readAsDataURL(mpFile) nada mais que um método para ler a imagem do usuário corretamente.

E depois chamamos a função nameFile().

Função nameFile():

    function nameFile () {
        var name  = mpFile.files[0].name;
        correctLabelText.textContent = "File selected: " + name;
    }

Essa função apenas pega o nome da imagem do usuário e coloca lá na div como o nome da imagem.

Por fim temos:

    const btAddBanner = document.querySelector("[data-btAddBanner]")
    const mainDiv = document.querySelector("[data-mainDiv]");

    if(btAddBanner) {
        btAddBanner.addEventListener("click", addNewBanner)
    }


    function addNewBanner () {

        let div = document.createElement("div")
        div.className = "mpBannerPreview" 

        div.innerHTML += `
        <div class="mpButtonSelect">        
        <label for="mpFile" id="mpChooseAnImage" class="main-btn --chooseFile --mpButton" data-inputSelected="inputImage">Choose an image
        </label>
            <div>
                <h4>Link post with banner</h4>
                <select name="" id="">
                    <optgroup label="Link post with banner">
                        <option value="">No link</option>
                        <option value="">Batman</option>
                        <option value="">Harry Potter</option>
                        <option value="">Jogo Vorazes</option>
                    </optgroup>
                </select>
            </div>

            <a href="">
                <i class="fa-solid fa-trash fa-2xl" style="color: #ffffff;"></i>
            </a>
        </div>

        <label id="mpLabelImage" data-mpLabelImage="">
            <img src="/img/banner/fundoCinza.png" alt="">
        </label>

        <input class="formPost-input --diplay-none" type="file" id="mpFile" name="file" data-empty="" required>
        <label class="mpName" id="mpFile-text" data-mpFileText="">No image selected ...</label>
        `

        mainDiv.appendChild(div)

        getButton()
    }

Essa parte do código só serve para colocar com js um novo lugar para outro banner, o código é longo, mas a explicação é bem simples.

### Linkando os banners

Futuramente vou implantar isso no projeto.

### Fazendo com que o icone de lixeira apague a div do banner

Adicionei somente duas funções no código:

    function chooseAllIcon() {
        const icons = document.querySelectorAll("[data-icon]")
        icons.forEach(e => e.addEventListener("click", deleteBanner))
    }

    function deleteBanner(e) {
        const parent = e.target.parentNode.parentNode
        var getConfirm = confirm("Do you really sure you want to delete this banner ?")

        if (getConfirm == true) {
            parent.remove()
        }
    }

A função chooseAllIcon() apenas seleciona todos os icones de lixeira que servem para deletar um item.

A função deleteBanner(e) como o próprio nome diz serve para deletar aquela div do banner específica.

A outra alteração foi que toda vez que a função addNewBanner () termina ela chama a função getButton() e chooseAllIcon(), pois como novos botões são implementados eles precisam ser capturados.

E também coloquei um alerta para a pessoa confirma se ela tem certeza que quer deletar o banner.

Futuramente podemos ver de personalizar isso.

### Alterações

Fiz uma alteração na aprte do banner e decide deixar um número fix de banners, pois tem certas coisas que eu ainda não aprendi e não consegui implemnetra no código, porem quando aprender vou fazer a alteração nesse projeto.

Então o script do arquivo mainpage.js fica:

    const mpFile = document.getElementById("mpFile")
    const mpFile02 = document.getElementById("mpFile02")
    const mpFile03 = document.getElementById("mpFile03")
    const mpFile04 = document.getElementById("mpFile04")

    mpFile.addEventListener("change", mpChamgeImage)
    mpFile02.addEventListener("change", mpChamgeImage)
    mpFile03.addEventListener("change", mpChamgeImage)
    mpFile04.addEventListener("change", mpChamgeImage)

    let mpBannerPreview = ""
    let mpBtChooseImage = ""
    let mpLabelImage = ""
    let mpFileText = ""


    function mpChamgeImage (e) {

        getElements(e)

        const file = e.target.files[0]

        if(file) {
            mpBtChooseImage.innerHTML = "Change image"

            const reader = new FileReader();

            reader.addEventListener("load", function(e) {
                const imgElement = mpLabelImage.querySelector("img")
                imgElement.parentNode.removeChild(imgElement)

                const img = document.createElement("img")

                const readerTarget = e.target.result

                img.src = readerTarget

                mpLabelImage.appendChild(img)

                mpFileText.textContent = "File selected: " + file.name
            })

            reader.readAsDataURL(file)
        }
    }

    function getElements(e) {
        mpBannerPreview = e.target.parentNode
        mpBtChooseImage = mpBannerPreview.querySelector("[data-inputSelected]")
        mpLabelImage = mpBannerPreview.querySelector("[data-mpLabelImage]")
        mpFileText = mpBannerPreview.querySelector("[data-mpFileText]")
    }

E lá no mainpage.handlebars eu criei 4 divs de banners aletrando somente o id do input e o for do label.

### Salvando dados no banco de dados

Primeiro vou mostrat o model da MainPage.js:

    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    const MainPage = new Schema ({
        title: {
            type: String,
        },

        subtitle: {
            type: String,
        },

        bannerImageSrc: {
            type: Array,
        }
    })

    mongoose.model('mainpage', MainPage);

Eu vou tratar os dados de path das imagens e jogar tudo como array no bannerImageSrc.

Agora vamos criar a rota /mainpage/save:

    router.post('/mainpage/save', upload.array("file"), (req, res) => {

        MainPage.findById("64512683d06035b348475c81").then((mainpage) => {

            var arrayPath = []
            req.files.forEach((e) => {
                arrayPath.push(e.path)
            })

            const mpImageNumbersArray = mpImagePath(arrayPath)
            const mpImageExtensionArray = mpGetExtension(arrayPath)

            const mpFullPath = []

            for (i = 0; i < arrayPath.length; i++) {
                mpFullPath.push(`/uploads/${mpImageNumbersArray[i]}.${mpImageExtensionArray[i]}`)
            }

            mainpage.title = req.body.title
            mainpage.subtitle = req.body.subtitle
            mainpage.bannerImageSrc = mpFullPath

            mainpage.save().then(() => {
                req.flash('success_msg', "All datas saved successfully");
                res.redirect('/admin/mainpage');
            }).catch((err) => {
                req.flash('error_msg', "Data save error");
                res.redirect('/admin/mainpage');
            })

        }).catch((err) => {
            req.flash('error_msg', "Data save error");
            res.redirect('/admin/mainpage');
        })
    })

Aqui basicamente tratamos os dados do path que nem fizemos na rota post.

No caso dessa rot, nós procuramos um id no banco de dados e sempre atualizamos o mesmo, então temos somente um registro no banco de dados que vai ficar se atualizando todo vez que tiver alguma alteração.

### Mostrar dados do banco de dados nos arquivos Handlebars

Para isso vou editar a rota "/" do arquivo app.js:

    app.get("/", (req, res) => {

        Post.find().lean().then((posts) => {

            MainPage.findById("64512683d06035b348475c81").lean().then((mainpage) => {

                res.render('index', {posts: posts, mainpage: mainpage})

            }).catch((err) => {
                req.flash('error_msg', "An internal error occurred");
                res.redirect('/404');
            })

        }).catch((err) => {
            req.flash("error_msg", "An internal error occurred");
            res.redirect("/404");
        })
    })

E no arquivo index.handlebars:

    <h2 class="main-title">{{mainpage.title}}</h2>
    <h3 class="main-subtitle">{{mainpage.subtitle}}</h3>

    <figure class="carousel">
        {{#each mainpage.bannerImageSrc}}
            <img class="carrousel-image selected" src="{{this}}" alt="">
        {{else}}
            <img class="carrousel-image selected" src="/img/banner/hp.png" alt="Banner Harry potter">
            <img class="carrousel-image" src="/img/banner/hg.png" alt="Banner Jogos Vorazes">
            <img class="carrousel-image" src="/img/banner/vf.png" alt="Banner Velozes e furioso">
        {{/each}}
    </figure>

No caso do mainpage.bannerImageSrc eu utilizei o this para mostrar cada elemento do array de objetos que tem no banco dados da mainpage. Não sei se essa é a melhor forma, mas deu certo, caso eu descubra uma maneira melhor eu atualizo aqui.

### Mostrando os dados cadastrados no arquivo mainpage.handlebars

### Tive que fazer uma alteração

Tive que dividir a parte da Main Page em dois bancos de dados um para as imagens apenas e outro para titulo e subtitulo. Estav com problema na alteração e na parte de mostrar os dados.

Nem vou detalhar aqui como ficou, pois são coisas básicas que eu já fiz.


Arrumando responsividade da navbar




























